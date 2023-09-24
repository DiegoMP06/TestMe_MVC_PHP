<?php 
namespace Model;

class Colaboracion extends ActiveRecord {
    protected static $tabla = "colaboraciones";
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