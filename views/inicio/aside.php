<?php include_once __DIR__ . "/../templates/headerSidebar.php" ?>

    <form class="formulario" method="get">
        <div class="campo">
            <input type="search" name="busqueda" id="busqueda" placeholder="Buscar" value="<?php echo $_GET["busqueda"] ?? "" ?>">
        </div>
        <input type="submit" value="Buscar" class="boton-secundario-block">
    </form>
    
<?php include_once __DIR__ . "/../templates/footerSidebar.php" ?>