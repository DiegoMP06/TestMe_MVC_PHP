<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-pagina">Mis Tests</h1>

            <?php if(empty($tests)): ?>
                <p class="descripcion-pagina">No Tienes Tests, Ahora Puedes <a href="/test/crear">Crear Uno</a></p>
            <?php else: ?>
                <div class="contenedor-tests">

                    <?php foreach($tests as $test): ?>

                        <a href="/test?url=<?php echo $test->getUrl() ?>" class="test">

                            <h3 class="nombre"><?php echo $test->getNombre() ?></h3>
                            <p class="num-preguntas"><?php echo $test->getNumPreguntas() ?> Preguntas</p>
                            <p class="num-opciones"><?php echo $test->getNumOpciones() ?> Opciones</p>

                        </a>

                    <?php endforeach; ?>
                    
                </div>
            <?php endif ?>
        </div>
    </section>
</div>
