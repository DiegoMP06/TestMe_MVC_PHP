<div class="contenido contenido-completo seccion"  id="contenido">
    <?php include "aside.php" ?>
    <section class="contenido-principal">
        <h2 class="nombre-pagina"><?php echo $testAutor->getNombre() ?></h2>

        <?php
        switch($testAutor->getTipo()) {
            case "Basico":
                include "basico/test.php";
                break;
            case "Medio":
                include "medio/test.php";
                break;
            case "Avanzado":
                include "avanzado/test.php";
                break;
            default:
                echo crearAlerta("Tipo de Test Invalido", "error");
        }
        ?>
    </section>
</div>

<?php 
include "informacion.php";

$script = '
<script src="/build/js/layout/aside.js"></script>
<script src="/build/js/layout/test.js"></script>
';