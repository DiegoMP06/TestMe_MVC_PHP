<?php 
namespace Controller;

use Model\Usuario;

class APIUsuarioController {

    public static function session() {
        if(!$_SESSION["login"]) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar La Sesión",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        echo json_encode($_SESSION);
    }

    public static function index() {
        $id = $_GET["id"];
        $usuario = Usuario::find($id);

        if(!$usuario) {
            $resultado = [
                "mensaje" => "Hubo Un Error al Consultar El Usuario",
                "tipo" => "error"
            ];

            echo json_encode($resultado);
            return;
        }

        $usuario->setPerfil(json_decode($usuario->getPerfil()));

        if(!$usuario->getPerfil()->email) {
            unset($usuario->email);
        }

        if(!$usuario->getPerfil()->creado) {
            unset($usuario->creado);
        }
        if(!$usuario->getPerfil()->telefono) {
            unset($usuario->telefono);
        }

        if(!$usuario->getPerfil()->descripcion) {
            unset($usuario->descripcion);
        }

        unset($usuario->password);
        unset($usuario->token);

        $resultado = [
            "mensaje" => "Se consulto El Usuario",
            "tipo" => "exito",
            "usuario" => $usuario
        ];

        echo json_encode($resultado);
    }
}