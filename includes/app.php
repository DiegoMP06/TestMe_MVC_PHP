<?php

use Model\ActiveRecord;

require __DIR__ . "/../vendor/autoload.php";


require "database.php";
require "funciones.php";

$db = conectarDB();
ActiveRecord::setDb($db);