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
        VistaCategorias.generarCategorias()
        VistaCategorias.generarSubcategorias()
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


    static async generarCategorias(){
        
        let selectCategorias = document.getElementById('categoriaCrearCategoria')
        /* Se cargan las categorias */
        let categorias = await Controlador.cargarCategoriasPrendas()

        /* Se generan las categorias en su select */
        for (let i = 0; i < categorias.length; i++) {
            VistaCategorias.cargaCategorias(categorias[i], i, selectCategorias)
        }
        $('#categoriaCrearCategoria').formSelect()
    }

    static async generarSubcategorias(){
        let selectModificarSubcategoria = document.getElementById('modificarSubcategoria')
        let selectBorrarSubcategoria = document.getElementById('borrarSubcategoria')

        let datos = await Controlador.cargarSubcategoriasPrendas()

        for (let i = 0; i < datos.length; i++) {
            VistaCategorias.cargaSubCategorias(datos, i, selectModificarSubcategoria)
            VistaCategorias.cargaSubCategorias(datos, i, selectBorrarSubcategoria)
        }

        $('#modificarSubcategoria').formSelect()
        $('#borrarSubcategoria').formSelect()
    }


    static cargaCategorias(datos, iterador, nodoPadre) {
        let categoria = document.createElement('option')
        let valor = iterador + 1

        categoria.value = valor
        categoria.textContent = datos[valor]

        nodoPadre.appendChild(categoria)
    }

    static cargaSubCategorias(datos, nodoPadre) {

        let subCategoria = document.createElement('option')
        //Conjunto de subcategorias con clases
        subCategoria.classList.add('subcategoria')

        subCategoria.value = datos.idSubcategoria
        subCategoria.textContent = datos.nombreSubcategoria

        nodoPadre.appendChild(subCategoria)
    }

}