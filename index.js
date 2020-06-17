import express from 'express';
import fs from 'fs-extra';
import formidable from 'express-formidable';
import path from 'path';
import fileUpload from 'express-fileupload';
import unzip from 'unzip';
import childProcess from 'child_process';
import {makeElectronPackage} from './electron_builder';

const app =express();
const port =3300;


app.use(fileUpload());
app.post('/ElectronBuild',(req,res)=>{
   
    fs.mkdirSync(targetPath);
    let uploadFiles  = req.files.targetFile;
    const fileName = req.files.targetFile.name;
    const dotIndex = fileName.indexOf('.');
    const appName = fileName.substr(0,dotIndex);
    console.log(fileName);
    const targetPath = path.join(__dirname,appName);
    if(fs.existsSync(path.join(__dirname,fileName))){
        fs.removeSync(path.join(__dirname,fileName));
    }
    if(fs.existsSync(targetPath)){
        fs.removeSync(targetPath);
    }
    uploadFiles.mv(path.join(__dirname,fileName),()=>{
        const cp = childProcess.spawn(
            'unzip',
            [
                path.join(__dirname, fileName), "-d" ,"./"+appName
            ],
            { cwd : path.join(__dirname), shell: true,  detached: true }
        );
    
        cp.on('exit',()=>{
            fs.copyFileSync(path.join(__dirname,'icon.ico'),path.join(__dirname,appName,'icon.ico'));
        });
    });
    
    makeElectronPackage(appName);
    res.send();
});

app.listen(port, ()=>console.log('electron build service is listening'));


