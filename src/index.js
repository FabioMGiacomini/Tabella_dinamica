/**
* Author: Fabio Giacomini
* Description: Tabella dinamica con dati presi da file json
* email: info@viarete.it
*
* Credits: Thanks to Marko Manojlovic (https://manoylo.ca/) for building the tool (https://random-data-api.com) 
* Tags: json, fetch, table
*/ 

let indirizzo = new URL('https://random-data-api.com/api/v2/users')
indirizzo.searchParams.set('size', 40)
indirizzo.searchParams.set('response_type', 'json')
 
const numeroRecord = indirizzo.searchParams.get('size')

// recupero i dati da un indirizzo remoto 
async function getUser(url){
    const response = await fetch(url)
    const resolve = await response.json()
    createTableArray(resolve) 
}
getUser(indirizzo)

const tabella = document.getElementById('rebeltable')
const tbody = tabella.getElementsByTagName('tbody')[0]
const thead = tabella.getElementsByTagName('thead')[0].childNodes[1]
const numeroColonne = thead.children.length
const selectRighe = document.getElementById('righeTabella')
const singleCell = tbody.getElementsByTagName("td")  
let tabellaDati = []  
let valoreDellaSelect = selectRighe.value // inizialmente è 10 grazie all'attributo selected della select
 
function createTableArray(data) {  
    for(let i=0; i<data.length; i++) { 
       tabellaDati.push([
        data[i].first_name, 
        data[i].last_name, 
        data[i].date_of_birth, 
        data[i].email, 
        data[i].employment.title,
        data[i].username, 
        data[i].password])
    }  
    creaTabella(valoreDellaSelect) 
    creaPaginazione(numeroRecord / valoreDellaSelect, 10) 
}

function creaTabella(numeroRigheTabella){
    tbody.innerHTML = ' '

    for(let i=0; i<numeroRigheTabella; i++){
        var tr = document.createElement('tr')

        for (let k=0; k<numeroColonne; k++) {
            var td = document.createElement('td')
            td.innerText = tabellaDati[i][k]
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }   
} 
 
const paginazione = document.getElementById('paginazione')

function creaPaginazione(pagg,numeroRighe){  
    paginazione.innerHTML = ''  

    for (let i = 0; i < pagg; i++){
        let pagina = document.createElement('a') 
        pagina.innerText = i + 1
        pagina.setAttribute('data', numeroRighe) // il valore di data è uguale a quello della select 
        pagina.style.cursor = 'pointer' 
        pagina.addEventListener("click", ascolta)    
        paginazione.appendChild(pagina)
    }  
} 
 
selectRighe.addEventListener('change', function () {
    let numeroRighe = selectRighe.value  
    let risultatoParziale = numeroRecord / numeroRighe 
    let risultato = Math.round(risultatoParziale)  

    creaPaginazione(risultato, numeroRighe)  
    creaTabella(numeroRighe) 
})   

/**
 * cliccando sulle àncore della paginazione la funzione legge
 * il numero di pagina e l'attributo data e li passa alla funzione
 * che cambia la pagina  
 */
function ascolta(e) { 
    const numeroPagina = e.target.innerText  
    const suddivisionePagine = e.target.getAttribute("data")  
    cambiaPagina(numeroPagina, suddivisionePagine)  
}
 
function cambiaPagina (numeroPagina, suddivisione) {
    let i = (numeroPagina - 1) * 10
    let righe = (10+i)
    if (i === 0 && suddivisione === '20') { 
        i = 0
        righe = 20
    } else if (i === 10 && suddivisione === '20') { 
        i = 20
        righe = 40
    }

    cambiaPaginaSelect(i, righe)
}

function cambiaPaginaSelect(i, righe){
    tbody.innerHTML = '' 
    for(i; i<righe; i++){
        var tr = document.createElement('tr')
        for (let k=0; k<numeroColonne; k++) { 
            var td = document.createElement('td')
            if (tabellaDati[i][k]) {     
                 td.innerText = tabellaDati[i][k]
                 tr.appendChild(td) 
            }
        }
        tbody.appendChild(tr)
    }   
    return
}
