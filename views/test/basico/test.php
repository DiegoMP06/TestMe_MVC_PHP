<form action="" method="post" class="formulario formulario-test">
    <?php foreach($testAutor->getPreguntas() as $legend => $pregunta): ?>
    <div class="campo">
        <legend><?php echo $pregunta ?></legend>

        <?php foreach($testAutor->getOpciones() as $key => $campo): ?>
            <div class="radio">
                <label for="<?php echo $legend . "_" . $key ?>"><?php echo $campo->opcion ?></label>
                <input <?php echo $testAutor->getUsuario() === $_SESSION["usuario"] ? "disabled" : "" ?> type="radio" name="<?php echo $legend ?>" id="<?php echo $legend . "_" . $key ?>" value="<?php echo $campo->valor ?>">
            </div>
        <?php endforeach ?>
    </div>
    <?php endforeach;

    if($testAutor->getUsuario() !== $_SESSION["usuario"]): ?>
    <input type="submit" value="Enviar Respuesta" class="boton-verde-block">
    <?php endif ?>
</form>