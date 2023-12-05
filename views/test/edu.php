<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <h2 class="nombre-test" id="nombre-test"></h2>
            
            <form class="formulario formulario-test" id="formulario-test"></form>
        </div>
    </section>
</div>

<?php 
$script .= '<script type="module" src="/build/js/API/testEdu.js"></script>';
