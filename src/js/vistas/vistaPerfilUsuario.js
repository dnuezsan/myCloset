'use strict'
import { Controlador } from "../controlador/controlador.js";
import { VistaLogin } from "./vistaLogin.js";
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js";

export class VistaPerfilUsuario {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {
        console.log('iniciar')
        //VistaPerfilUsuario.modificarUsuario()
        let botonModifiacarUsuario = document.querySelector("#panelPerfilUsuario .section button")
        botonModifiacarUsuario.addEventListener('click', VistaPerfilUsuario.modificarUsuario)
        /* let botonBorrar = document.getElementById('borrarUsuario')
        botonBorrar.addEventListener('click', VistaPerfilUsuario.borrarUsuario) */
        VistaPerfilUsuario.modificarUsuario()
        VistaPerfilUsuario.borradoConfirmacion()
        VistaPerfilUsuario.borrarUsuario()
    }


    static ocultarPerfilUsuario() {
        let perfilUsuario = document.getElementById('panelPerfilUsuario')
        perfilUsuario.style.display = 'none'
        VistaPerfilUsuario.ocultarCuadroConfirmacion()
    }

    static async mostrarPerfilUsuario() {
        let perfilUsuario = document.getElementById('panelPerfilUsuario')
        perfilUsuario.style.display = 'flex'
        VistaPerfilUsuario.bloquearInputCorreo()
        await VistaPerfilUsuario.mostrarDatosUsuario()
        localStorage.setItem('vista', 'vistaPerfilUsuario')
    }


    static bloquearInputCorreo() {
        let inputCorreo = document.getElementById('correoPerfil')

        inputCorreo.onclick = () => {
            inputCorreo.setAttribute('readonly', "true")
        }

    }


    /**
     *Modifica los datos del usuario
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static modificarUsuario() {
        let botonModificarUsuario = document.querySelector("#panelPerfilUsuario .section button")
        let panelPerfilUsuario = document.getElementById('panelPerfilUsuario')
        let contenedor = document.querySelector('#panelPerfilUsuario .container')
        let nom = document.getElementById("nombrePerfil")
        let nombre = document.getElementById("nombrePerfil").value;
        let correo = document.getElementById("correoPerfil").value;
        let password = document.getElementById("contraseniaPerfil").value;
        let newpassword = document.getElementById("contraseniaNuevaPerfil").value;
        let rnewpassword = document.getElementById("contraseniaRepetidaPerfil").value;

        botonModificarUsuario.onclick = async (evento) => {
            let respuesta = await Controlador.modificacionUsuario(nombre, correo, password, newpassword, rnewpassword)

            if (respuesta.success == true) {
                VistaPerfilUsuario.actualizacionCuadroConfirmacion(respuesta.mensaje)
                panelPerfilUsuario.onclick = (evento) => {
                    VistaPerfilUsuario.ocultarCuadroConfirmacion()
                }
            }

            if (respuesta.success == false) {
                VistaPerfilUsuario.actualizacionCuadroConfirmacion(respuesta.mensaje)
               panelPerfilUsuario.ondblclick = (evento) => {
                    VistaPerfilUsuario.ocultarCuadroConfirmacion()
                }
            }
        }

    }


    /* static modificacionUsuarioIntro() {
        let inputs = document.querySelectorAll('#panelPerfilUsuario .section input')

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].onkeydown = (evento) => {
                if (evento.key === "Enter") {
                    VistaPerfilUsuario.modificarUsuario()
                }
            }

        }
    } */

    static async mostrarDatosUsuario() {
        let datos = await Controlador.cargarDatosUsuario()
        let inputNombre = document.getElementById('nombrePerfil')
        let inputCorreo = document.getElementById('correoPerfil')

        inputNombre.value = datos.nombreUsuario
        inputCorreo.value = datos.correo

    }


    /* static borrarUsuario() {
        let botonBorrar = document.getElementById('botonBorrarUsuario')
        let botonCancelar = document.getElementById('botonCancelarBorrarUsuario')

        botonBorrar.addEventListener('click', async () => {
            let respuesta = await Controlador.borrarUsuario()

            if (respuesta.success == true) {
                VistaPerfilUsuario.borradoCuadroConfirmacion(respuesta.mensaje)

            } else if (respuesta.success == false) {

            }

        }
        )
    } */

    static borrarUsuario() {
        let botonBorrarUsuario = document.getElementById('botonBorrarUsuario')
        let botonCancelar = document.getElementById('botonCancelarBorrarUsuario')
        botonBorrarUsuario.onclick = async (evento) => {
            let respuesta = await Controlador.borrarUsuario()
            console.log(respuesta);
            if (respuesta.success == true) {
                sessionStorage.setItem('sesion', '')
                if (location.reload) {
                    localStorage.setItem('vista', VistaMenuPrincipal.ocultarPaneles())
                    localStorage.getItem('vista')
                    localStorage.setItem('vista', 'vistaPerfilUsuario')
                }
            } else {
                console.log('no se pudo eliminar la cuenta');
            }

        }

        botonCancelar.addEventListener('click', () => {
            VistaPerfilUsuario.ocultarCuadroConfirmacion()
        }
        )

    }

    /**
     *Muestra el cuadro de confirmación
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static mostrarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoPerfilUsuario')
        cuadro.style.display = 'block'
    }

    /**
     *Oculta el cuadro de confirmación
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static ocultarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoPerfilUsuario')
        cuadro.style.display = 'none'
    }


    static actualizacionCuadroConfirmacion(mensaje) {
        let mensajeActualizacion = document.querySelectorAll('#panelPerfilUsuario .cambio')[0]
        mensajeActualizacion.innerHTML = mensaje
        mensajeActualizacion.style.display = 'inline-block'
        VistaPerfilUsuario.mostrarCuadroConfirmacion()
    }

    static borradoConfirmacion() {
        let mensajeBorrado = document.querySelectorAll('#panelPerfilUsuario .conjuntoBorrado')[0]
        let botonBorrado = document.querySelectorAll('#panelPerfilUsuario #borrarUsuario')[0]
        botonBorrado.onclick = (evento) => {
            mensajeBorrado.style.display = 'inline-block'
            console.log(mensajeBorrado);
            VistaPerfilUsuario.mostrarCuadroConfirmacion()
        }
    }

}