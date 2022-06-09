'use strict'

import { Controlador } from "../controlador/controlador"

export class VistaOutfits {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {
        VistaOutfits.limpiarOutfit()
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

    static async cargarPrendasCabeza() {

    }

    static async cargarPrendasTorso() {

    }

    static async cargarPrendasPiernas() {

    }

    static async cargarPrendasPies() {

    }

    static detectarCambiosSelecta() {
        let selects = document.querySelectorAll('#panelOutfit select')
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        let selectCabeza = document.getElementsByClassName('prendaCabezaOutfit')
        let selectTorso = document.getElementsByClassName('prendaTorsoOutfit')
        let selectPiernas = document.getElementsByClassName('prendaPiernasOutfit')
        let selectPies = document.getElementsByClassName('prendaPiesOutfit')
        let botonCambiar = document.getElementsByClassName('botonGuardarOutfit')
        let botonBorrar = document.getElementsByClassName('botonBorrarOutfit')

        for (let i = 0; i < 2; i++) {
            selects[i].onchange = () => {

                //FALTA MEÉTODO PARA IGUALAR LOS CAMPOS DE V. DE ESCRITORIO Y MÓVIL

                for (let i = 0; i < botonCambiar.length; i++) {
                    botonCambiar[i].onclick = () => {
                        if (outfitsCargados[i].value == '') {
                            VistaOutfits.guardarOutfit()
                        } else{
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

    static async detectarCambiosSelect() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < array.length; i++) {
            outfitsCargados[i].onclick = () => {
                VistaOutfits.cargarPrendasCabeza()

                VistaOutfits.cargarPrendasTorso()

                VistaOutfits.cargarPrendasPiernas()

                VistaOutfits.cargarPrendasPies()
            }

        }
        $('#panelOutfit select').formSelect()
    }
}