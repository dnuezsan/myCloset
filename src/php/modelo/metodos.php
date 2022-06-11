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
     * Inserta un usuario un usuario en la BD despues de validar las contraseña y encriptarla
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

    /**
     * @param String $nombreUsuario
     * @param String $correo
     * @param String $password
     * @param String $newpassword
     * @param String $rnewpassword
     * Valida los parámetros y actualiza los datos de un usuario en la tabla "usuario"
     * @return boolean
     */
    public function modicarUsuario($nombreUsuario, $correo, $password, $newpassword, $rnewpassword){

        $consultaNombre = "UPDATE usuario SET nombre=? WHERE correo = ?";
        $consultaPassword = "UPDATE usuario SET nombre=?, clave=? WHERE correo = ?";

        if ($password !='null' && $newpassword !='null' && $newpassword == $rnewpassword) {

            if ($this->iniciarSesion($correo, $password)) {
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
                } else {
                    return true;
                }
            }
        } else {

            if (!$sentencia = $this->conexion->mysqli->prepare($consultaNombre)) {
                //echo "La consulta fallo en su preparacion";
                return false;

            }
            //Pasamos los parametros y el tipo de dato
            if (!$sentencia->bind_param("ss", $nombreUsuario, $correo)) {
                //echo "Fallo en la vinculacion de parametros";
                return false;

            }
            //Ejecutamos con execute
            if (!$sentencia->execute()) {
                //echo "Algo fallo en la ejecucion";

                return false;
            } else {
                return true;
            }
        }
    }
    //Cargamos los datos del usuario para poder modificarlos.
    /**
     * @param String $correo
     * Busca los datos del usuario y devuelve un array con estos
     * @return mixed
     */
    public function cagarDatosUsuario($correo)
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
                $arrayAsociativo = array(
                    "respuesta" => true,
                    "respuesta2" => $fila['nombre'],
                    "respuesta3" => $correo
                );
            }
            return $arrayAsociativo;
        }
    }


    /**
     * @param mixed $correo
     * Borra la cuenta de un usuario
     * @return mixed
     */
    function borrarUsuario($correo)
    {
        $consulta = "DELETE FROM usuario WHERE correo= ?";

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
        } else {
            return true;
        }
    }

    function cargarCategorias()
    {
        $consulta = "SELECT idCategoria, nombreCategoria FROM `categoria` WHERE 1";
        $resultado = $this->conexion->consultas($consulta);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idCategoria" => $fila['idCategoria'],
                 "nombreCategoria" => $fila['nombreCategoria']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarCategoriasMisPrendas()
    {
        $consulta = "SELECT idCategoria, nombreCategoria FROM `categoria` WHERE 1";
        $resultado = $this->conexion->consultas($consulta);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
               'idCategoria'=>$fila['idCategoria'],
               'nombreCategoria' => $fila['nombreCategoria']
            ));
        }
        return $arrayAsociativo;
    }


    //Cogemos las subcategorias de cada Categoria
    function cargarSubcategorias($categoria, $usuario)
    {
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];


        $consulta = "SELECT subcategoria.idSubcategoria, subcategoria.nombreSubcategoria FROM `subcategoria` 
        LEFT JOIN relusuariosubcategoria ON subcategoria.idSubcategoria = relusuariosubcategoria.idSubcategoria 
        LEFT JOIN usuario ON relusuariosubcategoria.idUsuario = usuario.idUsuario 
        WHERE subcategoria.idCategoria = $categoria AND relusuariosubcategoria.idUsuario = $idUsuario";


        $resultado = $this->conexion->consultas($consulta);

        $arraySubcategorias = array();

        while ($fila = $this->conexion->extraerFila($resultado)) {
            array_push($arraySubcategorias, array(
                'idSubcategoria' => $fila['idSubcategoria'],
                'nombreSubcategoria' => $fila['nombreSubcategoria']
            ));
        }

        return $arraySubcategorias;
    }

    function cargarNombrePrendas($usuario, $subcategoria){
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];


        $consulta = "SELECT idPrenda, prenda.idUsuario, descripcion, talla, prenda.idSubcategoria, subc.nombreSubcategoria, nombrePrenda
        FROM `prenda`
        LEFT JOIN relusuariosubcategoria AS rus ON rus.idUsuario = prenda.idUsuario AND rus.idSubcategoria = prenda.idSubcategoria
        LEFT JOIN subcategoria AS subc ON subc.idSubcategoria = rus.idSubcategoria
        LEFT JOIN categoria ON categoria.idCategoria = subc.idCategoria
        WHERE prenda.idUsuario = $idUsuario AND subc.idSubcategoria = '$subcategoria'";

        $resultado = $this->conexion->consultas($consulta);

        $arraySubcategorias = array();

        while ($fila = $this->conexion->extraerFila($resultado)) {
            array_push($arraySubcategorias, array(
                'idPrenda' => $fila['idPrenda'],
                'nombrePrenda' => $fila['nombrePrenda'],
                'descripcionPrenda'=> $fila['descripcion'],
                'tallaPrenda' => $fila['talla']
            ));
        }

        return $arraySubcategorias;
    }

    //Cargamos las Prendas del usuaario
    function cargarMisPrendas($usuario)
    {
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];

        //$consulta = "SELECT idPrenda, idUsuario, descripcion, talla, idSubcategoria FROM `prenda` WHERE idUsuario = $idUsuario";
        $consulta = "SELECT idPrenda, prenda.idUsuario, descripcion, talla, prenda.idSubcategoria, subc.nombreSubcategoria, nombrePrenda, ca.nombreCategoria, ca.idCategoria 
        FROM `prenda`
        LEFT JOIN relusuariosubcategoria AS rus ON rus.idUsuario = prenda.idUsuario AND rus.idSubcategoria = prenda.idSubcategoria
        LEFT JOIN subcategoria AS subc ON subc.idSubcategoria = rus.idSubcategoria
        LEFT JOIN categoria AS ca ON ca.idCategoria = subc.idCategoria
        WHERE prenda.idUsuario = $idUsuario";
        $resultado = $this->conexion->consultas($consulta);
        $arrayAsociativo = array();
        while ($fila = $this->conexion->extraerFila($resultado)) {
            $imagen = $fila['idPrenda'];
            $files = glob("../imagenes_prendas/$imagen.png");
            //$imagenCodificada = base64_encode($files[0]);
            $imagen = substr($files[0], 2);
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "idUsuario" => $fila['idUsuario'],
                "descripcion" => $fila['descripcion'],
                "talla" => $fila['talla'],
                "idCategoria" => $fila['idCategoria'],
                "nombreCategoria" => $fila["nombreCategoria"],
                "idSubcategoria" => $fila['idSubcategoria'],
                "nombreSubcategoria"=>$fila['nombreSubcategoria'],
                "imagenCodificada" => "src/php$imagen",//$imagenCodificada
                "nombrePrenda" => $fila["nombrePrenda"]
            ));
        }
        return $arrayAsociativo;
    }

    function filtrarPrendasPorCategoria($usuario, $categoria){
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];

        //$consulta = "SELECT idPrenda, idUsuario, descripcion, talla, idSubcategoria FROM `prenda` WHERE idUsuario = $idUsuario";
        $consulta = "SELECT idPrenda, prenda.idUsuario, descripcion, talla, prenda.idSubcategoria, subc.nombreSubcategoria, nombrePrenda, categoria.idCategoria, categoria.nombreCategoria
        FROM `prenda`
        LEFT JOIN relusuariosubcategoria AS rus ON rus.idUsuario = prenda.idUsuario AND rus.idSubcategoria = prenda.idSubcategoria
        LEFT JOIN subcategoria AS subc ON subc.idSubcategoria = rus.idSubcategoria
        LEFT JOIN categoria ON categoria.idCategoria = subc.idCategoria
        WHERE prenda.idUsuario = $idUsuario AND categoria.nombreCategoria = '$categoria'";

        $resultado = $this->conexion->consultas($consulta);
        $arrayAsociativo = array();
        while ($fila = $this->conexion->extraerFila($resultado)) {
            $imagen = $fila['idPrenda'];
            $files = glob("../imagenes_prendas/$imagen.png");
            $imagenCodificada = base64_encode($files[0]);
            $imagen = substr($files[0], 2);
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "idUsuario" => $fila['idUsuario'],
                "descripcion" => $fila['descripcion'],
                "talla" => $fila['talla'],
                "idCategoria" => $fila["idCategoria"],
                "nombreCategoria" => $fila["nombreCategoria"],
                "idSubcategoria" => $fila['idSubcategoria'],
                "nombreSubcategoria"=>$fila['nombreSubcategoria'],
                "imagenCodificada" => "src/php$imagen",//$imagenCodificada
                "nombrePrenda" => $fila["nombrePrenda"]

            ));
        }
        return $arrayAsociativo;
    }

    //Aqui cogemos los datos de la Prenda para guardarlos en la base de datos
    /**
     * @param String $subCategoria
     * @param String $descripcion
     * @param String $talla
     * @param String $correo
     * @param String $imagen
     * Inserta una prenda en la base de datos
     * @return boolean
     */
    function insertarPrendas($idSubcategoria, $descripcion, $talla, $correo, $nombrePrenda, $imagen)
    {
        $consultaUsuario = "SELECT idUsuario FROM usuario WHERE correo = '$correo'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsuario);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];

        $consultaInsertar = "INSERT INTO `prenda`(`idUsuario`, `descripcion`, `talla`, `idSubcategoria`, `nombrePrenda`) VALUES ((SELECT idUsuario FROM usuario WHERE correo = ?), ?,?,?, ?)";
        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consultaInsertar)) {
            //echo "La consulta fallo en su preparacion";
            return false;
        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("sssis", $correo, $descripcion, $talla, $idSubcategoria, $nombrePrenda)) {
            //echo "Fallo en la vinculacion de parametros";
            return false;
        }
        //Ejecutamos con execute

        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";
            return false;
        } else if ($this->decofificacionImagenes($imagen))
            return true;
    }

    //Metodo para decoficar las imagenes en base64 y guardarlo en la carpeta del servidor
    /**
     * @param mixed $imagen64
     * Guarda en la carpeta una imagen decodificada de base64 con el nombre de su id
     * @return boolean
     */
    function decofificacionImagenes($imagen64)
    {
        $consulta = "SELECT MAX(idPrenda) AS id FROM prenda";
        $resultado =  $this->conexion->consultas($consulta);

        $fila = $this->conexion->extraerFila($resultado);
        $nombreImagen = $fila['id'];

        $rutaGuardado = "$nombreImagen.png";
        $ruta = "../imagenes_prendas/$nombreImagen.png";

        $file = fopen($ruta, "w+");

        //Actualizamos la fila de nuestro cuaderno con la nueva ruta
        $data = explode(',', $imagen64);

        //Crear imagen
         fwrite($file, base64_decode($data[1]));
        fclose($file);


        return true;
    }

    function modificarPrenda($descripcion, $talla, $idSubcategoria, $usuario)
    {
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];
        $consulta = "UPDATE `prenda` SET `descripcion`=?,`talla`=?,idSubcategoria=? WHERE idUsuario = ?";
        //$resultado = $this->conexion->consultas($consulta);

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("ssii", $descripcion, $talla, $idSubcategoria, $idUsuario)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else {
            return true;
        }
    }
//borramos las prendas
    function borrarPrenda($idPrenda)
    {
        $consultaBorrar = "DELETE FROM `prenda` WHERE idPrenda = ?";

        if (unlink("../imagenes_prendas/$idPrenda.png")) {
            // file was successfully deleted
        } else {
            // there was a problem deleting the file
            return false;
        }
        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consultaBorrar)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("i", $idPrenda)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";
            $respuesta = Array(
                "success" => false,
                "mensaje" => "No se pudo eliminar la prenda. Inténtalo en otro momento",
            );
            return $respuesta;
        } else {
            $respuesta = Array(
                "success" => true,
                "mensaje" => "La prenda fue borrada satisfactoriamente",
            );
            return $respuesta;
        }
    }
//insertamos las SubCategorias en casda usuario correspondiente
    function insertarSubCategoria($nombreSubCategoria, $idCategoria, $usuario){
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $idUsuario = $fila['idUsuario'];
        $consulta = "INSERT INTO `subcategoria`( `nombreSubcategoria`, `idCategoria`) VALUES (?,?);";
        $consultaUsuarioCategoria = "INSERT INTO `relusuariosubcategoria`(`idSubcategoria`, `idUsuario`) VALUES ((SELECT MAX(idSubcategoria) AS id FROM subcategoria),$idUsuario);";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("si", $nombreSubCategoria,$idCategoria)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else if($this->conexion->consultas($consultaUsuarioCategoria)){
            return true;
        }



    }
//Modificamos la subCategoria cambiando el nombre y la categoria que pertenece
    function modificarSubCategoria($nombreSubCategoria, $idCategoria, $idSubcategoria){
        $consulta = "UPDATE `subcategoria` SET `nombreSubcategoria`=?,`idCategoria`=? WHERE idSubcategoria = ?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("sii", $nombreSubCategoria,$idCategoria, $idSubcategoria)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else {
            return true;
        }
    }

    function modificarCambiarDeSubCategoria($idCategoria, $idSubcategoria){
        $consulta = "UPDATE `subcategoria` SET `idCategoria`=? WHERE idSubcategoria = ?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("ii", $idCategoria, $idSubcategoria)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else {
            return true;
        }
    }
//Borramos las subCategorias creadas por el usuario.
    function borrarSubCategoria($idSubCategoria){
        $consulta = "DELETE FROM `subcategoria` WHERE `idSubcategoria` = ?";
        $consultaRelacion = "DELETE FROM `relusuariosubcategoria` WHERE idSubcategoria =?";

        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consultaRelacion)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("i", $idSubCategoria)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else if($sentencia = $this->conexion->mysqli->prepare($consulta)){
            //Pasamos los parametros y el tipo de dato
            if (!$sentencia->bind_param("i", $idSubCategoria)) {
                //echo "Fallo en la vinculacion de parametros";
                //return false;

            }
            //Ejecutamos con execute
            if (!$sentencia->execute()) {
                //echo "Algo fallo en la ejecucion";

                return false;
            } else {
                return true;
            }
            return true;
        }
    }

    function cargarOutfits($usuario)
    {

        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT idOutfit, idUsuario, nombreOutfit FROM outfit WHERE idUsuario = $idUsuario";
        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idOutfit" => $fila['idOutfit'],
                "idUsuario" => $fila['idUsuario'],
                "nombreOutfit" => $fila['nombreOutfit']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasCabeza($usuario)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, prenda.nombrePrenda, subcategoria.nombreSubcategoria  FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND subcategoria.idCategoria =1
        ORDER BY subcategoria.nombreSubcategoria ASC
        ";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }


    function cargarPrendasTorso($usuario)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, prenda.nombrePrenda, subcategoria.nombreSubcategoria  FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND subcategoria.idCategoria =2
        ORDER BY subcategoria.nombreSubcategoria ASC
        ";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasPiernas($usuario)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, prenda.nombrePrenda, subcategoria.nombreSubcategoria  FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND subcategoria.idCategoria =3
        ORDER BY subcategoria.nombreSubcategoria ASC
        ";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasPies($usuario)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, prenda.nombrePrenda, subcategoria.nombreSubcategoria  FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND subcategoria.idCategoria =4
        ORDER BY subcategoria.nombreSubcategoria ASC
        ";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasCabezaOutfit($usuario, $idOutfit)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, subcategoria.nombreSubcategoria, prenda.nombrePrenda FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN outfit ON outfit.idOutfit = relprendaoutfit.idOutfit
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND outfit.idOutfit =$idOutfit AND subcategoria.idCategoria =1";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        $filas_afectadas = $this->conexion->numeroFilas($this->conexion->consultas($consulta2));

        if ($filas_afectadas == 0) {
            
            $arrayAsociativoDefault = array([
                "idPrenda"=>'',
                "nombreSubcategoria" =>'',
                "nombrePrenda" => '']
            );
            return $arrayAsociativoDefault;
        }

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasTorsoOutfit($usuario, $idOutfit)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, subcategoria.nombreSubcategoria, prenda.nombrePrenda FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN outfit ON outfit.idOutfit = relprendaoutfit.idOutfit
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND outfit.idOutfit =$idOutfit AND subcategoria.idCategoria =2";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        $filas_afectadas = $this->conexion->numeroFilas($this->conexion->consultas($consulta2));

        if ($filas_afectadas == 0) {
            
            $arrayAsociativoDefault = array([
                "idPrenda"=>'',
                "nombreSubcategoria" =>'',
                "nombrePrenda" => '']
            );
            return $arrayAsociativoDefault;
        }

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasPiernasOutfit($usuario, $idOutfit)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, subcategoria.nombreSubcategoria, prenda.nombrePrenda FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN outfit ON outfit.idOutfit = relprendaoutfit.idOutfit
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND outfit.idOutfit =$idOutfit AND subcategoria.idCategoria =3";

        $resultado2 = $this->conexion->consultas($consulta2);
        $arrayAsociativo = array();

        $filas_afectadas = $this->conexion->numeroFilas($this->conexion->consultas($consulta2));

        if ($filas_afectadas == 0) {
            
            $arrayAsociativoDefault = array([
                "idPrenda"=>'',
                "nombreSubcategoria" =>'',
                "nombrePrenda" => '']
            );
            return $arrayAsociativoDefault;
        }

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            //$fila['idCategoria'];
            //$fila['nombreCategoria'];
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function cargarPrendasPiesOutfit($usuario, $idOutfit)
    {
        $consulta = "SELECT idUsuario FROM usuario WHERE nombre = '$usuario'";

        if (!$resultado = $this->conexion->consultas($consulta)) {

            return false;
        }

        if (!$fila =  $this->conexion->extraerFila($resultado)) {

            return false;
        }

        $idUsuario = $fila['idUsuario'];

        $consulta2 = "SELECT prenda.idPrenda, subcategoria.nombreSubcategoria, prenda.nombrePrenda FROM prenda 
        LEFT JOIN relprendaoutfit ON relprendaoutfit.idPrenda = prenda.idPrenda
        LEFT JOIN outfit ON outfit.idOutfit = relprendaoutfit.idOutfit
        LEFT JOIN subcategoria ON subcategoria.idSubcategoria = prenda.idSubcategoria
        WHERE prenda.idUsuario =$idUsuario AND outfit.idOutfit =$idOutfit AND subcategoria.idCategoria =4";

        $resultado2 = $this->conexion->consultas($consulta2);
        $filas_afectadas = $this->conexion->numeroFilas($this->conexion->consultas($consulta2));
        
        $arrayAsociativoDefault = array();

        $filas_afectadas = $this->conexion->numeroFilas($this->conexion->consultas($consulta2));

        if ($filas_afectadas == 0) {
            
            $arrayAsociativoDefault = array([
                "idPrenda"=>'',
                "nombreSubcategoria" =>'',
                "nombrePrenda" => '']
            );
            return $arrayAsociativoDefault;
        }

        $arrayAsociativo = array();

        while ($fila =  $this->conexion->extraerFila($resultado2)) {
            
            array_push($arrayAsociativo, array(
                "idPrenda" => $fila['idPrenda'],
                "nombreSubcategoria" => $fila['nombreSubcategoria'],
                "nombrePrenda" => $fila['nombrePrenda']
            ));
        }
        return $arrayAsociativo;
    }

    function insertamosOutfit($usuario,$nombreOutfit, $fechaCreacion, $idPrenda){
        $consulta ="INSERT INTO `outfit`( `idUsuario`, `nombreOutfit`, `fechaCreacion`) VALUES (?,?,?)";
        $consultaRelacion ="INSERT INTO `relprendaoutfit`(`idOutfit`, `idPrenda`) VALUES (?,?)";
        $consultaUsurio = "SELECT idUsuario FROM usuario WHERE correo = '$usuario'";
        $resultadoUsuario = $this->conexion->consultas($consultaUsurio);
        $fila = $this->conexion->extraerFila($resultadoUsuario);
        $consultaUltimoOutfit = "SELECT MAX(idOutfit) AS id FROM outfit";
        $idUsuario = $fila['idUsuario'];
        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consulta)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("iss", $idUsuario, $nombreOutfit, $fechaCreacion)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else if($sentencia = $this->conexion->mysqli->prepare($consultaRelacion)){
            $resultadoUltimoOutfit = $this->conexion->consultas($consultaUltimoOutfit);
            $fila= $this->conexion->extraerFila($resultadoUltimoOutfit);
            $ultimo_id = $fila['id'];
            //Pasamos los parametros y el tipo de dato
            if (!$sentencia->bind_param("ii", $ultimo_id,$idPrenda)) {
                //echo "Fallo en la vinculacion de parametros";
                //return false;

            }
            //Ejecutamos con execute
            if (!$sentencia->execute()) {
                //echo "Algo fallo en la ejecucion";

                return false;
            } else {
                return true;
            }
            return true;
        }

    }

    function borrarOutfit($idOutfit){
        $consultaRelacion="DELETE FROM relprendaoutfit WHERE idOutfit=?";
        $consulta="DELETE FROM `outfit` WHERE idOutfit=?";
        //Preparamos con preparae
        if (!$sentencia = $this->conexion->mysqli->prepare($consultaRelacion)) {
            //echo "La consulta fallo en su preparacion";
            //return false;

        }
        //Pasamos los parametros y el tipo de dato
        if (!$sentencia->bind_param("i", $idOutfit)) {
            //echo "Fallo en la vinculacion de parametros";
            //return false;

        }
        //Ejecutamos con execute
        if (!$sentencia->execute()) {
            //echo "Algo fallo en la ejecucion";

            return false;
        } else if($sentencia = $this->conexion->mysqli->prepare($consulta)){
            //Pasamos los parametros y el tipo de dato
            if (!$sentencia->bind_param("i", $idOutfit)) {
                //echo "Fallo en la vinculacion de parametros";
                //return false;

            }
            //Ejecutamos con execute
            if (!$sentencia->execute()) {
                //echo "Algo fallo en la ejecucion";

                return false;
            } else {
                return true;
            }

        }
    }
    function modificarOutfit($idPrenda, $idPrendaNueva, $idOutfit, $nombreOutfit){
        $consultaRelacionOutfit="UPDATE `relprendaoutfit` SET `idPrenda`= $idPrendaNueva WHERE idOutfit =  and idPrenda = $idPrenda ";
        $consulta = "UPDATE `outfit` SET `nombreOutfit`= $nombreOutfit WHERE idOutfit= $idOutfit";

        if(!$this->conexion->consultas($consulta)){
            return  false;
        }elseif (!$this->conexion->consultas($consulta)){
            return false;
        }else{
            return true;
        }




    }

    //Subimos las imagenes y pasamos el parametro Carpeta Destino que es donde se guardadn las imagenes del pedido,
    /*
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
                        $dir = opendir($carpetaDestino);
                        //Si la imagen es correcta en tamaño y tipo
                        //Se intenta subir al servidor
                        if (move_uploaded_file($temp, $carpetaDestino . "/" . $archivo)) {
                            //Cambiamos los permisos del archivo a 777 para poder modificarlo posteriormente
                            //chmod('images/'.$archivo, 0777);
                            //Mostramos el mensaje de que se ha subido co éxito
                            echo '<p>Se ha subido correctamente la imagen.</p>';
                            //Mostramos la imagen subida
                            echo '<div id="imagenesSubidas" style="width: 500px;"><img src="' . $carpetaDestino . '/' . $archivo . '"></div>';
                        } else {
                            //Si no se ha podido subir la imagen, mostramos un mensaje de error
                            echo '<div><b>Ocurrió algún error al subir el fichero. No pudo guardarse.</b></div>';
                        }
                        //cerrramos el fichero
                        closedir($dir);
                    }
                }
            }
            echo "<a class='subir' href='home.php'>Terminar Pedido</a>";
        }
    }
}
