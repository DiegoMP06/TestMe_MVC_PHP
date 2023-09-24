<div class="contenedor">
    <h1 class="nombre-pagina">Inicia Sesión</h1>
    <p class="descripcion-pagina">Ya Tienes una Cuenta Inicia Sesion</p>

    <form action="/" class="formulario" method="POST">
        <?php alertasFormulario("email", $alertas) ?>
        <div class="campo">
            <label for="email">Correo Electronico: </label>
            <input type="email" name="email" id="email" placeholder="Tu Correo Electronico">
        </div>

        <?php alertasFormulario("email", $alertas) ?>
        <div class="campo">
            <label for="password">Contraseña: </label>
            <input type="password" name="password" id="password" placeholder="Tu Contraseña">
        </div>

        <input type="submit" value="Iniciar Sesión" class="boton-azul-block">
    </form>
</div>