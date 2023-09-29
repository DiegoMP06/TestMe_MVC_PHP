<?php 
namespace Controller;

use Model\TestAutor;
use MVC\Router;

class TestController {
    public static function test(Router $router) {
        $id = $_GET["id"];

        $columnas = [
            "tests.id",
            "tests.nombre",
            "tests.descripcion as descripcionTest",
            "tests.instrucciones as instruccionTest",
            "tests.preguntas",
            "tests.opciones",
            "tests.numPreguntas",
            "tests.visitas",
            "tests.creado",
            "tests.actualizado",
            "tests.publico",
            "tipostest.nombre as tipo",
            "tipostest.instrucciones as descripcionTipo",
            "categorias.nombre as categoria",
            "categorias.imagen as imagenCategoria",
            "categorias.descripcion as descripcionCategoria",
            "CONCAT(usuarios.nombre ,' ', usuarios.apellido) as autor",
            "usuarios.usuario",
            "usuarios.imagen as imagenAutor"
        ];

        $joins = [
            "LEFT OUTER JOIN tipostest ON tests.tipoTestId = tipostest.Id",
            "LEFT OUTER JOIN categorias ON tests.categoriaId = categorias.id",
            "LEFT OUTER JOIN usuarios ON tests.usuarioId = usuarios.id"
        ];

        $testAutor = TestAutor::Join($columnas, $joins, [
            [
                "columna" => "tests.id", 
                "valor" => $id, 
            ]
        ]);

        $testAutor = array_shift($testAutor);
        is404($testAutor);
        is404($_SESSION["usuario"] === $testAutor->getUsuario() || $testAutor->getPublico() === "1");

        $testAutor->setPreguntas((array) json_decode($testAutor->getPreguntas()));
        $testAutor->setOpciones((array) json_decode($testAutor->getOpciones()));

        $router->render("test/test", [
            "testAutor" => $testAutor
        ]);
    }
}