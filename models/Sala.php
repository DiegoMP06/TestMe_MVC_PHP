<?php
namespace Model;

class Sala extends ActiveRecord {
    protected static $tabla = "salas";
    protected static $columnasDB = [
        "id",
        "nombre",
        "descripcion",
        "alumnos",
        "profesores",
        "alumnosMax",
        "profesoresMax",
        "creado",
        "actualizado",
        "publico",
        "tiempo",
        "acceso",
        "usuarioId",
    ];

    protected $id;
    protected $nombre;
    protected $descripcion;
    protected $alumnos;
    protected $profesores;
    protected $alumnosMax;
    protected $profesoresMax;
    protected $creado;
    protected $actualizado;
    protected $publico;
    protected $tiempo;
    protected $acceso;
    protected $usuarioId;
    
}