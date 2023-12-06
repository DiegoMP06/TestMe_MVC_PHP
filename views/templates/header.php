<header class="header">
    <div class="contenedor">
        <a class="logo" href="<?php echo isset($_SESSION["login"]) ? '/inicio' : '/' ?>">Test Me</a>

        <nav class="navegacion">
            <?php if(isset($_SESSION["login"])): ?>
                <a href="#">Enlace</a>
                <a href="#">Enlace</a>
                <a href="#">Enlace</a>
                <div class="perfil-mini">
                    <a class="imagen-perfil" href="/usuario/<?php echo sanitizar($_SESSION["usuario"]) ?>">
                        <img width="100" height="100" src="/imagenes/users/<?php echo sanitizar($_SESSION["usuario"]) . "/" . sanitizar($_SESSION["imagen"]) ?>" alt="Imagen de Perfil de <?php echo sanitizar($_SESSION["usuario"]) ?>" alt="Imagen Prefil de <?php echo sanitizar($_SESSION["usuario"]) ?>">
                    </a>

                    <a class="cerrar-sesion" href="/logout">Cerrar Sesión</a>
                </div>
            <?php else: ?>
                <a href="/">Iniciar Sesion</a>
                <a href="/crear">Crear Cuenta</a>
            <?php endif; ?>
        </nav>

        <div class="menu" id="menu-navegacion"></div>
    </div>
</header>

<div id="cubre-header"></div>

<?php 
$script .= '<script src="/build/js/layout/formatearHeader.js" type="module"></script>';