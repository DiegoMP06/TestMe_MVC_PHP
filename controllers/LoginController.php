<?php 
namespace Controller;

use Model\Usuario;
use MVC\Router;

class LoginController{
    public static function login(Router $router){

        $usuario = new Usuario;
        $alertas = [];

        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarLogin();
        }

        $router->render("auth/login", [
            "alertas" => $alertas
        ]);
    }

    public static function crear(Router $router){
        $router->render("auth/crear", []);
    }
}