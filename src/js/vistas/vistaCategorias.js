'use strict'

import { Controlador } from "../controlador/controlador.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"

export class VistaCategorias {


    /**
     * Crea una instancia de vistaCategorias.
     * @param {Object} controlador
     * @param {Node} base
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


    /**
     *Iguala todos los campos del panel a 0
     *
     * @static
     * @memberof VistaCategorias
     */
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


    /**
     *Carga las categorías y categorías en los selects correspondientes
     *
     * @static
     * @memberof VistaCategorias
     */
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


    /**
     *Genera las subcaterías de las categorías seleccionadas en los select correspondientes
     *
     * @static
     * @param {Node} nodoSelectCategoria
     * @param {Node} nodoSelectSubCategoria
     * @param {Node} nombreNodo
     * @memberof VistaCategorias
     */
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

    /**
     *Genera opciones para los select de categorías, configura su valor y texto y las ajunta al select que se le pasa como parámetro
     *
     * @static
     * @param {JSON} datos
     * @param {Node} nodoPadre
     * @memberof VistaCategorias
     */
    static cargaCategorias(datos, nodoPadre) {
        let categoria = document.createElement('option')

        categoria.value = datos.idCategoria
        categoria.textContent = datos.nombreCategoria

        nodoPadre.appendChild(categoria)
    }

    /**
     *Genera opciones para los select de subcategorías, configura su valor y texto y las ajunta al select que se le pasa como parámetro
     *
     * @static
     * @param {JSON} datos
     * @param {Node} nodoPadre
     * @memberof VistaCategorias
     */
    static cargaSubCategorias(datos, nodoPadre) {

        let subCategoria = document.createElement('option')
        //Conjunto de subcategorias con clases
        subCategoria.classList.add('subcategoriaVistaCategorias')

        subCategoria.value = datos.idSubcategoria
        subCategoria.textContent = datos.nombreSubcategoria
        nodoPadre.appendChild(subCategoria)
    }

    /**
     *Habilita la llamada de los métodos cuando se modifica alguno de los select
     *
     * @static
     * @memberof VistaCategorias
     */
    static detectarCambios() {
        //Insertar
        let boton = document.getElementById('envioDatosCategoria')

        //Insercion
        boton.addEventListener('click', () => {
            VistaCategorias.insertarSubcategoria()

            //Modificación
            VistaCategorias.modificarSubcategoria()

            //borrado

            VistaCategorias.borrarSubcategoria()


        }, true)

    }


    /**
     *Manda al controlador los valores necesarios para insertar en la BD una subcategoría
     *
     * @static
     * @memberof VistaCategorias
     */
    static async insertarSubcategoria() {
        let nombreSubcategoria = document.getElementById('nombreCategoria')
        let categoria = document.getElementById('categoriaCrearCategoria')
        let panel = document.getElementById('panelCategorias')

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


    /**
     *Manda al controlador los valores necesarios para modificar una subcategoría
     *
     * @static
     * @memberof VistaCategorias
     */
    static async modificarSubcategoria() {
        let categoriaInicial = document.getElementById('modificarCategoria')
        let nombreSubcategoria = document.getElementById('nuevoNombreCategoria')
        let idSubcategoria = document.getElementById('modificarSubcategoria')
        let idNuevacategoria = document.getElementById('modificarCategoriaNuevaCategoria')
        let panel = document.getElementById('panelCategorias')
        let boton = document.getElementById('envioDatosCategoria')

            if (nombreSubcategoria.value != '' && idNuevacategoria.value != '') {
                let respuesta = await Controlador.modificarSubcategoria(nombreSubcategoria.value, idSubcategoria.value, idNuevacategoria.value)

                if (!respuesta.success) {
                    VistaCategorias.mostrarMensajeModificacion("No se ha podido modificar la categoría")
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else {
                    location.reload()
                }
            } else if (nombreSubcategoria.value != '' && idNuevacategoria.value == '') {
                let respuesta = await Controlador.modificarSubcategoria(nombreSubcategoria.value, idSubcategoria.value, categoriaInicial.value)

                if (!respuesta.success) {
                    VistaCategorias.mostrarMensajeModificacion("No se ha podido modificar la categoría")
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else {
                    location.reload()
                }
            }
            else if (nombreSubcategoria.value == '' && idNuevacategoria.value != '') {
                let respuesta = await Controlador.modificarCambioSubcategoria(idSubcategoria.value, idNuevacategoria.value)

                if (!respuesta.success) {
                    VistaCategorias.mostrarMensajeModificacion("No se ha podido modificar la categoría")
                    VistaCategorias.mostrarCuadroDialogo()
                    panel.onclick = () => {
                        VistaCategorias.ocultarCuadroDialogo()
                    }
                } else {
                    location.reload()
                }
        }

    }


    /**
     *Manda al controlador los valores necesarios para borrar una subcategoría de la BD
     *
     * @static
     * @memberof VistaCategorias
     */
    static async borrarSubcategoria() {
        let selectCategoria = document.getElementById('borrarCategoria')
        let selectSubcategoria = document.getElementById('borrarSubcategoria')
        let panel = document.getElementById('panelCategorias')
        let boton = document.getElementById('envioDatosCategoria')
        
            if (selectSubcategoria.value != '') {
                VistaCategorias.mostrarMensajeConfirmacion(selectSubcategoria.value)
            }

    }


    /**
     *Muestra el cuadro de los mensajes
     *
     * @static
     * @memberof VistaCategorias
     */
    static mostrarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoCategorias')
        cuadroDialogo.style.display = 'block'

    }


    /**
     *Oculta el cuadro de los mensajes, susu elementos y vacía su contenido
     *
     * @static
     * @memberof VistaCategorias
     */
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


    /**
     *Muestra un mensaje pasado como parámetro en la inserción de una subcategoría
     *
     * @static
     * @param {String} mensajeRespuesta
     * @memberof VistaCategorias
     */
    static mostrarMensajeInserción(mensajeRespuesta) {
        let mensaje = document.getElementById("mensajeInsertarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    /**
     *Muestra un mensaje pasado como parámetro en la modificación de una subcategoría
     *
     * @static
     * @param {String} mensajeRespuesta
     * @memberof VistaCategorias
     */
    static mostrarMensajeModificacion(mensajeRespuesta) {
        let mensaje = document.getElementById("mensajeModificarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    /**
     *Muestra un mensaje pasado como parámetro para borrar una subcategoría
     *
     * @static
     * @param {String} mensajeRespuesta
     * @memberof VistaCategorias
     */
    static mostrarMensajeBorrado(mensajeRespuesta) {
        let mensaje = document.getElementById("mensajeBorrarSubcategoria")
        mensaje.textContent = mensajeRespuesta
        mensaje.style.display = 'block'
    }

    /**
     *Muestra el cuadro con el mensaje de confirmacion del borrado y gestiona los eventos para su cancelación o confirmación
     *
     * @static
     * @param {int} idSubcategoria
     * @memberof VistaCategorias
     */
    static mostrarMensajeConfirmacion(idSubcategoria) {
        VistaCategorias.mostrarCuadroDialogo()
        let conjunto = document.getElementById('conjuntoBorradoSubcategoria')
        conjunto.style.display = 'block'

        let botonConfirmarBorrado = document.getElementById('botonBorrarSubcategoria')
        let botonCancelarBorrado = document.getElementById('botonCancelarBorrarSubcategoria')

        botonConfirmarBorrado.onclick = async () => {

            let respuesta = await Controlador.borrarSubcategoria(idSubcategoria)

            if (!respuesta.success) {
                VistaCategorias.mostrarMensajeBorrado(respuesta.mensaje)
                VistaCategorias.mostrarCuadroDialogo()
                panel.onclick = () => {
                    VistaCategorias.ocultarCuadroDialogo()
                }
            } else {
                location.reload()
            }
        }

        botonCancelarBorrado.onclick = () => {
            VistaCategorias.ocultarCuadroDialogo()
        }

    }

}