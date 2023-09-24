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

    protected $id;
    protected $fecha;
    protected $hora;
    protected $usuarioId;
    protected $testId;
}