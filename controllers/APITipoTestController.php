<?php 
namespace Controller;

use Model\TipoTest;

class APITipoTestController {
    public static function index() {
        $id = $_GET["id"];
        $tipoTest = TipoTest::find($id);
        
        if(!$tipoTest) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar El Tipo del Test",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        $resultado = [
            "mensaje" => "Se consulto el Tipo del Test",
            "tipo" => "exito",
            "tipoTest" => $tipoTest
        ];

        echo json_encode($resultado);
    }
}