// const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path')
const electron = require('electron')
const os = require("os");

const { app, BrowserWindow,ipcMain } = electron



let directoryPathN = os.homedir()+"/weworkforus/MDES-REACT/faceTestServer/uploads/video";
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
   // console.log(randomNum)
   // console.log(files[randomNum])
    if(!files[randomNum].startsWith(".")){
    resolve (`${directoryPathN}/${files[randomNum]}`);
    done =true;
    }
  }
});
})

}

const createWindow = (w,h) => {
    // const win = new BrowserWindow({
    //   width: 800,
    //   height: 600
    // })

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
    // const contents = win.webContents;
    // console.log(contents)
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

  //test message pass...
//   ipcMain.on('set-title', (event, title) => {
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setTitle(title)
//   })

  ipcMain.on('set-video-message', (event, message) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(message)
  })

//   let user = "Coded By Mansi Gupta"
//   function changeInDom(user) {
//     let code = `
//     var p = document.getElementById("content_styler");
//     p.innerHTML = "I am the changed text. "+"${user}";
//     `;
//     win.webContents.executeJavaScript(code);

// }