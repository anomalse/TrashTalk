// const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path')
const electron = require('electron')
const os = require("os");

const { app, BrowserWindow,ipcMain } = electron



let directoryPathN = os.homedir()+"/desktop/TrashTalk/tt-webServer/uploads/video";
const directoryPath = path.join(__dirname, 'videos');
console.log(directoryPathN )


function readAndSend(){ return new Promise((resolve,reject) =>{

fs.readdir(directoryPathN, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    // files.forEach(function (file) {
    //     // Do whatever you want to do with the file
    //     console.log(file); 
    // });
  //  console.log(files.length);
  let done =false;
  while(!done){
    let randomNum = Math.floor(Math.random()*files.length);
    if(!files[randomNum].startsWith(".") && !files[randomNum].startsWith("color_bars")){
      console.log(`${directoryPathN}/${files[randomNum]}`)
    resolve (`${directoryPathN}/${files[randomNum]}`);
    done =true;
    }
  }
});
})

}

const createWindow = (w,h) => {

    const win = new BrowserWindow({
        width: w,
         height: h,
         show:false,
         webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      })
  
   // win.maximize();
  
    win.loadFile('index.html')
    win.maximize();
  }

  app.whenReady().then(() => {

    ipcMain.handle('dialog:getFile', handleFileGet)
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    createWindow(width,height)


  })

  function handleFileGet(){
    return new Promise( async(resolve,reject)=>{

        let theFile = await readAndSend();
        console.log(theFile);
        resolve(theFile);

    })

  }

  ipcMain.on('set-video-message', (event, message) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(message)
  })