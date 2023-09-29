<aside class="sidebar sidebar-oculto" id="aside">
    <div class="menu" id="menu-aside"></div>

    <div class="aside-visible">
        <h3>Autor: </h3>

        <a href="/<?php echo $testAutor->getUsuario() ?>" class="usuario-perfil">
            <img width="100" height="100" src="/imagenes/users/<?php echo $testAutor->getUsuario() . "/" . $testAutor->getImagenAutor() ?>" alt="Imagen Usuario <?php echo $testAutor->getUsuario() ?>">
            <span>
                <p><?php echo $testAutor->getAutor() ?></p>
                <p><?php echo $testAutor->getUsuario() ?></p>
            </span>
        </a>

        <div class="opciones-aside">
            <input type="button" value="Ver Informacion del Test" id="btn-informacion" class="boton-gris-block">
            <input type="button" value="Ver Instrucciones" id="btn-instrucciones" class="boton-gris-block">
            <input type="button" value="Como contestar el Test" id="btn-info-test" class="boton-gris-block">
            <?php if($testAutor->getUsuario() === $_SESSION["usuario"]): ?>
                <a href="#" class="boton-gris-oscuro-block">Crear Reporte</a>
            <?php endif ?>
        </div>
    </div>
</aside>