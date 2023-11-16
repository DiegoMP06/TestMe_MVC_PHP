<?php 
namespace Controller;

use Model\Sala;
use MVC\Router;

class SalaControlller {

    public static function edu(Router $router) {
        session_start();
        isAuth();
        
        $url = $_GET["url"] ?? null;
        $password = $_GET["password"] ?? null;
        if(!$url) header("Location: /404");
        $sala = Sala::where("url", $url);
        if(is_null($sala)) header("Location: /404");

        if(!$sala->getPublico() && $password !== $sala->getPassword()) {
            header("Location: /inicio/salas");
        }

        $router->render("salas/edu", [
            "sala" => $sala
        ]);
    }

    public static function index(Router $router) {
        session_start();
        isAdmin();

        $salas = Sala::whereAll("usuarioId", $_SESSION["id"]);

        $router->render("salas/index", [
            "salas" => $salas
        ]);
    }

    public static function sala(Router $router) {
        session_start();
        isAdmin();
        
        $url = $_GET["url"] ?? null;
        if(!$url) header("Location: /404");
        $sala = Sala::where("url", $url);
        if(is_null($sala)) header("Location: /404");
        if($_SESSION["id"] !== $sala->getUsuarioId()) header("Location: /404");
        
        $router->render("salas/sala");
    }

    public static function crear(Router $router) {
        session_start();
        isAdmin();

        $sala = new Sala;
        $alertas = [];

        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $sala->sincronizar($_POST);
            $alertas = $sala->validarCrear();

            if(empty($alertas)) {
                $sala->crearUrlYPassword();
                $sala->setUsuarioId($_SESSION["id"]);
                $resultado = $sala->guardar();

                if($resultado) {
                    header("Location: /sala?url=" . $sala->getUrl());
                }
            }
        }
        
        $alertas = Sala::getAlertas();

        $router->render("salas/crear", [
            "alertas" => $alertas,
            "sala" => $sala
        ]);
    }

    public static function alumnos(Router $router) {
        session_start();
        isAdmin();
        
        $url = $_GET["url"] ?? null;
        if(!$url) header("Location: /404");
        $sala = Sala::where("url", $url);
        if(is_null($sala)) header("Location: /404");
        if($_SESSION["id"] !== $sala->getUsuarioId()) header("Location: /404");

        $router->render("salas/alumnos");
    }
}