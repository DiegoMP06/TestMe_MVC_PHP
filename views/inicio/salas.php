<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <h1 class="nombre-pagina">Salas</h1>

            <div class="inicio-salas">

                <?php foreach($salas as $sala): ?>

                    <a class="sala" href="/edu/sala?url=<?php echo sanitizar($sala->getUrl()) ?>">
                        <p class="nombre"><?php echo sanitizar($sala->getNombre()) ?></p>
                        
                        <?php foreach($usuarios as $usuario): 

                            if($usuario->getId() === $sala->getUsuarioId()): ?>
                            <p class="autor">Creado Por: <?php echo sanitizar($usuario->getusuario()) ?></p>

                            <?php endif;

                        endforeach ?>

                    </a>

                <?php endforeach; ?>

            </div>

        </div>
        <!-- <?php // include_once __DIR__ . "/../templates/footer.php" ?> -->
<!--  -->
    </section>

</div>