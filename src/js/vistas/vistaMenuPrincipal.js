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
import { VistaOutfits } from "./vistaOutfits.js"
import { Controlador } from "../controlador/controlador.js"

/**
 *Clase que gestiona el panel del menu principal de la aplicación
 *
 * @export
 * @class VistaMenuPrincipal
 */
export class VistaMenuPrincipal {


    /**
     * @constructor
     *
     * @param {Object} controlador
     * @param {Node} base
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
        VistaMenuPrincipal.mostrarOutfits()
    }


    /**
     *Oculta los paneles
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static ocultarPaneles() {
        VistaOutfits.ocultarOutfits()
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
     *Cierra la sesion del usuario, redirige a la vista del login y settea la variable "vista" del localStore en "vistaLogin"
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
                Controlador.cerrarSesion()
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

    /**
     *Muestra el menú
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static mostrarMenu() {
        let menu = document.getElementById('divMenuPrincipal')
        menu.style.display = "flex"
    }

    /**
     *Muestra el panel "panelPerfilUsuario"
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
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
        let logo = document.getElementsByClassName('brand-logo')

        for (let i = 0; i < boton.length; i++) {
            boton[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarPaneles()
                VistaArmario.mostrarArmario()
            }
        }

        for (let i = 0; i < logo.length; i++) {
            logo[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarPaneles()
                VistaArmario.mostrarArmario()
            }
        }

    }

    /**
     *Muestra el panel de outfits
     *
     * @static
     * @memberof VistaMenuPrincipal
     */
    static mostrarOutfits() {
        let boton = document.querySelectorAll('.outfits')

        for (let i = 0; i < boton.length; i++) {
            boton[i].onclick = (evento) => {
                VistaMenuPrincipal.ocultarPaneles()
                VistaOutfits.mostrarOutfits()
            }
        }

    }

}