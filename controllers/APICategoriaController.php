<?php 
namespace Controller;

use Model\Categoria;

class APICategoriaController {
    public static function categorias() {
        $categorias = Categoria::all();

        $resultado = [
            "mensaje" => "Se Consultaron Las Categorias",
            "tipo" => "exito",
            "categorias" => $categorias
        ];

        echo json_encode($resultado);
    }

    public static function categoria() {
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