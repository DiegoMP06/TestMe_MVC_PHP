<div class="contenido">
    <?php include "aside.php" ?>

    <section class="contenido-principal">
        <?php include_once __DIR__ . "/../templates/header.php" ?>

        <div class="contenedor">
            <h1 class="nombre-pagina">Crear Sala</h1>

            <form action="/sala/crear" method="POST" class="formulario formulario-crud-sala">

                <div class="campo">

                    <label for="nombre">Nombre: </label>
                    <input type="text" name="nombre" id="nombre" placeholder="Nombre de la Sala" value="<?php echo $sala->getNombre() ?>">
                    
                </div>
                <?php alertasFormulario("nombre", $alertas) ?>

                <div class="campo">

                    <label for="alumnosMax">Maximo de Alumnos</label>
                    <input type="number" name="alumnosMax" id="alumnosMax" placeholder="Numero Maximo de Alumnos" min="1" max="60" value="<?php echo $sala->getAlumnosMax() ?>">

                </div>
                <?php alertasFormulario("alumnosMax", $alertas) ?>

                <div class="campo">

                    <label for="profesoresMax">Maximo de Maestros Colaboradores</label>
                    <input type="number" name="profesoresMax" id="profesoresMax" placeholder="Numero Maximo de Maestros Colaboradores" min="0" max="4" value="<?php echo $sala->getProfesoresMax() ?>">

                </div>
                <?php alertasFormulario("profesoresMax", $alertas) ?>

                <div class="campo">
                    
                    <label for="descripcion">Descripcion: </label>
                    <textarea name="descripcion" id="descripcion" cols="30" rows="10" placeholder="Descripcion de La Sala"><?php echo $sala->getDescripcion() ?></textarea>

                </div>
                <?php alertasFormulario("descripcion", $alertas) ?>

                <div class="campo">
                    <p>Estatus</p>

                    <div class="inputs">

                        <div class="radio">

                            <label for="publico">Publico</label>
                            <input <?php echo $sala->getPublico() == 1 ? "checked" : "" ?> type="radio" name="publico" id="publico" value="1">

                        </div>

                        <div class="radio">

                            <label for="privado">Privado</label>
                            <input <?php echo $sala->getPublico() == 0 ? "checked" : "" ?> type="radio" name="publico" id="privado" value="0">

                        </div>

                    </div>

                </div>
                <?php alertasFormulario("publico", $alertas) ?>
                <input type="submit" value="Crear Sala" class="boton-naranja-block">

            </form>

        </div>

    </section>

</div>