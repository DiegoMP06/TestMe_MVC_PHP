<?php 
namespace Controller;

use Model\Categoria;
use Model\Test;
use Model\TestAutor;
use MVC\Router;

class InicioController {
    public static function index(Router $router) {

        $categorias = Categoria::all();

        $columnas = [
            "tests.id",
            "tests.nombre",
            "tests.descripcion as descripcionTest",
            "tests.numPreguntas",
            "tests.visitas",
            "tests.creado",
            "tests.actualizado",
            "tipostest.nombre as tipo",
            "categorias.nombre  as categoria",
            "CONCAT(usuarios.nombre ,' ', usuarios.apellido) as autor",
            "usuarios.usuario"
        ];

        $joins = [
            "LEFT OUTER JOIN tipostest ON tests.tipoTestId = tipostest.Id",
            "LEFT OUTER JOIN categorias ON tests.categoriaId = categorias.id",
            "LEFT OUTER JOIN usuarios ON tests.usuarioId = usuarios.id"
        ];

        foreach($categorias  as $categoria) {
            $testAutor[$categoria->getNombre()] = TestAutor::Join($columnas, $joins, [
                [
                    "columna" => "tests.publico",
                    "valor" => "1"
                ],
                [
                    "comparacion" => "AND",
                    "columna" => "tests.categoriaId",
                    "valor" => $categoria->getId()
                ]
            ]);
        }
        
        $router->render("inicio/index", [
            "testAutor" => $testAutor,
            "categorias" => $categorias
        ]);
    }
}