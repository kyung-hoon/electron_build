import express from 'express';
import fs from 'fs-extra';
import formidable from 'express-formidable';
import path from 'path';
import fileUpload from 'express-fileupload';

const app =express();
const port =3300;


app.use(fileUpload());
app.post('/ElectronBuild',(req,res,next)=>{
    
    fs.removeSync(path.join(__dirname,"target.zip"));
    let uploadFiles  = req.files.targetFile;
    const fileName = req.files.targetFile.name;
    uploadFiles.mv(path.join(__dirname,fileName));
});

app.listen(port, ()=>console.log('electron build service is listening'));
