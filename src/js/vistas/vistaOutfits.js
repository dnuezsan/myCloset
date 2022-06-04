'use strict'

export class VistaOutfits{

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
        this.iniciar
    }

    iniciar(){
        
    }

    static mostrarOutfits(){
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaOutfits')
    }

    static ocultarOutfits(){
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'none'
        VistaOutfits.limpiarFormulario()
    }

    static limpiarFormulario(){
        let inputs = document.querySelectorAll('#panelOutfit input')
        let selects = document.querySelectorAll('#panelOutfit select')

        inputs.forEach(input => {
            input.value = ''
        });

        selects.forEach(select => {
            select.value = ''
        });
    }

}