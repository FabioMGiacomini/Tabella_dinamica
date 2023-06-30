/**
* Author: Fabio Giacomini
* Description: Tabella dinamica con dati presi da file json
* email: info@viarete.it
*
* Credits: Thanks to Marko Manojlovic (https://manoylo.ca/) for building the tool (https://random-data-api.com) 
* Tags: json, fetch, table
*/
const tabella = document.getElementById('rebeltable')
const tbody = tabella.getElementsByTagName('tbody')[0]
const tdhead = tabella.getElementsByTagName('thead')[0].children[0].children
const selectRighe = document.getElementById('righeTabella')
let tabellaDati = []
let tabellaGriglia = []
 
let indirizzo = new URL('https://random-data-api.com/api/v2/users')
indirizzo.searchParams.set('size', 20)
indirizzo.searchParams.set('response_type', 'json')
 
async function getUser(url){
    const response = await fetch(url)
    const resolve = await response.json()
    createTable(resolve)
}
getUser(indirizzo)

function createTable(data) { 
    /**
     * creo una tabella vuota, e la riempio con gli oggetti presenti
     * nel file json che arriva dalla sorgente, estraggo quindi fra i tanti dati presenti
     * nome, cognome, data di nascita, email, qualifica, username, password
     */
    for(let i=0; i<data.length; i++) { 
       tabellaDati.push([[
        data[i].first_name, 
        data[i].last_name, 
        data[i].date_of_birth, 
        data[i].email, 
        data[i].employment.title,
        data[i].username, 
        data[i].password]])
    } 
    // visualizzo nella tabella come default le prime 10 righe
    for (let index = 0; index < 10; index++) {  
        const riga = document.createElement('tr')
        for(let k = 0; k <tdhead.length; k++) {  
            const cella = document.createElement('td')  
            riga.appendChild(cella)
        }
        tbody.appendChild(riga)
    }
    /**
     * inserisco i dati nella tabella vuota appena creata, usando i cicli for 
     * che iterano per multipli di 7 (numero di colonne presenti nella tabella);
     * se non faccio prima un controllo sull'esistenza della cella con 
     * la if() mi esce un errore in console anche se lo scipt funziona lo stesso 
     * 
     * inizializzo numeroRighe = 10 per popolare di default 
     * le prime 70 celle (righe per colonne) 
     */
    const singleCell = tbody.getElementsByTagName("td")
       
    let numeroRighe = 10
    for (let index = 0; index < numeroRighe; index++) { 
        if(singleCell[7*index]) { 
        singleCell[7*index].innerText = tabellaDati[index][0][0] 
        } 
    for (let z = 1; z < 7; z++) {  
        if(singleCell[(7*index)+z]) {  
            singleCell[(7*index)+z].innerText = tabellaDati[index][0][z] 
                } 
        }
    }
    /**
     * se con la select cambio numero, prima cancello le righe e poi le ricreo
     * in accordo col numero della select, poi svuoto le celle e le ripopolo 
     * con i dati richiesti
     */
    selectRighe.addEventListener('change', function () {
        let numeroRighe = selectRighe.value

        // rimuovo tutte le righe 
        while(tbody.hasChildNodes()){
            tbody.removeChild(tbody.firstChild)
        } 
        // ricreo le righe col valore scelto uguale a numeroRighe
        for (let index = 0; index < numeroRighe; index++) {  
            const riga = document.createElement('tr')
            for(let k = 0; k <tdhead.length; k++) {  
                const cella = document.createElement('td')  
                riga.appendChild(cella)
            }
            tbody.appendChild(riga)
        }

        /**
         * svuoto le celle ad ogni cambiamento della select
         * altrimenti rimangono tutti i dati 
         */
        for (const element of singleCell) {
            element.innerText = " "
        }
        // riempio le celle con le nuove richieste
        for (let index = 0; index < numeroRighe; index++) { 
            if(singleCell[7*index]) { 
            singleCell[7*index].innerText = tabellaDati[index][0][0] 
            } 
        for (let z = 1; z < 7; z++) {  
            if(singleCell[(7*index)+z]) {  
                singleCell[(7*index)+z].innerText = tabellaDati[index][0][z] 
                    } 
            }
        }
      
    })

    

}

 

 
