<?php

function conectarDB(){
    try {
        $db = mysqli_connect("localhost", "root", "root", "test_mvc");
        $db->set_charset("utf8");

    } catch (\Throwable $th) {
        echo "Error: No se pudo conectar a MySQL.";
        echo "errno de depuración: " . mysqli_connect_errno();
        echo "error de depuración: " . mysqli_connect_error();
        debuguear($th);
    }
    return $db;
}