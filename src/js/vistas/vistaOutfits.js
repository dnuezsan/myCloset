'use strict'

import { Controlador } from "../controlador/controlador.js"

export class VistaOutfits {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {
        VistaOutfits.limpiarOutfit()

        VistaOutfits.igualarFormularios()
    }

    static mostrarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaOutfits')
    }

    static ocultarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'none'
        VistaOutfits.limpiarFormulario()
    }

    static limpiarFormulario() {
        let inputs = document.querySelectorAll('#panelOutfit input')
        let selects = document.querySelectorAll('#panelOutfit select')

        inputs.forEach(input => {
            input.value = ''
        });

        selects.forEach(select => {
            select.value = ''
        });
    }

    static limpiarOutfit() {
        let botones = document.getElementsByClassName('botonNuevoOutfit')

        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener('click', VistaOutfits.limpiarFormulario, true)
        }

    }

    static async guardarOutfit() {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value == '') {
                if (outfit[i].value != '') {
                    let respuesta = await Controlador.guardarOutfit()
                    if (!respuesta.success) {
                        console.log('error');
                    } else {
                        location.reload()
                    }
                }
            }
        }
    }

    static async modificarOutfit() {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value != '') {
                if (outfit[i].value != '') {
                    let respuesta = await Controlador.modificarOutfit(outfit[i].value)
                    if (!respuesta.success) {
                        console.log('error');
                    } else {
                        location.reload()
                    }
                }
            }
        }
    }

    static async borrarOutfit() {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value != '') {
                let respuesta = await Controlador.borrarOutfit(outfit[i].value)
                if (!respuesta.success) {
                    console.log('error');
                } else {
                    location.reload()
                }
            }
        }
    }

    static async cargarOutfits() {
        let selectOutfits = document.getElementsByClassName('outfitCargado')

        let outfits = await Controlador.cargaOutfits()

        for (let i = 0; i < outfits.length; i++) {

            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[0])
            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[1])

        }
    }

    static async cargarPrendasCabeza(){

        //Patron Borrado
        /* for (let i = 0; i < selectOutfits.length; i++) {
            if (selectOutfits[i].childElementCount>1) {
                while (selectOutfits[i].childElementCount > 1) {
                    selectOutfits[i].removeChild(selectOutfits[i].children[1])
                }
            }
        } */
    }

    static async cargarPrendasTorso(){

        //Patron Borrado
        /* for (let i = 0; i < selectOutfits.length; i++) {
            if (selectOutfits[i].childElementCount>1) {
                while (selectOutfits[i].childElementCount > 1) {
                    selectOutfits[i].removeChild(selectOutfits[i].children[1])
                }
            }
        } */
    }
    
    static async cargarPrendasPierna(){

        //Patron Borrado
        /* for (let i = 0; i < selectOutfits.length; i++) {
            if (selectOutfits[i].childElementCount>1) {
                while (selectOutfits[i].childElementCount > 1) {
                    selectOutfits[i].removeChild(selectOutfits[i].children[1])
                }
            }
        } */
    }

    static async cargarPrendasPies(){

        //Patron Borrado
        /* for (let i = 0; i < selectOutfits.length; i++) {
            if (selectOutfits[i].childElementCount>1) {
                while (selectOutfits[i].childElementCount > 1) {
                    selectOutfits[i].removeChild(selectOutfits[i].children[1])
                }
            }
        } */
    }

    static generarOptionOutfit(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idSubcategoria
        opcion.textContent = datos.nombreSubcategoria
        nodoPadre.appendChild(opcion)
    }

    //ACABAR METODO
    static detectarCambiosSelecta() {
        let selects = document.querySelectorAll('#panelOutfit select')
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        let selectCabeza = document.getElementsByClassName('prendaCabezaOutfit')
        let selectTorso = document.getElementsByClassName('prendaTorsoOutfit')
        let selectPiernas = document.getElementsByClassName('prendaPiernasOutfit')
        let selectPies = document.getElementsByClassName('prendaPiesOutfit')
        let botonCambiar = document.getElementsByClassName('botonGuardarOutfit')
        let botonBorrar = document.getElementsByClassName('botonBorrarOutfit')

        //PASAR VALORES DE SELECTS A LOS METODOS
        for (let i = 0; i < 2; i++) {
            selects[i].onchange = () => {

                for (let i = 0; i < botonCambiar.length; i++) {
                    botonCambiar[i].onclick = () => {
                        if (outfitsCargados[i].value == '') {
                            VistaOutfits.guardarOutfit()
                        } else {
                            VistaOutfits.modificarOutfit()
                        }

                    }

                    botonBorrar[i].onclick = () => {
                        VistaOutfits.borrarOutfit()
                    }

                }

            }

            $('#panelOutfit select').formSelect()
        }

    }

    static detectarCambiosSelect() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < array.length; i++) {
            outfitsCargados[i].onclick = async () => {
                await VistaOutfits.cargarPrendasCabeza()
                
                await VistaOutfits.cargarPrendasTorso()

                await VistaOutfits.cargarPrendasPiernas()

                await VistaOutfits.cargarPrendasPies()
            }

        }
        $('#panelOutfit select').formSelect()
    }

    static igualarFormularios() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        let selectCabeza = document.getElementsByClassName('prendaCabezaOutfit')
        let selectTorso = document.getElementsByClassName('prendaTorsoOutfit')
        let selectPiernas = document.getElementsByClassName('prendaPiernasOutfit')
        let selectPies = document.getElementsByClassName('prendaPiesOutfit')
        let nombreDeOutfit = document.getElementsByClassName('nombreOutfit')
        let valor = null

        for (let i = 0; i < 2; i++) {
            outfitsCargados[i].onchange = () => {
                valor = outfitsCargados[i].value
                for (let j = 0; j < outfitsCargados.length; j++) {
                    outfitsCargados[j].value = valor
                    console.log(valor);
                }
            }
            selectCabeza[i].onchange = () => {
                valor = selectCabeza[i].value
                for (let j = 0; j < selectCabeza.length; j++) {
                    selectCabeza[j].value = valor
                }
            }
            selectTorso[i].onchange = () => {
                valor = selectTorso[i].value
                for (let j = 0; j < selectTorso.length; j++) {
                    selectTorso[j].value = valor
                }
            }
            selectPiernas[i].onchange = () => {
                valor = selectPiernas[i].value
                for (let j = 0; j < selectPiernas.length; j++) {
                    selectPiernas[j].value = valor
                }
            }
            selectPies[i].onchange = () => {
                valor = selectPies[i].value
                for (let j = 0; j < selectPies.length; j++) {
                    selectPies[j].value = valor
                }
            }

            nombreDeOutfit[i].onchange = () => {
                valor = nombreDeOutfit[i].value
                for (let j = 0; j < nombreDeOutfit.length; j++) {
                    nombreDeOutfit[j].value = valor
                }
            }

            $('#panelOutfit select').formSelect()
        }
    }

}