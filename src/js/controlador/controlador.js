'use strict'
import { Usuarios } from "../modelo/usuarios.js"
import {Prendas} from "../modelo/prendas.js";
/**
 *
 *Comunica el modelo con la vista
 * @export
 * @class Controlador
 */
export class Controlador {

    /**
     * @constructor
     *Crea una instancia de la clase Controlador
     * @memberof Controlador
     */
    constructor() {

    }


    /**
     *
     *Recibe los datos de login de la vista, los envía al modelo y devuelve la respuesta de este
     * @static
     * @param {String} u
     * @param {String} p
     * @memberof Controlador
     */
    static async loginUsuario(u, p) {
        let datos = await Usuarios.loginUsuario(u, p);
        console.log(datos);
        return datos
    }

    
    /**
     *Recibe los datos de registro de la vista, los envía al modelo y devuelve la respuesta de este
     *
     * @static
     * @param {String} nombre
     * @param {String} correo
     * @param {String} password
     * @param {String} rpassword
     * @param {Boolean} casilla
     * @return {JSON} 
     * @memberof Controlador
     */
    static async registraUsuario(nombre, correo, password, rpassword, casilla) {
        let respuesta = await Usuarios.registroUsuario(nombre, correo, password, rpassword, casilla);
        return respuesta
    }



    /**
     *Recibe los datos de modificación de la vista, los envía al modelo y devuelve la respuesta de este
     *
     * @static
     * @param {String} nombre
     * @param {String} correo
     * @param {String} password
     * @param {String} newpassword
     * @param {String} rnewpassword
     * @memberof Controlador
     */
    static async modificacionUsuario(nombre, correo, password, newpassword, rnewpassword) {
        console.log('entro control')
        let datos = await Usuarios.modificacionUsuario(nombre, correo, password, newpassword, rnewpassword)
        console.log(datos);
        return datos
    }


    /**
     *Recibe del modelo los datos del usuario entregados en el servidor y los retorna a la vista
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarDatosUsuario() {
        let datos = await Usuarios.cargaDatosUsuario()
        //console.log(datos);
        return datos
    }


    /**
     *Envía al modelo la informacion del usuario para borrar y devuelve la respuesta de la operación
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async borrarUsuario() {
        return await Usuarios.borrarUsuario()
    }

    static async subidaDePrenda(talla, descripcion, categoria, subcategoria, imagen){

        console.log(talla, descripcion, categoria, subcategoria, imagen)
        return await Prendas.subidaDePrenda(talla, descripcion, categoria, subcategoria, imagen)

    }

}