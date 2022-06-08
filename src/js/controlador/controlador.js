'use strict'
import { Usuarios } from "../modelo/usuarios.js"
import {Prendas} from "../modelo/prendas.js";
import { Categorias } from "../modelo/categorias.js";

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

    static async subidaDePrenda(talla, descripcion, categoria, subcategoria, nombrePrenda, imagen){

        //console.log(talla, descripcion, categoria, subcategoria, nombrePrenda, imagen)
        return await Prendas.subidaDePrenda(talla, descripcion, categoria, subcategoria, nombrePrenda, imagen)

    }

    static async cargarMisPrendas(){
        let datos = await Prendas.cargarMisPrendas()
        return datos
    }

    static async cargarCategoriasPrendas(){
        let datos = await Categorias.cargarCategoria()
        return datos
    }

    static async cargarSubcategoriasPrendas(categoria){
        let datos = await Categorias.cargarSubCategoria(categoria)
        return datos
    }

    static async cargarNombresPrendas(subcategoria){
        let datos = Prendas.cargarNombresPrendas(subcategoria)
        return datos
    }

    static async cargarCategoriasMisPrendas(){
        let datos = await Prendas.cargarCategoriasMisPrendas()
        return datos
    }

    static async filtrarPrendasPorCategoria(categoria){
        let datos = await Prendas.filtrarPrendasPorCategoria(categoria)
        return datos
    }

    static async borrarPrenda(idPrenda){
        let datos = await Prendas.borrarPrenda(idPrenda)
        return datos
    }

    static async insertarSubcategoria(nombreSubCategoria, idCategoria){
        let datos = await Categorias.insertarSubcategoria(nombreSubCategoria, idCategoria)
        return datos
    }

    static async modificarSubcategoria(nombreSubCategoria, idSubcategoria, idNuevaCategoria){
        let respuesta = Categorias.modificarSubcategoria(nombreSubCategoria, idSubcategoria, idNuevaCategoria)
        return respuesta
    }

}