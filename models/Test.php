<?php
namespace Model;

class Test extends ActiveRecord {
    protected static $tabla = "tests";
    protected static $columnaDB = [
        "id",
        "nombre",
        "url",
        "descripcion",
        "instrucciones",
        "opciones",
        "preguntas",
        "numOpciones",
        "numPreguntas",
        "visitas",
        "creado",
        "actualizado",
        "publico",
        "categoriaId",
        "tipoTestId",
        "usuarioId",
    ];

    public $id;
    public $nombre;
    public $url;
    public $descripcion;
    public $instrucciones;
    public $opciones;
    public $preguntas;
    public $numOpciones;
    public $numPreguntas;
    public $visitas;
    public $creado;
    public $actualizado;
    public $publico;
    public $categoriaId;
    public $tipoTestId;
    public $usuarioId;

    public function __construct($args = []) {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->url = $args["url"] ?? "";
        $this->descripcion = $args["descripcion"] ?? "";
        $this->instrucciones = $args["instrucciones"] ?? "";
        $this->opciones = $args["opciones"] ?? "";
        $this->preguntas = $args["preguntas"] ?? "";
        $this->numOpciones = $args["numOpciones"] ?? "";
        $this->numPreguntas = $args["numPreguntas"] ?? "";
        $this->visitas = $args["visitas"] ?? "";
        $this->creado = $args["creado"] ?? "";
        $this->actualizado = $args["actualizado"] ?? "";
        $this->categoriaId = $args["categoriaId"] ?? "";
        $this->tipoTestId = $args["tipoTestId"] ?? "";
        $this->usuarioId = $args["usuarioId"] ?? "";
    }

    public function getId(){
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getNombre(){
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }

    public function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    public function getInstrucciones(){
        return $this->instrucciones;
    }

    public function setInstrucciones($instrucciones) {
        $this->instrucciones = $instrucciones;
    }

    public function getOpciones(){
        return $this->opciones;
    }

    public function setOpciones($opciones) {
        $this->opciones = $opciones;
    }

    public function getPreguntas(){
        return $this->preguntas;
    }

    public function setPreguntas($preguntas) {
        $this->preguntas = $preguntas;
    }

    public function getNumOpciones(){
        return $this->numOpciones;
    }

    public function setNumOpciones($numOpciones) {
        $this->numOpciones = $numOpciones;
    }

    public function getNumPreguntas(){
        return $this->numPreguntas;
    }

    public function setNumPreguntas($numPreguntas) {
        $this->numPreguntas = $numPreguntas;
    }

    public function getVisitas(){
        return $this->visitas;
    }

    public function setVisitas($visitas) {
        $this->visitas = $visitas;
    }

    public function getCreado(){
        return $this->creado;
    }

    public function setCreado($creado) {
        $this->creado = $creado;
    }

    public function getActualizado(){
        return $this->actualizado;
    }

    public function setActualizado($actualizado) {
        $this->actualizado = $actualizado;
    }

    public function getPublico(){
        return $this->publico;
    }

    public function setPublico($publico) {
        $this->publico = $publico;
    }

    public function getCategoriaId(){
        return $this->categoriaId;
    }

    public function setCategoriaId($categoriaId) {
        $this->categoriaId = $categoriaId;
    }

    public function getTipoTestId(){
        return $this->tipoTestId;
    }

    public function setTipoTestId($tipoTestId) {
        $this->tipoTestId = $tipoTestId;
    }

    public function getUsuarioId(){
        return $this->usuarioId;
    }

    public function setUsuarioId($usuarioId) {
        $this->usuarioId = $usuarioId;
    }

    public function getUrl() {
        return $this->url;
    }

    public function setUrl($url) {
        $this->url = $url;
    }
}