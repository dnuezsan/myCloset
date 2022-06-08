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
        VistaCategorias.cargarCategoriasYSubcategorias()
        VistaCategorias.detectarCambios()
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


    static async cargarCategoriasYSubcategorias() {
        let insertarCategoria = document.getElementById('categoriaCrearCategoria')
        let selectModificarCategorias = document.getElementById('modificarCategoria')
        let selectBorrarCategorias = document.getElementById('borrarCategoria')
        let nuevaCategoria = document.getElementById('modificarCategoriaNuevaCategoria')

        let selectModificarSubcategorias = document.getElementById('modificarSubcategoria')
        let selectBorrarSubcategorias = document.getElementById("borrarSubcategoria")
        /* Se cargan las categorias */
        let categorias = await Controlador.cargarCategoriasPrendas()

        /* Se generan las categorias en su select */
        for (let i = 0; i < categorias.length; i++) {
            VistaCategorias.cargaCategorias(categorias[i], selectModificarCategorias)
            VistaCategorias.cargaCategorias(categorias[i], selectBorrarCategorias)
            VistaCategorias.cargaCategorias(categorias[i], nuevaCategoria)
            VistaCategorias.cargaCategorias(categorias[i], insertarCategoria)

        }
        /* Se generan las subcategorias correspondientes a la categoría elegida cada vez que esta cambia */
        VistaCategorias.generarSubCategorias(selectModificarCategorias, selectModificarSubcategorias, "modificarSubcategoria")
        VistaCategorias.generarSubCategorias(selectBorrarCategorias, selectBorrarSubcategorias, "borrarSubcategoria")

        $('#modificarCategoria').formSelect()
        $('#borrarCategoria').formSelect()
        $('#modificarCategoriaNuevaCategoria').formSelect()
        $('#categoriaCrearCategoria').formSelect()
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

    static cargaCategorias(datos, nodoPadre) {
        let categoria = document.createElement('option')

        categoria.value = datos.idCategoria
        categoria.textContent = datos.nombreCategoria

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

    static detectarCambios() {
        //Insertar
        let nombreSubcategoria = document.getElementById('nombreCategoria')
        let categoria = document.getElementById('categoriaCrearCategoria')
        //Modificar
        let categoriaInicial = document.getElementById('modificarCategoria')
        let nombreSubcategoriaModificable = document.getElementById('nuevoNombreCategoria')
        let idSubcategoria = document.getElementById('modificarSubcategoria')
        let idNuevacategoria = document.getElementById('modificarCategoriaNuevaCategoria')
        //Borrado

        //Insercion
        nombreSubcategoria.onchange = () => {
            VistaCategorias.insertarSubcategoria()
        }
        categoria.onchange = () => {
            VistaCategorias.insertarSubcategoria()
        }

        //Modificación
        categoriaInicial.onchange = ()=>{
            VistaCategorias.modificarSubcategoria()
        }
        nombreSubcategoriaModificable.onchange = ()=>{
            VistaCategorias.modificarSubcategoria()
        }
        idSubcategoria.onchange = ()=>{
            VistaCategorias.modificarSubcategoria()
        }
        idNuevacategoria.onchange = ()=>{
            VistaCategorias.modificarSubcategoria()
        }

    }

    static modificarCategoria(){
        let nuevoNombreCategoria = document.getElementById('nuevoNombreCategoria')
        let categoria = document.getElementById('modificarCategoria')
        let subcategoria = document.getElementById('modificarSubcategoria')
        let panel = document.getElementById('panelCategorias')
        let boton = document.getElementById('envioDatosCategoria')



    }

    static insertarSubcategoria() {
        let nombreSubcategoria = document.getElementById('nombreCategoria')
        let categoria = document.getElementById('categoriaCrearCategoria')
        let panel = document.getElementById('panelCategorias')
        let boton = document.getElementById('envioDatosCategoria')

        boton.onclick = async () => {

            if (nombreSubcategoria.value != '' && categoria.value != '') {
                let respuesta = await Controlador.insertarSubcategoria(nombreSubcategoria.value, categoria.value)
    
                if (!respuesta.success) {
                    VistaCategorias.mostrarMensajeInserción(respuesta.mensaje)
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else {
                    location.reload()
                }
            }
        }
    }

    static async modificarSubcategoria() {
        let categoriaInicial = document.getElementById('modificarCategoria')
        let nombreSubcategoria = document.getElementById('nuevoNombreCategoria')
        let idSubcategoria = document.getElementById('modificarSubcategoria')
        let idNuevacategoria = document.getElementById('modificarCategoriaNuevaCategoria')
        let panel = document.getElementById('panelCategorias')
        let boton = document.getElementById('envioDatosCategoria')

        boton.onclick = async ()=>{
            if (nombreSubcategoria.value != '' && idNuevacategoria.value != '') {
                let respuesta = await Controlador.modificarSubcategoria(nombreSubcategoria.value, idSubcategoria.value, idNuevacategoria.value)

                if (!respuesta) {
                    VistaCategorias.mostrarMensajeModificacion("No se ha podido modificar la categoría")
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else{
                    location.reload()
                }
            } else if (nombreSubcategoria.value != '' && idNuevacategoria.value == '') {
                let respuesta = await Controlador.modificarSubcategoria(nombreSubcategoria.value, idSubcategoria.value, categoriaInicial.value)

                if (!respuesta) {
                    VistaCategorias.mostrarMensajeModificacion("No se ha podido modificar la categoría")
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else{
                    location.reload()
                }
            }
            else if (nombreSubcategoria.value == '' && idNuevacategoria.value != '') {
                
            }
            
        }
        
    }

    static async borrarSubcategoria() {

    }

    static mostrarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoCategorias')
        cuadroDialogo.style.display = 'block'

    }

    static ocultarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoCategorias')
        let fragmentoBorrado = document.getElementById('conjuntoBorradoSubcategoria')
        let mensajeInsertado = document.getElementById("mensajeInsertarSubcategoria")
        let mensajeModificacion = document.getElementById("mensajeModificarSubcategoria")
        let mensajeBorrado = document.getElementById("mensajeBorrarSubcategoria")

        cuadroDialogo.style.display = 'none'
        mensajeInsertado.style.display = 'none'
        mensajeModificacion.style.display = 'none'
        mensajeBorrado.style.display = 'none'
        fragmentoBorrado.style.display = 'none'
        mensajeInsertado.textContent = ''
        mensajeModificacion.textContent = ''
        mensajeBorrado.textContent = ''
    }

    static mostrarMensajeInserción(mensajeRespuesta) {
        let mensaje = document.getElementById("mensajeInsertarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    static mostrarMensajeModificacion(mensajeRespuesta) {
        let mensaje = document.getElementById("mensajeModificarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    static mostrarMensajeBorrado(mensajeRespuesta) {
        let mensaje = document.getElementById("BorrarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    static mostrarMensajeConfirmacion(idSubcategoria) {
        let conjunto = document.getElementById('conjuntoBorradoSubcategoria')
        conjunto.style.display = 'block'

        let botonConfirmarBorrado = document.getElementById('botonBorrarSubcategoria')
        let botonCancelarBorrado = document.getElementById('botonCancelarBorrarSubcategoria')

        botonConfirmarBorrado.onclick = () => {
            VistaCategorias.borrarSubcategoria(idSubcategoria)
        }

        botonCancelarBorrado.onclick = () => {
            VistaCategorias.ocultarCuadroDialogo()
        }

    }

    static borrarSubcategoria() {

    }

}