<?php 

function debuguear($variable){
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

function sanitizar($html) {
    return htmlspecialchars($html);
}

function isAuth() {
    if(!$_SESSION["login"]) {
        header("Location: /");
    }
}

function isAdmin() {
    if(!$_SESSION["login"] || !$_SESSION["admin"]) {
        header("Location: /inicio");
    }
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

function hiddenString($str, $start = 1, $end = 1){
    $len = strlen($str);
    return substr($str, 0, $start) . str_repeat('*', $len - ($start + $end)) . substr($str, $len - $end, $end);
}

function formatearDescripcion($descripcion) {
    $descripcion = explode("\n", $descripcion);

    ob_start();
    ?><blockquote><?php
    foreach($descripcion as $linea) {
        ?><p><?php echo sanitizar($linea); ?></p><?php 
    }
    ?></blockquote><?php
    return ob_get_clean();
}