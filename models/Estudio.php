<?php 
namespace Model;

class Estudio extends ActiveRecord {
    protected static $tabla = "estudios";
    protected static $columnasDB = [
        "id",
        "fecha",
        "hora",
        "usuarioId",
        "salaId",
    ];

    public $id;
    public $fecha;
    public $hora;
    public $usuarioId;
    public $salaId;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->fecha = $args["fecha"] ?? date("Y-m-d");
        $this->hora = $args["hora"] ?? date("h:i:s");
        $this->usuarioId = $args["usuarioId"] ?? "";
        $this->salaId = $args["salaId"] ?? "";
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

    public function getSalaId() {
        return $this->salaId;
    }

    public function setSalaId($salaId) {
        $this->salaId = $salaId;
    }
}