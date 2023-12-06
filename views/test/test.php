<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-test" id="nombre-test"></h1>

            <div class="panel-test" id="panel-test"></div>
        </div>
    </section>
</div>

<?php 
$script .= '
<script type="module" src="/build/js/API/test.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
';
