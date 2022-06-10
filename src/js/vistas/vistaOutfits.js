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
        //VistaOutfits.cargarOutfits()
        VistaOutfits.detectarCambiosSelectYCargar()
        VistaOutfits.detectarCambiosSelect()
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

    static prueba() {
        let nombre = document.getElementsByClassName('nombreOutfit')
        for (let i = 0; i < nombre.length; i++) {
            console.log(nombre[i].value);
        }
    }
    static cargarPrendasCabeza() {
        console.log('metodos de cabeza');
        /* let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        for (let i = 0; i < prendaCabeza.length; i++) {
            if (prendaCabeza[i].childElementCount > 1) {
                while (prendaCabeza[i].childElementCount > 1) {
                    prendaCabeza[i].removeChild(prendaCabeza[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasCabeza()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionOutfit(prendas[i], prendaCabeza[0])
            VistaOutfits.generarOptionOutfit(prendas[i], prendaCabeza[1])
        } */
    }

    static async cargarPrendasTorso() {
        console.log('metodos de torso');
        /* let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        for (let i = 0; i < prendaTorso.length; i++) {
            if (prendaTorso[i].childElementCount > 1) {
                while (prendaTorso[i].childElementCount > 1) {
                    prendaTorso[i].removeChild(prendaTorso[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasTorso()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionOutfit(prendas[i], prendaTorso[0])
            VistaOutfits.generarOptionOutfit(prendas[i], prendaTorso[1])
        } */
    }

    static async cargarPrendasPierna() {
        console.log('metodos de piernas');
        /* let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        for (let i = 0; i < prendaPiernas.length; i++) {
            if (prendaPiernas[i].childElementCount > 1) {
                while (prendaPiernas[i].childElementCount > 1) {
                    prendaPiernas[i].removeChild(prendaPiernas[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPiernas()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionOutfit(prendas[i], prendaPiernas[0])
            VistaOutfits.generarOptionOutfit(prendas[i], prendaPiernas[1])
        }
 */
    }

    static async cargarPrendasPies() {
        console.log('metodos de pies');
        /* let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        for (let i = 0; i < prendaPies.length; i++) {
            if (prendaPies[i].childElementCount > 1) {
                while (prendaPies[i].childElementCount > 1) {
                    prendaPies[i].removeChild(prendaPies[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPies()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionOutfit(prendas[i], prendaPies[0])
            VistaOutfits.generarOptionOutfit(prendas[i], prendaPies[1])
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
    static detectarCambiosSelect() {
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

    //FALTA PASAR VALORES METODOS PARA CARGA DE PRENDAS
    static detectarCambiosSelectYCargar() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')


        for (let i = 0; i < outfitsCargados.length; i++) {
            outfitsCargados[i].onchange = async () => {
                await VistaOutfits.cargarPrendasCabeza()

                await VistaOutfits.cargarPrendasTorso()

                await VistaOutfits.cargarPrendasPiernas()

                await VistaOutfits.cargarPrendasPies()

                await VistaOutfits.prueba()
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

    //Patron Borrado
    /* for (let i = 0; i < selectOutfits.length; i++) {
        if (selectOutfits[i].childElementCount>1) {
            while (selectOutfits[i].childElementCount > 1) {
                selectOutfits[i].removeChild(selectOutfits[i].children[1])
            }
        }
    } */

}