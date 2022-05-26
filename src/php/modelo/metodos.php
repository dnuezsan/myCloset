<?php


class Metodos
{
    /**
     * Construye una instancia de la clase Metodos
     */
    public function __construct()
    {
        require_once 'Conexion.php';
        $this->conexion = new Conexion();

    }
   
    /**
     * Funcion para dar de alta al usuario
     * @param String $nombre
     * @param String $correo
     * @param String $password
     * @param String $rpassword
     * 
     * @return mixed
     */
    function altaUsuario($nombre, $correo, $password, $rpassword)
    {
        if ($password == $rpassword) {

            $password_encry = password_hash($password, PASSWORD_BCRYPT);
            $insercion = "INSERT INTO usuario(nombre, clave, correo) VALUES ('$nombre','$password_encry', '$correo')";
            $consulta = "SELECT correo FROM usuario WHERE correo LIKE '$correo'";
            $comprobacion = $this->conexion->consultas($consulta);
            //echo $comprobacion = $this->conexion->filasAfectadas()  ;
            //Primero comprobamos si el usuario no existe ya en la base de datos

            if ($this->conexion->numeroFilas($comprobacion) > 0) {
                //echo "Este correo esta ya registrado";
                return false;
            } else {
                //Aqui realizamos el alta del usuario  y si falla el alta devolvemos el numero de error
                if ($this->conexion->consultas($insercion)) {
                    //echo "Se realizo conrrectamente el registro";
                    return true;
                } else {
                    $this->conexion->errno();
                }
            }
        } else {
            //
            //echo "La contraseña no es correcta";
            return false;
        }

    }
    
    //Incio de sesion con consultas preprarada y contraseñas encriptadas
    /**
     * @param mixed $correo
     * @param mixed $password
     * Busca la correspondencia del usuario y contraseña, verifica esta y devuelve la respuesta al modelo
     * @return mixed
     */
    public function iniciarSesion($correo, $password)
    {
        //Creamos al consulta
        $consulta = "SELECT * FROM usuario WHERE correo = ?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            echo "La consulta fallo en su preparacion";
        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("s", $correo)) {
            echo "Fallo en la vinculacion de parametros";
        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            echo "Algo fallo en la ejecucion";

        }
        // Vemos lo que nos devuelve con get_result
        $resultado = $sentencia->get_result();
        if ($this->conexion->numeroFilas($resultado) > 0) {
            while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {

                //Si es correcto la contraseña Inicia la sesion y manda a la pagina home o incio.
                //echo $contrasena;
                if (password_verify($password, $fila['clave'])) {
                    session_start();
                    $_SESSION['usuario'] = $fila['correo'];
                    return true;
                } else {
                    //echo "La contraseña es incorrectos";
                    return false;
                }
            }
        } else {
            //echo "El correo introducido no es correcto";
            return false;
        }

    }




    //Modificamos los datos del usuario ya registrado

    public function modicarUsuario($nombreUsuario,$correo,$password, $newpassword, $rnewpassword){
        $consultaNombre = "UPDATE usuario SET nombre=? WHERE correo = ?";
        $consultaPassword ="UPDATE usuario SET nombre=?, clave=? WHERE correo = ?";
        if ($password !=""&& $newpassword !="" && $newpassword == $rnewpassword){
            if($this->iniciarSesion($correo, $password)){
                //Preparamos con preparaep
                if (!$sentencia = $this->conexion->mysqli->prepare($consultaPassword)) {
                    //echo "La consulta fallo en su preparacion";
                    //return false;

                }
                $password_encry = password_hash($newpassword, PASSWORD_BCRYPT);
                //Pasamos los parametros y el tipo de dato
                if (!$sentencia->bind_param("sss", $nombreUsuario, $password_encry, $correo)) {
                    //echo "Fallo en la vinculacion de parametros";
                    //return false;

                }
                //Ejecutamos con execute
                if (!$sentencia->execute()) {
                    //echo "Algo fallo en la ejecucion";

                    return false;
                }else{
                    return true;
                }
            }

        }/* else{
            //Preparamos con preparae
            if (!$sentencia = $this->conexion->mysqli->prepare($consultaNombre)) {
                //echo "La consulta fallo en su preparacion";
                //return false;

            }
            //Pasamos los parametros y el tipo de dato
            if (!$sentencia->bind_param("ss", $nombreUsuario,$correo)) {
                //echo "Fallo en la vinculacion de parametros";
                //return false;

            }
            //Ejecutamos con execute
            if (!$sentencia->execute()) {
                //echo "Algo fallo en la ejecucion";

                return true;
            }else{
                return true;
            }
        } */
    }
    //Cargamos los datos del usuario para poder modificarlos.
    public function cagarDatosUsuario($correo){
        //Creamos al consulta
        $consulta = "SELECT * FROM usuario WHERE correo = ?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            echo "La consulta fallo en su preparacion";

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("s", $correo)) {
            echo "Fallo en la vinculacion de parametros";
        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            echo "Algo fallo en la ejecucion";

        }
        // Vemos lo que nos devuelve con get_result
        $resultado = $sentencia->get_result();
        if ($this->conexion->numeroFilas($resultado) > 0) {
            while ($fila = $resultado->fetch_array(MYSQLI_ASSOC)) {
                $arrayAsociativo = array(
                    "respuesta" =>true,
                    "respuesta2" => $fila['nombre'],
                    "respuesta3" => $correo
                );


            }
            return $arrayAsociativo;

            }

    }


    function borrarUsuario($correo){
        $consulta ="DELETE FROM usuario WHERE correo= ?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            echo "La consulta fallo en su preparacion";

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("s", $correo)) {
            echo "Fallo en la vinculacion de parametros";
        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            echo "Algo fallo en la ejecucion";
            return false;
        }else{
            return true;
        }
    }




    function cargarMisPrendas(){
        $consulta = "SELECT idPrenda, idUsuario, descripcion, talla, idSubcategoria FROM `prenda` WHERE 1";
    }

    //Aqui cogemos los datos de la Prenda para guardarlos en la base de datos
    function insertarPrendas($subCategoria, $descripcion, $talla, $correo, $imagen){

        $consultaInsertar = "INSERT INTO `prenda`(`idUsuario`, `descripcion`, `talla`, `idSubcategoria`) VALUES ((SELECT idUsuario FROM usuario WHERE correo = ?), ?,?,(SELECT idSubcategoria from subcategoria WHERE nombreSubcategoria = ?))";
        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consultaInsertar)) {
            //echo "La consulta fallo en su preparacion";
            return false;
        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("ssss", $correo,$descripcion,$talla,$subCategoria)) {
            //echo "Fallo en la vinculacion de parametros";
            return false;
        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";
            return false;
        }else if($this->decofificacionImagenes($imagen))
            return true;


    }

    //Metodo para decoficar las imagenes en base64 y guardarlo en la carpeta del servidor
    function decofificacionImagenes($imagen64){
        $consulta = "SELECT MAX(idPrenda) AS id FROM prenda";
        $resultado=  $this->conexion->consultas($consulta);

        $fila = $this->conexion->extraerFila($resultado);
        $nombreImagen= $fila['id'];

        $rutaGuardado ="$nombreImagen.png";
        $ruta = "../imagenes_prendas/$nombreImagen.png";

        $file = fopen($ruta, "w+");
        //Actualizamos la fila de nuestro cuaderno con la nueva ruta
        $data = explode(',', $imagen64);

        //Crear imagen
        fwrite($file, base64_decode($data[1]));
        fclose($file);


        return true;


    }


//Subimos las imagenes y pasamos el parametro Carpeta Destino que es donde se guardadn las imagenes del pedido,
    /**
     * @param mixed $carpetaDestino
     * Procesa y guarda un conjunto de imágenes
     * @return mixed
     */
    function subidaControladaImagenes($carpetaDestino)
    {
        if (isset($_FILES['imagenes'])) {


           foreach ($_FILES["imagenes"]['tmp_name'] as $key => $tmp_name) {
               //Si el archivo contiene algo y es diferente de vacio
               if ($_FILES['imagenes']['name'][$key]) {
                   $archivo = $_FILES['imagenes']['name'][$key];
                   //Obtenemos algunos datos necesarios sobre el archivo
                   $tipo = $_FILES['imagenes']['type'][$key];
                   $tamano = $_FILES['imagenes']['size'][$key];
                   $temp = $_FILES['imagenes']['tmp_name'][$key];
                   //Se comprueba si el archivo a cargar es correcto observando su extensión y tamaño
                   if (!((strpos($tipo, "gif") || strpos($tipo, "jpeg") || strpos($tipo, "jpg") || strpos($tipo, "png")) && ($tamano < 2000000))) {
                       echo '<div><b>Error. La extensión o el tamaño de los archivos no es correcta.<br/>
        - Se permiten archivos .gif, .jpg, .png. y de 200 kb como máximo.</b></div>';
                   } else {
                       //Abrimos la carpeta
                       $dir=opendir($carpetaDestino);
                       //Si la imagen es correcta en tamaño y tipo
                       //Se intenta subir al servidor
                       if (move_uploaded_file($temp, $carpetaDestino."/" .$archivo)) {
                           //Cambiamos los permisos del archivo a 777 para poder modificarlo posteriormente
                           //chmod('images/'.$archivo, 0777);
                           //Mostramos el mensaje de que se ha subido co éxito
                           echo '<p>Se ha subido correctamente la imagen.</p>';
                           //Mostramos la imagen subida
                            echo '<div id="imagenesSubidas" style="width: 500px;"><img src="'.$carpetaDestino.'/' . $archivo . '"></div>';
                       } else {
                           //Si no se ha podido subir la imagen, mostramos un mensaje de error
                           echo '<div><b>Ocurrió algún error al subir el fichero. No pudo guardarse.</b></div>';
                       }
                       //cerrramos el fichero
                       closedir($dir);
                   }
               }
           }
           echo"<a class='subir' href='home.php'>Terminar Pedido</a>";
        }
    }
    // Con este metodo generamos la carpeta del pedido
    /**
     * Genera una carpeta para usuario
     * @return mixed
     */
    function crearCarpetaPedido()
    {
        //samamos +1 al ultimo pedido para generar la nueva carpeta que es el id
        $estructura = $this->ultimoPedido() + 1;
        //lo hacemos con mkdir y le damos permisos
        if (!mkdir($estructura, 0777, true)) {
            echo "Fallo al crear la carpeta";
        } else {
            //creamos el pedido una vez generada la carpeta
            $this->crearPedido();
        }
        return $estructura;
    }
    //Aqui devolvemos el ultimo pedido realizado

    /**
     * Encuentra el último registro
     * @return int
     */
    function ultimoPedido()
    {

        $consulta = "SELECT MAX(idPedido) as idPedido FROM pedidos WHERE 1";

        $resultado = $this->conexion->consultas($consulta);

        while ($fila = $this->conexion->extraerFila($resultado)) {
            //echo $fila['idPedido'] ;
            if ($fila['idPedido'] != 0) {
                return $fila['idPedido'];
            } else {
                return 0;
            }

        }


    }
    //Generamos el pedido con esta funcion
    /**
     * @return mixed
     */
    function crearPedido(){
        //Cogemos el usuario de la sesion para crear el pedido con su idCliente
        $cliente = $_SESSION['usuario'];
        $buscarCliente = "SELECT idCliente FROM clientes WHERE correo LIKE '$cliente' ";
        if ($resultado = $this->conexion->consultas($buscarCliente)) {
            while ($fila = $this->conexion->extraerFila($resultado))
                $idcliente = $fila['idCliente'];
            $insertarPedido = "INSERT INTO pedidos( idCliente) VALUES ($idcliente)";
            if (!$this->conexion->consultas($insertarPedido)) {
                echo "Un error al crear el pedido";
            }
        }
    }




}