<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <h1 class="nombre-pagina"><?php echo sanitizar($sala->getNombre()) ?></h1>

            <div class="informacion-sala"></div>
        </div>
        <!-- <?php // include_once __DIR__ . "/../templates/footer.php" ?> -->
    </section>
</div>

<?php 
$script .= '
<script src="/build/js/API/salaEdu.js" type="module"></script>
';