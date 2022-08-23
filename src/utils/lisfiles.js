const { readdirSync} = require('fs')

const appHTML = document.querySelector('#app-root')
const dirFolders = readdirSync('./')

dirFolders.map(item => (
  appHTML.innerHTML += `<li>${item}</li>`
  )
)