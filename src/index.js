// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


const { remote } = require('electron');
const fs = require('fs');
const newApp = document.querySelector("#app-root");

const getWindow = remote.BrowserWindow.getFocusedWindow()

const buttonMinimize = document.querySelector("#button-minimize")
const buttonMaximize = document.querySelector("#button-maximize")
const buttonClose = document.querySelector("#button-close")

buttonMinimize.addEventListener("click", () => {
  getWindow.minimize();
})

buttonMaximize.addEventListener("click", () => {
  getWindow.isMaximized() ? getWindow.unmaximize() : getWindow.maximize();
})
buttonClose.addEventListener("click", () => {
  getWindow.close();
})

var windowMinimize = () => {
  console.log('Teste')
}

