

/**
 *Clase que gestiona los datos de las subcategorias
 *
 * @export
 * @class Subcategorias
 */
export class Categorias {

    /**
     * @constructor
     *
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Subcategorias
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }
    

    /**
     *Devuelve las categorias extraídas del servidor
     *
     * @static
     * @return {JSON} 
     * @memberof Categorias
     */
    static async cargarCategoria() {

        let cargarCategoria = 'cargarCategoria'
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

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }


    /**
     *Envía los datos al servidor y carga devuelve la subcategoría proporcionada
     *
     * @static
     * @param {int} categoria
     * @return {JSON} 
     * @memberof Categorias
     */
    static async cargarSubCategoria(categoria) {
        let cargarSubCategoria = 'cargarSubCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: cargarSubCategoria,
                    correo: sessionStorage.sesion,
                    categoria: categoria,

                },
            })
        //console.log(datos);
        let datosJson = JSON.parse(datos)
        //console.log(datosJson);
        return datosJson
    }


    /**
     *Envía los datos al servidor para que inserte una subcategoría y devuelve la respuesta
     *
     * @static
     * @param {String} nombreSubCategoria
     * @param {int} idCategoria
     * @return {JSON} 
     * @memberof Categorias
     */
    static async insertarSubcategoria(nombreSubCategoria, idCategoria) {
        let insertarSubCategoria = 'insertarSubCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: insertarSubCategoria,
                    correo: sessionStorage.sesion,
                    nombreSubcategoria: nombreSubCategoria,
                    idCategoria: idCategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para que modifique una subcategoría y devuelve la respuesta
     *
     * @static
     * @param {String} nombreSubCategoria
     * @param {int} idSubcategoria
     * @param {int} idNuevaCategoria
     * @return {JSON} 
     * @memberof Categorias
     */
    static async modificarSubcategoria(nombreSubCategoria, idSubcategoria, idNuevaCategoria) {
        let modificarSubCategoria = 'modificarSubCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarSubCategoria,
                    correo: sessionStorage.sesion,
                    nombreSubcategoria: nombreSubCategoria,
                    idCategoria: idNuevaCategoria,
                    idSubcategoria: idSubcategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para que cambie una subcategoría de categoría y devuelve la respuesta
     *
     * @static
     * @param {int} idSubcategoria
     * @param {int} idNuevaCategoria
     * @return {JSON} 
     * @memberof Categorias
     */
    static async modificarCambioSubcategoria(idSubcategoria, idNuevaCategoria) {
        let modificarSubCategoria = 'modificarCambioSubCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarSubCategoria,
                    correo: sessionStorage.sesion,
                    idCategoria: idNuevaCategoria,
                    idSubcategoria: idSubcategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para que borre una subcategoría y devuelve la respuesta
     *
     * @static
     * @param {int} idSubCategoria
     * @return {JSON} 
     * @memberof Categorias
     */
    static async borrarSubcategoria(idSubCategoria) {
        let borrarSubCategoria = 'borrarSubCategoria'
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: borrarSubCategoria,
                    correo: sessionStorage.sesion,
                    idSubCategoria: idSubCategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }
}