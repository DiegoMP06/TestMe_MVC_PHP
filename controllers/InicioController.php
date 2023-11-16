<?php 
namespace Controller;

use Model\Categoria;
use Model\Sala;
use Model\Test;
use Model\Usuario;
use MVC\Router;

class InicioController {

    public static function salas(Router $router) {
        session_start();
        isAuth();

        $salas = Sala::whereAll("publico", "1");
        $usuarios = Usuario::whereAll("admin", "1");

        $router->render("inicio/salas", [
            "salas"=> $salas,
            "usuarios"=> $usuarios,
            "enlace" => [
                "url" => "/inicio",
                "texto" => "Ir al Inicio"
            ]
        ]);
    }

    public static function index(Router $router) {
        session_start();
        isAuth();

        $categorias = Categoria::all();
        $usuarios = Usuario::whereAll("admin", "1");
        $tests = [];

        foreach($categorias  as $categoria) {
            $testCategoria = Test::whereLimit("categoriaId", $categoria->getId(), 10);

            foreach($testCategoria as $test) {
                if($test->getPublico()) {
                    $tests[$categoria->getNombre()][] = $test;
                }
            }
        }
        
        $router->render("inicio/index", [
            "categorias" => $categorias,
            "tests" => $tests,
            "usuarios" => $usuarios,
            "enlace" => [
                "url" => "/inicio/salas",
                "texto" => "Buscar Salas"
            ]
        ]);
    }
}