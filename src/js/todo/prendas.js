


/**
 *Clase que gestiona los datos de las prendas
 *
 * @export
 * @class Prendas
 */
export class Prendas {


    /**
     * @constructor
     *
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
    static async subidaDePrenda(talla, descripcion, categoria, subcategoria, nombrePrenda, imagen) {
        let subidaDePrenda = 'subidaDePrenda'
        let error

        if (talla == '') {
            error = {
                success: false,
                mensaje: 'Por favor introduce la talla'
            }
            return error
        } else if (categoria == '' || categoria == null) {
            error = {
                success: false,
                mensaje: 'Por favor selecciona el tipo de prenda'
            }
            return error
        } else if (subcategoria == '' || subcategoria == null) {
            error = {
                success: false,
                mensaje: 'Por favor selecciona una categoría. Si no existe, crea una en "categorías"'
            }
            return error
        } else if (imagen == '') {
            error = {
                success: false,
                mensaje: 'Por favor selecciona una imagen'
            }
            return error
        }
        //console.log(talla, descripcion, categoria, subcategoria, nombrePrenda);
        let datos = await $.ajax(
            {
                url: "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: subidaDePrenda,
                    correo: sessionStorage.sesion,
                    talla: talla,
                    descripcion: descripcion,
                    categoria: categoria,
                    subcategoria: subcategoria,
                    nombrePrenda: nombrePrenda,
                    imagen: imagen
                },
            })
        //console.log(datos);
        let datosJson = JSON.parse(datos)
        //console.log(datosJson);
        return datosJson
    }



    /**
     *Envía la petición al servidor para cargas todas las prendas y devuelve la respuesta
     *
     * @static
     * @return {JSON} 
     * @memberof Prendas
     */
    static async cargarMisPrendas() {
        let cargarMisPrendas = 'cargarMisPrendas'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarMisPrendas,
                    correo: sessionStorage.sesion


                },
            })

        let datosJson = JSON.parse(datos)
        return datosJson
    }


    /**
     *Envía la petición y los datos necesarios al servidor para modificar una prenda
     *
     * @static
     * @param {String} descripcion
     * @param {String} talla
     * @param {int} idSubCategoria
     * @param {String} nombrePrenda
     * @param {int} idPrenda
     * @return {JSON} 
     * @memberof Prendas
     */
    static async modificarPrenda(descripcion, talla, idSubCategoria, nombrePrenda, idPrenda) {
        let modificarPrenda = 'modificarPrenda'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarPrenda,
                    correo: sessionStorage.sesion,
                    descripcion: descripcion,
                    talla: talla,
                    idSubcategoria: idSubCategoria,
                    nombrePrenda: nombrePrenda,
                    idPrenda: idPrenda

                },
            })

        let datosJson = JSON.parse(datos)

        return datosJson
    }


    /**
     *Envía la petición y los datos necesarios al servidor para borrar una prenda
     *
     * @static
     * @param {int} idPrenda
     * @return {JSON} 
     * @memberof Prendas
     */
    static async borrarPrenda(idPrenda) {
        let borrarPrenda = 'borrarPrenda'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: borrarPrenda,
                    correo: sessionStorage.sesion,
                    idPrenda: idPrenda


                },
            })

        let datosJson = JSON.parse(datos)

        return datosJson
    }


    /**
     *Envía la petición al servidor para cargar las categorias de las prendas
     *
     * @static
     * @return {JSON} 
     * @memberof Prendas
     */
    static async cargarCategoriasMisPrendas() {
        let cargarCategoriaCategoria = 'cargarCategoriasMisPrendas'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarCategoriaCategoria,
                    correo: sessionStorage.sesion,

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson

    }


    /**
     *
     *
     * @static
     * @param {*} categoria
     * @return {*} 
     * @memberof Prendas
     */
    static async filtrarPrendasPorCategoria(categoria) {
        let cargarCategoria = 'filtrarPrendasPorCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarCategoria,
                    correo: sessionStorage.sesion,
                    categoria: categoria

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía la petición y el id de una subcategoría para cargar las prendas dentro de esta subcategoría
     *
     * @static
     * @param {int} subcategoria
     * @return {JSON} 
     * @memberof Prendas
     */
    static async cargarDatosPrendas(subcategoria) {
        let cargarCategoria = 'cargarNombresPrendas'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarCategoria,
                    correo: sessionStorage.sesion,
                    subcategoria: subcategoria

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

}