<?php

use Controller\InicioController;
use Controller\LoginController;
use Controller\TestController;
use MVC\Router;

require __DIR__ . "/../includes/app.php";

$router = new Router();

$router->get("/", [LoginController::class,  "login"]);
$router->post("/", [LoginController::class,  "login"]);

$router->get("/crear", [LoginController::class,  "crear"]);
$router->post("/crear", [LoginController::class,  "crear"]);

$router->get("/notificaciones", [LoginController::class, "notificar"]);

$router->get("/confirmar", [LoginController::class, "confirmar"]);

// Zona Privda
$router->get("/inicio", [InicioController::class, "index"]);

// Test
$router->get("/test", [TestController::class, "test"]);


$router->comprobarRutas();