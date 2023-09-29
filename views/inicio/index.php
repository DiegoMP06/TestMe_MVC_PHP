<div class="contenido contenido-completo seccion" id="contenido">
    <?php include "aside.php" ?>
    <section class="contenido-principal">
        <h1 class="nombre-pagina">Test Me</h1>
        <p class="descripcion-pagina">Los Mejores Test Educativos</p>

        <?php foreach($categorias as $categoria): ?>
            <div class="categoria">
                <h3><?php echo $categoria->getNombre() ?></h3>

                <?php if(empty($testAutor[$categoria->getNombre()])): ?>
                    <h4 class="descripcion-pagina">No Hay Tests De esta Categoria</h4>
                <?php else: ?>
                    <a class="ver-mas" href="/categoria?id=<?php echo $categoria->getId() ?>">Ver Mas</a>

                    <div class="tests">
                        <?php foreach($testAutor[$categoria->getNombre()] as $test): ?>
                            <a href="/test?id=<?php echo $test->getId() ?>" class="test">
                                <h4 class="nombre"><?php echo $test->getNombre() ?></h4>
                                
                                <ul class="caracteristicas">
                                    <li>Numero de Preguntas: <span><?php echo $test->getNumPreguntas() ?></span></li>
                                    <li>Visitas: <span><?php echo $test->getVisitas() ?></span></li>
                                    <li>Creado: <span><?php echo $test->getCreado() ?></span></li>
                                    <?php if(!is_null($test->getActualizado())): ?>
                                        <li>Ultima Actualizacion: <span><?php echo $test->getActualizado() ?></span></li>
                                    <?php endif ?>
                                    <li>Tipo: <span><?php echo $test->getTipo() ?></span></li>
                                    <li>Categoria: <span><?php echo $test->getCategoria() ?></span></li>
                                    <li>Autor: <span><?php echo $test->getAutor() . " '" . $test->getUsuario() . "'" ?></span></li>
                                </ul>

                                <p class="descripcion"><?php echo $test->getDescripcionTest() ?></p>
                            </a>
                        <?php endforeach ?>
                    </div>
                <?php endif ?>
            </div>
        <?php endforeach ?>
    </section>
</div>

<?php

$script = '
<script src="/build/js/layout/aside.js"></script>
';