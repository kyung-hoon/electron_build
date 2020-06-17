import path from 'path';
import childProcess from 'child_process';
import fs from 'fs-extra';


export function makeElectronPackage(){
    const loaderPath = path.join(__dirname,'../electron-loader');
    const electronOutput = path.join(loaderPath,'output');
    const electronScript = path.join(loaderPath,'build-tools','build');
    console.log('elcetron build start');
   
    if(fs.existsSync(electronOutput)){
        fs.removeSync(electronOutput);
    }
    
    generateManifest(()=>{
        const cp = childProcess.spawn('./build',
        [
            "manifest.json"
        ],
        { cwd : path.join(loaderPath,"build-tools"), shell: true,  detached: true });
        cp.on('exit',()=>{
            console.log("electron build done");
        })
    });
   
    
}

function generateManifest(){
    const configJson = new Object();
    const browserJson = new Object();
    const preferenceJson = new Object();

    configJson.projectRoot='../'
    configJson.target = path.join(__dirname,'target');
    configJson.platform ='win';
    configJson.buildType ='debug';

    configJson.app_name = 'TopApplication';
    configJson.electron_main_js_name ='index.js';
    configJson.electron_icon_name='icon.ico';

    preferenceJson.nodeIntegration = false;

    browserJson.height = 600;
    browserJson.width =800;
    browserJson.webPreferences =preferenceJson;

    configJson.browserWindow_json=browserJson;
    
    fs.writeFileSync(path.join(__dirname,'../','electron-loader','manifest.json'),JSON.stringify(configJson,null,4),'utf8');
    
}





