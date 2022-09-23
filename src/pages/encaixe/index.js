const { remote } = require('electron');
// const { readFile, readFileSync, readdirSync } = require('fs');






let lastOrdem = ''

// Componentes HTML


const main= `
<div id="formulario-cadastro">
  <h1>Cadastro de Encaixe</h1>
  <div id="cabecalho">
    <div>
      <div>
        <label for="ordem">Ordem</label>
        <input type="text" id="ordem" placeholder="Digite o numero da of" maxlength="9">
      </div>
      <div>
        <label for="cad-dt">Data</label>
        <input type="datetime" id="cad-dt">
      </div>
      <div>
        <label for="artigo">Artigo</label>
        <input type="text" id="artigo">
      </div>
    </div>
    <div>
      <div>
        <label for="modelo">Modelo</label>
        <input type="text" id="modelo">
      </div>
      <div>
        <label for="cor">Cor</label>
        <input type="text" id="cor">
      </div>
      <div>
        <label for="qtd">Qtd</label>
        <input type="number" id="qtd" min="0" value="0">
      </div>
    </div>
    </div>
    <hr style="margin: 1.5rem 0;">
  <div id="itens">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Material</th>
          <th>Cor</th>
          <th>Espessura</th>
          <th>Preço(m²)</th>
          <th>Prev(m²)</th>
          <th>Prev(R$)</th>
          <th>Serv(m²)</th>
          <th>Serv(R$)</th>
          <th>Dif(m²)</th>
          <th>Dif(R$)</th>
        </tr>
      </thead>
      <tbody id="lista-materiais">
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>Material</td>
          <td>Cor</td>
          <td>Espessura</td>
          <td>Preço(m²)</td>
          <td>Prev(m²)</td>
          <td>Prev(R$)</td>
          <td>Serv(m²)</td>
          <td>Serv(R$)</td>
          <td>Dif(m²)</td>
          <td>Dif(R$)</td>
        </tr>
        
      </tbody>
    </table>
  </div>
</div>
`


function loadPage() {
  newApp.innerHTML = TitleBar
  newApp.innerHTML += main
  barOptions()
  handleInputOrdem()
}



function getOrdem(e) {
  const inputModelo     = document.querySelector("#modelo")
  const inputArtigo     = document.querySelector("#artigo")
  const inputCor        = document.querySelector("#cor")
  const inputQtd        = document.querySelector("#qtd")
  const inputDateInsert = document.querySelector("#cad-dt")

  if (e.length !== 9) {
    inputModelo.value = ""
    inputArtigo.value = ""
    inputCor.value = ""
    inputQtd.value = 0
    inputDateInsert.value = formatDate()
  }
  
    const ordem = getOrdemResumeFromSinteticFile(e)

    if(Object.keys(ordem).length !== 0){
      inputArtigo.value = ordem.Artigo
      inputModelo.value = ordem.Modelo
      inputCor.value    = ordem.Cor
      inputQtd.value    = ordem.QtdPrev
      if (inputDateInsert.value === '') {
        inputDateInsert.value = formatDate()
      }
    } else {
      showAlertWindows('Ordem não encontrada', e)
    }

}

function getOrdemFeedStock(e) {
  const tabela = document.querySelector("tbody")

  let data = getOrdemFeedStockFromSintectFile(e)

  data.map((i)=>{
    // Continuar
    tabela.innerHTML
  })


}

function handleInputOrdem(){
  const inputOrdem = document.querySelector("#ordem")

  inputOrdem.addEventListener('keyup', (event) => {
    if (event.target.value.length === 9 && lastOrdem !== event.target.value) {
      console.log("completo")
      lastOrdem = event.target.value;
      getOrdem(event.target.value);
      getOrdemFeedStock(event.target.value);
    }
  })
}

loadPage();


