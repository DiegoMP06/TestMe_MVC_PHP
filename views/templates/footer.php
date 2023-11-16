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