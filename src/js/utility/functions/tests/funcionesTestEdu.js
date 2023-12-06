import { RUTA_IMAGENES_USUARIOS, limpiarHtml, obtenerUrl } from "../../utilidades.js";
import UI from "../../../layout/UI.js";
import Visita from "../../classes/visitas/Visita.js";
import Test from "../../classes/tests/Test.js";
import TestBasico from "../../classes/tests/TestBasico.js";
import TestMedio from "../../classes/tests/TestMedio.js";
import TestAvanzado from "../../classes/tests/TestAvanzado.js";
import EduTest from "./EduTest.js";
import EduTestBasico from "./EduTestBasico.js";
import EduTestMedio from "./EduTestMedio.js";
import EduTestAvanzado from "./EduTestAvanzado.js";

const asideVisible = document.querySelector("#aside-visible");
const formulario = document.querySelector("#formulario-test");
const nombreP = document.querySelector("#nombre-test");

let categoria = {};
let usuario = {};
let tipoTest = {};
let favorito = {};
let sesion = {};
export let test = new Test;
export let visita = new Visita;
let funcionesTest = new EduTest;

export async function consultarTest() {
    const urlSesion = "/api/session";
    const urlTest = `/api/test?url=${obtenerUrl()}`;

    try {
        const respuestas = await Promise.all([
            fetch(urlSesion),
            fetch(urlTest)
        ]);

        const [respuestaSesion, respuestaTest] = respuestas;

        const resultadoSesion = await respuestaSesion.json();
        const resultadoTest = await respuestaTest.json();

        if (resultadoTest.tipo === "exito" && resultadoSesion.tipo === "exito") {
            sesion = resultadoSesion.session;
            darTipoTest(resultadoTest.test);
        }
    } catch (error) {
        console.error(error);
    }
}

function darTipoTest(testMemoria) {
    const {tipoTestId} = testMemoria;
    switch(parseInt(tipoTestId)) {
        case 1:
            test = new TestBasico(testMemoria);
            funcionesTest = new EduTestBasico;
            break;
        case 2:
            test = new TestMedio(testMemoria);
            funcionesTest = new EduTestMedio;
            break;
        case 3:
            test = new TestAvanzado(testMemoria);
            funcionesTest = new EduTestAvanzado;
            break;
        default:
            console.error("Hubo un error")
    }

    imprimirNombre();
    consultarDatos()
}

async function consultarDatos() {
    const {categoriaId, usuarioId, tipoTestId, id} = test;

    try {
        const urlCategoria = `/api/categoria?id=${categoriaId}`;
        const urlUsuario = `/api/usuario?id=${usuarioId}`;
        const urlTipoTest = `/api/tipotest?id=${tipoTestId}`;
        const urlFavorito = `/api/favorito?testId=${id}`;
        const urlVisita = `/api/visita?testId=${id}`;

        const [
            respuestaCategoria, 
            respuestaUsuario, 
            respuestaTipoTest, 
            respuestaFavorito,
            respuestaVisita
        ] = await Promise.all([
            fetch(urlCategoria),
            fetch(urlUsuario),
            fetch(urlTipoTest),
            fetch(urlFavorito),
            fetch(urlVisita)
        ]);

        const resultadoCategoria = await respuestaCategoria.json();
        const resultadoUsuario = await respuestaUsuario.json();
        const resultadoTipoTest = await respuestaTipoTest.json();
        const resultadoFavorito = await respuestaFavorito.json();
        const resultadoVisita = await respuestaVisita.json();

        if (
            resultadoCategoria.tipo === "exito" && 
            resultadoUsuario.tipo === "exito" && 
            resultadoTipoTest.tipo === "exito" && 
            resultadoFavorito.tipo === "exito" && 
            resultadoVisita.tipo === "exito"
            ) {
            categoria = resultadoCategoria.categoria;
            usuario = resultadoUsuario.usuario;
            tipoTest = resultadoTipoTest.tipoTest;
            favorito = resultadoFavorito.favorito ?? {};
            
            mostrarAside();
            
            if(resultadoVisita.visita) {
                visita = new Visita(resultadoVisita.visita);
                funcionesTest.mostrarInformacionTest(formulario);
                return;
            }

            mostrarFormulario();
        }
    } catch (error) {
        console.error(error);
    }
}

async function crearFavorito() {
    const {id} = test;
    const url = `/api/favorito/crear`;
    const datos = new FormData();

    datos.append("testId", id);

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.tipo === "exito") {
            favorito = resultado.favorito;
            mostrarAside();
        }
    } catch (error) {
        console.log(error)
    }
}

async function eliminarFavorito() {
    const {id} = favorito;
    const url = "/api/favorito/eliminar";
    const datos = new FormData();

    datos.append("id", id);

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.tipo === "exito") {
            favorito = {};
            mostrarAside();
        }
    } catch (error) {
        console.log(error)
    }
}

async function crearVisita() {
    const url = "/api/visita/crear";
    const datos = new FormData();
    const {camposExtra, campos, instruccion, puntuacion, total, testId} = visita;

    datos.append("camposExtra", JSON.stringify(camposExtra));
    datos.append("campos", JSON.stringify(campos));
    datos.append("instruccion", JSON.stringify(instruccion));
    datos.append("puntuacion", puntuacion);
    datos.append("total", total);
    datos.append("testId", testId);
    
    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.tipo === "exito") {
            visita.id = resultado.id;

            funcionesTest.mostrarInformacionTest(formulario);
        }
    } catch (error) {
        console.log(error)
    }
}

function imprimirNombre() {
    nombreP.textContent = test.nombre;
}

function mostrarAside() {
    limpiarHtml(asideVisible);
    const { nombre, apellido, imagen, usuario: nombreUsuario } = usuario;

    const autor = document.createElement("A");
    autor.href = `/usuario/${nombreUsuario}`;
    autor.classList.add("autor");

    const imagenAutor = document.createElement("IMG");
    imagenAutor.src = `${RUTA_IMAGENES_USUARIOS}${nombreUsuario}/${imagen}`;
    imagenAutor.width = 100;
    imagenAutor.height = 100;

    const nombreAutor = document.createElement("SPAN");
    nombreAutor.classList.add("nombre");
    nombreAutor.textContent = `${nombre} ${apellido}`;

    const usuarioAutor = document.createElement("SPAN");
    usuarioAutor.classList.add("usuario");
    usuarioAutor.textContent = nombreUsuario;

    autor.appendChild(imagenAutor);
    autor.appendChild(nombreAutor);
    autor.appendChild(usuarioAutor);

    const favoritoCorazon = document.createElement("DIV");
    favoritoCorazon.classList.add("favorito", favorito.id ? "activo" : "inactivo");

    favoritoCorazon.onclick = e => {
        añadirFavorito(e.target, favorito.id);
    }

    asideVisible.appendChild(autor);
    asideVisible.appendChild(favoritoCorazon);

    const opciones = document.createElement("DIV");
    opciones.classList.add("opciones");

    const btnTest = document.createElement("BUTTON");
    btnTest.textContent = "Informacion del Test";

    const btnTipoTest = document.createElement("BUTTON");
    btnTipoTest.textContent = "Como Contestar el test";

    const btnCategoria = document.createElement("BUTTON");
    btnCategoria.textContent = "Informacion de la Categoria";

    btnTest.addEventListener("click", () => {
        crearModalSobreTest();
    });

    btnTipoTest.addEventListener("click", () => {
        crearModalTipoTest()
    });

    btnCategoria.addEventListener("click", () => {
        crearModalSobreCategoria()
    });

    opciones.appendChild(btnTest);
    opciones.appendChild(btnTipoTest);
    opciones.appendChild(btnCategoria);

    asideVisible.appendChild(opciones);
}

function añadirFavorito(corazon, id) {
    if(id) {
        eliminarFavorito(corazon);
        return;
    }

    crearFavorito(corazon);
}

function crearModalSobreTest() {
    const { nombre, descripcion } = test;

    const contenido = document.createElement("DIV");
    const nombreH2 = document.createElement("H2");
    const descripcionBlock = UI.formatearDescripcion(descripcion);

    nombreH2.textContent = nombre;

    contenido.appendChild(nombreH2);
    contenido.appendChild(descripcionBlock);

    UI.crearModal(contenido);
}

function crearModalTipoTest() {
    const { nombre, instrucciones } = tipoTest;

    const contenido = document.createElement("DIV");
    const nombreH2 = document.createElement("H2");
    const instruccionesBlock = document.createElement("BLOCKQUOTE");

    nombreH2.textContent = `Test tipo ${nombre}`;
    instruccionesBlock.textContent = instrucciones;
    contenido.appendChild(nombreH2);
    contenido.appendChild(instruccionesBlock);

    UI.crearModal(contenido);
}

function crearModalSobreCategoria() {
    const { nombre, descripcion } = categoria;

    const contenido = document.createElement("DIV");
    const nombreH2 = document.createElement("H2");
    const descripcionBlock = document.createElement("BLOCKQUOTE");

    nombreH2.textContent = `Test de Categoria: ${nombre}`;
    descripcionBlock.textContent = descripcion;

    contenido.appendChild(nombreH2);
    contenido.appendChild(descripcionBlock)

    UI.crearModal(contenido);
}

function mostrarFormulario() {
    funcionesTest.mostrarCamposExtra(formulario);
    funcionesTest.mostrarFormulario(formulario);

    if(parseInt(sesion.id) !== parseInt(test.usuarioId)) {
        const btnEnviar = document.createElement("BUTTON");
        btnEnviar.textContent = "Enviar";
        btnEnviar.classList.add("boton-verde-oscuro");
        btnEnviar.type = "submit";

        formulario.appendChild(btnEnviar);

        formulario.onsubmit = e => {
            e.preventDefault();
            validarFormulario();
        }
    }
}

function validarFormulario() {
    const {campos, camposExtra} = visita;
    const camposExtraVacios = camposExtra.filter(campo => campo.valor === "" || campo.valor.length === 0);
    const camposVacios = campos.filter(campo => (!campo.multiple && !campo.valor.id) || (campo.multiple && campo.valor.length === 0));

    if(camposVacios.length > 0 || camposExtraVacios.length > 0) {
        UI.mostrarAlerta("Todos Los Campos Son Obligatorios", formulario);
        funcionesTest.mostrarAlertasCampos([...camposExtraVacios, ...camposVacios], formulario);
        return;
    }

    const camposBasicos = campos.filter(campo => !campo.multiple);
    const camposMultiples = campos.filter(campo => campo.multiple);

    const sumaBasicos = camposBasicos.reduce((total, {valor}) => total + parseInt(valor.valor), 0);
    const sumaMultiples = camposMultiples.reduce((total, {valor}) => total + valor.reduce((total, {valor}) => total + parseInt(valor), 0), 0);
    visita.puntuacion = sumaBasicos + sumaMultiples;
    visita.total = test.calcularMinimoYMaximo().maximo;
    
    const {id, instrucciones} = test;
    const [instruccion] = instrucciones.filter(({minimo, maximo}) => parseInt(visita.puntuacion) >= parseInt(minimo) && parseInt(visita.puntuacion) <= parseInt(maximo));

    visita.instruccion = instruccion;
    visita.testId = id;

    crearVisita();
}