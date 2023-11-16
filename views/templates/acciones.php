<nav class="acciones">
    <?php if($_SESSION["admin"]): ?>
        <a href="/test/crear">Crear Test</a>
        <a href="/test/admin">Mis Test</a>
        <a href="/sala/crear">Crear Sala</a>
        <a href="/sala/admin">Mis Salas</a>
    <?php endif; ?>
        <a href="<?php echo $enlace["url"] ?? "/inicio" ?>"><?php echo $enlace["texto"] ?? "Ir al Inicio" ?></a>
</nav>