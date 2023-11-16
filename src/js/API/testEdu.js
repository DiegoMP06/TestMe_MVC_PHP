import { obtenerUrl } from "../utility/utilidades.js";
import FuncionesTest from "../utility/classes/tests/FuncionesTest.js";
import TestBasico from "../utility/classes/tests/TestBasico.js";

(function () {
    let funcionesTest;

    consultarTest();

    async function consultarTest() {
        try {
            const url = `/api/test?url=${obtenerUrl()}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            if (resultado.tipo === "exito") {
                const { test } = resultado;
                consultarDatos(test);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function consultarDatos(test) {
        try {
            const urlCategoria = `/api/categorias?id=${test.categoriaId}`;
            const urlUsuario = `/api/usuarios?id=${test.usuarioId}`;
            const urlTipoTest = `/api/tipotest?id=${test.tipoTestId}`;

            const [respuestaCategoria, respuestaUsuario, respuestaTipoTest] = await Promise.all([
                fetch(urlCategoria),
                fetch(urlUsuario),
                fetch(urlTipoTest)
            ]);

            const resultadoCategoria = await respuestaCategoria.json();
            const resultadoUsuario = await respuestaUsuario.json();
            const resultadoTipoTest = await respuestaTipoTest.json();

            if (resultadoCategoria.tipo === "exito" && resultadoUsuario.tipo === "exito" && resultadoTipoTest.tipo) {
                const { categoria } = resultadoCategoria;
                const { usuario } = resultadoUsuario;
                const { tipoTest } = resultadoTipoTest;

                funcionesTest = new FuncionesTest(test, tipoTest, categoria, usuario);
                agregarFormularioTest(test);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function agregarFormularioTest(test) {
        const { tipoTestId } = test;
        let testsFunciones;

        switch (tipoTestId) {
            case "1":
                testsFunciones = new TestBasico(test);
                break;
            case "2":
                break;
            case "3":
                break;
            default:
                console.log("Error")
        }

        if(testsFunciones) {
            testsFunciones.mostrarFormulario();
        }

        funcionesTest.mostrarAside();
    }
}());