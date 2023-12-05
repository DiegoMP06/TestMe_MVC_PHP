<?php 
namespace Controller;

use Model\Test;
use MVC\Router;

class TestController {
    public static function edu(Router $router) {
        isAuth();
        
        $url = $_GET["url"];
        if(!$url) header("Location: /404");
        $test = Test::where("url", $url);
        if(is_null($test)) header("Location: /404");
        if(!$test->getPublico() && !($test->getUsuarioId() === $_SESSION["id"])) header("Location: /404");

        $router->render("test/edu");
    }

    public static function index(Router $router) {
        isAdmin();
        $tests = Test::whereAll("usuarioId", $_SESSION["id"]);
        $router->render("test/index", [
            "tests" => $tests
        ]);
    }

    public static function test(Router $router) {
        $url = $_GET["url"];
        if(!$url) header("Location: /404");
        $test = Test::where("url", $url);
        if(is_null($test)) header("Location: /404");
        if((int) $test->getUsuarioId() !== (int) $_SESSION["id"]) header("Location: /404");

        $router->render("test/test");
    }

    public static function crear(Router $router) {
        isAdmin();

        $router->render("test/crear");
    }
}