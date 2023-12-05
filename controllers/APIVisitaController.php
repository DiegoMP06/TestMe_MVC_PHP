<?php 
namespace Controller;

use Model\Visita;

class APIVisitaController {
    public static function visita() {
    }

    public static function crear() {
        isAuth();
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $visita = new Visita($_POST);
            $visita->setUsuarioId($_SESSION["id"]);
            $resultado = $visita->guardar();

            if($resultado) {
                $respuesta = [
                    "mensaje" => "Se Guardo Correctamente",
                    "tipo" => "exito",
                    "id" => $resultado["id"]
                ];

                echo json_encode($respuesta);
                return;
            }

            $respuesta = [
                "mensaje" => "Ha Ocurrido Un Error",
                "tipo" => "error"
            ];

            echo json_encode($respuesta);
        }
    }
}