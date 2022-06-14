'use strict'
import { VistaGestionarPrendas } from "./vistaGestionarPrendas.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"
import { VistaSubirPrenda } from "./vistaSubirPrenda.js"

/**
 *Clase que gestiona el panel que contienelas acciones sobre la prendas de la aplicación
 *
 * @export
 * @class VistaPrendas
 */
export class VistaPrendas{


    /**
     * 
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaPrendas
     */
    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    /**
     *Inicializa los métodos de la clase
     *
     * @memberof VistaPrendas
     */
    iniciar(){
        VistaPrendas.mostrarSubirPrenda()
        VistaPrendas.mostrarGestionarPrendas()
    }


    /**
     *Muestra la vista panelPrendas y setea la variable "vista" de localStore en vistaPrendas
     *
     * @static
     * @memberof VistaPrendas
     */
    static mostrarPrendas(){
        let panel = document.getElementById('panelPrendas')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaPrendas')
    }

    /**
     *Oculta la vista panelPrendas
     *
     * @static
     * @memberof VistaPrendas
     */
    static ocultarPrendas(){
        let panel = document.getElementById('panelPrendas')
        panel.style.display = 'none'
    }

    
    /**
     *Oculta los paneles y muestra panelSubirPrenda
     *
     * @static
     * @memberof VistaPrendas
     */
    static mostrarSubirPrenda(){
        let panel = document.querySelectorAll('#panelPrendas .cajaPrendas')
        panel[0].onclick = (evento)=>{
            VistaMenuPrincipal.ocultarPaneles()
            VistaSubirPrenda.mostrarSubirPrenda()
        }
    }


    /**
     *Oculta los paneles y muestra panelGestionPrendas
     *
     * @static
     * @memberof VistaPrendas
     */
    static mostrarGestionarPrendas(){
        let panel = document.querySelectorAll('#panelPrendas .cajaPrendas')
        panel[1].onclick = (evento)=>{
            VistaMenuPrincipal.ocultarPaneles()
            VistaGestionarPrendas.mostrarGestionarPrendas()
        }
    }

    /**
     *Oculta la vista panelGestionPrendas
     *
     * @static
     * @memberof VistaPrendas
     */
    static ocultarGestionarPrendas(){
        VistaGestionarPrendas.ocultarGestionarPrendas()
    }

}