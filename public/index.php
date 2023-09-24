<?php

use Controller\LoginController;
use MVC\Router;

require __DIR__ . "/../includes/app.php";

$router = new Router();

$router->get("/", [LoginController::class,  "login"]);
$router->post("/", [LoginController::class,  "login"]);

$router->get("/crear", [LoginController::class,  "crear"]);
$router->post("/crear", [LoginController::class,  "crear"]);

$router->comprobarRutas();