'use strict'

import { Controlador } from "../controlador/controlador.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"

export class VistaCategorias {


    /**
     * Crea una instancia de vistaCategorias.
     * @param {string} controlador
     * @param {string} base
     * @memberof VistaCategorias
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {

    }


    /**
     *Muestra panelCategorias y asigna a la variable de localStorage vista el valor vistaCategorias
     *
     * @static
     * @memberof VistaCategorias
     */
    static mostrarCategorias() {
        let panel = document.getElementById('panelCategorias')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaCategorias')
    }

    /**
     *Oculta la vista panelCategorias
     *
     * @static
     * @memberof VistaCategorias
     */
    static ocultarVistaCategorias() {
        let panel = document.getElementById('panelCategorias')
        panel.style.display = 'none'
        VistaCategorias.limpiarFormulario()
    }

    /* static enviarFormulario(){
        let boton = document.querySelector('#panelCategoria button')
        boton.onclick = (evento)=>{
            Controlador.
        }
    } */

    static limpiarFormulario(){
        let inputsTexto = document.querySelectorAll('#panelCategorias input')
        let selectores = document.querySelectorAll('#panelCategorias select')

        inputsTexto.forEach(input => {
            input.value = ''
        });

        selectores.forEach(selector => {
            selector.value = ''
        });
    }

}