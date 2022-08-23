const ADODB = require('node-adodb');
ADODB.debug = true;
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\dbs\\ccf-info.mdb;');

const formulario = document.querySelector(".formulario-employee")
formulario.querySelector("#matricula").addEventListener("keyup", handleMatricula);
// formulario.classList.add("hidden");

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}



async function handleMatricula(e) {
  const matricula = e.target.value.replace(/\s/g, '');
  let dados = {}

  if (matricula.length === 8 ) {
    formulario.children[2].classList.add("hidden");
    formulario.children[3].classList.remove("hidden");
    // console.log(getEmployees(matricula))
    // dados.push(await getEmployees(matricula))
    // dados = {... await getEmployees(matricula)[0][0]}
    // let obj = {...dados[0][0]}
    dados = await getEmployees(matricula)
    dados = Object.assign({}, dados.data[0])
    formulario.querySelector("#nome").value = dados["Nome"]
    formulario.querySelector("#data-contratacao").value = dados["DDC"]
    formulario.querySelector("#id-setor").value = dados["ST"]
    formulario.querySelector("#funcao").value = dados["Funcões Realizadas"]
    formulario.querySelector("#comentario").value = dados["Observações"]



    console.log(dados)
    formulario.children[2].classList.remove("hidden");
    formulario.children[3].classList.add("hidden");
  } 
  // console.log(e)
}

// Connect to the MS Access DB
  // var connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\dbs\\ccf-info.mdb;Persist Security Info=False;');

// Query the DB
// connection
//     .query('SELECT * FROM [Turno];')
//     .on('done', function (data){
//         console.log('Result:'.green.bold, data);
//     })



// Consulta
// let sq = `SELECT Matricula, Nome, Cargo, DDC, Observações, ST, [Funcões Realizadas], Time
//           FROM [Funcionários] WHERE Matricula = 22166128 AND Desligado = false`
// console.log(sq)

// connection
//   .query(sq)
//   .then(iData => {
//     console.log(JSON.stringify(iData, null, 2));
//     console.log(iData);
//   })
//   .catch(error =>{
//     console.log(error.process.message)
//   })
// connection
//   .execute(`DROP TABLE Funcionários`)
//   .then(iData => {
//     console.log(idata)
//     console.log("Sucesso")
//   })
//   .catch(error=> {  
//     console.log(error.process.message)
//     console.log("Erro")
//   })

// Cadastro


//Usuários
async function getEmployees(ID) {
  let res = {status: 0, message: 'Processing...', data: []};

  const sq = (typeof ID === "undefined" 
              ? `SELECT Matricula, Nome, Cargo, DDC, Observações, ST, [Funcões Realizadas], Time 
                  FROM [Funcionários] WHERE Desligado = false`
              : `SELECT Matricula, Nome, Cargo, DDC, Observações, ST, [Funcões Realizadas], Time 
                  FROM [Funcionários] WHERE Matricula = ${ID} AND Desligado = false`)
  // console.log(sq);
  await connection
    .query(sq)
    .then(iData => {
      res = {status: 200, message: 'Process concluded', data: iData }
    })
    .catch(error => {
      res = {status: 404, message: error.process.message, data: error}
    })

    // await console.log(JSON.stringify(res, null, 2));
    return res

}

//Turnos
async function getTurnoDescription(name) {  
  const sq = (typeof name === "undefined"
              ? `SELECT * FROM [Turno]` 
              : `SELECT * FROM [Turno] WHERE Turno = '${name}'`);
  let res = [{status: 0, message: 'Processing...'}];

  await connection
    .query(sq)
    .then(iData => {
      res = iData
    })
    .catch(error => {
      
      res = [{status: 404, message: error.process.message, data: error}]
    })
    console.log(JSON.stringify(res, null, 2));
    return res
}

async function insertTurno(Shift, Schedule ) {
  await connection
    .execute(`INSERT INTO [Turno] ( Turno, [Período do Turno]) VALUES ("${Shift}", "${Schedule}")`)
    .then(iData => {
      // res= (JSON.stringify(iData, null, 2));
      res.splice(0);
      res.push({status: 200, message: 'Process concluded', data: iData })
    })
    .catch(error => {
      // res = error;
      res.splice(0);
      res.push({status: 404, message: error.process.message, data: error})
    });

    await console.log(JSON.stringify(res, null, 2));
    return res
}
 
async function deleteTurno(Shift) {
  let res = [{status: 0, message: 'Processing...'}];
  await connection
    .execute(`DELETE * FROM [Turno] WHERE Turno like '${Shift}'`)
    .then(iData => {
      res.splice(0);
      res.push({status: 200, message: 'Process concluded', data: iData })
    })
    .catch(error => {
      res.splice(0);
      res.push({status: 404, message: error.process.message, data: error})
    })

    await console.log(JSON.stringify(res, null, 2));
    return res
}

async function getDepartment(ID) {
  const sq = (typeof ID === "undefined" 
            ? `SELECT Matricula, Nome, Cargo, DDC, Observações, ST, [Funcões Realizadas], Time 
                FROM [Funcionários] WHERE Desligado = false`
            : `SELECT Matricula, Nome, Cargo, DDC, Observações, ST, [Funcões Realizadas], Time 
                FROM [Funcionários] WHERE Matricula = ${ID} AND Desligado = false`)
}

//defeito
async function getFieldsTable() {
  await connection
    .schema(20)
    .then(schema => {
      console.log(JSON.stringify(schema, null, 2));
    })
    .catch(error => {
      console.error(error);
  });
  // console.log(connection.schema(20))
  // await connection
  //   .query("SHOW COLUMNS FROM Turno")
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
}