/**
 * Author: Fabio Giacomini
 * Description: Tabella dinamica con dati presi da file json
 * email: info@viarete.it
 *
 * Credits: Thanks to Marko Manojlovic (https://manoylo.ca/) for building the tool (https://random-data-api.com)
 * Tags: json, fetch, table
 */
import "./styles.css";

const tabella = document.getElementById("rebeltable");
const tbody = tabella.getElementsByTagName("tbody")[0];
const tdhead = tabella.getElementsByTagName("thead")[0].childNodes[1].children; // i <td> della head

async function getUser(url) {
  const response = await fetch(url);
  const resolve = await response.json();
  createTable(resolve);
}
getUser("https://random-data-api.com/api/v2/users?size=10&response_type=json");

function createTable(data) {
  let tabellaDati = [];
  let tabellaGriglia = [];
  const asseX = tdhead.length;
  const asseY = data.length;

  for (let i = 0; i < data.length; i++) {
    // data.length numero di record ricevuti, in questo caso 10
    let nome = data[i].first_name;
    let cognome = data[i].last_name;
    let dataNascita = data[i].date_of_birth;
    let email = data[i].email;
    let qualifica = data[i].employment.title;
    let userName = data[i].username;
    let password = data[i].password;

    tabellaDati.push([
      [nome, cognome, dataNascita, email, qualifica, userName, password]
    ]);

    const riga = document.createElement("tr");

    tabellaGriglia.push(riga); // inserisco tante righe vuote quanti i record in "data"

    for (let k = 0; k < tdhead.length; k++) {
      const cella = document.createElement("td"); // creo tanti td quante sono righe per colonne
      riga.appendChild(cella);
    }
    tbody.appendChild(riga);
  }

  const singleCell = tbody.getElementsByTagName("td");

  for (let index = 0; index < asseY; index++) {
    if (singleCell[7 * index]) {
      singleCell[7 * index].innerText = tabellaDati[index][0][0];
    }

    for (let z = 1; z < asseY; z++) {
      if (singleCell[7 * index + z]) {
        singleCell[7 * index + z].innerText = tabellaDati[index][0][z];
      }
    }
  }
}
