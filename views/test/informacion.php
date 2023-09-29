<div class="informacion-test display-none">
    <div class="menu menu-activo"></div>
    <div class="contenido-ventana contenedor">
        <h2><?php echo $testAutor->getNombre() ?></h2>
        <ul class="caracteristicas">
            <li>Es de Tipo <?php echo $testAutor->getTipo() ?>.</li>
            <li>Contiene <?php echo $testAutor->getNumPreguntas() ?> Preguntas.</li>
            <li>Fue Contestado <?php echo $testAutor->getVisitas() ?> Veces.</li>
            <li>Fue Creado el <?php echo $testAutor->getCreado() ?>.</li>
            <?php if(!is_null($testAutor->getActualizado())): ?>
            <li>Ultima Modificacion el <?php echo $testAutor->getActualizado() ?>.</li>
            <?php endif; ?>
            <li>Tiene la Categoria de <?php echo $testAutor->getCategoria() ?>.</li>
        </ul>

        <h4>Descripcion:</h4>
        <blockquote class="descripcion"><?php echo $testAutor->getDescripcionTest() ?></blockquote>
    </div>
</div>

<div class="intrucciones-test display-none">
    <div class="menu menu-activo"></div>
    <div class="contenido-ventana contenedor">
        <h2><?php echo $testAutor->getNombre() ?></h2>

        <h4>Instrucciones:</h4>
        <blockquote class="descripcion"><?php echo $testAutor->getInstruccionTest() ?></blockquote>
    </div>
</div>

<div class="tipo-test display-none">
    <div class="menu menu-activo"></div>
    <div class="contenido-ventana contenedor">
        <h2><?php echo $testAutor->getNombre() ?></h2>

        <h4>Como Contestar este Test:</h4>
        <blockquote class="descripcion"><?php echo $testAutor->getDescripcionTipo() ?></blockquote>
    </div>
</div>