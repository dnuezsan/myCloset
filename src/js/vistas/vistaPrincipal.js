
import { VistaLogin } from "./vistaLogin.js";
import { VistaRegistroUsuario } from "./vistaRegistroUsuario.js";
import { Controlador } from "../controlador/controlador.js";
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js";
import { VistaArmario } from "./vistaArmario.js";
import { VistaMisPrendas } from "./vistaMisPrendas.js";
import { VistaPerfilUsuario } from "./vistaPerfilUsuario.js";
import { VistaCategorias } from "./vistaCategorias.js";
import { VistaPrendas } from "./vistaPrendas.js"
import { VistaSubirPrenda } from "./vistaSubirPrenda.js";
import { VistaGestionarPrendas } from "./vistaGestionarPrendas.js";
/**
 *Vista principal de la aplicación
 *Muestra los componentes de la aplicación
 * @export
 * @class VistaPrincipal
 */
export class VistaPrincipal {

    /**
     * @constructor
     * Crea una instancia de VistaPrincipal y ejecuta el método iniciar()
     * @param {String} controlador
     * @param {String} base
     * @memberof VistaPrincipal
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Inicializa las instancias de las vistas
     *
     * @memberof VistaPrincipal
     */
    iniciar() {

        this.panelLogin = document.getElementById('panelLogin')
        this.panelRegistro = document.getElementById('panelRegistro')
        this.panelMenu = document.getElementById('divMenuPrincipal')
        this.panelArmario = document.getElementById('panelArmario')
        this.panelMisPrendas = document.getElementById('panelMisPrendas')
        this.panelPerfilUsuario = document.getElementById('panelPerfilUsuario')
        this.panelCategorias = document.getElementById('panelCategorias')
        this.panelPrendas = document.getElementById('panelPrendas')
        this.panelSubirPrendas = document.getElementById('panelSubirPrenda')
        this.panelGestionarPrendas = document.getElementById('panelGestionarPrendas')

        this.login = new VistaLogin(this.controlador, this.panelLogin)
        this.registro = new VistaRegistroUsuario(this.controlador, this.panelRegistro)
        this.panelMenu = new VistaMenuPrincipal(this.controlador, this.panelMenu)
        this.amario = new VistaArmario(this.controlador, this.panelArmario)
        this.misPrendas = new VistaMisPrendas(this.controlador, this.panelMisPrendas)
        this.perfilUsuario = new VistaPerfilUsuario(this.controlador, this.panelPerfilUsuario)
        this.panelCategorias = new VistaCategorias(this.controlador, this.panelCategorias)
        this.panelPrendas = new VistaPrendas(this.controlador, this.base)
        this.panelSubirPrendas = new VistaSubirPrenda(this.controlador, this.panelSubirPrendas)

        this.panelGestionarPrendas = new VistaGestionarPrendas(this.controlador, this.panelGestionarPrendas)

        if (location.reload) {
            localStorage.setItem('vista', 'vistaLogin')
        }
    }

    static actualizarVista(vista = localStorage.getItem('vista')) {
        localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
        localStorage.getItem('ocultar')
        localStorage.setItem('ocultar', 'false')

        switch (vista) {
            case 'vistaArmario':
                localStorage.setItem('vista', VistaArmario.mostrarArmario())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaArmario')
                break;
            case 'vistaMisPrendas':
                localStorage.setItem('vista', VistaMisPrendas.mostrarMisPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaMisPrendas')
                VistaMenuPrincipal.mostrarMenu()
                VistaMisPrendas.mostrarMisPrendas()
                break;
            case 'vistaPrendas':
                localStorage.setItem('vista', VistaPrendas.mostrarPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaPrendas')
                VistaMenuPrincipal.mostrarMenu()
                VistaPrendas.mostrarPrendas()
                break;
            case 'vistaSubirPrenda':
                localStorage.setItem('vista', VistaSubirPrenda.mostrarSubirPrenda())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaSubirPrenda')
                VistaMenuPrincipal.mostrarMenu()
                VistaSubirPrenda.mostrarSubirPrenda()
                break;
            case 'vistaGestionarPrendas':
                localStorage.setItem('vista', VistaGestionarPrendas.mostrarGestionarPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaGestionarPrendas')
                VistaMenuPrincipal.mostrarMenu()
                VistaGestionarPrendas.mostrarGestionarPrendas()
                break;
            case 'vistaCategorias':
                localStorage.setItem('vista', VistaCategorias.mostrarCategorias())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaCategorias')
                VistaMenuPrincipal.mostrarMenu()
                VistaCategorias.mostrarCategorias()
                break;
            case 'vistaPerfilUsuario':
                localStorage.setItem('vista', VistaPerfilUsuario.mostrarPerfilUsuario())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaPerfilUsuario')
                VistaMenuPrincipal.mostrarMenu()
                VistaPerfilUsuario.mostrarPerfilUsuario()
                break;
        }
    }

}