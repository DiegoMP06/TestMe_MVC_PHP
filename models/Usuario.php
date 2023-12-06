<?php
namespace Model;

class Usuario extends ActiveRecord {
    protected static $tabla = "usuarios";
    protected static $columnasDB = [
        "id",
        "nombre",
        "apellido",
        "usuario",
        "email",
        "telefono",
        "password",
        "descripcion",
        "imagen",
        "perfil",
        "token",
        "creado",
        "confirmado",
        "admin",
        "superadmin",
    ];

    public $id;
    public $nombre;
    public $apellido;
    public $usuario;
    public $email;
    public $telefono;
    public $password;
    public $descripcion;
    public $imagen;
    public $perfil;
    public $token;
    public $creado;
    public $confirmado;
    public $admin;
    public $superadmin;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->apellido = $args["apellido"] ?? "";
        $this->usuario = $args["usuario"] ?? "";
        $this->email = $args["email"] ?? "";
        $this->telefono = $args["telefono"] ?? "";
        $this->password = $args["password"] ?? "";
        $this->descripcion = $args["descripcion"] ?? "";
        $this->imagen = $args["imagen"] ?? "";
        $this->perfil = $args["perfil"] ?? '{"email": false, "telefono": false, "descripcion": false, "creado": false}';
        $this->token = $args["token"] ?? "";
        $this->creado = $args["creado"] ?? date("Y-m-d");
        $this->confirmado = $args["confirmado"] ?? 0;
        $this->admin = $args["admin"] ?? 0;
        $this->superadmin = $args["superadmin"] ?? 0;
    }

    public function validarLogin() {
        if(!$this->email){
            self::setAlerta("email", "El Correo Electronico Es Obligatorio");
        }
        
        if(!$this->password){
            self::setAlerta("password", "La Contraseña Es Obligatoria");
        }

        return self::getAlertas();
    }

    public function validarCrear($confirmacion) {
        if(!$this->nombre) {
            self::setAlerta("nombre", "El Nombre es Obligatorio");
        }

        if(!$this->apellido) {
            self::setAlerta("apellido", "El Apellido es Obligatorio");
        }

        foreach(str_split($this->usuario) as $char) {
            if(preg_match("/[0-9]/", $char) || ($char === "-" || $char === "_")) continue;
            if(!preg_match("/[a-z]/", $char)) {
                self::setAlerta("usuario", "Formato No valido");
                break;
            }
        }

        if(!$this->usuario) {
            self::setAlerta("usuario", "El Usuario es Obligatorio");
        }

        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::setAlerta("email", "Formato No Valido");
        }

        if(!$this->email) {
            self::setAlerta("email", "El Correo Elecronico es Obligatorio");
        }
        
        foreach(str_split($this->telefono) as $num) {
            if(!preg_match("/[0-9]/", $num)) {
                self::setAlerta("telefono", "Formato No Valido");
                break;
            }
        }

        if(strlen($this->telefono) !== 10) {
            self::setAlerta("telefono", "Formato No Valido");
        }

        if(!$this->telefono) {
            self::setAlerta("telefono", "El Numero de Telefono es Obligatorio");
        }

        if(strlen($this->password) < 6) {
            self::setAlerta("password", "Las Contraseñas Deben tener Por lo Menos 6 Caracteres");
        }

        if($this->password !== $confirmacion) {
            self::setAlerta("password", "Las Contraseñas No Coinciden");
        }
        
        if(!$this->password || !$confirmacion) {
            self::setAlerta("password", "Las Contraseñas son Obligatorias");
        }

        return self::getAlertas();
    }

    public function crearToken() {
        $this->token = uniqid(rand(1000000, 9999999));
    }

    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function verificarPassword($passwordHash) {
        $password = password_verify($this->password, $passwordHash);
        return $password;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function getImagen() {
        return $this->imagen;
    }

    public function setImagen($imagen) {
        $this->imagen = $imagen;
    }

    public function getPerfil() {
        return $this->perfil;
    }

    public function setPerfil($perfil) {
        $this->perfil = $perfil;
    }

    public function getToken() {
        return $this->token;
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function getCreado() {
        return $this->creado;
    }

    public function setCreado($creado) {
        $this->creado = $creado;
    }

    public function getConfirmado() {
        return $this->confirmado;
    }

    public function setConfirmado($confirmado) {
        $this->confirmado = $confirmado;
    }

    public function getAdmin() {
        return $this->admin;
    }

    public function setAdmin($admin) {
        $this->admin = $admin;
    }

    public function getSuperadmin() {
        return $this->superadmin;
    }

    public function setSuperadmin($superadmin) {
        $this->superadmin = $superadmin;
    }
}