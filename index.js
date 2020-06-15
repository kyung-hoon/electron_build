import express from 'express';

const app =express();
const port =3300;

app.use(express.json());
app.post('/ElectronBuild',(req,res)=>{
    console.log("request received");
});

app.listen(port, ()=>console.log('electron build service is listening'));
