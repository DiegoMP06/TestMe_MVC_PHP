<?php 

function debuguear($variable){
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

function crearAlerta($alerta, $tipo) {
    return "<p class='alerta {$tipo}'>{$alerta}</p>";
}

function verificarAlertas($atributo, $alertas, $tipo = "error") {
    return (isset($alertas[$tipo][$atributo])) ? crearAlerta($alertas[$tipo][$atributo], $tipo) : "";
}

function alertasFormulario($atributo , $alertas) {
    echo verificarAlertas($atributo ,$alertas);
}

function is404($evaluacion) {
    if(!$evaluacion) {
        header("Location: /error");
    }
}