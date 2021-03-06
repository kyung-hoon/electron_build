import path from 'path';
import childProcess from 'child_process';
import fs from 'fs-extra';
import { error } from 'console';


export async function makeElectronPackage(appName,res){
    const loaderPath = path.join(__dirname,'../electron-loader');
    const electronOutput = path.join(loaderPath,'output');
    const electronScript = path.join(loaderPath,'build-tools','build');
    
    if(fs.existsSync(electronOutput)){
        fs.removeSync(electronOutput);
    }

    generateManifest(appName,()=>{
       console.log('manifest generated');
    });
    console.log('electron build start');
        const cp =  childProcess.execFile(path.join(loaderPath,'build-tools','build'),['manifest.json'],

        { cwd : path.join(loaderPath,"build-tools"), shell: true,  detached: true });
        let stdOut ='';
        cp.stdout.on('error', error=>{
            stdOut += error;            
            console.log(stdOut);
        });
        cp.stdout.on('data', data=>{
            stdOut += data;            
            console.log(stdOut);
        });
        cp.on('exit',()=>{
            console.log("electron build done");
            if(fs.existsSync(path.join(__dirname,'../electron-loader','output','dist',appName+" Setup 1.0.0.exe"))){
                console.log('binary has been created');
            }
            res.sendFile(path.join(__dirname,'../electron-loader','output','dist',appName+" Setup 1.0.0.exe"));
        })
    
}

 function generateManifest(appName){
    const configJson = new Object();
    const browserJson = new Object();
    const preferenceJson = new Object();

    configJson.projectRoot='../'
    configJson.target = path.join(__dirname,appName);
    configJson.platform ='win';
    configJson.buildType ='debug';

    configJson.app_name = appName;
    configJson.electron_main_js_name ='index.js';
    configJson.electron_icon_name='icon.ico';

    preferenceJson.nodeIntegration = false;

    browserJson.height = 600;
    browserJson.width =800;
    browserJson.webPreferences =preferenceJson;

    configJson.browserWindow_json=browserJson;
    
    fs.writeFileSync(path.join(__dirname,'../','electron-loader','manifest.json'),JSON.stringify(configJson,null,4),'utf8');
    
}





