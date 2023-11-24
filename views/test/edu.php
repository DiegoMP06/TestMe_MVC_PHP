<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <h2 class="nombre-test"><?php echo $test->getNombre() ?></h2>

            <form class="formulario-test">
                <div class="test-formulario" id="test-formulario"></div>

                <?php if($test->getUsuarioId() !== $_SESSION["id"]): ?>
                    <input type="submit" value="Enviar Test" class="boton-gris-oscuro">
                <?php endif; ?>
            </form>
        </div>

        <?php include_once __DIR__ . "/../templates/footer.php" ?>
    </section>
</div>

<?php 
$script .= '<script type="module" src="/build/js/API/testEdu.js"></script>';
