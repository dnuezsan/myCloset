'use strict'

import { Controlador } from "../controlador/controlador.js"
import { Usuarios } from "../modelo/usuarios.js"
import { VistaArmario } from "./vistaArmario.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"

/**
 *Clase que gestiona el panel del login de la aplicación
 *
 * @export
 * @class VistaLogin
 */
export class VistaLogin {


    /**
     * @constructor
     *
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaLogin
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Método que inicia variables y genera eventos a ejecutarse
     *
     * @memberof VistaLogin
     */
    iniciar() {

        VistaLogin.mostrarRegistro()
        VistaLogin.loginIntro();

        let botonLogin = document.querySelector("#panelLogin button")
        botonLogin.addEventListener('click', VistaLogin.loginUsuario)
    }


    /**
     * Oculta el login y muesrta el registro
     * 
     * @memberof VistaLogin
     */
    static mostrarRegistro() {
        let registro = document.querySelector('#panelLogin .section span')
        registro.addEventListener('click', (evento) => {
            let panelRegistro = document.getElementById('panelRegistro')
            panelRegistro.style.display = 'flex'
            VistaLogin.esconderLogin()
            localStorage.setItem('vista', 'vistaRegistro')
        })

    }


    /**
     *Oculta el login
     *
     * @static
     * @memberof VistaLogin
     */
    static esconderLogin() {
        let panelLogin = document.getElementById('panelLogin')
        panelLogin.style.display = 'none'
        VistaLogin.limpiarInputs()
        VistaLogin.limpiarAviso()
    }


    /**
     *Muestra el login
     *
     * @static
     * @memberof VistaLogin
     */
    static mostrarLogin() {
        let panelLogin = document.getElementById('panelLogin')
        panelLogin.style.display = 'flex'
        localStorage.setItem('vista', 'vistaLogin')

    }

    /**
     *Ejecuta el login llamando a un metodo del controlador, y devuelve un mensaje si hubo algun error o carga el inicio
     *
     * @static
     * @memberof VistaLogin
     */
    static async loginUsuario() {
        let u = document.getElementById("correo").value
        let p = document.getElementById("clave").value
        let mensaje = document.querySelectorAll('#panelLogin .mensajeLabel')[0]
        let usuario = await Controlador.loginUsuario(u, p)

        if (usuario.success == true) {
            VistaLogin.esconderLogin()
            VistaMenuPrincipal.mostrarMenu()
            VistaArmario.mostrarArmario()
            sessionStorage.setItem('sesion', u)
            //localStorage.setItem('us_id', response.us_id);
            location.reload()
        } else if (usuario.success == false && u != '' && p != '') {
            mensaje.innerHTML = usuario.mensaje
        } else if (usuario.success == false) {
            VistaLogin.lanzarAviso(usuario)
        }
    }

    /**
     *Ejecuta el login de ususario al pulsar la tecla intro en un campo del formulario
     *
     * @static
     * @memberof VistaLogin
     */
    static loginIntro() {

        let inputCorreo = document.getElementById("correo")
        let inputClave = document.getElementById("clave")

        inputCorreo.onkeydown = (event) => {
            if (event.key === "Enter") {

                VistaLogin.loginUsuario()
            }
        }

        inputClave.onkeydown = (event) => {
            if (event.key === "Enter") {

                VistaLogin.loginUsuario()
            }
        }
    }


    /**
     *Genera una serie de mensajes dependiendo del argumento recibido
     *
     * @static
     * @param {JSON} usuario
     * @memberof VistaLogin
     */
    static lanzarAviso(usuario) {
        let mensaje = document.querySelectorAll('#panelLogin .mensajeLabel')[0]

        if (usuario.localizacion == 'correo') {
            mensaje.innerHTML = usuario.mensaje
        } else if (usuario.localizacion == 'clave') {
            mensaje.innerHTML = usuario.mensaje
        } else if (usuario.localizacion == 'todos') {
            mensaje.innerHTML = usuario.mensaje
        }

    }

    /**
     *Vacía en mensaje
     *
     * @static
     * @memberof VistaLogin
     */
    static limpiarAviso(){
        let mensaje = document.querySelectorAll('#panelLogin .mensajeLabel')[0]
        mensaje.innerHTML = ''
    }

    
    /**
     *Deja en blanco el valor de los inputs
     *
     * @static
     * @memberof VistaLogin
     */
    static limpiarInputs(){
        let inputs = document.querySelectorAll('#panelLogin input')

        inputs.forEach(input => {
            input.value = ''

        })  
    }

}