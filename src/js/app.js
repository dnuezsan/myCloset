//mport { VistaPrincipal } from "./vistas/vistaPrincipal.js";
'use strict'
import { VistaPrincipal } from './vistas/vistaPrincipal.js'
/**
 *Controlador principal de la aplicación
 *
 * @class App
 */
class App {

    /**
     * @constructor
     *
     * @memberof App
     */
    constructor() {
        window.onload = this.iniciar.bind(this)

    }

    /**
     *Inicializa una instancia de la vista principal
     *
     * @memberof App
     */
    iniciar() {
        this.vistaPrincipal = new VistaPrincipal(this, document.body)


    }


}
new App();