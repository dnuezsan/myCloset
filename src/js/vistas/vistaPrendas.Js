'use strict'
import { VistaGestionarPrendas } from "./vistaGestionarPrendas.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"
import { VistaSubirPrenda } from "./vistaSubirPrenda.js"

export class VistaPrendas{

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar(){
        VistaPrendas.mostrarSubirPrenda()
        VistaPrendas.mostrarGestionarPrendas()
    }

    static mostrarPrendas(){
        let panel = document.getElementById('panelPrendas')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaPrendas')
    }

    static ocultarPrendas(){
        let panel = document.getElementById('panelPrendas')
        panel.style.display = 'none'
    }

    
    static mostrarSubirPrenda(){
        let panel = document.querySelectorAll('#panelPrendas .cajaPrendas')
        panel[0].onclick = (evento)=>{
            VistaMenuPrincipal.ocultarPaneles()
            VistaSubirPrenda.mostrarSubirPrenda()
        }
    }

    static mostrarGestionarPrendas(){
        let panel = document.querySelectorAll('#panelPrendas .cajaPrendas')
        panel[1].onclick = (evento)=>{
            VistaMenuPrincipal.ocultarPaneles()
            VistaGestionarPrendas.mostrarGestionarPrendas()
        }
    }

    static ocultarGestionarPrendas(){
        VistaGestionarPrendas.ocultarGestionarPrendas()
    }

}