<?php

use Model\ActiveRecord;

require __DIR__ . "/../vendor/autoload.php";

require "database.php";
require "funciones.php";

define("CARPETA_IMAGENES_USUARIOS", __DIR__ . "/../public/imagenes/users/");
define("CARPETA_IMAGENES_CATEGORIAS", __DIR__ . "/../public/imagenes/categorias/");
define("CARPETA_IMAGENES", __DIR__ . "/../public/imagenes/");
define("IMAGEN_PLACEHOLDER", __DIR__ . "/../public/build/img/perfil.webp");

$db = conectarDB();
ActiveRecord::setDb($db);