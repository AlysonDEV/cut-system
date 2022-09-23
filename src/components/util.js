const electron = require('electron')
const path = require('path')
const fs = require('fs')

const { readFileSync, access, constants } = require('fs')

const formatDate = () => {
  const now = new Date
  
  const year = now.getFullYear();
  const month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
  const date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
  const hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
  const minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
  const seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

  formattedDataTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;

  return formattedDataTime;
}

function convertFormatNumberBRFloatToFormatNumberUSAFloat(textToConvert) {
  res = parseFloat(textToConvert.replace(".", "").replace(",", "."))

  if (isNaN(res)) {
    res = 0
  }
  return res
}

function showAlertWindows(title, body){
  const Notification = electron.remote.Notification
  const options = {
      title: title,
      subtitle: 'Subtitle of the Notification',
      body: body,
      silent: false,
      icon: path.join(__dirname, '../assets/logo-vulcabras.png'),
      hasReply: true,  
      timeoutType: 'never', 
      replyPlaceholder: 'Reply Here',
      // sound: path.join(__dirname, '../assets/sound.mp3'),
      urgency: 'critical', 
      closeButtonText: 'Close Button',
      actions: [ {
          type: 'button',
          text: 'Show Button'
      }]
  }

  const customNotification = new Notification(options);
  customNotification.show()
  
} 

function fileNotExists(file) {
  try {
    if (fs.existsSync(file)) {
      return false;
    } else {
      return true;
    }
  } catch(err) {
      console.log("errado")
      return true;
  }
}

function getOrdemResumeFromSinteticFile(ordem) {
  const pathFile = ["O://Corte/Alyson/txtGCI/CC.txt","O://Corte/Alyson/txtGCI/CF.txt"]
  let returnFile = new Array;

  pathFile.map(path => {
      const validationFileForReading = fileNotExists(path)
      if(validationFileForReading) {
        showAlertWindows("Falha ao localizar arquivo", `File: ${path} \n Erro: não encontrado \n Obs.: Sem esse arquivo não é possível localizar as of's`)
      } else {
        if (returnFile.length === 0) {
          const data = readFileSync(path, 'utf8' ).split(/\r?\n/)
          returnFile = data.filter((i)=>{
            if (i.search(ordem) > 1) {
              return i
            }
          })
        }
      }
    })

  let newOrdem = new Object()

  if (returnFile.length !== 0) {
    newOrdem.DtFimPrev  = returnFile[0].substring(1, 11).trim()
    newOrdem.DtIniReal  = returnFile[0].substring(12, 22).trim()
    newOrdem.DtRealFim  = returnFile[0].substring(23,33).trim()
    newOrdem.FamSub     = returnFile[0].substring(34, 41).trim()
    newOrdem.Artigo     = returnFile[0].substring(42, 54).trim()
    newOrdem.Cor        = returnFile[0].substring(55, 61).trim()
    newOrdem.Modelo     = returnFile[0].substring(68, 92).trim()
    newOrdem.Ordem      = returnFile[0].substring(97, 106).trim()
    newOrdem.Sta        = returnFile[0].substring(109, 112).trim()
    newOrdem.QtdPrev    = convertFormatNumberBRFloatToFormatNumberUSAFloat(returnFile[0].substring(117, 130))
    newOrdem.QtdRealiz  = convertFormatNumberBRFloatToFormatNumberUSAFloat(returnFile[0].substring(131, 144))
    newOrdem.QtdDif     = convertFormatNumberBRFloatToFormatNumberUSAFloat(returnFile[0].substring(145, 158))
    newOrdem.Obs        = returnFile[0].substring(159, 175).trim()
    newOrdem.DtUltFase  = returnFile[0].substring(189, 200).trim()
  }
  
  return newOrdem
}

function getOrdemFeedStockFromSintectFile(ordem) {
  const path = ["O://Corte/Alyson/_encaixe/Economia/fileGCI.txt"]
  const validationFileForReading = fileNotExists(path[0])
  if (validationFileForReading) {
    showAlertWindows("Arquivo não encontrado", `File: ${path[0]} \n Obs.: Verificar se o arquivo existe.`)
  } else {
    const data = readFileSync(path[0], 'utf8' ).split(/\r?\n/)
    let ordemDataFind = false
    dataFilter = data.filter((i)=>{
      lineIsFeedStock = i.search("COR  I002") > 0

      if (i.search("Ordem Fabrico :") > 0 ) { 
        if (i.search(ordem) > 0 ) {
          ordemDataFind = true
        } else { 
          ordemDataFind = false
        }
      }

      if (ordemDataFind && lineIsFeedStock) {
        return i
      }
    })
  }
  let newFeedStockArr = new Array

  dataFilter.map((i)=>{
    let newFeedStock = new Object

    newFeedStock.MatNome = i.substring(12, 25).trim()
    newFeedStock.MatDesc = i.substring(26, 51).trim()
    newFeedStock.MatCor  = i.substring(52, 58).trim()
    newFeedStock.MatEsp  = i.substring(59, 65).trim()
    newFeedStock.MatVal  = convertFormatNumberBRFloatToFormatNumberUSAFloat(i.substring(66, 76).trim())
    newFeedStock.PrevQtd = convertFormatNumberBRFloatToFormatNumberUSAFloat(i.substring(78, 86).trim())
    newFeedStock.PrevVal = convertFormatNumberBRFloatToFormatNumberUSAFloat(i.substring(87, 90).trim())
    newFeedStock.ServQtd = convertFormatNumberBRFloatToFormatNumberUSAFloat(i.substring(101, 110).trim())
    newFeedStock.ServVal = convertFormatNumberBRFloatToFormatNumberUSAFloat(i.substring(111, 124).trim())
    newFeedStock.PorcSer = i.substring(125, 131).trim()
    newFeedStock.MatUnid = i.substring(131, 134).trim()
    newFeedStock.MatTipo = i.substring(135, 138).trim()

    newFeedStockArr.push(newFeedStock)
  })

  // console.log(newFeedStockArr)

  return newFeedStockArr
}