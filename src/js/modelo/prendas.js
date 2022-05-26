


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


    /**
     *Metodo que envia datos al servidor para la inserción de una prenda, procesa la respuesta y la devuelve
     *
     * @static
     * @param {string} talla
     * @param {string} descripcion
     * @param {string} categoria
     * @param {string} subcategoria
     * @param {string} imagen
     * @return {JSON} 
     * @memberof Prendas
     */
    static async subidaDePrenda(talla, descripcion, categoria, subcategoria, imagen){
        let subidaDePrenda = 'subidaDePrenda'
        console.log(talla, descripcion, categoria, subcategoria, imagen);
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                    {
                        propiedad: subidaDePrenda,
                        correo:  sessionStorage.sesion,
                        talla: talla,
                        descripcion: descripcion,
                        categoria: categoria,
                        subcategoria: subcategoria,
                        imagen: imagen
                    },
            })
            //console.log(datos);
        let datosJson = JSON.parse(datos)
            //console.log(datosJson);
        return datosJson
    }
}