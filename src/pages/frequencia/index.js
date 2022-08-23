require('dotenv').config()

console.log(process.env)

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, child, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
const newAppFirebase = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

// Mostrar a lista de ferramentas
function handleModelo(e) {

}

// Mostrar tamanhos
function handleFerramentas(ferramenta) {
  const Modelo = document.querySelector("select.campo-lista").value
 


}

//Mostrar a quantidade para os tamanhos
function handleTamanho(e) {

}




// const loader
function svgLoader(id) {
  return `
    <div id="${id}" class="loader">
        <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
          <path fill="var(--color-gray)" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
          c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="2s" 
                from="0 50 50"
                to="360 50 50" 
                repeatCount="indefinite" />
          </path>
          <path fill="var(--color-gray)" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
          c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
                from="0 50 50"
                to="-360 50 50" 
                repeatCount="indefinite" />
          </path>
          <path fill="var(--color-gray)" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
          L82,35.7z">
              <animateTransform 
                attributeName="transform" 
                attributeType="XML" 
                type="rotate"
                dur="2s" 
                from="0 50 50"
                to="360 50 50" 
                repeatCount="indefinite" />
          </path>
        </svg>

    </div>`
}
function svgUnload(id) {
  const svgID = document.querySelector(`#${id}`);
  svgID.remove()
}

// Funções para os campos
async function getModelos(){
  const viewList = document.querySelector(".freq-cadastros-ferramentas")
  viewList.children[0].innerHTML += svgLoader("loaderModelo")
  document.querySelector("#listModelo").classList.add("hidden")
  
  const listModels = document.querySelector("select.campo-lista")
  listModels.innerHTML = '';
  await get(child(dbRef, `/Modelos/`)).then((res) => {
    res.val().map(item => {
      listModels.innerHTML += `<option key="${item.Modelo}">${item.Modelo}</option>`
      // console.log(item);
    })
  });

  document.querySelector("#listModelo").classList.remove("hidden")
  svgUnload("loaderModelo")

}

async function getFerramentas(nameModel) {
  const divFerramentas = document.querySelector("#divFerramentas")
  divFerramentas.innerHTML += svgLoader("svgLoaderFerramenta")
  
  const list = document.querySelector("#listFerramenta")
  list.classList.add("hidden")
  list.innerHTML = ''

  await get(child(dbRef, `/Modelos/`)).then((res) => {
    res.val().map(modelo => {
      if (modelo.Modelo === nameModel ) {
        modelo.Ferramenta.map(ferramenta => {
          list.innerHTML += `<option key="${ferramenta.Nome}">${ferramenta.Nome}</option>`
        })
      }

    })
  });

  svgUnload("svgLoaderFerramenta")
  list.classList.remove("hidden")
  const listFerramenta = document.querySelector("#listFerramenta")
  listFerramenta.addEventListener('change', (event) => {
    handleFerramentas(event.target.value)
  })


}

async function getTamanhos(nameModel, nameTool){
  const listTamanhos = document.querySelector("#listTamanhos")

  await get(child(dbRef, `/Modelos/`)).then((res) => {
    res.val().map(modelo => {
      if (modelo.Modelo === nameModel ) {
        modelo.Ferramenta.map(ferramenta => {
            if (ferramenta.Nome === nameTool) {
            listTamanhos.innerHTML = ''
            ferramenta.Unidades.map(unidade => {
              listTamanhos.innerHTML += `<option key="${unidade.Tamanho}">${unidade.Tamanho}}</option>`
            })
          }
        })
      }
    })
  })
}

// Iniciar o carregamento dos campos no formulario
getModelos()

// Manipulação de selecting
const listModelo = document.querySelector("#listModelo")

listModelo.addEventListener('change', (event) => {
  const modelo = event.target.value;
  getFerramentas(modelo)
});



