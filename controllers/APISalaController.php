<?php 
namespace Controller;

use Model\Sala;

class APISalaController {
    public static function sala() {
        isAdmin();
        $url = $_GET["url"];

        $sala = Sala::where("url", $url);

        if(!$sala) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar El Test",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        $resultado = [
            "mensaje" => "Se consulto la Sala",
            "tipo" => "exito",
            "sala" => $sala
        ];

        echo json_encode($resultado);
    }

    public static function actualizar() {
        isAdmin();
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $sala = new Sala($_POST);

            if($_POST["tipoConsulta"] === "token") {
                $sala->crearPassword();
            }
            
            $sala->setActualizado(date("Y-m-d"));
            $resultado = $sala->guardar();

            if($resultado) {
                $resultado = [
                    "tipo" => "exito",
                    "Mensaje" => "La actualizacion de " . $_POST["tipoConsulta"] . " salio Exitosa",
                    "sala" => $sala
                ];

                echo json_encode($resultado);
                return; 
            }

            $resultado =  [
                "tipo" => "error",
                "mensaja" => "Ha ocurrido un error en la actualizacion de " . $_POST["tipoConsulta"]
            ];

            echo json_encode($resultado);
        }
    }


    public static function alumnos() {
        
    }
}