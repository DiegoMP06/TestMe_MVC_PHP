<?php 
namespace Model;

class Categoria extends ActiveRecord {
    protected static $tabla = "categorias";
    protected static  $columnasDB = [
        "id",
        "nombre",
        "imagen",
        "descripcion",
    ];

    protected $id;
    protected $nombre;
    protected $imagen;
    protected $descripcion;
}