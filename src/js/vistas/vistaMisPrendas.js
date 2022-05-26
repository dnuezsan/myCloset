'use strict'


export class VistaMisPrendas{

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Ejecuta métodos al crear una instancia
     *
     * @memberof VistaMisPrendas
     */
    iniciar(){

    }


    /**
     *Muestra el panel "panelMisPrendas" y asigna a la variable local de "vista" el value "panelMisPrendas"
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static mostrarMisPrendas(){
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display= 'flex'
        localStorage.setItem('vista', 'vistaMisPrendas')
    }

    /**
     *Oculta la vista "panelMisPrendas"
     *
     * @static
     * @memberof VistaMisPrendas
     */
    static ocultarMisprendas(){
        let panel = document.getElementById('panelMisPrendas')
        panel.style.display = 'none'
    }

}