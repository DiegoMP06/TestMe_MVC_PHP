<aside class="sidebar">

    <div class="aside-visible">

        <form class="formulario" method="get">

            <div class="campo">

                <input type="search" name="busqueda" id="busqueda" placeholder="Buscar" value="<?php echo $_GET["busqueda"] ?? "" ?>">

            </div>
            <input type="submit" value="Buscar" class="boton-azul">

        </form>

    </div>
    <?php include_once __DIR__ . "/../templates/acciones.php" ?>

</aside>