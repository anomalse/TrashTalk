
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    //setTitle: (title) => ipcRenderer.send('set-title', title),
    // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
    setVideoMessage: (message) => ipcRenderer.send('set-video-message', message),
    getFile: () => ipcRenderer.invoke('dialog:getFile')
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })