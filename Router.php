<?php

namespace MVC;

class Router
{
    protected array $getRoutes = [];
    protected array $postRoutes = [];

    public function get($url, $fn) {
        $this->getRoutes[$url] = $fn;
    }

    public function post($url, $fn) {
        $this->postRoutes[$url] = $fn;
    }

    public function comprobarRutas() {
        $currentUrl = strtok($_SERVER["REQUEST_URI"], "?") ?? "/";
        $method = $_SERVER['REQUEST_METHOD'];

        session_start();

        if ($method === 'GET') {
            $fn = $this->getRoutes[$currentUrl] ?? null;
        } else {
            $fn = $this->postRoutes[$currentUrl] ?? null;
        }

        if($fn) {
            call_user_func($fn, $this); 
        }else{
            $this->render("templates/error");
        }
    }

    public function render($view, $datos = []) {
        
        foreach ($datos as $key => $value) {
            $$key = $value;
        }

        ob_start();
        include_once __DIR__ . "/views/{$view}.php";
        $contenido = ob_get_clean();
        include_once __DIR__ . '/views/layout.php';
    }
}