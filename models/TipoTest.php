<?php 
namespace Model;

class TipoTest extends ActiveRecord {
    protected static $tabla = "tipostest";
    protected static $columnasDB = [
        "id",
        "nombre",
        "instrucciones",
        "imagen",
    ];

    public $id;
    public $nombre;
    public $instrucciones;
    public $Imagen;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->instrucciones = $args["instrucciones"] ?? "";
        $this->Imagen = $args["Imagen"] ?? "";
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

    public function getInstrucciones() {
        return $this->instrucciones;
    }

    public function setInstrucciones($instrucciones) {
        $this->instrucciones = $instrucciones;
    }

    public function getImagen() {
        return $this->Imagen;
    }

    public function setImagen($Imagen) {
        $this->Imagen = $Imagen;
    }
}