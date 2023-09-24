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

    protected $id;
    protected $nombre;
    protected $instrucciones;
    protected $Imagen;
}