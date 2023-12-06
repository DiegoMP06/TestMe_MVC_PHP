<?php 
namespace Controller;
use Model\Favorito;

class APIFavoritoController {
    public static function favorito() {
        isAuth();
        $usuarioId = $_SESSION["id"];
        $testId = $_GET["testId"] ?? null;

        if($testId) {
            $atributos = [
                "testId" => $testId,
                "usuarioId" => $usuarioId
            ];

            $favorito = Favorito::sql(
                $atributos, 
                "SELECT * FROM :tabla: WHERE testId = ':testId' AND usuarioId = ':usuarioId' LIMIT 1"
            );
            $favorito = array_shift($favorito);

            $respuesta = [
                "mensaje" => "Se Consulto Correctamente el Favorito",
                "tipo" => "exito",
                "favorito" => $favorito
            ];

            echo json_encode($respuesta);
            return;
        }

        $respuesta = [
            "mensaje" => "Hubo Un Error al Consultar Favorito",
            "tipo" => "error",
        ];

        echo json_encode($respuesta);
    }

    public static function crear() {
        isAuth();
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $favorito = new Favorito($_POST);
            $favorito->setUsuarioId($_SESSION["id"]);
            $resultado = $favorito->guardar();
            if($resultado) {
                $favorito->setId($resultado["id"]);

                $respuesta = [
                    "mensaje" => "Se Creo Correctamente",
                    "tipo" => "exito",
                    "favorito" => $favorito
                ];

                echo json_encode($respuesta); 

                return;
            }

            $respuesta = [
                "mensaje" => "Hubo Un Error",
                "tipo" => "error"
            ];

            echo json_encode($respuesta);
        }
    }

    public static function eliminar() {
        isAuth();
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $favorito = Favorito::find($_POST["id"]);

            if($favorito) {
                $resultado = $favorito->eliminar();

                if($resultado) {
                    $respuesta = [
                        "mensaje" => "Eliminado Correctamente",
                        "tipo" => "exito"
                    ];
                    echo json_encode($respuesta);
                    return;
                }
            }

            $respuesta = [
                "mensaje" => "Hubo un Error",
                "tipo" => "error"
            ];
            
            echo json_encode($respuesta);
        }
    }
}