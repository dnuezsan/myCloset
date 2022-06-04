'use strict'

import { Controlador } from "../controlador/controlador.js"


export class VistaMisPrendas {

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
    iniciar() {
        VistaMisPrendas.cargarPrendas()
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

    static cargarPrendas() {

        //let datos = await Controlador.cargaDePrendas()
        let categorias = document.getElementsByClassName('listaCategoriasMisPrendas')

        let contenedor = document.getElementById('contenedorMisPrendas')

        for (let i = 0; i < 5/*datos.length*/; i++) {
            /* Creación de contenedor de prenda en version móvil y escritorio y adición de clases*/
            let contenedorItemMisPrendas = document.createElement('div')
            contenedorItemMisPrendas.classList.add('contenedorItemMisPrendas', 'col', 's12', 'm10', 'offset-m1', 'left-align', 'offset-m1')
            
            let contenedores = document.getElementsByClassName("contenedorItemMisPrendas")

            //CATEGORIAS
            VistaMisPrendas.generarCategoria('zapato', categorias[0])
            VistaMisPrendas.generarCategoria('zapato', categorias[1])
            //FIN CATEGORIAS
            //INICIO DE ITEMS
            /* VistaMisPrendas.generarPrenda( 'src/img/mi-armario-mis prendas/prendas-prueba.jpg', 'M', 'bgfb', 'vgngfn', contenedorItemMisPrendas)
            VistaMisPrendas.generarPrendaMovil('src/img/mi-armario-mis prendas/prendas-prueba.jpg', 'M', 'bgfb', 'vgngfn', contenedorItemMisPrendas) */
            //FIN DE ITEMS
            /* adición al contenedor de la prenda, de la prenda en escritorio y móvil */
            //contenedorItemMisPrendas[i].appendChild(VistaMisPrendas.generarPrenda())
            //contenedorItemMisPrendas[i].appendChild(VistaMisPrendas.generarPrendaMovil())
            /* adición al contenedor principal de las prendas de la caja con sus respectivas prendas */
            //contenedor.appendChild(contenedores[i])
        }

        
    }

    /* static generarContenedorItem(){
        let contenedorItem = document.createElement('div')
        contenedorItem.classList.add('contenedorItemMisPrendas', 'col s12 m10', 'offset-m1', 'left-align', 'offset-m1')
        
    } */

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
        /* icono borrado */
        let iconoBorrar = document.createElement('i')
        iconoBorrar.classList.add('small', 'material-icnos', 'col', 'l6', 'offset-l6')
        iconoBorrar.textContent = 'delete'

        cajaIconos.appendChild(iconoActualizar)
        cajaIconos.appendChild(separadorIconos)
        cajaIconos.appendChild(iconoBorrar)

        /* IMAGEN */
        let imagenDiv = document.createElement('div')
        imagenDiv.classList.add('imgMisPrendas', 'circle')
        let imagen = document.createElement('img')
        imagen.classList.add('responsive-img', 'circle', 'materialBoxed')
        imagen.setAttribute('src', rutaImagen)
        imagen.setAttribute('alt', 'prenda')

        imagenDiv.appendChild(imagen)

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

    static generarPrendaMovil(rutaImagen, tallaPrenda, subcategoriaPrenda, descripcionPrenda, nodoPadre) {
        /* Caja que contiene los elementos de la prenda */
        let cajaPrenda = document.createElement('div')
        cajaPrenda.classList.add('itemMisPrendasMovil', 'col', 's12', 'm10', 'hide-on-med-and-up')

        /* ICONOS DE ACTUALIZACIÓN Y BORRADO */
        let cajaIconos = document.createElement('div')
        cajaIconos.classList.add('iconosMisPrendas', 'col', 's12')
        /* Icono actualizacion */
        let iconoActualizar = document.createElement('i')
        iconoActualizar.setAttribute('id', 'icono1')
        iconoActualizar.classList.add('small', 'material-icons')
        iconoActualizar.textContent = 'system_update_alt'
        /* icono borrado */
        let iconoBorrar = document.createElement('i')
        iconoBorrar.setAttribute('id', 'icono2')
        iconoBorrar.classList.add('small', 'material-icons')
        iconoBorrar.textContent = 'delete'

        cajaIconos.appendChild(iconoActualizar)
        cajaIconos.appendChild(iconoBorrar)
        /* SEPARADOR PRENDAS */
        let separadorIconos = document.createElement('p')
        separadorIconos.setAttribute('id', 'divisorMisPrendas')
        separadorIconos.classList.add('col', 's12')
        /* IMAGEN */
        let imagenDiv = document.createElement('div')
        imagenDiv.classList.add('imgMisPrendas', 'col', 's12', 'circle')
        let imagen = document.createElement('img')
        imagen.classList.add('responsive-img', 'circle', 'col', 's12', 'offset-s0', 'materialBoxed')
        imagen.setAttribute('src', rutaImagen)
        imagen.setAttribute('alt', 'prenda')

        imagenDiv.appendChild(imagen)

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

    static generarCategoria(nombreCategoria, nodoPadre) {
        let categoria = document.createElement('p')
        nodoPadre.appendChild(categoria)
        categoria.classList.add('col', 's12', 'white-text')
        categoria.textContent = nombreCategoria

        //return categoria
    }

}