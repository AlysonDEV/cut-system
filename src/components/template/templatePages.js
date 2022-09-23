
const TitleBar = ` 
  <div id="bar-title" class="bar-title">
    <div>
      <img src="../../assets/icon.png">
      <span>Aincrad - Encaixe</span>
    </div>
    <div class="buttons-windows">
      <button 
        class="button-minimize" 
        id="button-minimize"
        title="Minimizar"
      >
        -
      </button>
      <button 
        class="button-maximize" 
        id="button-maximize"
        title="Maximizar/Restaurar"
      >
        +
      </button>
      <button 
        class="button-close" 
        id="button-close"
        title="Fechar"
      >
        x
      </button>
    </div>
  </div>
`;

const ASide = `
  <aside class="content-aside">
  <ul>
    <li> Corte
      <ul>
        <li><a href="../../pages/encaixe/index.html">Encaixe</li>
        <li>Projeção</li>
        <li>Leitura Corte</li>
      </ul>
    </li>
    <li><a href="../../pages/corte/index.html">Produção x Inutilizado x Interferências</a></li>
    <li>Seigrafia</li>
    <li><a href="../../pages/frequencia/index.html">Frequência</a></li>
    <li>Requisição</li>
    <li><a href="../../pages/secretary/index.html">Secretária</a></li>
  </ul>
  </aside>
`;

const Header= `
  <header class="content-header">
    <img src="../../assets/logo-vulcabras.png">
    <div>
      <button>Relatório</button>
      <h1 id="namePage">Home</h1>
      <div>
        <span>Bem vindo(a)</span>
        <span id="userName">Alyson Ronnan Martins</span>
      </div>
    </div>
    <button id="button-close">Sair</button>


  </header>
`;

const Main = `
  <main id="main"></main>
`

// const newApp          = document.querySelector("#app-root")


function loadTemplate() {
  newApp.innerHTML = TitleBar
  newApp.innerHTML += Main
}

function barOptions() {
  const { remote } = require("electron");

  const getWindow = remote.BrowserWindow.getFocusedWindow()

  const buttonMinimize = document.querySelector("#button-minimize")
  const buttonMaximize = document.querySelector("#button-maximize")
  const buttonClose = document.querySelector("#button-close")

  buttonMinimize.addEventListener("click", () => {
    getWindow.minimize()
  })

  buttonMaximize.addEventListener("click", () => {
    getWindow.isMaximized() ? getWindow.unmaximize() : getWindow.maximize();
  })

  buttonClose.addEventListener("click", () => {
    history.back();
  })
}

loadTemplate()

