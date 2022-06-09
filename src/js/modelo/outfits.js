
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

    static async guardarOutfit() {
        let propiedad = ""
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    static async modificarOutfit(idOutfit) {
        let propiedad = ""
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    static async borrarOutfit(idOutfit) {
        let propiedad = ""
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson

    }

    static async cargaOutfits(){
        let propiedad = ""
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,



                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

}