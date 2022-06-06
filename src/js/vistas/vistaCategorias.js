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
        VistaCategorias.cargarCategoriasYSubcategorias()
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

    static limpiarFormulario() {
        let inputsTexto = document.querySelectorAll('#panelCategorias input')
        let selectores = document.querySelectorAll('#panelCategorias select')

        inputsTexto.forEach(input => {
            input.value = ''
        });

        selectores.forEach(selector => {
            selector.value = ''
        });
    }


    static async generarCategorias() {

        let selectCategorias = document.getElementById('categoriaCrearCategoria')
        /* Se cargan las categorias */
        let categorias = await Controlador.cargarCategoriasPrendas()

        /* Se generan las categorias en su select */
        for (let i = 0; i < categorias.length; i++) {
            VistaCategorias.cargaCategorias(categorias[i], i, selectCategorias)
        }
        $('#categoriaCrearCategoria').formSelect()
    }


    static async cargarCategoriasYSubcategorias() {
        let selectModificarCategorias = document.getElementById('modificarCategoria')
        let selectBorrarCategorias = document.getElementById('borrarCategoria')

        let selectModificarSubcategorias = document.getElementById('modificarSubcategoria')
        let selectBorrarSubcategorias = document.getElementById("borrarSubcategoria")
        /* Se cargan las categorias */
        let categorias = await Controlador.cargarCategoriasPrendas()

        /* Se generan las categorias en su select */
        for (let i = 0; i < categorias.length; i++) {
            VistaCategorias.cargaCategorias(categorias[i], i, selectModificarCategorias)
            VistaCategorias.cargaCategorias(categorias[i], i, selectBorrarCategorias)
        }
        /* Se generan las subcategorias correspondientes a la categoría elegida cada vez que esta cambia */
        VistaCategorias.generarSubCategorias(selectModificarCategorias, selectModificarSubcategorias, "modificarSubcategoria")
        VistaCategorias.generarSubCategorias(selectBorrarCategorias, selectBorrarSubcategorias, "borrarSubcategoria")

        $('#modificarCategoria').formSelect()
        $('#borrarCategoria').formSelect()
    }


    static generarSubCategorias(nodoSelectCategoria, nodoSelectSubCategoria, nombreNodo) {
        nodoSelectCategoria.addEventListener('change', async () => {

            let subcategorias = await Controlador.cargarSubcategoriasPrendas(nodoSelectCategoria.value)

            let opciones = document.querySelectorAll(`#${nombreNodo} option`)
            /* Se borran las subcategorias anteriores */
            if (opciones.length > 1) {
                let listaSubcategorias = document.getElementsByClassName('subcategoriaVistaCategorias')
                while (listaSubcategorias.length > 0) {
                    nodoSelectSubCategoria.removeChild(listaSubcategorias[0])
                }
            }
            /* Se cargan las nuevas subcategorias */
            for (let i = 0; i < subcategorias.length; i++) {
                VistaCategorias.cargaSubCategorias(subcategorias[i], nodoSelectSubCategoria)
            }
            $(`#${nombreNodo}`).formSelect()
        })
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
        subCategoria.classList.add('subcategoriaVistaCategorias')

        subCategoria.value = datos.idSubcategoria
        subCategoria.textContent = datos.nombreSubcategoria
        nodoPadre.appendChild(subCategoria)
    }

}