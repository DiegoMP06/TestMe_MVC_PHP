<?php
namespace Model;

class Sala extends ActiveRecord {
    protected static $tabla = "salas";
    protected static $columnasDB = [
        "id",
        "nombre",
        "url",
        "descripcion",
        "alumnos",
        "profesores",
        "alumnosMax",
        "profesoresMax",
        "password",
        "creado",
        "actualizado",
        "publico",
        "acceso",
        "usuarioId",
    ];

    public $id;
    public $nombre;
    public $url;
    public $descripcion;
    public $alumnos;
    public $profesores;
    public $alumnosMax;
    public $profesoresMax;
    public $password;
    public $creado;
    public $actualizado;
    public $publico;
    public $acceso;
    public $usuarioId;
    
    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->url = $args["url"] ?? "";
        $this->descripcion = $args["descripcion"] ?? "";
        $this->alumnos = $args["alumnos"] ?? 0;
        $this->profesores = $args["profesores"] ?? 0;
        $this->alumnosMax = $args["alumnosMax"] ?? 1;
        $this->profesoresMax = $args["profesoresMax"] ?? 0;
        $this->password = $args["password"] ?? "";
        $this->creado = $args["creado"] ?? date("Y-m-d");
        $this->actualizado = $args["actualizado"] ?? null;
        $this->publico = $args["publico"] ?? 0;
        $this->acceso = $args["acceso"] ?? 0;
        $this->usuarioId = $args["usuarioId"] ?? "";
    }

    public function validarCrear() {
        if(!$this->nombre) {
            self::setAlerta("nombre", "El Nombre es Obligatorio");
        }

        if(!filter_var($this->alumnosMax, FILTER_VALIDATE_INT)) {
            self::setAlerta("alumnosMax", "Formato Invalido");
        }
        
        if($this->alumnosMax <= 0 || $this->alumnosMax > 60) {
            self::setAlerta("alumnosMax", "Cantidad de Alumnos Invalida");
        }

        if(!$this->alumnosMax) {
            self::setAlerta("alumnosMax", "EL Numero de Alumnos es Obligatorio");
        }

        if(!filter_var($this->profesoresMax, FILTER_VALIDATE_INT) && $this->profesoresMax != 0) {
            self::setAlerta("profesoresMax", "Formato Invalido");
        }

        if($this->profesoresMax < 0 || $this->profesoresMax > 4) {
            self::setAlerta("profesoresMax", "Cantidad de Profesores Colaboradores Invalida");
        }

        if(strlen($this->descripcion) < 50) {
            self::setAlerta("descripcion", "La Descripcion Debe Tener al Menos 50 Caracteres");
        }

        if(!$this->descripcion) {
            self::setAlerta("descripcion", "La Descripcion es Obligatoria");
        }

        return self::$alertas;
    }

    public function crearUrlYPassword() {
        $this->url = md5(uniqid(rand()));

        $this->crearPassword();
    }

    public function crearPassword() {
        if(!$this->publico) {
            $this->password = uniqid(rand(101, 999));
        }
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getUrl() {
        return $this->url;
    }

    public function setUrl($url) {
        $this->url = $url;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function getAlumnos() {
        return $this->alumnos;
    }

    public function setAlumnos($alumnos) {
        $this->alumnos = $alumnos;
    }

    public function getProfesores() {
        return $this->profesores;
    }

    public function setProfesores($profesores) {
        $this->profesores = $profesores;
    }

    public function getAlumnosMax() {
        return $this->alumnosMax;
    }

    public function setAlumnosMax($alumnosMax) {
        $this->alumnosMax = $alumnosMax;
    }

    public function getProfesoresMax() {
        return $this->profesoresMax;
    }

    public function setProfesoresMax($profesoresMax) {
        $this->profesoresMax = $profesoresMax;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getCreado() {
        return $this->creado;
    }

    public function setCreado($creado) {
        $this->creado = $creado;
    }

    public function getActualizado() {
        return $this->actualizado;
    }

    public function setActualizado($actualizado) {
        $this->actualizado = $actualizado;
    }

    public function getPublico() {
        return $this->publico;
    }

    public function setPublico($publico) {
        $this->publico = $publico;
    }

    public function getAcceso() {
        return $this->acceso;
    }

    public function setAcceso($acceso) {
        $this->acceso = $acceso;
    }

    public function getUsuarioId() {
        return $this->usuarioId;
    }

    public function setUsuarioId($usuarioId) {
        $this->usuarioId = $usuarioId;
    }
}