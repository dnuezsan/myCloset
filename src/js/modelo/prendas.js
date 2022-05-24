
import { Rest } from '../servicios/rest.js'

/**
 *Clase que gestiona los datos de las prendas
 *
 * @export
 * @class Prendas
 */
export class Prendas {


    /**
     * @constructor
     *Crea una instancia de Prendas
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Prendas
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }
    crear() {
        return Rest.post('pelicula', this)
    }

}