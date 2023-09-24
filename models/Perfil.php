<?php
namespace Model;

class Perfil extends ActiveRecord {
    protected static $tabla = "perfiles";
    protected static $columnasDB = [
        "id",
        "email",
        "telefono",
        "creado",
        "usuarioId",
    ];

    protected $id;
    protected $email;
    protected $telefono;
    protected $creado;
    protected $usuarioId;
}