<div class="contenedor">
    <h1 class="nombre-pagina">Inicia Sesión</h1>
    <p class="descripcion-pagina">Ya Tienes una Cuenta Inicia Sesion</p>

    <form action="/" class="formulario" method="POST">
        <div class="campo">
            <label for="email">Correo Electronico: </label>
            <input type="email" name="email" id="email" placeholder="Tu Correo Electronico">
            <?php alertasFormulario("email", $alertas) ?>
        </div>

        <div class="campo">
            <label for="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder="Tu Contraseña">
            <?php alertasFormulario("email", $alertas) ?>
        </div>

        <input type="submit" value="Iniciar Sesión" class="boton-azul-block">
    </form>
</div>