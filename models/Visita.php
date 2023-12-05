<?php 
namespace Model;

class Visita extends ActiveRecord {
    protected static $tabla = "visitas";
    protected static $columnasDB = [
        "id",
        "hora",
        "fecha",
        "camposExtra",
        "campos",
        "puntuacion",
        "total",
        "testId",
        "usuarioId"
    ];

    public $id;
    public $hora;
    public $fecha; 
    public $camposExtra;
    public $campos;
    public $puntuacion;
    public $total;
    public $testId;
    public $usuarioId;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->hora = $args["hora"] ?? date("h:i:s");
        $this->fecha = $args["fecha"] ?? date("Y-m-d");
        $this->camposExtra = $args["camposExtra"] ?? "";
        $this->campos = $args["campos"] ?? "";
        $this->puntuacion = $args["puntuacion"] ?? "";
        $this->total = $args["total"] ?? "";
        $this->testId = $args["testId"] ?? "";
        $this->usuarioId = $args["usuarioId"] ?? "";
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getHora() {
        return $this->hora;
    }

    public function setHora($hora) {
        $this->hora = $hora;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    public function getCamposExtra() {
        return $this->camposExtra;
    }

    public function setCamposExtra($camposExtra) {
        $this->camposExtra = $camposExtra;
    }

    public function getCampos() {
        return $this->campos;
    }

    public function setCampos($campos) {
        $this->campos = $campos;
    }

    public function getPuntuacion() {
        return $this->puntuacion;
    }

    public function setPuntuacion($puntuacion) {
        $this->puntuacion = $puntuacion;
    }

    public function getTotal() {
        return $this->total;
    }

    public function setTotal($total) {
        $this->total = $total;
    }

    public function getTestId() {
        return $this->testId;
    }

    public function setTestId($testId) {
        $this->testId = $testId;
    }

    public function getUsuarioId() {
        return $this->usuarioId;
    }

    public function setUsuarioId($usuarioId) {
        $this->usuarioId = $usuarioId;
    }
}