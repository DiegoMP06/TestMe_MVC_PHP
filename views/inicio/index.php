<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-pagina">Test Me</h1>
            <p class="descripcion-pagina">Los Mejores Test Educativos</p>

            <div class="inicio-tests">

                <?php foreach($categorias as $categoria): ?>

                    <div class="categoria">

                        <div class="acciones-categoria">
                            <h3><?php echo sanitizar($categoria->getNombre()) ?></h3>

                            <?php if(isset($tests[$categoria->getNombre()])): ?>
                                <a href="/inicio/categorias?id=<?php echo $categoria->getId() ?>" class="ver-mas">Ver Mas</a>
                            <?php endif ?>
                            
                        </div>

                        <div class="tests-categoria">

                            <?php if(isset($tests[$categoria->getNombre()])): 
                                foreach($tests[$categoria->getNombre()] as $test): ?>

                                <a href="/edu/test?url=<?php echo sanitizar($test->getUrl()) ?>" class="test">
                                    <h3><?php echo sanitizar($test->getNombre()) ?></h3>

                                    <ul class="caracteristicas">
                                        <li><?php echo sanitizar($test->getNumPreguntas()) ?> Preguntas</li>

                                        <?php foreach($usuarios as $usuario): 

                                            if($test->getUsuarioId() === $usuario->getId()): ?>

                                                <li>Creado por <?php echo sanitizar($usuario->getUsuario()) ?></li>

                                            <?php endif;

                                        endforeach; ?>

                                    </ul>

                                </a>

                            <?php endforeach;

                            else: ?>

                                <p class="sin-tests">Categoria Vacia</p>

                            <?php endif; ?>

                        </div>

                    </div>

                <?php endforeach ?>              

            </div>

        </div>

    </section>

</div>