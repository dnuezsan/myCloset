<?php

//IMPORTANTE. No se pueden devolver dos json_encode()

/* EJEMPLO 1. Devuelve los datos recibidos */
//json_decode(file_get_contents('php://input'), true); linea necesario
$datos = json_decode(file_get_contents('php://input'), true);

/* Como se decodifica en array, los indice tienen un valor asociativo */
$usuario=$datos['usuario'];

/* codifica la respuesta en un json */
echo json_encode($datos); 

//$_POST[] no vale para recibir los datos aunque sean del método post
//$usuario = $_POST['usuario'];



/* EJEMPLO. Se devuelven datos creados */
/* Se pueden devolver, strings, numeros o arrays. Archivos aun por ver */

/* Para devolver un objeto con atributos, se usa un array asociativo */
$lista=[
    1=>'nhggb',
    2=>'nnyny',
    'colby'=>1
];
//echo json_encode($lista);
/* echo json_encode(1); */
/* echo json_encode('holaa'); */