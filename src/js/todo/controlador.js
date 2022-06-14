'use strict'
import { Usuarios } from "../modelo/usuarios.js"
import {Prendas} from "../modelo/prendas.js";
import { Categorias } from "../modelo/categorias.js";
import { Outfits } from "../modelo/outfits.js";

/**
 *
 *Comunica el modelo con la vista
 * @export
 * @class Controlador
 */
export class Controlador {

    /**
     * @constructor
     *
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
        let datos = await Usuarios.modificacionUsuario(nombre, correo, password, newpassword, rnewpassword)
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

    /**
     *
     *Devuelve el conjunto de prendas pertenecientes a un usuario junto con los datos de las mismas
     * @static 
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarMisPrendas(){
        let datos = await Prendas.cargarMisPrendas()
        return datos
    }

    /**
     *
     *Carga las categorías almacenadas en la BD
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarCategoriasPrendas(){
        let datos = await Categorias.cargarCategoria()
        return datos
    }


    /**
     *Envía los datos al modelo para cargar las subcategorías y sus datos, para las prendas de un usuario
     *
     * @static
     * @param {String} categoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarSubcategoriasPrendas(categoria){
        let datos = await Categorias.cargarSubCategoria(categoria)
        return datos
    }

    /**
     *Envía al modelo los datos para extraer los datos de las prendas y devuelve la respuesta
     *
     * @static
     * @param {int} subcategoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarDatosPrendas(subcategoria){
        let datos = Prendas.cargarDatosPrendas(subcategoria)
        return datos
    }

    /**
     *Carga las categorías guardadas en la BD 
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarCategoriasMisPrendas(){
        let datos = await Prendas.cargarCategoriasMisPrendas()
        return datos
    }

    /**
     *Envia los datos al modelo para cargar las prendas que pertenecen a una determinada categoría y usuario y devuelve la respuesta
     *
     * @static
     * @param {String} categoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async filtrarPrendasPorCategoria(categoria){
        let datos = await Prendas.filtrarPrendasPorCategoria(categoria)
        return datos
    }

    /**
     *Envía los datos al modelo para modificar una prenda de un determinado usuario y devuelve la respuesta
     *
     * @static
     * @param {String} descripcion
     * @param {String} talla
     * @param {int} idSubcategoria
     * @param {String} nombrePrenda
     * @param {int} idPrenda
     * @return {JSON} 
     * @memberof Controlador
     */
    static async modificarPrenda(descripcion, talla, idSubcategoria, nombrePrenda, idPrenda){
        let respuesta = await Prendas.modificarPrenda(descripcion, talla, idSubcategoria, nombrePrenda, idPrenda)
        return respuesta
    }

    /**
     *Envía los datos al modelo para borrar la prenda de un usuario y devuelve la respuesta
     *
     * @static
     * @param {int} idPrenda
     * @return {JSON} 
     * @memberof Controlador
     */
    static async borrarPrenda(idPrenda){
        let datos = await Prendas.borrarPrenda(idPrenda)
        return datos
    }

    /**
     *Envía la información necesaria al modelo para insertar una subcategoría para un usuarío dentro de una determinada categoría y retorna la respuesta
     *
     * @static
     * @param {String} nombreSubCategoria
     * @param {int} idCategoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async insertarSubcategoria(nombreSubCategoria, idCategoria){
        let datos = await Categorias.insertarSubcategoria(nombreSubCategoria, idCategoria)
        return datos
    }

    /**
     *Envía lo datos requeridos al modelo para cambiar los atributos de una subcategoría y devuelve la respuesta
     *
     * @static
     * @param {String} nombreSubCategoria
     * @param {int} idSubcategoria
     * @param {int} idNuevaCategoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async modificarSubcategoria(nombreSubCategoria, idSubcategoria, idNuevaCategoria){
        let respuesta = Categorias.modificarSubcategoria(nombreSubCategoria, idSubcategoria, idNuevaCategoria)
        return respuesta
    }

    /**
     *Envía los datos al modelo para cambiar la subcategoría de categoría y devuleve la respuesta de la operación
     *
     * @static
     * @param {int} idSubcategoria
     * @param {int} idNuevaCategoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async modificarCambioSubcategoria(idSubcategoria, idNuevaCategoria){
        let respuesta = Categorias.modificarCambioSubcategoria(idSubcategoria, idNuevaCategoria)
        return respuesta
    }

    /**
     *Envía los datos al modelo para eliminar una subcategoría perteneciente a un usuario y devuelve la respuesta de la operación
     *
     * @static
     * @param {int} idSubcategoria
     * @return {JSON} 
     * @memberof Controlador
     */
    static async borrarSubcategoria(idSubcategoria){
        let respuesta = await Categorias.borrarSubcategoria(idSubcategoria)
        return respuesta
    }

    /**
     *Envía la petición al modelo para cargar todos los outfits de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargaOutfits(){
        let respuesta = await Outfits.cargaOutfits()
        return respuesta
    }

    /**
     *Transmite petición al modelo para cargar las prendas de la cabeza que pertenecen a un determinado usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasCabeza(){
        let respuesta = await Outfits.cargarPrendasCabeza()
        return respuesta
    }

    /**
     *Transmite petición al modelo para cargar las prendas del torso que pertenecen a un determinado usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasTorso(){
        let respuesta = await Outfits.cargarPrendasTorso()
        return respuesta
    }

    /**
     *
     * Transmite petición al modelo para cargar las prendas de las piernas que pertenecen a un determinado usuario
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasPiernas(){
        let respuesta = await Outfits.cargarPrendasPiernas()
        return respuesta
    }

    /**
     *Transmite petición al modelo para cargar las prendas de los pies que pertenecen a un determinado usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasPies(){
        let respuesta = await Outfits.cargarPrendasPies()
        return respuesta
    }

    /**
     *Envía los datos necesarios al modelo para cargar la prenda de la cabeza que pertenece a un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasCabezaOutfit(idOutfit){
        let respuesta = await Outfits.cargarPrendasCabezaOutfit(idOutfit)
        return respuesta
    }

    /**
     *Envía los datos necesarios al modelo para cargar la prenda del torso que pertenece a un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasTorsoOutfit(idOutfit){
        let respuesta = await Outfits.cargarPrendasTorsoOutfit(idOutfit)
        return respuesta
    }

    /**
     *Envía los datos necesarios al modelo para cargar la prenda de las piernas que pertenece a un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async cargarPrendasPiernasOutfit(idOutfit){
        let respuesta = await Outfits.cargarPrendasPiernasOutfit(idOutfit)
        return respuesta
    }


    /**
     *Envía los datos necesarios al modelo para cargar la prenda de los pies que pertenece a un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idOutfit
     * @return {json} 
     * @memberof Controlador
     */
    static async cargarPrendasPiesOutfit(idOutfit){
        let respuesta = await Outfits.cargarPrendasPiesOutfit(idOutfit)
        return respuesta
    }

    /**
     *Envía los datos del outfit al modelo para modificar este y devuelve la respuesta de la operación
     *
     * @static
     * @param {int} idPrenda
     * @param {String} nombreOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async insertarOutfit(idPrenda, nombreOutfit){
        let respuesta = await Outfits.insertarOutfit(idPrenda, nombreOutfit)
        return respuesta
    }


    /**
     *Envía los datos del outfit al modelo para modificar este y devuelve la respuesta de la operación
     *
     * @static
     * @param {int} idPrenda
     * @param {int} idPrendaNueva
     * @param {int} idOutfit
     * @param {String} nombreOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async modificarOutfit(idPrenda, idPrendaNueva, idOutfit, nombreOutfit){
        let respuesta = await Outfits.modificarOutfit(idPrenda, idPrendaNueva, idOutfit, nombreOutfit)
        return respuesta
    }

    /**
     *Transmite al modelo los datos un outfit para borrarlo y devuelve la respuesta del proceso
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async borrarOutfit(idOutfit){
        let respuesta = await Outfits.borrarOutfit(idOutfit)
        return respuesta
    }


    /**
     *Envía los datos al modelo para crear un outfit y devuelve la repuesta
     *
     * @static
     * @param {Array} arrayIdPrendas
     * @param {String} nombreOufit
     * @return {JSON} 
     * @memberof Controlador
     */
    static async insertarPrendasOutfit(arrayIdPrendas, nombreOufit){
        let respuesta = Outfits.insertarPrendasOutfit(arrayIdPrendas, nombreOufit)
        return respuesta
    }

}