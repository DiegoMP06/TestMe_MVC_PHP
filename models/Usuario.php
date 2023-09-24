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
        "token",
        "creado",
        "confirmado",
        "admin",
        "superadmin",
        "perfilId",
    ];

    protected $id;
    protected $nombre;
    protected $apellido;
    protected $usuario;
    protected $email;
    protected $telefono;
    protected $password;
    protected $descripcion;
    protected $imagen;
    protected $token;
    protected $creado;
    protected $confirmado;
    protected $admin;
    protected $superadmin;
    protected $perfilId;

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
        $this->token = $args["token"] ?? "";
        $this->creado = $args["creado"] ?? date("Y-m-d");
        $this->confirmado = $args["confirmado"] ?? 0;
        $this->admin = $args["admin"] ?? 0;
        $this->superadmin = $args["superadmin"] ?? 0;
        $this->perfilId = $args["perfilId"] ?? null;
    }

    public function validarLogin() {
        if(!$this->email){
            self::setAlerta("email", "El Correo Electronico Es Obligatorio");
        }
        
        if(!$this->password){
            self::setAlerta("password", "La Contraseña Es Obligatorio");
        }

        return self::getAlertas();
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

    public function getPerfilId() {
        return $this->perfilId;
    }

    public function setPerfilId($perfilId) {
        $this->perfilId = $perfilId;
    }
}