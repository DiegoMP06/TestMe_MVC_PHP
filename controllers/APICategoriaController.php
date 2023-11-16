<?php 
namespace Controller;

use Model\Categoria;

class APICategoriaController {
    public static function index() {
        $id = $_GET["id"];
        $categoria = Categoria::find($id);

        if(!$categoria) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar La Categoria",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        $resultado = [
            "mensaje" => "Se consulto la Categoria",
            "tipo" => "exito",
            "categoria" => $categoria
        ];

        echo json_encode($resultado);
    }
}