<?php 
namespace Controller;

use Model\Visita;

class APIVisitaController {
    public static function visita() {
        isAuth();
        $testId = $_GET["testId"] ?? null;
        $usuarioId = $_SESSION["id"];

        if($testId) {
            $atributos = [
                "testId" => $testId,
                "usuarioId" => $usuarioId
            ];

            $visita = Visita::sql(
                $atributos,
                "SELECT * FROM :tabla: WHERE testId = ':testId' AND usuarioId = ':usuarioId' LIMIT 1"
            );

            $visita = array_shift($visita);

            if($visita) {
                $visita->setCampos(json_decode($visita->getCampos()));
                $visita->setCamposExtra(json_decode($visita->getCamposExtra()));
                $visita->setInstruccion(json_decode($visita->getInstruccion()));
            }

            $respuesta = [
                "mensaje" => "Se Consulto Correctamente la Visita",
                "tipo" => "exito",
                "visita" => $visita
            ];

            echo json_encode($respuesta);

            return;
        }

        $respuesta = [
            "mensaje" => "Hubo un Error al Consultar La Visita",
            "tipo" => "error"
        ];

        echo json_encode($respuesta);
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