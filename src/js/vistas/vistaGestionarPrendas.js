'use strict'

export class VistaGestionarPrendas {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {
        this.cargarFoto()
        this.activarVideo()
    }

    static mostrarGestionarPrendas() {
        let panel = document.getElementById('panelGestionPrendas')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaGestionarPrendas')
    }

    static ocultarGestionarPrendas() {
        let panel = document.getElementById('panelGestionPrendas')
        panel.style.display = 'none'
    }

    activarVideo() {
        /* let snapshot = document.getElementById('snapshotGestionFotos') */
        let snapshot = document.querySelectorAll('.snapshotGestionFotos')
        /* let snapshot = document.getElementById('snapshotGestionFotos') */
        let video = document.getElementById('cajaVideoGestionPrenda')

        snapshot.forEach(icono => {
            icono.onclick = (evento) => {
                video.style.display = 'inline-block'
                this.realizarVideo()
            }
        })

        /* snapshot.onclick = (evento) => {
            video.style.display = 'inline-block'
            this.realizarVideo()
        } */
    }

    realizarVideo() {
        let video = document.getElementById('elementoVideoGestionPrendas')

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

    tomarInstantanea(video, mediaStream) {
        let boton = document.getElementById('capturaGestionPrenda')
        let img = document.getElementById('crop-imageGestion')
        let input = document.getElementById('base64GestionPrenda')

        boton.onclick = () => {
            let canvas = document.getElementById('canvasGestionPrenda')
            let contexto = canvas.getContext('2d')

            /* SOLUCION. USAR CROPPER */
            /* Para que la imagen de canvas tenga altura = anchura usar siguiente linea. Problema relacion de aspecto hace que imagen se vea como presionada*/
            /* video.height = video.width */

            /* Las siquientes lineas son para que la resolucion del canvas se ajuste a la de la camara
            y la imagen se vea con buena relacion de aspecto. problema la imagen no puede formar un circulo perfecto*/
            /* canvas.width = video.videoWidth
            canvas.height = video.videoHeight */

            contexto.drawImage(video, 0, 0, canvas.width, canvas.height)
            let imagen = canvas.toDataURL("imagen/jpg")
            /* Se carga la imagen en la etiqueta imagen*/
            img.src = imagen
            /* Se carga el valor en base64 en el input */
            input.value = imagen
            console.log(input.value);

            this.cerrarVideoApagarCamara(video, mediaStream)
        }
    }

    cerrarVideo(video, mediaStream) {
        let boton = document.getElementById('cerrarVideoGestionPrenda')
        boton.onclick = (evento) => {
            let videoCaja = document.getElementById('cajaVideoGestionPrenda')
            videoCaja.style.display = 'none'
            this.cerrarVideoApagarCamara(video, mediaStream)
        }
    }

    cerrarVideoApagarCamara(video, mediaStream) {
        let videoCaja = document.getElementById('cajaVideoGestionPrenda')
        let tracks = mediaStream.getTracks()
        tracks.forEach(track => {
            track.stop()
        })

        video.srcObject = null

        videoCaja.style.display = 'none'
    }


    /* Recortar imagen de galeria */
    cargarFoto() {
        let cropper = null
        let inputFoto = document.getElementById('imagenGestionPrenda')
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        inputFoto.onchange = (evento) => {
            let imagen = document.getElementById('img-cropperGestion')

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

    cerrarModal(cropper) {
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[0]
        let boton = document.getElementById('closeGestion')
        let inputFoto = document.getElementById('imagenGestionPrenda')

        boton.onclick = (evento) => {
            let imagen = document.getElementById('img-cropperGestion')
            imagen.src = ''
            inputFoto.value = ''

            cropper.destroy()

            modal.className = 'modal remove'
            modalContent.className = 'modal-content remove'
        }
    }

    recortarFoto(cropper) {

        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        let boton = document.getElementById('cutGestion')
        let inputFoto = document.getElementById('imagenGestionPrenda')
        let inputText = document.getElementById('base64GestionPrenda')

        boton.onclick = (evento) => {
            let cropImagen = document.getElementById('crop-imageGestion')
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
        }
    }

}