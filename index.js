import express from 'express';
import fs from 'fs';
import formidable from 'express-formidable';
import path from 'path';

const app =express();
const port =3300;

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: path.join(__dirname, 'target'),
    multiples: true,
    keepExtensions:true// req.files to be arrays of files
    }));
app.post('/ElectronBuild',(req,res)=>{
    console.log("request received");
    console.log(req.targetFile);
});

app.listen(port, ()=>console.log('electron build service is listening'));
