<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <form class="formulario formulario-crud-test" id="formulario-test"></form>
        </div>
    </section>
</div>

<?php 
$script .= '<script type="module" src="/build/js/API/testCrear.js"></script>';
