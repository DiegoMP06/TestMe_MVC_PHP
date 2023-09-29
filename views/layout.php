<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Me</title>

    <link rel="stylesheet" href="/build/css/app.css">
</head>
<body>
    <header class="header">
        <div class="contenedor">
            <a class="logo" href="<?php echo isset($_SESSION["login"]) ? '/inicio' : '/' ?>">Test Me</a>

            <nav class="navegacion">
                <?php if(isset($_SESSION["login"])): ?>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">
                        <img src="/" alt="">
                    </a>
                <?php else: ?>
                    <a href="/">Iniciar Sesion</a>
                    <a href="/crear">Crear Cuenta</a>
                <?php endif; ?>
            </nav>

            <div class="menu" id="menu-navegacion"></div>
        </div>
    </header>
    
    <main>
        <div class="encabezado"></div>
        <?php echo $contenido ?? ""; ?>
    </main>
    
    <footer class="footer">
        <div class="contenedor">
            <nav class="navegacion">
            <?php if(isset($_SESSION["login"])): ?>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace</a>
                <?php else: ?>
                    <a href="/">Iniciar Sesion</a>
                    <a href="/crear">Crear Cuenta</a>
                <?php endif; ?>
            </nav>

            <a href="/" class="logo">Test Me</a>
        </div>

        <p class="copyrigth">Todos los Derechos Reservados <?php echo date("Y"); ?> &copy;</p>
    </footer>

    <?php echo $script ?? ""; ?>
    <script src="/build/js/layout/navegacion.js"></script>
</body>
</html>