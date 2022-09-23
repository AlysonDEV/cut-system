// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { remote } = require('electron');
// const fs = require('fs');
// const mainApp = document.querySelector("#main");

const getWindow = remote.BrowserWindow.getFocusedWindow()

//Render Components



const newMain = `
  <main id="main" class="content-main ">
    <div class="header">
      Lista de arquivo na pasta atual:
    </div>
  </main>
`;

// mainApp.innerHTML = TitleBar;
// mainApp.innerHTML += `<div class="content"></div>`;
newContent = document.querySelector("#main")
newContent.innerHTML += Header + ASide + newMain;


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

