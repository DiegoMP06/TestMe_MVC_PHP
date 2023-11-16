<?php 
namespace Controller;

use Model\Test;
use MVC\Router;

class TestController {
    public static function edu(Router $router) {
        session_start();
        isAuth();
        
        $url = $_GET["url"];
        if(!$url) header("Location: /404");
        $test = Test::where("url", $url);
        if(is_null($test)) header("Location: /404");
        if(!$test->getPublico() && !($test->getUsuarioId() === $_SESSION["id"])) header("Location: /404");

        $router->render("test/test", [
            "test" => $test
        ]);
    }
}