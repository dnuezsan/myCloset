<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-with, Content-Type, Accept');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE');


require_once "../modelo/metodos.php";




switch ($_POST['propiedad']){
    case "inicioSesion":
        $usuario = $_POST['user'];
        $password = $_POST['password'];
        sesion($usuario,$password);
    break;
    case "registrarse":
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $password= $_POST['password'];
        $rpassword = $_POST['rpassword'];
        registrar($nombre, $correo, $password, $rpassword);
        break;
    case "modificarUsuario":
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $password= $_POST['password'];
        $newpassword = $_POST['newpassword'];
        $rnewpassword = $_POST['rnewpassword'];
        modificarUsuario($nombre, $correo, $password,$newpassword,$rnewpassword);
        break;
    case "cargarDatosUsuario" :
        $correo = $_POST['correo'];
        cargaDatosUsuario($correo);
        break;
    case "borrarUsuario":
        $correo = $_POST['correo'];
        borrarUsuario($correo);
        break;
    case "subidaDePrenda":
        $correo= $_POST['correo'];
        $talla =$_POST['talla'];
        $descripcion= $_POST['descripcion'];
        $categoria= $_POST['categoria'];
        $subcategoria= $_POST['subcategoria'];
        $imagen =$_POST['imagen'];
        subidaDePrenda($subcategoria, $descripcion, $talla, $correo, $imagen);
        break;
}



/**
 * @param mixed $usuario
 * @param mixed $password
 * Envia datos del login al formulario y devuelve la respuesta al front
 * @return [type]
 */
function sesion($usuario, $password){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'nombre'=>"",'us_id' => "");

    //$metodo->iniciarSesion($usuario, $password);

    if ($metodo->iniciarSesion($usuario, $password)){
        $response['success']=true;
        $response['mensaje']='Todo es correcto';
        $response['usuario']=$usuario;

    }else{
        $response['success']=false;
        $response['mensaje']= "Correo o contraseña incorrecta";
        $response['usuario']=$usuario;
    }
    echo json_encode($response);
}

/**
 * @param mixed $nombre
 * @param mixed $correo
 * @param mixed $password
 * @param mixed $rpassword
 * Pasa los del registro de ususario al modelo y devuelve la respuesta al front
 * @return [type]
 */
function registrar($nombre, $correo, $password, $rpassword){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'correo'=>"");

    if ($metodo->altaUsuario($nombre, $correo, $password, $rpassword)){
        $response['success']=true;
        $response['mensaje']='El registro se efectuó correctamente';
        $response['correo']=$correo;

    }else{
        $response['success']=false;
        $response['mensaje']= "El correo introducido ya existe";
        $response['correo']=$correo;
    }
    echo json_encode($response);

}

function modificarUsuario($nombreUsuario,$correo,$password,$newpassword, $rnewpassword){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'correo'=>"");

    if($metodo->modicarUsuario($nombreUsuario, $correo, $password, $newpassword, $rnewpassword)){
        $response['success']=true;
        $response['mensaje']='Modificacion es correcta';
        $response['correo']=$correo;

    }else{
        $response['success']=false;
        $response['mensaje']= "Error al modificar tus datos datos";
        $response['correo']=$correo;
    }
    echo json_encode($response);
}

function cargaDatosUsuario($correo){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'correo'=>"");
    $arrayAsociativo = $metodo->cagarDatosUsuario($correo);
    //var_dump($arrayAsociativo);
    if($arrayAsociativo["respuesta"]){

        $response['success']=true;
        $response['mensaje']='carga de datos correcto';
        $response['nombreUsuario']=$arrayAsociativo["respuesta2"];
        $response['correo']=$arrayAsociativo['respuesta3'];

    }else{
        $response['success']=false;
        $response['mensaje']= "Error al modificar tus datos datos";
        $response['nombreUsuario']=$arrayAsociativo['respuesta2'];
    }
    echo json_encode($response);
}

function borrarUsuario($correo){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'correo'=>"");

    if($metodo->borrarUsuario($correo)){
        $response['success']=true;
        $response['mensaje']='Se borro correctamente el usuario';
        $response['correo']=$correo;

    }else{
        $response['success']=false;
        $response['mensaje']= "Error al borrar el usuario";
        $response['correo']=$correo;
    }
    echo json_encode($response);
}
function subidaDePrenda($subCategoria, $descripcion, $talla, $correo, $imagen){
    $metodo = new Metodos();
    $response = array('success'=> false, 'mensaje'=>"", 'correo'=>"");

    if($metodo->insertarPrendas($subCategoria, $descripcion, $talla, $correo, $imagen)){
        $response['success']=true;
        $response['mensaje']='Se ha guardado su prenda correctamente';
        $response['correo']='';

    }else{
        $response['success']=false;
        $response['mensaje']= "No se ha guardado su prenda correctamente";
        $response['correo']='';
    }
    echo json_encode($response);
}
