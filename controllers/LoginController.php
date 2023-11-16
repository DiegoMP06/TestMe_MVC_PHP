<?php 
namespace Controller;

use Clase\Email;
use Intervention\Image\ImageManagerStatic as Imagen;
use Model\Usuario;
use MVC\Router;

class LoginController{
    public static function login(Router $router){
        $usuario = new Usuario;
        $alertas = [];

        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarLogin();

            if(empty($alertas)){
                $auth = Usuario::where("email", $usuario->getEmail());

                if(is_null($auth)) {
                    Usuario::setAlerta("email", "Usuario No Encontrado");
                } else {
                    if(!$auth->getConfirmado()) {
                        Usuario::setAlerta("email", "Usuario No Confirmado");
                    }

                    if(empty(Usuario::getAlertas())) {
                        if($usuario->verificarPassword($auth->getPassword())) {
                            $_SESSION["login"] = true;
                            $_SESSION["id"] = $auth->getId();
                            $_SESSION["nombre"] = $auth->getNombre() . " " . $auth->getApellido();
                            $_SESSION["usuario"] = $auth->getUsuario();
                            $_SESSION["email"] = $auth->getEmail();
                            $_SESSION["imagen"] = $auth->getImagen();

                            if($auth->getAdmin() === "1") {
                                $_SESSION["admin"] = true;
                            } elseif($auth->getSuperadmin() === "1") {
                                $_SESSION["superadmin"] = true;
                                header("Location: /admin");
                            }

                            header("Location: /inicio");
                        } else {
                            Usuario::setAlerta("password", "Contraseña Incorrecta");
                        }
                    }
                } 
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render("auth/login", [
            "alertas" => $alertas,
            "usuario" => $usuario
        ]);
    }

    public static function crear(Router $router) {
        $usuario = new Usuario;
        $alertas = [];

        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarCrear($_POST["confirmacion"]);
            
            if(empty($alertas)) {
                if(Usuario::where("email", $usuario->getEmail())) {
                    Usuario::setAlerta("email", "Email Ya enlazado a una Cuenta");
                }

                if(Usuario::where("usuario", $usuario->getUsuario())) {
                    Usuario::setAlerta("usuario", "Usuario Ya enlazado a una Cuenta");
                }

                if(empty(Usuario::getAlertas())) {
                    $nombreImagen = md5(uniqid(rand(), true)) . '.png';
                    $usuario->crearToken();
                    $usuario->setImagen($nombreImagen);
                    $usuario->hashPassword();

                    $email = new Email($usuario->getNombre(), $usuario->getEmail(), $usuario->getUsuario(), $usuario->getToken());
                    
                    $resultado = $usuario->guardar();
                    
                    if($resultado) {
                        $email->confirmar();
                        $image = Imagen::make(IMAGEN_PLACEHOLDER)->fit(1000, 1000);
                        
                        if (!is_dir(CARPETA_IMAGENES_USUARIOS . $usuario->getUsuario())) {
                            mkdir(CARPETA_IMAGENES_USUARIOS . $usuario->getUsuario(), 0777, true);
                        }

                        $image->save(CARPETA_IMAGENES_USUARIOS . $usuario->getUsuario() . "/" . $nombreImagen);

                        header("Location: /notificaciones?solicitud=confirmar");
                    }
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render("auth/crear", [
            "alertas" => $alertas, 
            "usuario" => $usuario
        ]);
    }

    public static function notificar(Router $router) {
        $solicitud = $_GET["solicitud"] ?? null;

        $solicitudes = [
            "confirmar" => "Se te Ha Enviado un Email de Confirmacion",
            "recuperar" => "Se te Ha enviado un email con los Pasos a Seguir"
        ];

        is404(in_array($solicitud, array_keys($solicitudes)));

        $mensaje = $solicitudes[$solicitud];

        $router->render("auth/notificacion", [
            "mensaje" => $mensaje
        ]);
    }


    public static function confirmar(Router $router) {
        $token = $_GET["token"];
        is404(strlen($token) === 20);

        $usuario = Usuario::where("token", $token);
        is404(!is_null($usuario));

        $usuario->setToken("");
        $usuario->setConfirmado(1);
        $usuario->guardar();

        $router->render("auth/confirmar");
    }

    public static function logout() {
        session_start();
        $_SESSION = [];

        header("Location: /");
    }
}