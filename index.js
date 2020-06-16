import express from 'express';
import fs from 'fs-extra';
import formidable from 'express-formidable';
import path from 'path';
import fileUpload from 'express-fileupload';
import admZip from 'adm-zip';

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
    const zip =new admZip(path.join(__dirname,'target.zip'));
    zip.extractAllToAsync(targetPath,true,()=>{
        console.log("extracting done!");
    })
});

app.listen(port, ()=>console.log('electron build service is listening'));
