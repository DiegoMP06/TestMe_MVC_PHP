<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor seccion">
            <h1 class="nombre-pagina"></h1>

            <div class="contenido-sala" id="contenido-sala"></div>
        </div>

    </section>

</div>

<?php 

$script .= '
<script src="/build/js/API/sala.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
';