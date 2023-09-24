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
            <a class="logo" href="/">Test Me</a>

            <nav class="navegacion">
                <a href="/">Iniciar Sesion</a>
                <a href="/crear">Crear Cuenta</a>
            </nav>

            <div class="menu"></div>
        </div>
    </header>

    <main>
        <?php echo $contenido ?? ""; ?>
    </main>
    
    <footer class="footer">
        <div class="contenedor">
            <nav class="navegacion">
                <a href="/">Iniciar Sesion</a>
                <a href="/crear">Crear Cuenta</a>
            </nav>

            <a href="/" class="logo">Test Me</a>
        </div>

        <p class="copyrigth">Todos los Derechos Resrvados <?php echo date("Y"); ?> &copy;</p>
    </footer>

    <?php echo $script ?? ""; ?>
</body>
</html>