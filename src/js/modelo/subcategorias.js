
import { Rest } from '../servicios/rest.js'

/**
 *Clase que gestiona los datos de las subcategorias
 *
 * @export
 * @class Subcategorias
 */
export class Subcategorias {

    /**
     * @constructor
     *Crea una instancia de Subcategorias
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Subcategorias
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }
    crear() {
        return Rest.post('pelicula', this)
    }
}