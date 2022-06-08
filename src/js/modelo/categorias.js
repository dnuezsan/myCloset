

/**
 *Clase que gestiona los datos de las subcategorias
 *
 * @export
 * @class Subcategorias
 */
export class Categorias {

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

    static async cargarCategoria() {

        let cargarCategoria = 'cargarCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
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

    static async cargarSubCategoria(categoria) {
        let cargarSubCategoria = 'cargarSubCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
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

    static async insertarSubcategoria(nombreSubCategoria, idCategoria) {
        let insertarSubCategoria = 'insertarSubCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
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

    static async modificarSubcategoria(nombreSubCategoria, idCategoria) {
        let modificarSubCategoria = 'modificarSubCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarSubCategoria,
                    correo: sessionStorage.sesion,
                    nombresubcategoria: nombreSubCategoria,
                    idCategorias: idCategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    static async borrarSubcategoria(idSubCategoria) {
        let borrarSubCategoria = 'borrarSubCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: borrarSubCategoria,
                    correo: sessionStorage.sesion,
                    idSubCategorias: idSubCategoria


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }
}