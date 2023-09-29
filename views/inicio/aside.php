<aside class="sidebar sidebar-oculto" id="aside">
    <div class="menu" id="menu-aside"></div>

    <div class="aside-visible">
    
        <form class="formulario" action="/inicio" method="get">
            <div class="campo">
                <input type="search" name="busqueda" id="busqueda" placeholder="Buscar" value="<?php echo $_GET["busqueda"] ?? "" ?>">
            </div>
            <input type="submit" value="Buscar" class="boton-azul">
        </form>
    </div>
</aside>