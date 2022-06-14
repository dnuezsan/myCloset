'use strict'
import { VistaArmario } from "../vistas/vistaArmario.js";
import { VistaLogin } from "../vistas/vistaLogin.js";
/**
 *Clase que gestiona los datos de los usuario
 *
 * @export
 * @class Usuarios
 */
export class Usuarios {


    /**
     * @constructor
     *
     * @memberof Usuarios
     */
    constructor() {

    }

        /**
         *Valida los datos introducidos por el usuario en el login, los envía al servidor y procesa y retorna la respuesta de este
         *
         * @static
         * @param {String} u Correo del usuario
         * @param {String} p Contraseña del usuario
         * @memberof Usuarios
         */
    static async loginUsuario(u, p) {

        let inicioSesion = 'inicioSesion';

        if (u == '' && p == '') {
            let error = {
                success: false,
                localizacion: 'todos',
                mensaje: 'Por favor rellena los campos'
            }
            return error
        } else if (u == "") {
            let error = {
                success: false,
                localizacion: 'correo',
                mensaje: 'Por favor rellena el campo de "Correo"'
            }
            return error
        } else if (p == "") {
            let error = {
                success: false,
                localizacion: 'clave',
                mensaje: 'Por favor rellena el campo "Contraseña"'
            }
            return error
        }

        let datosUsuario = await $.ajax(
            {
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: inicioSesion,
                    user: u,
                    password: p
                },

            })

        let datosUsuarioJson = JSON.parse(datosUsuario)

        return datosUsuarioJson
    }


    /**
     *Valida los datos introducidos por el usuario en el registro, los envía al servidor; y procesa y retorna la respuesta
     *
     * @static
     * @param {String} nombre
     * @param {String} correo
     * @param {String} password
     * @param {String} rpassword
     * @param {Boolean} casilla
     * @return {JSON}
     * @memberof Usuarios
     */
    static async registroUsuario(nombre, correo, password, rpassword, casilla) {
        let registrarse = 'registrarse';

        if (nombre == '' || correo == '' || password == '' || rpassword == '') {
            let error = {
                success: false,
                localizacion: 'todos',
                mensaje: 'Debes rellenar todos los campos'
            }

            return error

        } else if (!casilla) {
            let error = {
                success: false,
                localizacion: 'casilla',
                mensaje: 'Debes aceptar los términos y condiciones'
            }

            return error
        }


        let respuestaRegistro = await $.ajax(
            {
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: registrarse,
                    nombre: nombre,
                    correo: correo,
                    password: password,
                    rpassword: rpassword
                },
            })

        console.log(respuestaRegistro);
        let respuestaJson = JSON.parse(respuestaRegistro)
        //console.log(respuestaJson);
        return respuestaJson
    }



    /**
     *Valida los datos introducidos por el usuario para modificar sus datos, los envía al servidor, y procesa y retorna la respuesta
     *
     * @static
     * @param {string} nombre
     * @param {string} correo
     * @param {string} password
     * @param {string} newpassword
     * @param {string} rnewpassword
     * @return {JSON} 
     * @memberof Usuarios
     */
    static async modificacionUsuario(nombre, correo, password, newpassword, rnewpassword) {
        //console.log(nombre, correo, password, newpassword, rnewpassword);
        let error
        if (nombre == '') {
            nombre = 'null'
        }
        if (password == "" && newpassword == "" && rnewpassword == "") {
            password = 'null';
            newpassword = 'null';
            rnewpassword = 'null';
        }
        if (newpassword != rnewpassword && newpassword != '') {
            error = {
                success: false,
                mensaje: 'Las contraseñas no coinciden'
            }
            return error
        }
        if (password == '' && newpassword != '') {
            error = {
                success: false,
                mensaje: 'Introduce tu contraseña'
            }
            return error
        }
        if (password != '' && newpassword == '') {
            error = {
                success: false,
                mensaje: 'Introduce tu nueva contraseña'
            }
            return error
        }
        if (rnewpassword != '' && newpassword != rnewpassword) {
            error = {
                success: false,
                mensaje: 'Las contraseñas no coinciden'
            }
            return error
        }
        let modificarUsuario = 'modificarUsuario';
        let datosUsuario = await $.ajax(
            {
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarUsuario,
                    nombre: nombre,
                    correo: correo,
                    password: password,
                    newpassword: newpassword,
                    rnewpassword: rnewpassword

                }

            })

        let respuesta = JSON.parse(datosUsuario)
        //console.log(respuesta);
        return respuesta
    }


    /**
     *Extrae la información del usuario cuya sesión fue iniciada y la retorna
     *
     * @static
     * @return {JSON} datosJson
     * @memberof Usuarios
     */
    static async cargaDatosUsuario() {
        let cargarDatosUsuario = 'cargarDatosUsuario'
        let datos = await $.ajax(
            {
                //url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarDatosUsuario,
                    correo: sessionStorage.sesion
                },
            })
        //console.log(datos);
        let datosJson = JSON.parse(datos)
        //console.log(datosJson);

        return datosJson
    }

    /**
     *Indica al servidor que ha de eliminar al usuario de la sesión iniciada y devuelve la respuesta
     *
     * @static
     * @return {JSON} 
     * @memberof Usuarios
     */
    static async borrarUsuario() {
        let borrarUsuario = 'borrarUsuario'
        let datos = await $.ajax(
            {
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: borrarUsuario,
                    correo: sessionStorage.getItem('sesion')
                },
            })
        let datosJson = JSON.parse(datos)

        return datosJson
    }





}
