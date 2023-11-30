<?php

use MVC\Router;
use Model\Usuario;
use Controller\TestController;
use Controller\LoginController;
use Controller\InicioController;
use Controller\APITestController;
use Controller\APIUsuarioController;
use Controller\APITipoTestController;
use Controller\APICategoriaController;
use Controller\APISalaController;
use Controller\SalaControlller;
use Controller\UsuarioController;

require __DIR__ . "/../includes/app.php";

$router = new Router();

$router->get("/", [LoginController::class,  "login"]);
$router->post("/", [LoginController::class,  "login"]);

$router->get("/crear", [LoginController::class,  "crear"]);
$router->post("/crear", [LoginController::class,  "crear"]);

$router->get("/logout", [LoginController::class,  "logout"]);

$router->get("/notificaciones", [LoginController::class, "notificar"]);

$router->get("/confirmar", [LoginController::class, "confirmar"]);

// Zona Privda
$router->get("/inicio", [InicioController::class, "index"]);
$router->get("/inicio/salas", [InicioController::class, "salas"]);

// Perfiles
$usuarios = Usuario::all();

foreach($usuarios as $usuario) {
    $router->get("/usuario/" . sanitizar($usuario->getUsuario()) , [UsuarioController::class, "perfil"]);
}

// Salas
$router->get("/sala/crear", [SalaControlller::class, "crear"]);
$router->post("/sala/crear", [SalaControlller::class, "crear"]);

$router->get("/sala/actualizar", [SalaControlller::class, "actualizar"]);
$router->get("/sala/eliminar", [SalaControlller::class, "eliminar"]);
$router->get("/sala/admin", [SalaControlller::class, "index"]);
$router->get("/sala", [SalaControlller::class, "sala"]);

$router->get("/edu/sala", [SalaControlller::class, "edu"]);

$router->get("/sala/alumnos", [SalaControlller::class, "alumnos"]);

// Test
$router->get("/test/crear", [TestController::class, "crear"]);
$router->get("/test/actualizar", [TestController::class, "actualizar"]);
$router->get("/test/eliminar", [TestController::class, "eliminar"]);
$router->get("/test/admin", [TestController::class, "index"]);
$router->get("/test", [TestController::class, "test"]);

$router->get("/edu/test", [TestController::class, "edu"]);

// API
$router->get("/api/test", [APITestController::class, "test"]);
$router->post("/api/test/crear", [APITestController::class, "crear"]);
$router->get("/api/tests", [APITestController::class, "tests"]);

$router->get("/api/categoria", [APICategoriaController::class, "categoria"]);
$router->get("/api/categorias", [APICategoriaController::class, "categorias"]);

$router->get("/api/usuario", [APIUsuarioController::class, "usuario"]);

$router->get("/api/session", [APIUsuarioController::class, "session"]);

$router->get("/api/tipotest", [APITipoTestController::class, "tipoTest"]);
$router->get("/api/tipostests", [APITipoTestController::class, "tiposTests"]);

$router->get("/api/sala", [APISalaController::class, "sala"]);
$router->post("/api/sala/actualizar", [APISalaController::class, "actualizar"]);

$router->comprobarRutas();