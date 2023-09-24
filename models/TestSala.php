<?php 
namespace Model;

class TestSala extends ActiveRecord {
    protected static $tabla = "testssalas";
    protected static $columnasDB = [
        "id",
        "testId",
        "salaId"
    ];
}