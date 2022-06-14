'use strict'

import { Controlador } from "../controlador/controlador.js"
import { VistaGestionarPrendas } from "./vistaGestionarPrendas.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"


/**
 *Clase que gestiona el panel del listado de prendas de la aplicación
 *
 * @export
 * @class VistaMisPrendas
 */
export class VistaMisPrendas {

    /**
     * 
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaMisPrendas
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Ejecuta métodos al crear una instancia
     *
     * @memberof VistaMisPrendas
     */
    async iniciar() {
        await VistaMisPrendas.cargarPrendas()
        VistaMisPrendas.botonActualizacion()
        VistaMisPrendas.botonBorrado()
        VistaMisPrendas.zoom()
    }


    /**
     *Permite hacer zoom a las imágenes
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static zoom() {
        let elems = document.querySelectorAll('.materialboxed');
        let instances = M.Materialbox.init(elems);
    }

    /**
     *Muestra el panel "panelMisPrendas" y asigna a la variable local de "vista" el value "panelMisPrendas"
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static mostrarMisPrendas() {
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display = 'block'
        localStorage.setItem('vista', 'vistaMisPrendas')
    }

    /**
     *Oculta la vista "panelMisPrendas"
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static ocultarMisprendas() {
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display = 'none'
    }

    /**
     *Carga las prendas y las genera dinámicamente
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static async cargarPrendas() {

        //let datos = await Controlador.cargaDePrendas()
        let categorias = document.getElementsByClassName('listaCategoriasMisPrendas')

        let contenedor = document.getElementById('contenedorMisPrendas')

        let datosCategorias = await Controlador.cargarCategoriasMisPrendas()

        for (let i = 0; i < datosCategorias.length; i++) {
            VistaMisPrendas.generarCategoria(datosCategorias[i].nombreCategoria, categorias[0])
            VistaMisPrendas.generarCategoria(datosCategorias[i].nombreCategoria, categorias[1])
        }

        let prendas = await Controlador.cargarMisPrendas()
        for (let i = 0; i < prendas.length; i++) {

            /* Creación de contenedor de prenda en version móvil y escritorio y adición de clases*/
            let contenedorItemMisPrendas = document.createElement('div')
            contenedorItemMisPrendas.classList.add('contenedorItemMisPrendas', 'col', 's12', 'm10', 'offset-m1', 'left-align', 'offset-m1')
            let nombrePrenda = document.createElement('h4')
            nombrePrenda.classList.add('left-align', 'col', 'm12', 'l12')
            nombrePrenda.textContent = prendas[i].nombrePrenda
            contenedorItemMisPrendas.prenda = prendas[i]
            contenedorItemMisPrendas.appendChild(nombrePrenda)

            VistaMisPrendas.generarPrenda(prendas[i].imagenCodificada, prendas[i].talla, prendas[i].nombreSubcategoria, prendas[i].descripcion, contenedorItemMisPrendas)
            VistaMisPrendas.generarPrendaMovil(prendas[i].imagenCodificada, prendas[i].talla, prendas[i].nombreSubcategoria, prendas[i].descripcion, contenedorItemMisPrendas)
            contenedor.appendChild(contenedorItemMisPrendas)
        }

        VistaMisPrendas.filtrarPrendaPorCategoria(contenedor)
    }

    /**
     *Genera la estructura de nodos, con sus atributos y contenido
     *
     * @static
     * @param {String} rutaImagen
     * @param {String} tallaPrenda
     * @param {String} subcategoriaPrenda
     * @param {String} descripcionPrenda
     * @param {Node} nodoPadre
     * @memberof VistaMisPrendas
     */
    static generarPrenda(rutaImagen, tallaPrenda, subcategoriaPrenda, descripcionPrenda, nodoPadre) {
        /* Caja que contiene los elementos de la prenda */
        let cajaPrenda = document.createElement('div')
        cajaPrenda.classList.add('itemMisPrendas', 'col', 'm12', 'valign-wrapper', 'hide-on-small-only')
        /* ICONOS DE ACTUALIZACIÓN Y BORRADO */
        let cajaIconos = document.createElement('div')
        cajaIconos.classList.add('iconosMisPrendas', 'col', 'm1', 'offset-m0')
        /* Icono actualizacion */
        let iconoActualizar = document.createElement('i')
        iconoActualizar.classList.add('small', 'material-icons', 'col', 'l6', 'offset-l6')
        iconoActualizar.textContent = 'system_update_alt'
        let separadorIconos = document.createElement('p')
        separadorIconos.classList.add('col', 'm12', 'l12')
        /* icono borrado */
        let iconoBorrar = document.createElement('i')
        iconoBorrar.classList.add('small', 'material-icons', 'col', 'l6', 'offset-l6')
        iconoBorrar.textContent = 'delete'

        cajaIconos.appendChild(iconoActualizar)
        cajaIconos.appendChild(separadorIconos)
        cajaIconos.appendChild(iconoBorrar)

        /* IMAGEN */
        let imagenDiv = document.createElement('div')
        imagenDiv.classList.add('imgMisPrendas', 'circle')
        let placeHolder = document.createElement('div')
        placeHolder.classList.add('material-placeholder')
        let imagen = document.createElement('img')
        imagen.classList.add('responsive-img', 'circle', 'materialboxed')
        imagen.setAttribute('src', rutaImagen)
        imagen.setAttribute('alt', 'prenda')

        placeHolder.appendChild(imagen)
        imagenDiv.appendChild(placeHolder)

        /* DATOS */
        let cajaDatos = document.createElement('div')
        cajaDatos.classList.add('datosMisPrendas', 'col', 's12', 'm12', 'l10')
        /* TALLA */
        /* caja talla */
        let cajaTalla = document.createElement('div')
        cajaTalla.classList.add('tallaMisPrendas', 'col', 'l1')
        /* titulo */
        let enunciadoTalla = document.createElement('h6')
        enunciadoTalla.textContent = 'Talla'
        /* contenido */
        let talla = document.createElement('p')
        talla.textContent = tallaPrenda

        cajaDatos.appendChild(cajaTalla)
        cajaTalla.appendChild(enunciadoTalla)
        cajaTalla.appendChild(talla)

        /* SUBCATEGORIA */
        let cajaCategoria = document.createElement('div')
        cajaCategoria.classList.add('categoriaMisPrendas')
        /* titulo */
        let enunciadoSubcategoria = document.createElement('h6')
        enunciadoSubcategoria.textContent = 'Categoría'
        /* contenido */
        let subcategoria = document.createElement('p')
        subcategoria.textContent = subcategoriaPrenda

        cajaDatos.appendChild(cajaCategoria)
        cajaCategoria.appendChild(enunciadoSubcategoria)
        cajaCategoria.appendChild(subcategoria)

        /* DESCRIPCIÓN */
        /* caja */
        let cajaDescripcion = document.createElement('div')
        cajaDescripcion.classList.add('descripcionMisPrendas', 'col', 'm12', 'l12',)
        /* titulo */
        let tituloDescripcion = document.createElement('h6')
        tituloDescripcion.textContent = 'Descripción'
        /* Párrafo descripción */
        let descripcion = document.createElement('p')
        descripcion.textContent = descripcionPrenda

        cajaDatos.appendChild(cajaDescripcion)
        cajaDescripcion.appendChild(tituloDescripcion)
        cajaDescripcion.appendChild(descripcion)

        /* Appends total*/
        //let contenedor = document.getElementsByClassName('contenedorItemMisPrendas')[iteracion]

        cajaPrenda.appendChild(cajaIconos)
        cajaPrenda.appendChild(imagenDiv)
        cajaPrenda.appendChild(cajaDatos)

        nodoPadre.appendChild(cajaPrenda)

        //return cajaPrenda
        //contenedor.appendChild(cajaPrenda)
    }

    /**
     *Genera la estructura de nodos, con sus atributos y contenido para la versión de móvil y tableta
     *
     * @static
     * @param {String} rutaImagen
     * @param {String} tallaPrenda
     * @param {String} subcategoriaPrenda
     * @param {String} descripcionPrenda
     * @param {Node} nodoPadre
     * @memberof VistaMisPrendas
     */
    static generarPrendaMovil(rutaImagen, tallaPrenda, subcategoriaPrenda, descripcionPrenda, nodoPadre) {
        /* Caja que contiene los elementos de la prenda */
        let cajaPrenda = document.createElement('div')
        cajaPrenda.classList.add('itemMisPrendasMovil', 'col', 's12', 'm10', 'hide-on-med-and-up')

        /* ICONOS DE ACTUALIZACIÓN Y BORRADO */
        let cajaIconos = document.createElement('div')
        cajaIconos.classList.add('iconosMisPrendas', 'col', 's12')
        /* Icono actualizacion */
        let iconoActualizar = document.createElement('i')
        iconoActualizar.classList.add('small', 'material-icons')
        iconoActualizar.textContent = 'system_update_alt'
        /* icono borrado */
        let iconoBorrar = document.createElement('i')
        iconoBorrar.classList.add('small', 'material-icons')
        iconoBorrar.textContent = 'delete'

        cajaIconos.appendChild(iconoActualizar)
        cajaIconos.appendChild(iconoBorrar)
        /* SEPARADOR PRENDAS */
        let separadorIconos = document.createElement('p')
        separadorIconos.classList.add('col', 'm12', 'l12')
        separadorIconos.setAttribute('id', 'divisorMisPrendas')
        separadorIconos.classList.add('col', 's12')
        /* IMAGEN */
        let imagenDiv = document.createElement('div')
        imagenDiv.classList.add('imgMisPrendasMovil', 'col', 's12', 'circle')
        let placeHolder = document.createElement('div')
        placeHolder.classList.add('material-placeholder')
        let imagen = document.createElement('img')
        imagen.classList.add('responsive-img', 'circle', 'col', 's12', 'offset-s0', 'materialboxed')
        imagen.setAttribute('src', rutaImagen)
        imagen.setAttribute('alt', 'prenda')

        placeHolder.appendChild(imagen)
        imagenDiv.appendChild(placeHolder)

        /* DATOS */
        let cajaDatos = document.createElement('div')
        cajaDatos.classList.add('datosMisPrendas', 'col', 's12')

        /* TALLA */
        /* caja talla */
        let cajaTalla = document.createElement('div')
        cajaTalla.classList.add('tallaMisPrendas', 'col', 's4', 'offset-s1')
        /* titulo */
        let enunciadoTalla = document.createElement('h6')
        enunciadoTalla.textContent = 'Talla'
        /* contenido */
        let talla = document.createElement('p')
        talla.textContent = tallaPrenda

        cajaDatos.appendChild(cajaTalla)
        cajaTalla.appendChild(enunciadoTalla)
        cajaTalla.appendChild(talla) /* corregir escritorio*/

        /* SUBCATEGORIA */
        let cajaCategoria = document.createElement('div')
        cajaCategoria.classList.add('categoriaMisPrendas', 'col', 's7')
        /* titulo */
        let enunciadoSubcategoria = document.createElement('h6')
        enunciadoSubcategoria.textContent = 'Categoría'
        /* contenido */
        let subcategoria = document.createElement('p')
        subcategoria.classList.add('col', 's12')
        subcategoria.textContent = subcategoriaPrenda

        cajaDatos.appendChild(cajaCategoria)
        cajaCategoria.appendChild(enunciadoSubcategoria)
        cajaCategoria.appendChild(subcategoria)

        /* DESCRIPCIÓN */
        /* caja */
        let cajaDescripcion = document.createElement('div')
        cajaDescripcion.classList.add('descripcionMisPrendas', 'col', 's10', 'offset-s1')
        /* titulo */
        let tituloDescripcion = document.createElement('h6')
        tituloDescripcion.textContent = 'Descripción'
        /* Párrafo descripción */
        let descripcion = document.createElement('p')
        descripcion.classList.add('col', 's12')
        descripcion.textContent = descripcionPrenda

        cajaDatos.appendChild(cajaDescripcion)
        cajaDescripcion.appendChild(tituloDescripcion)
        cajaDescripcion.appendChild(descripcion)

        /* Appends total*/

        cajaPrenda.appendChild(imagenDiv)
        cajaPrenda.appendChild(separadorIconos)
        cajaPrenda.appendChild(cajaIconos)
        cajaPrenda.appendChild(cajaDatos)

        nodoPadre.appendChild(cajaPrenda)

        //return cajaPrenda

    }

    /**
     *genera las categorías y las introduce en el nodo correspondiente
     *
     * @static
     * @param {String} nombreCategoria
     * @param {Node} nodoPadre
     * @memberof VistaMisPrendas
     */
    static generarCategoria(nombreCategoria, nodoPadre) {
        let categoria = document.createElement('p')
        categoria.classList.add('col', 's12', 'white-text')
        let nombreCat = document.createElement('span')
        nombreCat.textContent = nombreCategoria
        categoria.appendChild(nombreCat)
        nodoPadre.appendChild(categoria)
        //return categoria
    }

    /**
     *Borra las prendas que habia en un nodo y le adjunta otras
     *
     * @static
     * @param {JSON} datos
     * @param {Node} contenedorMisPrendas
     * @memberof VistaMisPrendas
     */
    static async generarPrendaPorCategoria(datos, contenedorMisPrendas) {
        /* hay que borrar */

        let items = document.getElementsByClassName('contenedorItemMisPrendas')

        if (items.length > 0) {
            while (items.length > 0) {
                contenedorMisPrendas.removeChild(items[0])
            }
        }

        /* Donde se generan */
        for (let i = 0; i < datos.length; i++) {
            /* Creación de contenedor de prenda en version móvil y escritorio y adición de clases*/
            let contenedorItemMisPrendas = document.createElement('div')
            contenedorItemMisPrendas.prenda = datos[i]
            contenedorItemMisPrendas.classList.add('contenedorItemMisPrendas', 'col', 's12', 'm10', 'offset-m1', 'left-align', 'offset-m1')
            let nombrePrenda = document.createElement('h4')
            nombrePrenda.classList.add('left-align', 'col', 'm12', 'l12')
            nombrePrenda.textContent = datos[i].nombrePrenda
            contenedorItemMisPrendas.appendChild(nombrePrenda)
            VistaMisPrendas.generarPrenda(datos[i].imagenCodificada, datos[i].talla, datos[i].nombreSubcategoria, datos[i].descripcion, contenedorItemMisPrendas)
            VistaMisPrendas.generarPrendaMovil(datos[i].imagenCodificada, datos[i].talla, datos[i].nombreSubcategoria, datos[i].descripcion, contenedorItemMisPrendas)
            contenedorMisPrendas.appendChild(contenedorItemMisPrendas)
        }

        VistaMisPrendas.zoom()
    }

    /**
     *Muesta las prendas que pertenecen a una determinada categoría
     *
     * @static
     * @param {Node} contenedorMisPrendas
     * @memberof VistaMisPrendas
     */
    static filtrarPrendaPorCategoria(contenedorMisPrendas) {
        let categorias = document.querySelectorAll('#categoriasMisPrendas p span')
        let categoriasMovil = document.querySelectorAll('#categoriaMisPrendasMovil p span')
        for (let i = 0; i < categorias.length; i++) {
            categorias[i].onclick = async () => {
                let datos = await Controlador.filtrarPrendasPorCategoria(categorias[i].textContent)
                VistaMisPrendas.generarPrendaPorCategoria(datos, contenedorMisPrendas)
                VistaMisPrendas.botonActualizacion()
                VistaMisPrendas.botonBorrado()
            }

            categoriasMovil[i].onclick = async () => {
                let datosMovil = await Controlador.filtrarPrendasPorCategoria(categoriasMovil[i].textContent)
                VistaMisPrendas.generarPrendaPorCategoria(datosMovil, contenedorMisPrendas)
                VistaMisPrendas.botonActualizacion()
                VistaMisPrendas.botonBorrado()
            }

        }

    }

    /**
     *Adjunta el proceso de actualización a los botones correspondientes mediante un evento de click
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static botonActualizacion() {
        let idPrenda = null
        let idCategoria = null
        let nombreCategoria = null
        let tallaPrenda = null
        let idSubcategoria = null
        let nombreSubcategoria = null
        let nombrePrenda = null
        let descripcionPrenda = null
        let item = document.getElementsByClassName('itemMisPrendas')
        let contenedorItem = document.getElementsByClassName('contenedorItemMisPrendas')

        for (let i = 0; i < item.length; i++) {
            item[i].children[0].children[0].onclick = () => {
                idPrenda = contenedorItem[i].prenda.idPrenda
                nombrePrenda = contenedorItem[i].prenda.nombrePrenda
                idCategoria = contenedorItem[i].prenda.idCategoria
                nombreCategoria = contenedorItem[i].prenda.nombreCategoria
                idSubcategoria = contenedorItem[i].prenda.idSubcategoria
                nombreSubcategoria = contenedorItem[i].prenda.nombreSubcategoria
                tallaPrenda = contenedorItem[i].prenda.talla
                descripcionPrenda = contenedorItem[i].prenda.descripcion
                VistaMisPrendas.actualizarPrenda(
                    idPrenda,
                    nombrePrenda,
                    tallaPrenda,
                    descripcionPrenda,
                    idCategoria,
                    nombreCategoria,
                    idSubcategoria,
                    nombreSubcategoria)
            }

        }

    }

    /**
     *Dirige al panel de gestión de prendas y pasa los valores de la prenda al formulario
     *
     * @static
     * @param {int} idPrenda
     * @param {String} nombrePrenda
     * @param {String} tallaPrenda
     * @param {String} descripcionPrenda
     * @param {int} idCategoria
     * @param {string} nombreCategoria
     * @param {int} idSubcategoria
     * @param {String} subcategoriaPrenda
     * @memberof VistaMisPrendas
     */
    static actualizarPrenda(idPrenda, nombrePrenda, tallaPrenda, descripcionPrenda, idCategoria, nombreCategoria, idSubcategoria, subcategoriaPrenda) {
        VistaMenuPrincipal.ocultarPaneles()
        VistaGestionarPrendas.mostrarGestionarPrendas()
        VistaGestionarPrendas.precargaDatos(idPrenda, nombrePrenda, tallaPrenda, descripcionPrenda, idCategoria, nombreCategoria, idSubcategoria, subcategoriaPrenda)


    }

    /**
     *Adjunta el proceso de borrado a los botones correspondientes mediante un evento de click
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static botonBorrado() {
        let idPrenda = null
        let nombrePrenda = null
        let item = document.getElementsByClassName('itemMisPrendas')
        let contenedorItem = document.getElementsByClassName('contenedorItemMisPrendas')

        for (let i = 0; i < item.length; i++) {
            item[i].children[0].children[2].onclick = () => {
                idPrenda = contenedorItem[i].prenda.idPrenda
                nombrePrenda = contenedorItem[i].prenda.nombrePrenda
                VistaMisPrendas.cuadroDialogo(idPrenda, nombrePrenda)
            }
        }
    }

    /**
     *Muesrta el uadro de confirmación de borrado de una prenda
     *
     * @static
     * @param {int} idPrenda
     * @param {String} nombrePrenda
     * @memberof VistaMisPrendas
     */
    static cuadroDialogo(idPrenda, nombrePrenda) {

        let botonConfirmacion = document.getElementById('botonBorrarMisPrendas')
        let botonCancelar = document.getElementById('botonCancelarMisPrendas')
        let texto = document.getElementById('nombrePrendaBorrable')
        texto.innerHTML = `¿Esta seguro de que deseas borrar ${nombrePrenda}`
        VistaMisPrendas.mostrarCuadroConfirmacion()

        botonConfirmacion.onclick = () => {
            VistaMisPrendas.borrarPrenda(idPrenda)
            VistaMisPrendas.ocultarCuadroConfirmacion()
            texto.innerHTML = ''
        }

        botonCancelar.onclick = () => {
            VistaMisPrendas.ocultarCuadroConfirmacion()
            texto.innerHTML = ''
        }

    }

    /**
     *Envía los datos al controlador para borrar una prenda
     *
     * @static
     * @param {int} idPrenda
     * @memberof VistaMisPrendas
     */
    static async borrarPrenda(idPrenda) {
        let datos = await Controlador.borrarPrenda(idPrenda)

        if (!datos.success) {
            console.log('ha ocurrido un error');
        } else {
            location.reload()
        }
    }

    /**
     *Oculta el cuadro de confirmación de borrado
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static ocultarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoMisPrendas')
        cuadro.style.display = 'none'
    }

    /**
     *Muestra el cuadro de confirmación de borrado
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static mostrarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoMisPrendas')
        cuadro.style.display = 'block'
    }

}