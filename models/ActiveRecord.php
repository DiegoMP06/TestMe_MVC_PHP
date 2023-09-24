<?php
namespace Model;

class ActiveRecord {
    protected static $db;
    protected static $tabla = "";
    protected static $columnasDB = [];
    protected static $alertas = [];
    protected $id;

    public static function setDb($db){
        self::$db = $db;
    }

    public static function setAlerta($atributo, $mensaje, $tipo = "error"){
        static::$alertas[$tipo][$atributo] = $mensaje;
    }

    public static function setAlertas($alertas = []){
        self::$alertas = $alertas;
    }

    public static function getAlertas(){
        return static::$alertas;
    }

    public function validar(){
        self::setAlertas();
        return static::$alertas;
    }

    protected static function crearObjeto($registro){
        $objeto = new static;

        foreach ($registro as $key => $value) {
            if (property_exists($objeto, $key)) {
                $objeto->$key = $value;
            }
        }

        return $objeto;
    }

    public function atributos(){
        $columnasNull = [];
        $atributos = [];

        foreach (static::$columnasDB as $columna) {
            if ($columna === "id") continue;
            if (in_array($columna, $columnasNull) && is_null($this->$columna)) continue;
            $atributos[$columna] = $this->$columna;
        }

        return $atributos;
    }

    public function sanitizarAtributos(){
        $atributos = $this->atributos();
        $sanitizado = [];

        foreach ($atributos as $key => $value) {
            $sanitizado[$key] = self::$db->escape_string($value);
        }

        return $sanitizado;
    }

    public function sincronizar($args = []){
        foreach ($args as $key => $value) {
            if (property_exists($this, $key) && !is_null($value)) {
                $this->$key = $value;
            }
        }
    }

    public function guardar(){
        if (!is_null($this->id)) {
            return $this->actualizar();
        } else {
            return $this->crear();
        }
    }

    public function crear($id = false){
        $atributos = $this->sanitizarAtributos();
        
        $query = "INSERT INTO " . static::$tabla . " (";
        $query .= join(', ', array_keys($atributos));
        $query .= ") VALUES ('";
        $query .= join("', '", array_values($atributos));
        $query .= "')";
        $resultado = self::$db->query($query);

        if($id){
            return [
                'resultado' => $resultado,
                'id' => self::$db->insert_id
            ];
        }

        return $resultado;
    }

    public function actualizar(){
        $atributos = $this->sanitizarAtributos();
        $valores = [];

        foreach ($atributos as $key => $value) {
            $valores[] = "{$key} = '{$value}'";
        }

        $query = "UPDATE " . static::$tabla . " SET ";
        $query .= join(', ', $valores);
        $query .= " WHERE id = '" . self::$db->escape_string($this->id) . "' ";
        $query .= " LIMIT 1 ";
        $resultado = self::$db->query($query);

        return $resultado;
    }

    public function eliminar(){
        $query = "DELETE FROM " . static::$tabla . " WHERE id = " . self::$db->escape_string($this->id) . " LIMIT 1";
        $resultado = self::$db->query($query);

        return $resultado;
    }

    public static function consultarSQL($query, $object = true){
        $resultado = self::$db->query($query);
        $array = [];

        while ($registro = $resultado->fetch_assoc()) {
            if($object){
                $array[] = static::crearObjeto($registro);
            }else{
                $array[] = $registro;
            }
        }

        $resultado->free();

        return $array;
    }

    public static function all($object = true){
        $query = "SELECT * FROM " . static::$tabla;
        $resultado = self::consultarSQL($query, $object);

        return $resultado;
    }

    public static function find($id, $object = true){
        $query = "SELECT * FROM " . static::$tabla . " WHERE id = " . self::$db->escape_string($id) . " LIMIT 1";
        $resultado = self::consultarSQL($query, $object);

        return array_shift($resultado);
    }

    public static function get($limite, $object = true){
        $query = "SELECT * FROM " . static::$tabla . " LIMIT {$limite}";
        $resultado = self::consultarSQL($query, $object);

        return $resultado;
    }

    public static function where($columna, $valor){
        $query = "SELECT * FROM " . static::$tabla . " WHERE {$columna} = '" . self::$db->escape_string($valor) ."' LIMIT 1";
        $resultado = self::consultarSQL($query);
        return array_shift($resultado);
    }

    public static function whereAll($columna, $valor){
        $query = "SELECT * FROM " . static::$tabla . " WHERE {$columna} = '" . self::$db->escape_string($valor) ."'";
        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    public static function Join($columnas = [], $joins = [], $comparaciones = [], $object = true){

        $where = [];

        foreach($comparaciones as $key => $value){
            $comparacion = $value["columna"] . " = '" . 
            self::$db->escape_string($value["valor"]) . "'";
            
            if($key === 0) {
                $where[] = $comparacion;
                continue;
            }

            if($value["comparacion"] === "AND") $where[] = "AND " . $comparacion;
            elseiF($value["comparacion"] === "OR") $where[] =  "OR " . $comparacion;
            elseif($value["comparacion"] === "LIMIT") $where[] =  "LIMIT " . $value["valor"];
        }

        $query = "SELECT " . join(", ", $columnas);
        $query .= " FROM " . static::$tabla . " ";
        $query .= join(" ", $joins) . " ";
        $query .= " WHERE " . join(" ", $where);
        $resultado = self::consultarSQL($query, $object);

        return $resultado;

        // ActiveRecord::Join([
        //     "visitas.id", 
        //     "visitas.hora", 
        //     "visitas.puntuacion", 
        //     "visitas.total", 
        //     "CONCAT(usuarios.nombre, ' ', usuarios.apellido) as visitante", 
        //     "usuarios.usuario", 
        //     "usuarios.email", 
        //     "usuarios.telefono", 
        //     "usuarios.imagen as perfi"
        // ],
        // [
        //     "LEFT OUTER JOIN usuarios ON visitas.usuarioId = usuarios.id",
        //     "LEFT OUTER JOIN tests ON visitas.testId = tests.id"
        // ],
        // [
        //     [
        //         "columna" => "tests.id", 
        //         "valor" => "6"
        //     ],
        //     [
        //         "columna" => "visitas.id", 
        //         "valor" => "10", 
        //         "comparacion" => "OR"
        //     ],
        //     [
        //         "columna" => "visitas.fecha", 
        //         "valor" => "23-8-31", 
        //         "comparacion" => "AND"
        //     ],
        // ]);
    }
}