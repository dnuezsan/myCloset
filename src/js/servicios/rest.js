'use strict'

/**
 *Clase que implementa el servicio REST
 *
 * @export
 * @class Rest
 */
/*  export class Rest {

    static get(direccion) {
        fetch(direccion)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw Error(`${respuesta.status} - ${respuesta.statusText}`)
                } else
                    return respuesta.text()
            })
    }

    static post(direccion, datos) {
        const opciones = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }

        fetch(direccion, opciones)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw Error(`${respuesta.status}-${respuesta.statusText}`)
                }
                else return respuesta.json()
            })
            .then(datos=> {return datos})
    }

    static enviar() {
        const opciones = {
            method: 'POST',
            body: JSON.stringify({ usuario: "gbfg", al: 'kljlkj' })
        }
        fetch('../src/pruebas/prueba.php', opciones) */
            /* .then(respuesta => respuesta.text())
            .then(datos => console.log(datos)) */
           /*  .then(respuesta => {return respuesta.json()})
            .then(datos => console.log(datos))
    }

    static saludo() {
        console.log('hola');
    }

}

Rest.enviar()
 */