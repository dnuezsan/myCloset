
import { Rest } from '../servicios/rest.js'

/**
 *Clase que gestiona los datos de los outfits
 *
 * @export
 * @class Outfits
 */
export class Outfits {


    /**
     * @constructor
     *Crea una instancia de Outfits
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Outfits
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }
    
    crear() {
        return Rest.post('pelicula', this)
    }
}