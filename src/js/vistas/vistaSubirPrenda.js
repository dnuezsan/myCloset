'use strict'
import { Controlador } from "../controlador/controlador.js";
export class VistaSubirPrenda {


    /**
     * Crea una instancia de VistaSubirPrenda.
     * @param {*} controlador
     * @param {*} base
     * @memberof VistaSubirPrenda
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    iniciar() {
        this.cargarFoto()
        this.activarVideo()
        VistaSubirPrenda.subidaDePrenda();
        /*let botonSubirPrenda = document.querySelector('#botonSubirPrenda  .section button')
        botonSubirPrenda.addEventListener('click', VistaSubirPrenda.subidaDePrenda)*/
    }


    /**
     *Muestra el panel para subir prendas y settea la variable "vista"="vistaSubirPrenda"
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static mostrarSubirPrenda() {
        let panel = document.getElementById('panelSubirPrenda')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaSubirPrenda')
    }

    /**
     *Oculta la vista "panelSubirPrendas" y cierra la cámara y el modal en caso de cambiar de vista
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static ocultarSubirPrenda() {
        let video = document.getElementById('elementoVideoSubirPrendas')
        let panel = document.getElementById('panelSubirPrenda')
        let imagen = document.getElementById('img-cropper')
        panel.style.display = 'none'
        if (video.srcObject != null) {
            VistaSubirPrenda.cambioDePanelApagar()
        }
        if (imagen.src != null) {
            VistaSubirPrenda.cambioDePanelCerrarModal()
        }
    }


    /**
     *Llama al método que activa la cámara y muestra el panel de video
     *
     * @memberof VistaSubirPrenda
     */
    activarVideo() {
        /* let snapshot = document.getElementById('snapshotSubirFotos') */
        let snapshot = document.querySelectorAll('.snapshotSubirFotos')
        /* let snapshot = document.getElementById('snapshotSubirFotos') */
        let video = document.getElementById('cajaVideoSubirPrenda')

        snapshot.forEach(icono => {
            icono.onclick = (evento) => {
                video.style.display = 'inline-block'
                this.desaparecerIcono()
                this.realizarVideo()
            }
        })

        /* snapshot.onclick = (evento) => {
            video.style.display = 'inline-block'
            this.realizarVideo()
        } */
    }


    /**
     *Habilita un flujo para grabar, lo asocia a la etiqueta video, e implementa los metodos para capturar una imagen o cerrar el video y el flujo
     *
     * @memberof VistaSubirPrenda
     */
    realizarVideo() {
        let video = document.getElementById('elementoVideoSubirPrendas')
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'

            },
        })
            .then(
                (flujo) => {
                    video.srcObject = flujo
                    let mediaStream = video.srcObject
                    /*let tracks = mediaStream.getTracks()
                    tracks[0].stop() */

                    let medio = video.srcObject

                    /* Captura una imagen del video */
                    this.tomarInstantanea(video, mediaStream)

                    /* detiene el video */
                    this.cerrarVideo(video, mediaStream)
                }
            ).catch((error) => {
                console.log(error);
            })

    }

    /**
     *Configura el canvas, dibuja una instantánea del vídeo en este y transmite el resultado al recortador tras apagar la cámara
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaSubirPrenda
     */
    tomarInstantanea(video, mediaStream) {
        let boton = document.getElementById('capturaSubirPrenda')
        /* let img = document.getElementById('crop-image')
        let input = document.getElementById('base64SubirPrenda')
        let canvas = document.getElementById('canvasSubirPrenda') */
        boton.onclick = () => {
            let canvas = document.getElementById('canvasSubirPrenda')
            let contexto = canvas.getContext('2d')

            /* SOLUCION. USAR CROPPER */
            /* Para que la imagen de canvas tenga altura = anchura usar siguiente linea. Problema relacion de aspecto hace que imagen se vea como presionada*/
            /* video.height = video.width */

            /* Las siguientes lineas son para que la resolucion del canvas se ajuste a la de la camara
            y la imagen se vea con buena relacion de aspecto. problema la imagen no puede formar un circulo perfecto*/
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            contexto.drawImage(video, 0, 0, canvas.width, canvas.height)
            //let imagen = canvas.toDataURL("imagen/jpg")
            /* Se carga la imagen en la etiqueta imagen*/
            //img.src = imagen
            /* Se carga el valor en base64 en el input */
            //input.value = imagen
            this.cerrarVideoApagarCamara(video, mediaStream)
            this.cargarFotoVideo(canvas)
        }
    }

    /**
     *Oculta la etiqueta de video y llama al método que detiene el flujo de la cámara y de la etiqueta video
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaSubirPrenda
     */
    cerrarVideo(video, mediaStream) {
        let boton = document.getElementById('cerrarVideoSubirPrenda')
        boton.onclick = (evento) => {
            let videoCaja = document.getElementById('cajaVideoSubirPrenda')
            videoCaja.style.display = 'none'
            this.cerrarVideoApagarCamara(video, mediaStream)
        }
    }

    /**
     *Detiene el flujo de la etiqueta video y oculta la caja que contiene la etiqueta de video y sus botones
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaSubirPrenda
     */
    cerrarVideoApagarCamara(video, mediaStream) {
        let videoCaja = document.getElementById('cajaVideoSubirPrenda')
        let tracks = mediaStream.getTracks()
        tracks.forEach(track => {
            track.stop()
            this.aparecerIcono()
        })

        video.srcObject = null

        videoCaja.style.display = 'none'
    }

    /**
     *Detiene el flujo de la cámara
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static cambioDePanelApagar() {
        let video = document.getElementById('elementoVideoSubirPrendas')
        let videoCaja = document.getElementById('cajaVideoSubirPrenda')
        //se corta el flujo

        let tracks = video.srcObject.getTracks()
        tracks.forEach(track => {
            track.stop()
            VistaSubirPrenda.aparecerIcono()
            videoCaja.style.display = 'none'
            video.srcObject = null

            //se quita el modal

        })
    }

    /**
     *oculta el panel de recorte y limpia su contenido
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static cambioDePanelCerrarModal() {
        let modal = document.getElementsByClassName('modal')[0]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        let inputFoto = document.getElementById('imagenPrenda')
        let imagen = document.getElementById('img-cropper')
        imagen.src = ''
        inputFoto.value = ''

        modal.className = 'modal remove'
        modalContent.className = 'modal-content remove'
    }

    /* Recortar imagen de galeria */

    /**
     *Configura y prepara la caja de recorte para recibir una imagen y manipularla
     *
     * @memberof VistaSubirPrenda
     */
    cargarFoto() {
        let cropper = null
        let inputFoto = document.getElementById('imagenPrenda')
        let modal = document.getElementsByClassName('modal')[0]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        inputFoto.onchange = (evento) => {
            let imagen = document.getElementById('img-cropper')

            let archivos = inputFoto.files
            //Recorta la extensión del archvo
            let extensiones = inputFoto.value.substring(inputFoto.value.lastIndexOf('.'), inputFoto.value.lenght)
            if (archivos == null) {
                imagen.src = ''
                inputFoto.value = ''
            } else if (inputFoto.getAttribute('accept').split(',').indexOf(extensiones) < 0) {
                alert('Debes seleccionar una imagen')
                inputFoto.value = ''
            } else {
                let imagenUrl = URL.createObjectURL(archivos[0])
                console.log(imagenUrl);
                imagen.src = imagenUrl /*  = 'src/img/armario_vertical.jpg' */

                cropper = new Cropper(imagen, {
                    aspectRatio: 1, //es como queremos que recorte
                    preview: '.img-sample', //contenedor donde se va a ir viendo en tiempo real la imagen cortada
                    zoomable: false, //Para que no haga zoom
                    viewMode: 1, //Para que no estire la imagen del contenedor
                    responsive: false, //Para que no reacomode con zoom la imagen al contenedor
                    dragMode: 'none', // Para que al arrastrar no haga nada
                    ready() { //cropper-container es un clase nativ de cropper.js
                        document.querySelector('.cropper-container').style.width = '100%'
                        document.querySelector('.cropper-container').style.height = '100%'
                    }
                })

                modal.className = 'modal active'
                modalContent.className = 'modal-content active'
                console.log(cropper)
                this.cerrarModal(cropper)
                this.recortarFoto(cropper)

            }
        }
    }

    /**
     *Carga la imagen del video en el panel de recorte
     *
     * @param {canvas} canvas
     * @memberof VistaSubirPrenda
     */
    cargarFotoVideo(canvas) {
        let cropper = null
        //let inputFoto = document.getElementById('imagenPrenda')
        let modal = document.getElementsByClassName('modal')[0]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        let imagen = document.getElementById('img-cropper')


        imagen.src = canvas.toDataURL('imagen/png')

        cropper = new Cropper(imagen, {
            aspectRatio: 1, //es como queremos que recorte
            preview: '.img-sample', //contenedor donde se va a ir viendo en tiempo real la imagen cortada
            zoomable: false, //Para que no haga zoom
            viewMode: 1, //Para que no estire la imagen del contenedor
            responsive: false, //Para que no reacomode con zoom la imagen al contenedor
            dragMode: 'none', // Para que al arrastrar no haga nada
            ready() { //cropper-container es un clase nativ de cropper.js
                document.querySelector('.cropper-container').style.width = '100%'
                document.querySelector('.cropper-container').style.height = '100%'
            }
        })

        modal.className = 'modal active'
        modalContent.className = 'modal-content active'
        console.log(cropper)
        this.cerrarModal(cropper)
        this.recortarFoto(cropper)
    }

    /**
     *Vacía la caja de recorte
     *
     * @param {Object} cropper
     * @memberof VistaSubirPrenda
     */
    cerrarModal(cropper) {
        let modal = document.getElementsByClassName('modal')[0]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        let boton = document.getElementById('close')
        let inputFoto = document.getElementById('imagenPrenda')

        boton.onclick = (evento) => {
            let imagen = document.getElementById('img-cropper')
            imagen.src = ''
            inputFoto.value = ''

            cropper.destroy()

            modal.className = 'modal remove'
            modalContent.className = 'modal-content remove'
        }
    }


    /**
     *Recorta una imagen del canvas, la muestra, pasa al input correspondiente, y vacia la caja de recorte de imagen
     *
     * @param {Object} cropper
     * @memberof VistaSubirPrenda
     */
    recortarFoto(cropper) {

        let modal = document.getElementsByClassName('modal')[0]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        let boton = document.getElementById('cut')
        let inputFoto = document.getElementById('imagenPrenda')
        let inputText = document.getElementById('base64SubirPrenda')

        boton.onclick = (evento) => {
            let cropImagen = document.getElementById('crop-image')
            /* Obtiene la imagen */
            let canvas = cropper.getCroppedCanvas()

            /* Se inserta la imagen obtenida en el canvas en el img */
            /* canvas.toBlob(function (blob) {
                let url = URL.createObjectURL(blob)
                console.log(cropImagen);
                cropImagen.src = url
                console.log(url);
                inputText.value = url
                console.log(inputText.value);
            }) */
            /* Insercion de la imagen en el div y el input */
            let imagenCanvas = canvas.toDataURL('imagen/png')
            console.log(imagenCanvas)
            cropImagen.src = imagenCanvas
            inputText.value = imagenCanvas
            console.log(inputText.value);

            let imagen = document.getElementById('img-cropper')

            imagen.src = ''
            inputFoto.value = ''

            cropper.destroy()

            modal.className = 'modal remove'
            modalContent.className = 'modal-content remove'
            this.aparecerIcono()
        }
    }


    /**
     *Envía datos para subir una rprenda y ecoge y presenta la respuesta
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static subidaDePrenda() {
        let botonSubirPrenda = document.getElementById('botonSubirPrenda')
        let panel = document.getElementById('panelSubirPrenda')

        botonSubirPrenda.addEventListener('click', async function () {
            let tallaSubirPrenda = document.getElementById("tallaSubirPrenda").value;
            let descripcionSubirPrenda = document.getElementById("descripcionSubirPrenda").value
            let base64SubirPrenda = document.getElementById("base64SubirPrenda").value
            let categoria = document.getElementById("categoria").value
            let subCategoria = document.getElementById("subCategoria").value
            console.log(tallaSubirPrenda, descripcionSubirPrenda, categoria, subCategoria, base64SubirPrenda);
            let datos = await Controlador.subidaDePrenda(tallaSubirPrenda, descripcionSubirPrenda, categoria, subCategoria, base64SubirPrenda)
            if (datos.success == true) {
                VistaSubirPrenda.generarMensaje(datos.mensaje)
                panel.addEventListener('click', VistaSubirPrenda.ocultarMensaje, true)
            } else if (datos.success == false) {
                VistaSubirPrenda.generarMensaje(datos.mensaje)
                panel.addEventListener('click', VistaSubirPrenda.ocultarMensaje, true)
            }
        }, true)
    }


    /**
     *Hace desaparecer los iconos para activar el video
     *
     * @memberof VistaSubirPrenda
     */
    desaparecerIcono() {
        let iconos = document.getElementsByClassName("iconoSubirPrenda")

        iconos[2].style.display = 'none'
        iconos[3].style.display = 'none'
    }

    /**
     *Hace aparecer los iconos para activar el video
     *
     * @memberof VistaSubirPrenda
     */
    aparecerIcono() {
        let iconos = document.getElementsByClassName("iconoSubirPrenda")

        iconos[2].style.display = 'block'
        iconos[3].style.display = 'block'
    }

    /**
     *Hace desaparecer los iconos para activar el video
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static desaparecerIcono() {
        let iconos = document.getElementsByClassName("iconoSubirPrenda")

        iconos[2].style.display = 'none'
        iconos[3].style.display = 'none'
    }

    /**
     *Hace aparecer los iconos para activar el video
     *
     * @static
     * @memberof VistaSubirPrenda
     */
    static aparecerIcono() {
        let iconos = document.getElementsByClassName("iconoSubirPrenda")

        iconos[2].style.display = 'block'
        iconos[3].style.display = 'block'
    }


    static generarMensaje(mensaje){
        let cuadroDialogo = document.querySelector('#cuadroDialogoSubirPrenda')
        let cuadroDialogoMensaje = document.querySelector('#cuadroDialogoSubirPrenda p')
        cuadroDialogo.style.display = 'block'
        cuadroDialogoMensaje.innerHTML = mensaje
    }

    static ocultarMensaje(){
        let cuadroDialogo = document.querySelector('#cuadroDialogoSubirPrenda')
        let cuadroDialogoMensaje = document.querySelector('#cuadroDialogoSubirPrenda p')
        cuadroDialogo.style.display = 'none'
        cuadroDialogoMensaje.innerHTML = ''
    }

}