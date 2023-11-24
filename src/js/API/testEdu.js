import { obtenerUrl } from "../utility/utilidades.js";
import FuncionesTest from "../utility/classes/tests/FuncionesTest.js";
import TestBasico from "../utility/classes/tests/TestBasico.js";

(function () {
    let funcionesTest;
    const asideVisible = document.querySelector("#aside-visible");

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
            const urlCategoria = `/api/categoria?id=${test.categoriaId}`;
            const urlUsuario = `/api/usuario?id=${test.usuarioId}`;
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
                mostrarBotonesAside();
            }
        } catch (error) {
            console.error(error);
        }
    }

    function mostrarBotonesAside() {

        const opciones = document.createElement("DIV");
        opciones.classList.add("opciones");

        const btnTest = document.createElement("BUTTON");
        btnTest.textContent = "Informacion del Test";
        btnTest.classList.add("boton-gris-block");

        const btnTipoTest = document.createElement("BUTTON");
        btnTipoTest.textContent = "Como Contestar el test";
        btnTipoTest.classList.add("boton-gris-block");

        const btnCategoria = document.createElement("BUTTON");
        btnCategoria.textContent = "Informacion de la Categoria";
        btnCategoria.classList.add("boton-gris-block");

        btnTest.addEventListener("click", () => {
            funcionesTest.crearModalSobreTest();
        });

        btnTipoTest.addEventListener("click", () => {
            funcionesTest.crearModalTipoTest()
        });

        btnCategoria.addEventListener("click", () => {
            funcionesTest.crearModalSobreCategoria()
        });

        opciones.appendChild(btnTest);
        opciones.appendChild(btnTipoTest);
        opciones.appendChild(btnCategoria);

        asideVisible.appendChild(opciones);
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