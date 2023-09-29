<?php 
namespace Model;

/***
* SELECT 
* tests.id, 
* tests.nombre, 
* tests.descripcion as descripcionTest, 
* tests.instrucciones as instruccionTest, 
* tests.opciones, 
* tests.preguntas, 
* tests.numOpciones, 
* tests.numPreguntas, 
* tests.visitas, 
* tests.creado, 
* tests.actualizado, 
* tests.publico, 
* tipostest.nombre as tipo, 
* tipostest.instrucciones as descripcionTipo, 
* tipostest.imagen  as imagenTipo, 
* categorias.nombre  as categoria, 
* categorias.imagen as imagenCategoria, 
* categorias.descripcion as descripcionCategoria, 
* CONCAT(usuarios.nombre, " ", usuarios.apellido) as autor, 
* usuarios.usuario, 
* usuarios.email, 
* usuarios.telefono, 
* usuarios.imagen as imagenAutor 
* FROM tests 
* LEFT OUTER JOIN tipostest ON tests.tipoTestId = tipostest.Id 
* LEFT OUTER JOIN categorias ON tests.categoriaId = categorias.id
* LEFT OUTER JOIN usuarios ON tests.usuarioId = usuarios.id;
***/

class TestAutor extends ActiveRecord {
    protected static $tabla = "tests";
    protected static $columnasDB = [
        "id",
        "nombre",
        "descripcionTest",
        "instruccionTest",
        "opciones",
        "preguntas",
        "numOpciones",
        "numPreguntas",
        "visitas",
        "creado",
        "actualizado",
        "publico",
        "tipo",
        "descripcionTipo",
        "imagenTipo",
        "categoria",
        "imagenCategoria",
        "descripcionCategoria",
        "autor",
        "usuario",
        "email",
        "telefono",
        "imagenAutor",
    ];

    protected $id;
    protected $nombre;
    protected $descripcionTest;
    protected $instruccionTest;
    protected $opciones;
    protected $preguntas;
    protected $numOpciones;
    protected $numPreguntas;
    protected $visitas;
    protected $creado;
    protected $actualizado;
    protected $publico;
    protected $tipo;
    protected $descripcionTipo;
    protected $imagenTipo;
    protected $categoria;
    protected $imagenCategoria;
    protected $descripcionCategoria;
    protected $autor;
    protected $usuario;
    protected $email;
    protected $telefono;
    protected $imagenAutor;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->descripcionTest = $args["descripcionTest"] ?? "";
        $this->instruccionTest = $args["instruccionTest"] ?? "";
        $this->opciones = $args["opciones"] ?? "";
        $this->preguntas = $args["preguntas"] ?? "";
        $this->numOpciones = $args["numOpciones"] ?? "";
        $this->numPreguntas = $args["numPreguntas"] ?? "";
        $this->visitas = $args["visitas"] ?? "";
        $this->creado = $args["creado"] ?? "";
        $this->actualizado = $args["actualizado"] ?? "";
        $this->publico = $args["publico"] ?? "";
        $this->tipo = $args["tipo"] ?? "";
        $this->descripcionTipo = $args["descripcionTipo"] ?? "";
        $this->imagenTipo = $args["imagenTipo"] ?? "";
        $this->categoria = $args["categoria"] ?? "";
        $this->imagenCategoria = $args["imagenCategoria"] ?? "";
        $this->descripcionCategoria = $args["descripcionCategoria"] ?? "";
        $this->autor = $args["autor"] ?? "";
        $this->usuario = $args["usuario"] ?? "";
        $this->email = $args["email"] ?? "";
        $this->telefono = $args["telefono"] ?? "";
        $this->imagenAutor = $args["imagenAutor"] ?? "";
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

    public function getDescripcionTest() {
        return $this->descripcionTest;
    }

    public function setDescripcionTest($descripcionTest) {
        $this->descripcionTest = $descripcionTest;
    }

    public function getInstruccionTest() {
        return $this->instruccionTest;
    }

    public function setInstruccionTest($instruccionTest) {
        $this->instruccionTest = $instruccionTest;
    }

    public function getOpciones() {
        return $this->opciones;
    }

    public function setOpciones($opciones) {
        $this->opciones = $opciones;
    }

    public function getPreguntas() {
        return $this->preguntas;
    }

    public function setPreguntas($preguntas) {
        $this->preguntas = $preguntas;
    }

    public function getNumOpciones() {
        return $this->numOpciones;
    }

    public function setNumOpciones($numOpciones) {
        $this->numOpciones = $numOpciones;
    }

    public function getNumPreguntas() {
        return $this->numPreguntas;
    }

    public function setNumPreguntas($numPreguntas) {
        $this->numPreguntas = $numPreguntas;
    }

    public function getVisitas() {
        return $this->visitas;
    }

    public function setVisitas($visitas) {
        $this->visitas = $visitas;
    }

    public function getCreado() {
        return $this->creado;
    }

    public function setCreado($creado) {
        $this->creado = $creado;
    }

    public function getActualizado() {
        return $this->actualizado;
    }

    public function setActualizado($actualizado) {
        $this->actualizado = $actualizado;
    }

    public function getPublico() {
        return $this->publico;
    }

    public function setPublico($publico) {
        $this->publico = $publico;
    }

    public function getTipo() {
        return $this->tipo;
    }

    public function setTipo($tipo) {
        $this->tipo = $tipo;
    }

    public function getDescripcionTipo() {
        return $this->descripcionTipo;
    }

    public function setDescripcionTipo($descripcionTipo) {
        $this->descripcionTipo = $descripcionTipo;
    }

    public function getImagenTipo() {
        return $this->imagenTipo;
    }

    public function setImagenTipo($imagenTipo) {
        $this->imagenTipo = $imagenTipo;
    }

    public function getCategoria() {
        return $this->categoria;
    }

    public function setCategoria($categoria) {
        $this->categoria = $categoria;
    }

    public function getImagenCategoria() {
        return $this->imagenCategoria;
    }

    public function setImagenCategoria($imagenCategoria) {
        $this->imagenCategoria = $imagenCategoria;
    }

    public function getDescripcionCategoria() {
        return $this->descripcionCategoria;
    }

    public function setDescripcionCategoria($descripcionCategoria) {
        $this->descripcionCategoria = $descripcionCategoria;
    }

    public function getAutor() {
        return $this->autor;
    }

    public function setAutor($autor) {
        $this->autor = $autor;
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

    public function getImagenAutor() {
        return $this->imagenAutor;
    }

    public function setImagenAutor($imagenAutor) {
        $this->imagenAutor = $imagenAutor;
    }
}