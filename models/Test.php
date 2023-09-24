<?php
namespace Model;

class Test extends ActiveRecord {
    protected static $tabla = "tests";
    protected static $columnaDB = [
        "id",
        "nombre",
        "descripcion",
        "instrucciones",
        "opciones",
        "preguntas",
        "numOpciones",
        "numPreguntas",
        "visitas",
        "creado",
        "actualizado",
        "publico",
        "categoriaId",
        "tipoTestId",
        "usuarioId",
    ];

    protected $id;
    protected $nombre;
    protected $descripcion;
    protected $instrucciones;
    protected $opciones;
    protected $preguntas;
    protected $numOpciones;
    protected $numPreguntas;
    protected $visitas;
    protected $creado;
    protected $actualizado;
    protected $publico;
    protected $categoriaId;
    protected $tipoTestId;
    protected $usuarioId;
}