<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-pagina">Salas</h1>

            <div class="inicio-salas">

                <?php foreach($salas as $sala): ?>

                    <a class="sala" href="/edu/sala?url=<?php echo sanitizar($sala->getUrl()) ?>">
                        <p class="nombre"><?php echo sanitizar($sala->getNombre()) ?></p>
                        
                        <?php foreach($usuarios as $usuario): 

                            if($usuario->getId() === $sala->getUsuarioId()): ?>

                                <p class="autor-sala">
                                    <img src="/imagenes/users/<?php echo sanitizar($usuario->getUsuario()) . "/" . sanitizar($usuario->getIMagen())  ?>" alt="Imagen Perfil <?php echo sanitizar($usuario->getUsuario()) ?>"> <?php echo sanitizar($usuario->getusuario()) ?>
                                </p>

                            <?php endif;

                        endforeach ?>

                    </a>

                <?php endforeach; ?>

            </div>

        </div>

    </section>

</div>