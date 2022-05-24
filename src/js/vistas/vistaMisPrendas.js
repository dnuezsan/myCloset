'use strict'


export class VistaMisPrendas{

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar(){

    }

    static mostrarMisPrendas(){
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display= 'flex'
        localStorage.setItem('vista', 'vistaMisPrendas')
    }

    static ocultarMisprendas(){
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display = 'none'
    }

}