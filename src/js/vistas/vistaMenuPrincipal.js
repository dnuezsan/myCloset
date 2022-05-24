'use strict'

import { VistaLogin } from "./vistaLogin.js"
import { VistaPrincipal } from "./vistaPrincipal.js"
import { VistaRegistroUsuario } from "./vistaRegistroUsuario.js"
import { VistaPerfilUsuario } from "./vistaPerfilUsuario.js"
import { VistaArmario } from "./vistaArmario.js"
import { VistaMisPrendas } from "./vistaMisPrendas.js"
import { VistaCategorias } from "./vistaCategorias.js"
import { VistaPrendas } from "./vistaPrendas.js"
import { VistaSubirPrenda } from "./vistaSubirPrenda.js"
import { VistaGestionarPrendas } from "./vistaGestionarPrendas.js"

export class VistaMenuPrincipal {


    /**
     * @constructor
     *Crea una instancia de VistaMenuPrincipal y ejecuta el método iniciar()
     * @param {String} controlador
     * @param {String} base
     * @memberof VistaMenuPrincipal
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Método que inicia variables y genera eventos a ejecutarse
     *
     * @memberof VistaMenuPrincipal
     */
    iniciar() {
        VistaMenuPrincipal.cerrarSesion()
        VistaMenuPrincipal.mostrarArmario()
        VistaMenuPrincipal.mostrarPerfilUsuario()
    }


    /**
     *Oculta los paneles del interior de la web
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static ocultarPaneles() {
        VistaArmario.ocultarArmario()
        VistaPerfilUsuario.ocultarPerfilUsuario()
        VistaMisPrendas.ocultarMisprendas()
        VistaCategorias.ocultarVistaCategorias()
        VistaSubirPrenda.ocultarSubirPrenda()
        VistaPrendas.ocultarPrendas()
        VistaGestionarPrendas.ocultarGestionarPrendas()
        VistaLogin.esconderLogin()
        VistaRegistroUsuario.esconderRegistro()
    }

    /**
     *Cierra la sesion del usuario y redirige a la vista del login
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static cerrarSesion() {
        let boton = document.querySelectorAll(".cerrarSesion")

        for (let i = 0; i < boton.length; i++) {
            boton[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarMenu()
                VistaMenuPrincipal.ocultarPaneles()
                VistaMenuPrincipal.mostrarLogin()
                sessionStorage.setItem('sesion', '')
                localStorage.setItem('vista', 'vistaLogin')
            }

        }
    }


    /**
     *Muestra el panel de login
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static mostrarLogin() {
        let panelLogin = document.getElementById("panelLogin")
        panelLogin.style.display = 'flex'
    }


    /**
     *Oculta el menú
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static ocultarMenu() {
        let menu = document.getElementById('divMenuPrincipal')
        menu.style.display = "none"
    }

    static mostrarMenu() {
        let menu = document.getElementById('divMenuPrincipal')
        menu.style.display = "flex"
    }

    static mostrarPerfilUsuario() {
        let boton = document.querySelectorAll('.perfilUsuario')

        for (let i = 0; i < boton.length; i++) {
            boton[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarPaneles()
                VistaPerfilUsuario.mostrarPerfilUsuario()
            }
        }
    }

    /**
     *Muestra el panel del armario
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static mostrarArmario() {
        let boton = document.querySelectorAll('.miArmario')

        for (let i = 0; i < boton.length; i++) {
            boton[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarPaneles()
                VistaArmario.mostrarArmario()
            }
        }

    }

}