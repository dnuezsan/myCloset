'use strict'

export class VistaOutfits{

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
    }

    static mostrarOutfits(){
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaOutfits')
    }

    static ocultarOutfits(){
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'none'
    }

}