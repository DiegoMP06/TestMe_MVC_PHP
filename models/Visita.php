<?php 
namespace Model;

class Visita extends ActiveRecord {
    protected static $tabla = "visitas";
    protected static $columnasDB = [
        "id",
        "hora",
        "fecha",
        "puntuacion",
        "total",
        "testId",
        "usuarioId",
        "salaId",
    ];

    protected $id;
    protected $hora;
    protected $fecha; 
    protected $puntuacion;
    protected $total;
    protected $testId;
    protected $usuarioId;
    protected $salaId;
}