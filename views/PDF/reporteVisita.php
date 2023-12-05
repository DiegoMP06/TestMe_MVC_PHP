<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TestMe | Reporte Test</title>

    <style>
        *,
        *::after,
        *::before {
            box-sizing: inherit;
        }

        html {
            font-size: 62.5%;
            font-family: Arial, Helvetica, sans-serif;
            box-sizing: border-box;
        }

        body {
            font-size: 16px;
        }

        header {
            position: relative;
            padding: 2rem;
        }

        header .titulo {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 2rem;
        }

        header .fecha {
            position: absolute;
            top: 9;
            right: 0;
            font-size: 1.2rem;
        }

        p {
            margin: 0;
        }

        h2, 
        h3,
        h4 {
            margin: 0;
        }

        .seccion {
            margin-top: 5rem;
            margin-bottom: 5rem;
        }

        .contenedor-descripcion blockquote, .contenedor-instruccion blockquote {
            margin: 0 auto;
            width: 90%;
            padding: 2rem;
        }

        .contestado, .campos {
            border: .1rem solid #a3a3a3;
            padding: 2rem;
        }

        .contestado .campo, .campos .campo {
            margin-top:  2rem;
        }

        .opcion-seleccionada {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <header class="header">
        <p class="titulo">Reporte de Test</p>
        <p class="fecha"><?php echo date("d/m/Y") ?></p>
    </header>

    <div class="contenedor">
        <h1 class="nombre-test"><?php echo sanitizar($test->getNombre()) ?></h1>

        <div class="contenedor-descripcion seccion">
            <h2>Descripcion: </h2>

            <?php echo formatearDescripcion($test->getDescripcion()) ?>
        </div>

        <div class="contenedor-campos">
            <div class="campos seccion">
                <h2>Campos del Test: </h2>
                <?php foreach($visita->getCampos() as $campo): ?>
                    <div class="campo">
                        <h4 class="pregunta"><?php echo sanitizar($campo->pregunta) ?></h4>
                        <ol>
                            <?php foreach($campo->opciones as $opcion) { ?>
                                <li class="opcion"><?php echo sanitizar($opcion->opcion) ?></li>
                            <?php } ?>
                        </ol>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="contestado seccion">
                <h2>Opciones Seleccionadas: </h2>
                <?php foreach($visita->getCampos() as $campo) { ?>
                    <div class="campo">
                        <h4 class="pregunta"><?php echo sanitizar($campo->pregunta) ?></h4>
                        <div class="contenedor-opcion-seleccionada">
                            <?php if(isset($campo->multiple) && $campo->multiple) { 
                                foreach($campo->valor as $opcion) { ?>
                                    <div class="opcion-seleccionada">
                                        <p class="opcion"><?php echo sanitizar($opcion->opcion) ?></p>
                                        <p class="valor"><?php echo sanitizar($opcion->valor) ?> Puntos</p>
                                    </div>
                                <?php } ?>
                        </div>
                                <?php continue;
                            } ?>
                            <p class="opcion"><?php echo sanitizar($campo->valor->opcion) ?></p>
                            <p class="valor"><?php echo sanitizar($campo->valor->valor) ?> Puntos</p>
                        </div>
                    </div>
                <?php } ?>

                <p class="puntuacion">Puntuacion Obtenida: <?php echo sanitizar($visita->getPuntuacion()) ?> Puntos</p>
                <p class="puntucacion">Puntuacion Total: <?php echo sanitizar($visita->getTotal()) ?> Puntos</p>
            </div>
        </div>


        <div class="contenedor-instruccion seccion">
            <h2><?php echo sanitizar($instruccion->titulo) ?></h2>

            <?php echo formatearDescripcion($instruccion->instruccion) ?>
        </div>
    </div>
</body>
</html>