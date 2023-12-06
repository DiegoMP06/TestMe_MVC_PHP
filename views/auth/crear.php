<?php include_once __DIR__ . "/../templates/header.php" ?>

<div class="contenedor seccion">
    <h1 class="nombre-pagina">Inicia Creando Una Cuenta</h1>
    <p class="descripcion-pagina">Crea una Cuenta para Disfrutar de Nuestros Test</p>

    <form action="/crear" class="formulario" method="POST">
        <div class="campo">
            <label for="nombre">Nombre: </label>
            <input type="text" name="nombre" id="nombre" placeholder="Tu Nombre" value="<?php echo $usuario->getNombre() ?>">
            <?php alertasFormulario("nombre", $alertas) ?>
        </div>

        <div class="campo">
            <label for="apellido">Apellido: </label>
            <input type="text" name="apellido" id="apellido" placeholder="Tu Apellido" value="<?php echo $usuario->getApellido() ?>">
            <?php alertasFormulario("apellido", $alertas) ?>
        </div>

        <div class="campo">
            <label for="usuario">Nombre de Usuario: </label>
            <input type="text" name="usuario" id="usuario" placeholder="Tu Nombre de Usuario" value="<?php echo $usuario->getUsuario() ?>">
            <?php alertasFormulario("usuario", $alertas) ?>
        </div>
        
        <div class="campo">
            <label for="email">Correo Electronico: </label>
            <input type="email" name="email" id="email" placeholder="Tu Correo Electronico" value="<?php echo $usuario->getEmail() ?>">
            <?php alertasFormulario("email", $alertas) ?>
        </div>
        
        <div class="campo">
            <label for="telefono">Telefono: </label>
            <input type="tel" name="telefono" id="telefono" placeholder="Tu Numero Telefono" value="<?php echo $usuario->getTelefono() ?>">
            <?php alertasFormulario("telefono", $alertas) ?>
        </div>

        <div class="campo">
            <label for="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder="Tu Contraseña">
        </div>

        <div class="campo">
            <label for="confirmacion">Confirmar Contraseña: </label>
            <input type="password" name="confirmacion" id="confirmacion" placeholder="Repite Tu Contraseña">
            <?php alertasFormulario("password", $alertas) ?>
        </div>

        <input type="submit" value="Crear Cuenta" class="boton-secundario-block">
    </form>
</div>

<?php include_once __DIR__ . "/../templates/footer.php" ?>