<?php

/**
 * Clase que establece conexion y ejecuta consultas sobre la BD
 */
class Conexion
{

    /**
     * Genera una instancia de la clase Conexion
     */
    function __construct()
    {
        include "configuracionBD.php";

        $this->mysqli = new mysqli(SERVIDOR, USUARIO, PASSWORD, DB);
    }

    /**
     * @param mixed $consulta
     * Ejecuta consultas sobre la BD
     * @return mixed
     */
    public function consultas($consulta)
    {

        return  $this->resultado = $this->mysqli->query($consulta);
    }

    /**
     * @param mixed
     * Extrae un array asociativo del registro obtenido de consultas SELECT
     * @return mixed
     */
    public function extraerFila($resultado)
    {
        return $this->fila = $resultado->fetch_array(MYSQLI_ASSOC);
    }
    
    public function consultasMultiple($consulta)
    {

        $this->resultado = $this->mysqli->multi_query($consulta);
    }

    /**
     * Devuelve las filas afectadas por consultas de tipo UPDATE, DELETE O INSERT
     * @return int
     */
    public function  filasAfectadas()
    {
        return $this->mysqli->affected_rows;
    }

    /**
     * @param mixed
     * Devuelve los registros afectados por consultas de tipo SELECT
     * @return int
     */
    public function  numeroFilas($resultado)
    {
        return $numeroFilas = $resultado->num_rows;
    }

    /**
     * Demuestra el error producido
     * @return String
     */
    public function error()
    {

        return  $this->mysqli->error;
    }

    /**
     * Muestra el código de un error
     * @return int
     */
    public function errno()
    {

        return  $this->mysqli->errno;
    }

    /**
     * Cierra la conexion con la BD
     */
    public function cerrarConexion()
    {
        $this->mysqli->close();
    }
}
