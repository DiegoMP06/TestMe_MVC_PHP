<?php 
namespace Controller;

use Model\Test;

class APITestController {
    public static function crear() {
        isAdmin();

        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $test = new Test($_POST);
            $test->establecerURL();
            $test->setUsuarioId($_SESSION["id"]);

            $resultado = $test->guardar();

            if($resultado) {
                $respuesta = [
                    "mensaje" => "El Test Se Creo Correctamente",
                    "tipo" => "exito",
                    "url" => $test->getUrl()
                ];

                echo json_encode($respuesta);
                return;
            }

            $respuesta = [
                "mensaje" => "Error al Crear El Test",
                "tipo" => "error"
            ];
        }
    }

    public static function test() {
        isAuth();
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
        $test->setInstrucciones(json_decode($test->getInstrucciones()));
        $test->setCampos(json_decode($test->getCampos()));

        $resultado = [
            "mensaje" => "Se consulto el Test",
            "tipo" => "exito",
            "test" => $test
        ];

        echo json_encode($resultado);
    }
}