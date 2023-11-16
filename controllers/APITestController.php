<?php 
namespace Controller;

use Model\Test;

class APITestController {
    public static function index() {
        session_start();
        $url = $_GET["url"];

        $test = Test::where("url", $url);

        if(!$test) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar El Test",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        $test->setPreguntas(json_decode($test->getPreguntas()));
        $test->setOpciones(json_decode($test->getOpciones()));

        $resultado = [
            "mensaje" => "Se consulto el Test",
            "tipo" => "exito",
            "test" => $test
        ];

        echo json_encode($resultado);
    }
}