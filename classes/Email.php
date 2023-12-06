<?php 
namespace Clase;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    protected $nombre;
    protected $email;
    protected $usuario;
    protected $token;

    public function __construct($nombre, $email, $usuario, $token) {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->usuario = $usuario;
        $this->token = $token;
    }

    public function confirmar() {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = "sandbox.smtp.mailtrap.io";
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = "fe3d1008afd1a6";
        $mail->Password = "b3da30ddcb6ed2";

        $mail->setFrom("aliamaka055@gmail.com", "TestMe.com");
        $mail->addAddress($this->email, $this->nombre);
        $mail->Subject = "Confirma Tu Cuenta de TestMe.com";

        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";

        $contenido = "<html>";
        $contenido .= "<h1>Hola {$this->nombre}</h1>";
        $contenido .= "<p>Has Creado una Cuenta en TestMe como {$this->usuario} Por Favor Confirma Tu Cuenta para Disfrutar de Nuestro Sitio</p>";
        $contenido .= "<p>Para Confirmar Tu cuenta Haz <a href='http://localhost:3000/confirmar?token={$this->token}'>Click Aqui</a> </p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        $mail->send();
    }
}