
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
import { VistaOutfits } from "./vistaOutfits.js";
/**
 * Vista principal de la aplicación
 * 
 * @export
 * @class VistaPrincipal
 */
export class VistaPrincipal {

    /**
     * @constructor
     * 
     * @param {Object} controlador controlador de la vista principal
     * @param {Node} base base del DOM para la vista principal
     * @memberof VistaPrincipal
     */
    constructor(controlador, base) {
        this.controlador = new VistaLogin()
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
        this.panelOutfits = document.getElementById('panelOutfit')

        this.login = new VistaLogin(this.controlador, this.panelLogin)
        this.registro = new VistaRegistroUsuario(this.controlador, this.panelRegistro)
        this.menu = new VistaMenuPrincipal(this.controlador, this.panelMenu)
        this.amario = new VistaArmario(this.controlador, this.panelArmario)
        this.misPrendas = new VistaMisPrendas(this.controlador, this.panelMisPrendas)
        this.perfilUsuario = new VistaPerfilUsuario(this.controlador, this.panelPerfilUsuario)
        this.categorias = new VistaCategorias(this.controlador, this.panelCategorias)
        this.prendas = new VistaPrendas(this.controlador, this.base)
        this.subirPrendas = new VistaSubirPrenda(this.controlador, this.panelSubirPrendas)
        this.outfits = new VistaOutfits(this.controlador, this.panelOutfits)
        this.panelGestionarPrendas = new VistaGestionarPrendas(this.controlador, this.panelGestionarPrendas)
        
        /* Fragmento de código paracontrolar vistas al actualizar */
        if (sessionStorage.getItem('sesion') == null) {
            VistaLogin.mostrarLogin()
        }

        if (location.reload && localStorage.getItem('vista') != null) {
            VistaPrincipal.actualizarVista()
        } else {
            VistaLogin.mostrarLogin()
        }
    }

    /* static limpiarLocalStorage() {
        window.addEventListener('beforeunload', function (e) {
            console.log('hola');
            this.localStorage.setItem('vista', 'null')
            //e.returnValue=null //Con esto se retorna un mensaje de carga al cerrar pestaña o navegador
        });
    } */

    /**
     *Permite mantener abierta el mismo panel al actualizar la página
     *
     * @static
     * @param {string} [vista=localStorage.getItem('vista')] Variable almacenada en localStorage y que permite saber en que vista se encuentra el usuario
     * @memberof VistaPrincipal
     */
    static actualizarVista(vista = localStorage.getItem('vista')) {

        switch (vista) {
            case 'vistaLogin':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.ocultarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaLogin.mostrarLogin())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaLogin')
                break;
            case 'vistaRegistro':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.ocultarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaRegistroUsuario.mostrarRegistro())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaRegistro')
                break;
            case 'vistaArmario':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaArmario.mostrarArmario())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaArmario')
                break;
            case 'vistaMisPrendas':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaMisPrendas.mostrarMisPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaMisPrendas')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaMisPrendas.mostrarMisPrendas() */
                break;
            case 'vistaPrendas':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaPrendas.mostrarPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaPrendas')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaPrendas.mostrarPrendas() */
                break;
            case 'vistaSubirPrenda':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaSubirPrenda.mostrarSubirPrenda())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaSubirPrenda')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaSubirPrenda.mostrarSubirPrenda() */
                break;
            case 'vistaGestionarPrendas':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaGestionarPrendas.mostrarGestionarPrendas())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaGestionarPrendas')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaGestionarPrendas.mostrarGestionarPrendas() */
                break;
            case 'vistaCategorias':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaCategorias.mostrarCategorias())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaCategorias')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaCategorias.mostrarCategorias() */
                break;
            case 'vistaPerfilUsuario':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaPerfilUsuario.mostrarPerfilUsuario())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaPerfilUsuario')
                /* VistaMenuPrincipal.mostrarMenu()
                VistaPerfilUsuario.mostrarPerfilUsuario() */
                break;
            case 'vistaOutfits':
                localStorage.setItem('ocultar', VistaMenuPrincipal.ocultarPaneles())
                localStorage.getItem('ocultar')
                localStorage.setItem('ocultar', 'false')
                localStorage.setItem('menu', VistaMenuPrincipal.mostrarMenu())
                localStorage.getItem('menu')
                localStorage.setItem('menu', 'false')
                localStorage.setItem('vista', VistaOutfits.mostrarOutfits())
                localStorage.getItem('vista')
                localStorage.setItem('vista', 'vistaOutfits')
        }
    }

}