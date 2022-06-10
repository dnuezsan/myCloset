'use strict'

import { Controlador } from "../controlador/controlador.js"

export class VistaOutfits {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    async iniciar() {
        VistaOutfits.limpiarOutfit()
        VistaOutfits.cargarOutfits()
        await VistaOutfits.cargarPrendasCabeza()
        await VistaOutfits.cargarPrendasTorso()
        await VistaOutfits.cargarPrendasPiernas()
        await VistaOutfits.cargarPrendasPies()
        VistaOutfits.igualarFormularios()
        VistaOutfits.detectarCambiosSelect()
        VistaOutfits.detectarCambiosSelectYCargar()
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

        $('.outfitCargado').formSelect()
    }

    static async cargarPrendasCabeza() {
        let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        for (let i = 0; i < prendaCabeza.length; i++) {
            if (prendaCabeza[i].childElementCount > 1) {
                while (prendaCabeza[i].childElementCount > 1) {
                    prendaCabeza[i].removeChild(prendaCabeza[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasCabeza()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaCabeza[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaCabeza[1])
        }

        $('.prendaCabezaOutfit').formSelect()

    }

    static async cargarPrendasTorso() {

        let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        for (let i = 0; i < prendaTorso.length; i++) {
            if (prendaTorso[i].childElementCount > 1) {
                while (prendaTorso[i].childElementCount > 1) {
                    prendaTorso[i].removeChild(prendaTorso[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasTorso()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaTorso[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaTorso[1])
        }
        $('.prendaTorsoOutfit').formSelect()
    }

    static async cargarPrendasPiernas() {

        let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        for (let i = 0; i < prendaPiernas.length; i++) {
            if (prendaPiernas[i].childElementCount > 1) {
                while (prendaPiernas[i].childElementCount > 1) {
                    prendaPiernas[i].removeChild(prendaPiernas[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPiernas()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaPiernas[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaPiernas[1])
        }
        $('.prendaPiernasOutfit').formSelect()
    }

    static async cargarPrendasPies() {

        let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        for (let i = 0; i < prendaPies.length; i++) {
            if (prendaPies[i].childElementCount > 1) {
                while (prendaPies[i].childElementCount > 1) {
                    prendaPies[i].removeChild(prendaPies[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPies()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaPies[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaPies[1])
        }
        $('.prendaPiesOutfit').formSelect()
    }

    static generarOptionOutfit(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idOutfit
        opcion.textContent = datos.nombreOutfit
        nodoPadre.appendChild(opcion)
    }

    static generarOptionPrenda(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idPrenda
        opcion.textContent = `${datos.nombreSubcategoria} - ${datos.nombrePrenda}`
        nodoPadre.appendChild(opcion)
    }

    //ACABAR METODO
    static async cargarPrendasCabezaOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        let prendaCabezaOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaCabezaOutfit = await Controlador.cargarPrendasCabezaOutfit(idOutfit)
            prendaCabeza[i].value = prendaCabezaOutfit[0].idPrenda
            $('.prendaCabezaOutfit').formSelect()
        }
    }

    static async cargarPrendasTorsoOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        let prendaTorsoOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaTorsoOutfit = await Controlador.cargarPrendasTorsoOutfit(idOutfit)
            prendaTorso[i].value = prendaTorsoOutfit[0].idPrenda
            $('.prendaTorsoOutfit').formSelect()
        }
    }

    static async cargarPrendasPiernasOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        let prendaPiernasOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiernasOutfit = await Controlador.cargarPrendasPiernasOutfit(idOutfit)
            prendaPiernas[i].value = prendaPiernasOutfit[0].idPrenda
            $('.prendaPiernasOutfit').formSelect()
        }
    }

    static async cargarPrendasPiesOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        let prendaPiesOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiesOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
            prendaPies[i].value = prendaPiesOutfit[0].idPrenda
            $('.prendaPiesOutfit').formSelect()
        }
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
        for (let i = 0; i < selects.length; i++) {
            /* selects[i].onchange = () => {
                console.log('hjmyjHG');
                for (let j = 0; j < botonCambiar.length; j++) {
                    botonCambiar[j].onclick = () => {
                        if (outfitsCargados[j].value == '') {
                            VistaOutfits.guardarOutfit()
                        } else {
                            VistaOutfits.modificarOutfit()
                        }

                    }

                    botonBorrar[j].onclick = () => {
                        VistaOutfits.borrarOutfit()
                    }
                    

                    VistaOutfits.cargarImgPrendaCabeza(selectCabeza[j].value) 
                    VistaOutfits.cargarImgPrendaTorso(selectTorso[j].value)
                    VistaOutfits.cargarImgPrendaPiernas(selectPiernas[j].value)
                    VistaOutfits.cargarImgPrendaPies(selectPies[j].value)
                }

            } */
            selects[i].addEventListener('change', () => {
                for (let j = 0; j < botonCambiar.length; j++) {
                    botonCambiar[j].onclick = () => {
                        if (outfitsCargados[j].value == '') {
                            VistaOutfits.guardarOutfit()
                        } else {
                            VistaOutfits.modificarOutfit()
                        }

                    }

                    botonBorrar[j].onclick = () => {
                        VistaOutfits.borrarOutfit()
                    }
                    //Se puede reutilizar el iterador
                    /* console.log(selectCabeza[j].value); */
                }
                /* for (let l = 0; l < 2; l++) {
                    console.log(selectCabeza[l].value);

                    VistaOutfits.cargarImgPrendaCabeza(selectCabeza[l].value)
                    VistaOutfits.cargarImgPrendaTorso(selectTorso[l].value)
                    VistaOutfits.cargarImgPrendaPiernas(selectPiernas[l].value)
                    VistaOutfits.cargarImgPrendaPies(selectPies[l].value)
                } */

            }, true)


            /* VistaOutfits.cargarImgPrendaCabeza(selectCabeza[0].value)
            VistaOutfits.cargarImgPrendaCabeza(selectCabeza[1].value)
            VistaOutfits.cargarImgPrendaTorso(selectTorso[0].value)
            VistaOutfits.cargarImgPrendaTorso(selectTorso[1].value)
            VistaOutfits.cargarImgPrendaPiernas(selectPiernas[0].value)
            VistaOutfits.cargarImgPrendaPiernas(selectPiernas[1].value)
            VistaOutfits.cargarImgPrendaPies(selectPies[0].value)
            VistaOutfits.cargarImgPrendaPies(selectPies[1].value) */

            $('#panelOutfit select').formSelect()
        }
    }

    //FALTA PASAR VALORES METODOS PARA CARGA DE PRENDAS
    static detectarCambiosSelectYCargar() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')


        for (let i = 0; i < outfitsCargados.length; i++) {

            outfitsCargados[i].addEventListener('change', async () => {

                await VistaOutfits.cargarPrendasCabezaOutfit()

                await VistaOutfits.cargarPrendasTorsoOutfit()

                await VistaOutfits.cargarPrendasPiernasOutfit()

                await VistaOutfits.cargarPrendasPiesOutfit()
            }, true)
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
                VistaOutfits.cargarImgPrendaCabeza(valor)
                console.log(valor);
            }
            selectTorso[i].onchange = () => {
                valor = selectTorso[i].value
                for (let j = 0; j < selectTorso.length; j++) {
                    selectTorso[j].value = valor
                }
                console.log(valor);
                VistaOutfits.cargarImgPrendaTorso(valor)
            }
            selectPiernas[i].onchange = () => {
                valor = selectPiernas[i].value
                for (let j = 0; j < selectPiernas.length; j++) {
                    selectPiernas[j].value = valor
                }
                console.log(valor);
                VistaOutfits.cargarImgPrendaPiernas(valor)
            }
            selectPies[i].onchange = () => {
                valor = selectPies[i].value
                for (let j = 0; j < selectPies.length; j++) {
                    selectPies[j].value = valor
                }
                console.log(valor);
                VistaOutfits.cargarImgPrendaPies(valor)
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

    static cargarImgPrendaCabeza(idPrenda) {
        let cajaImg = document.getElementById('cabezaOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaTorso(idPrenda) {
        let cajaImg = document.getElementById('torsoOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaPiernas(idPrenda) {
        let cajaImg = document.getElementById('piernasOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaPies(idPrenda) {
        let cajaImg = document.getElementById('piesOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
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