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
    const targetPath = path.join(__dirname,'target');
    if(fs.existsSync(path.join(__dirname,'target.zip'))){
        fs.removeSync(path.join(__dirname,"target.zip"));
    }
    if(fs.existsSync(targetPath)){
        fs.removeSync(targetPath);
    }
    fs.mkdirSync(targetPath);
    let uploadFiles  = req.files.targetFile;
    const fileName = req.files.targetFile.name;
    console.log(fileName);
    uploadFiles.mv(path.join(__dirname,fileName));
    const cp = childProcess.spawn(
        'unzip',
        [
            path.join(__dirname, 'target.zip'), "-d" ,"./target"
        ],
        { cwd : path.join(__dirname), shell: true,  detached: true }
    );

    cp.on('exit',()=>{
        fs.copyFileSync(path.join(__dirname,'icon.ico'),path.join(__dirname,'target','icon.ico'));
    });
    makeElectronPackage();
    res.send();
});

app.listen(port, ()=>console.log('electron build service is listening'));


