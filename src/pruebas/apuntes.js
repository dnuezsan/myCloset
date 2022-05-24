'use strict'

/* 
Metodo de pruebas POST
*/
function enviar() {
    const opciones = {
        method: 'POST',
        body: JSON.stringify({usuario : "gbfg", al:'kljlkj'})
    }
    fetch('prueba.php', opciones)
        
        //IMPORTANTE. Si el contenido de un "then", va entre llaves, se debe utilizar return para devolver la respuesta a la siguiente promesa

        //Se obtiene texto plano
        /*.then(respuesta => {return respuesta.text()})
        .then(datos => console.log(datos)) */

        /* 
        //Se obtiene un json
        .then(respuesta => {return respuesta.json()})
        .then(datos => console.log(datos.al)) */
}