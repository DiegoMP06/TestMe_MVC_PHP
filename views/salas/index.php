<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-pagina">Mis Salas</h1>

            <?php if(empty($salas)): ?>

                <p class="descripcion-pagina">No Tienes Salas, Ahora Puedes <a href="/sala/crear">Crear Una</a></p>

            <?php else: ?>

                <div class="contenedor-salas">

                    <?php foreach($salas as $sala): ?>

                        <a href="/sala?url=<?php echo $sala->getUrl() ?>" class="sala">

                            <h3 class="nombre"><?php echo $sala->getNombre() ?></h3>
                            <p class="num-profesores">Profesores: <?php echo $sala->getProfesores() ?> de <?php echo $sala->getProfesoresMax() ?></p>
                            <p class="num-alumnos">Alumnos: <?php echo $sala->getAlumnos() ?> de <?php echo $sala->getAlumnosMax() ?></p>

                        </a>

                    <?php endforeach; ?>
                    
                </div>

            <?php endif ?>

        </div>

    </section>
    
</div>