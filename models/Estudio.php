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

    protected $id;
    protected $fecha;
    protected $hora;
    protected $usuarioId;
    protected $salaId;
}