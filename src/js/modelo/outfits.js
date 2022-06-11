
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

    static async insertarOutfit() {
        let insertarOutfit = "insetarOutfit"
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: insertarOutfit,
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
        let borrarOutfit = "borrarOutfit"
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: borrarOutfit,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson

    }

    static async cargaOutfits(){
        let propiedad = "cargarOutfits"
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

    static async cargarPrendasCabeza(){
        let propiedad = "cargarPrendasCabeza"
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

    static async cargarPrendasTorso(){
        let propiedad = "cargarPrendasTorso"
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

    static async cargarPrendasPiernas(){
        let propiedad = "cargarPrendasPiernas"
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

    static async cargarPrendasPies(){
        let propiedad = "cargarPrendasPies"
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

    static async cargarPrendasCabezaOutfit(idOutfit){
        let propiedad = "cargarPrendasCabezaOufit"
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

    static async cargarPrendasTorsoOutfit(idOutfit){
        let propiedad = "cargarPrendasTorsoOufit"
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

    static async cargarPrendasPiernasOutfit(idOutfit){
        let propiedad = "cargarPrendasPiernasOufit"
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

    static async cargarPrendasPiesOutfit(idOutfit){
        let propiedad = "cargarPrendasPiesOufit"
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

}