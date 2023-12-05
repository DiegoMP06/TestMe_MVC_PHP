<?php
namespace Model;

class ActiveRecord {
    protected static $db;
    protected static $tabla = "";
    protected static $columnasDB = [];
    protected static $alertas = [];
    public $id;

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
        $atributos = [];

        foreach (static::$columnasDB as $columna) {
            if ($columna === "id") continue;
            if(is_null($this->$columna)) continue;
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

    public function crear(){
        $atributos = $this->sanitizarAtributos();
        
        $query = "INSERT INTO " . static::$tabla . " (";
        $query .= join(', ', array_keys($atributos));
        $query .= ") VALUES ('";
        $query .= join("', '", array_values($atributos));
        $query .= "')";
        $resultado = self::$db->query($query);

        return [
            'resultado' => $resultado,
            'id' => self::$db->insert_id
        ];
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
        $query = "DELETE FROM " . static::$tabla . " WHERE id = '" . self::$db->escape_string($this->id) . "' LIMIT 1";
        $resultado = self::$db->query($query);

        return $resultado;
    }

    public static function consultarSQL($query){
        $resultado = self::$db->query($query);
        $array = [];

        while ($registro = $resultado->fetch_assoc()) {
            $array[] = static::crearObjeto($registro);
        }

        $resultado->free();

        return $array;
    }

    public static function all(){
        $query = "SELECT * FROM " . static::$tabla;
        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    public static function find($id){
        $query = "SELECT * FROM " . static::$tabla . " WHERE id = '" . self::$db->escape_string($id) . "' LIMIT 1";
        $resultado = self::consultarSQL($query);

        return array_shift($resultado);
    }

    public static function get($limite){
        $query = "SELECT * FROM " . static::$tabla . " LIMIT {$limite}";
        $resultado = self::consultarSQL($query);

        return $resultado;
    }

    public static function where($columna, $valor){
        $query = "SELECT * FROM " . static::$tabla . " WHERE {$columna} = '" . self::$db->escape_string($valor) ."' LIMIT 1";
        $resultado = self::consultarSQL($query);
        return array_shift($resultado);
    }

    public static function whereLimit($columna, $valor, $limite){
        $query = "SELECT * FROM " . static::$tabla . " WHERE {$columna} = '" . self::$db->escape_string($valor) ."' LIMIT {$limite}";
        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    public static function whereAll($columna, $valor){
        $query = "SELECT * FROM " . static::$tabla . " WHERE {$columna} = '" . self::$db->escape_string($valor) ."'";
        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    public static function sql($args = [], $query) {
        $sanitizados = [];
        foreach($args as $key => $campo) {
            $sanitizados[$key] = self::$db->escape_string($campo);
        }

        foreach($sanitizados as $i => $sanitizado) {
            $query = str_replace(":" . $i, $sanitizado, $query);
        }

        $query = str_replace(":tabla:", static::$tabla, $query);

        $resultado = self::consultarSQL($query);
        return $resultado;
    }

    public static function Join($columnas = [], $joins = [], $comparaciones = []){

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
        if(!empty($comparaciones)) $query .= " WHERE " . join(" ", $where);
        $resultado = self::consultarSQL($query);

        return $resultado;
    }
}