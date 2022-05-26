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
     *Crea una instancia de Usuarios
     * @memberof Usuarios
     */
    constructor() {

    }

    /* static loginUsuario(u, p) {

        let inicioSesion = 'inicioSesion';

        if (u !== "" && p != "") {
            $.ajax(
                {
                    //url:  "http://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                    //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                    //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                    url: "/myCloset/src/php/controlador/controladorBackend.php",
                    type: "POST",
                    data:
                    {
                        propiedad: inicioSesion,
                        user: u,
                        password: p
                    },
                    success: function (responsePHP) {
                        //alert(response.success);
                        //console.log(reponse);
                        let response = JSON.parse(responsePHP);
                        if (response.success == true) {

                            //let response = JSON.parse(responsePHP)

                            if (response.success == true) {

                                localStorage.setItem('sesion', u);// SE GUARDA DE SESION DEL USUARIO
                                localStorage.setItem('us_nombre', response.us_nombre);// SE GUARDA DE SESION NOMBRE DE

                                localStorage.setItem('us_id', response.us_id);
                                //$(location).attr('href', "inicio.html");
                                //mensaje("nsj_1login", "texto_login", "BIENVENIDO" + response.mensaje, "success")
                                console.log(response.mensaje)
                                let mensaje = document.getElementsByClassName('mensaje')[0]
                                let p = document.createElement("p");
                                p.innerHTML = response.mensaje;
                                mensaje.appendChild(p);
                                let panelLogin = document.getElementById('panelLogin')
                                panelLogin.style.display = 'none'
                                let armario = document.getElementById('panelPrendas')
                                armario.style.display = 'flex'
                                return true

                            } else {
                                console.log(response.mensaje)
                                let mensaje = document.getElementById('mensaje')
                                let p = document.createElement("p");
                                p.innerHTML = response.mensaje;
                                mensaje.appendChild(p);


                                //let mensajito = document.getElementById('mensajeLabel');
                                //mensajito.innerHTML = response.mensaje;


                            }

                        }
                    }
                })
        }
    }*/

    /**
         *Procesa los datos del login y devuelve una respuesta
         *
         * @static
         * @param {String} u
         * @param {String} p
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
     *Procesa los datos del registro y devuelve una respuesta
     *
     * @static
     * @param {String} nombre
     * @param {String} correo
     * @param {String} password
     * @param {String} rpassword
     * @memberof Usuarios
     */
    /* static registroUsuario(nombre, correo, password, rpassword) {
        let registrarse = 'registrarse';


        if (nombre !== "" && correo != "" && password != "" && rpassword != "") {
            $.ajax(
                {
                    //url:  "http://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                    //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                    //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                    url: "/myCloset/src/php/controlador/controladorBackend.php",
                    type: "POST",
                    data:
                    {
                        propiedad: registrarse,
                        nombre: nombre,
                        correo: correo,
                        password: password,
                        rpassword: rpassword
                    },
                    success: function (responsePHP) {
                        //alert(response.success);
                        //console.log(reponse);
                        let response = JSON.parse(responsePHP);
                        console.log(response.mensaje);
                        if (response.success == true) {
                            console.log("mensaje")


                            console.log(response.mensaje)
                            let mensaje = document.getElementById('mensaje')
                            let p = document.getElementsByClassName("mensajeLabel");
                            p.innerHTML = response.mensaje;
                            mensaje.appendChild(p);
                            let panelLogin = document.getElementById('panelLogin')
                            panelLogin.style.display = 'none';
                            let panelRegistro = document.getElementById('panelP')
                            panelRegistro.style.display = 'flex';

                        } if (response.success == false) {
                            console.log(response.mensaje)
                            let mensaje = document.getElementById('mensaje')
                            let p = document.createElement("p");
                            p.innerHTML = response.mensaje;
                            mensaje.appendChild(p);




                        }

                    }
                })
        }

    } */


    /**
     *Envía los datos al servidor para registrar al usuario en caso de que todo sea correcto y entrega la respuesta del servidor
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
        console.log(respuestaJson);
        return respuestaJson
    }


    /* static modificacionUsuario(nombre, correo, password, newpassword, rnewpassword) {
        if (password == "" && newpassword == "" && rnewpassword == "") {
            password = 'null';
            newpassword = 'null';
            rnewpassword = 'null';
        }
        let modificarUsuario = 'modificarUsuario';
        $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
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

                },
                success: function (responsePHP) {

                    let response = JSON.parse(responsePHP);
                    console.log(response.mensaje);
                    if (response.success == true) {
                        console.log("modificacion realizada")
                    } else {
                        console.log("Algo fallo al modificar sus datos")
                    }
                }
            })

    } */

    static async modificacionUsuario(nombre, correo, password, newpassword, rnewpassword) {
        console.log(nombre, correo, password, newpassword, rnewpassword);
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
        if (rnewpassword!='' && newpassword!=rnewpassword) {
            error = {
                success: false,
                mensaje: 'Las contraseñas no coinciden'
            }
            return error
        }
        let modificarUsuario = 'modificarUsuario';
        let datosUsuario = await $.ajax(
            {
                //url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                url: "/myCloset/src/php/controlador/controladorBackend.php",
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
        console.log(respuesta);
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
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarDatosUsuario,
                    correo: sessionStorage.sesion
                },
            })
        console.log(datos);
        let datosJson = JSON.parse(datos)
        console.log(datosJson);

        return datosJson
    }

    /* static async cargaDatosUsuario() {
        let cargarDatosUsuario = 'cargarDatosUsuario'
        let datos = await $.ajax(
            {
                //url:  "http://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarDatosUsuario,
                    correo: localStorage.getItem('sesion')

                },
                success: function (responsePHP) {
                    console.log(responsePHP)
                    let response = JSON.parse(responsePHP);
                    console.log(response.mensaje);
                    if (response.success == true) {
                        let nombreUsuario = response.nombreUsuario
                        console.log(nombreUsuario)
                        document.getElementsByName('nombrePerfil').values(nombreUsuario)
                        console.log(response)
                    } else {
                        console.log("dio falso")
                    }
                }
            })

            let datosJson = JSON.parse(datos)

            return datosJson
    } */


    /**
     *Indica al servidor que ha de eliminar al usuario de la sesión iniciada y devuelve la resupuesta
     *
     * @static
     * @return {JSON} 
     * @memberof Usuarios
     */
    static async borrarUsuario() {
        let borrarUsuario = 'borrarUsuario'
        console.log(sessionStorage.getItem('sesion'));
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

        console.log(datosJson);

        return datosJson
    }





}
