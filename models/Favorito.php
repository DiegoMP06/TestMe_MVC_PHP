<?php
namespace Model;

class Favorito extends ActiveRecord {
    protected static $tabla = "favoritos";
    protected static $columnasDB = [
        "id",
        "fecha",
        "hora",
        "usuarioId",
        "testId",
    ];

    public $id;
    public $fecha;
    public $hora;
    public $usuarioId;
    public $testId;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->fecha = $args["fecha"] ?? date("Y-m-d");
        $this->hora = $args["hora"] ?? date("h:i:s");
        $this->usuarioId = $args["usuarioId"] ?? "";
        $this->testId = $args["testId"] ?? "";
    }
 
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    public function getHora() {
        return $this->hora;
    }

    public function setHora($hora) {
        $this->hora = $hora;
    }

    public function getUsuarioId() {
        return $this->usuarioId;
    }

    public function setUsuarioId($usuarioId) {
        $this->usuarioId = $usuarioId;
    }

    public function getTestId() {
        return $this->testId;
    }

    public function setTestId($testId) {
        $this->testId = $testId;
    }
}