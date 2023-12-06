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

        .contenedor {
            padding: 0 2rem;
        }

        .contenedor-descripcion blockquote, 
        .contenedor-instruccion blockquote {
            margin: 0 auto;
            width: 90%;
            padding: 2rem;
        }

        .contenedor-instruccion {
            padding-top: 5rem;
        }

        .contestado, .campos {
            padding: 2rem;
        }

        .contestado {
            margin-top: 2rem;
        }

        .contestado .campo, .campos .campo {
            padding: 1rem;
        }

        .puntuacion-final,
        .puntuacion-total {
            margin-top: 2rem;
            border-top: .1rem solid #a3a3a3;
            font-size: 1.8rem;
            font-weight: 700;
            padding-left: 2rem;
            padding-top: .5rem;
        }

        .puntuacion-total {
            border:  none;
            margin: 0;
        }

        .opcion-seleccionada {
            padding: .5rem;
        }

        .opcion {
            padding-left: 1rem;
            font-weight: bold;
        }

        .valor {
            font-weight: 400;
            padding-left: 1rem;
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

        <div class="contenedor-descripcion">
            <h2>Descripcion: </h2>

            <?php echo formatearDescripcion($test->getDescripcion()) ?>
        </div>

        <div class="contenedor-campos">
            <div class="campos">
                <h2>Campos del Test: </h2>
                <ol class="contenedor-campos">
                    <?php foreach($visita->getCampos() as $campo): ?>
                        <li class="campo">
                            <h4 class="pregunta"><?php echo sanitizar($campo->pregunta) ?></h4>
                            <ol>
                                <?php foreach($campo->opciones as $opcion) { ?>
                                <li class="opcion"><?php echo sanitizar($opcion->opcion) ?></li>
                                <?php } ?>
                            </ol>
                        </li>
                    <?php endforeach; ?>
                </ol>
            </div>

            <div class="contestado">
                <h2>Opciones Seleccionadas: </h2>
                <ol class="contenedor-campos">
                    <?php foreach($visita->getCampos() as $campo) { ?>
                        <li class="campo">
                            <h4 class="pregunta"><?php echo sanitizar($campo->pregunta) ?></h4>
                            <div class="contenedor-opcion-seleccionada">
                                <?php if(isset($campo->multiple) && $campo->multiple) { 
                                    foreach($campo->valor as $opcion) { ?>
                                        <div class="opcion-seleccionada">
                                            <p class="opcion"><?php echo sanitizar($opcion->opcion) ?>: <span class="valor"><?php echo sanitizar($opcion->valor) ?> Puntos</span></p>
                                            
                                        </div>
                                    <?php } ?>
                            </div>
                                    <?php continue;
                                } ?>
                                <div class="opcion-seleccionada">
                                    <p class="opcion"><?php echo sanitizar($campo->valor->opcion) ?>: <span class="valor"><?php echo sanitizar($campo->valor->valor) ?> Puntos</span></p>
                                </div>
                            </div>
                        </li>
                    <?php } ?>
                </ol>
                <p class="puntuacion-final">Puntuacion Obtenida: <span class="valor"><?php echo sanitizar($visita->getPuntuacion()) ?> Puntos</span></p>
                <p class="puntuacion-total">Puntuacion Total: <span class="valor"><?php echo sanitizar($visita->getTotal()) ?> Puntos</span></p>
            </div>
        </div>

        <div class="contenedor-instruccion">
            <h2><?php echo sanitizar($visita->getInstruccion()->titulo) ?></h2>

            <?php echo formatearDescripcion($visita->getInstruccion()->instruccion) ?>
        </div>
    </div>
</body>
</html>