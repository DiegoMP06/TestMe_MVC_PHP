import { limpiarHtml } from "../../utilidades.js";
import UI from "../../../layout/UI.js";
import Test from "../../classes/tests/Test.js";
import TestBasico from "../../classes/tests/TestBasico.js";
import TestMedio from "../../classes/tests/TestMedio.js";
import TestAvanzado from "../../classes/tests/TestAvanzado.js";
import CrearTest from "./crearTest.js";
import CrearTestBasico  from "./crearTestBasico.js";
import CrearTestMedio from "./crearTestMedio.js";
import CrearTestAvanzado from "./crearTestAvanzado.js";

export let test = new Test;
let funcionesTest = new CrearTest;

export const datos = {
    pagina: 1,
    minimo: 0,
    maximo: 0
}

const formulario = document.querySelector("#formulario-test");
const asideVisible = document.querySelector("#aside-visible");

let categorias = [];
let tiposTests = [];

export async function obtenerDatos() {
    const urlCategorias = "/api/categorias";
    const urlTiposTests = "/api/tipostests";

    try {
        const respuestas = await Promise.all([
            fetch(urlCategorias),
            fetch(urlTiposTests)
        ]);

        const [respuestaCategorias, respuestaTiposTests] = respuestas;
        const resultadoCategorias = await respuestaCategorias.json();
        const resultadoTiposTests = await respuestaTiposTests.json();

        if (resultadoCategorias.tipo === "exito" && resultadoTiposTests.tipo === "exito") {
            categorias = resultadoCategorias.categorias;
            tiposTests = resultadoTiposTests.tiposTests;

            mostrarFormulario();
            mostrarOpcionesAside();
        }
    } catch (error) {
        console.log(error)
    }
}

async function consultarCrear() {
    const {nombre, descripcion, campos, instrucciones, preguntas, opciones, numPreguntas, numOpciones, categoriaId, tipoTestId} = test;
    const url = "/api/test/crear";
    const datos = new FormData();

    datos.append("nombre", nombre);
    datos.append("descripcion", descripcion);
    datos.append("campos", JSON.stringify(campos));
    datos.append("instrucciones", JSON.stringify(instrucciones));
    datos.append("preguntas", JSON.stringify(preguntas));
    datos.append("opciones", JSON.stringify(opciones));
    datos.append("numPreguntas", numPreguntas);
    datos.append("numOpciones", numOpciones);
    datos.append("categoriaId", categoriaId);
    datos.append("tipoTestId", tipoTestId);

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            body: datos
        });
        const resultado = await respuesta.json();
        
        if(resultado.tipo === "exito") {
            const {url} = resultado;
            window.location = `/test?url=${url}`;
        }
    } catch (error) {
        console.error(error)
    }
}

export function cambiarPagina(pagina) {
    datos.pagina = pagina;
    mostrarFormulario();
}

function mostrarOpcionesAside() {
    const opciones = document.createElement("DIV");
    opciones.classList.add("opciones");

    const btnPreguntas = document.createElement("BUTTON");
    btnPreguntas.textContent = "Mostrar Preguntas";
    btnPreguntas.classList.add("boton-gris-block");

    btnPreguntas.onclick = () => {
        funcionesTest.mostrarModalPreguntas();
    }

    const btnOpciones = document.createElement("BUTTON");
    btnOpciones.textContent = "Mostrar Opciones";
    btnOpciones.classList.add("boton-gris-block");

    btnOpciones.onclick = () => {
        funcionesTest.mostrarModalOpciones();
    }
    
    const btnInstrucciones = document.createElement("BUTTON");
    btnInstrucciones.textContent = "Mostrar Instrucciones";
    btnInstrucciones.classList.add("boton-gris-block");

    btnInstrucciones.onclick = () => {
        funcionesTest.mostrarModalInstrucciones();
    }

    const btnCampos = document.createElement("BUTTON");
    btnCampos.textContent = "Administrar Campos Extra";
    btnCampos.classList.add("boton-azul-block");

    btnCampos.onclick = () => {
        funcionesTest.mostrarModalCamposExtras();
    }

    opciones.appendChild(btnPreguntas)
    opciones.appendChild(btnOpciones)
    opciones.appendChild(btnInstrucciones)
    opciones.appendChild(btnCampos);

    asideVisible.appendChild(opciones);
}

export function mostrarFormulario() {
    const { pagina } = datos;
    limpiarHtml(formulario);

    switch (pagina) {
        case 1:
            formulario1();
            break;
        case 2:
            formulario2();
            break;
        case 3:
            formulario3();
            break;
        case 4:
            mostrarTest();
            break;
        default:
            console.error("Hubo UN error");
    }
}

function formulario1() {
    const { nombre, descripcion, categoriaId, tipoTestId } = test;

    const campoNombre = document.createElement("DIV");
    const nombreLab = document.createElement("LABEL");
    const nombreInp = document.createElement("INPUT");
    campoNombre.classList.add("campo");
    nombreLab.textContent = "Nombre: ";
    nombreLab.setAttribute("for", "nombre");
    nombreInp.classList.add("input");
    nombreInp.placeholder = "Nombre del Test";
    nombreInp.name = "nombre";
    nombreInp.id = "nombre";
    nombreInp.value = nombre;

    campoNombre.appendChild(nombreLab);
    campoNombre.appendChild(nombreInp);

    const campoDescripcion = document.createElement("DIV");
    const descripcionLab = document.createElement("LABEL");
    const descripcionInp = document.createElement("TEXTAREA");
    campoDescripcion.classList.add("campo");
    descripcionLab.textContent = "Descripcion: ";
    descripcionLab.setAttribute("for", "descripcion");
    descripcionInp.classList.add("input");
    descripcionInp.placeholder = "Descipcion del Test";
    descripcionInp.name = "descripcion";
    descripcionInp.id = "descripcion";
    descripcionInp.value = descripcion;

    campoDescripcion.appendChild(descripcionLab);
    campoDescripcion.appendChild(descripcionInp);

    const campoCategoria = document.createElement("DIV");
    const categoriaLab = document.createElement("LABEL");
    const categoriaInp = document.createElement("SELECT");
    campoCategoria.classList.add("campo");
    categoriaLab.textContent = "Categoria: ";
    categoriaLab.setAttribute("for", "categoriaId");
    categoriaInp.classList.add("input");
    categoriaInp.name = "categoriaId";
    categoriaInp.id = "categoriaId";

    const seleccioneCategoria = document.createElement("OPTION");
    seleccioneCategoria.value = "";
    seleccioneCategoria.textContent = "-- Seleccione --";
    seleccioneCategoria.selected = true;
    seleccioneCategoria.disabled = true;

    categoriaInp.appendChild(seleccioneCategoria);

    categorias.forEach(categoria => {
        const { id, nombre } = categoria;

        const option = document.createElement("OPTION");

        option.value = id;
        option.textContent = nombre;

        if (parseInt(categoria.id) === parseInt(categoriaId)) {
            option.selected = true;
        }

        categoriaInp.appendChild(option);
    });

    campoCategoria.appendChild(categoriaLab);
    campoCategoria.appendChild(categoriaInp);

    const campoTipoTest = document.createElement("DIV");
    const tipoTestLab = document.createElement("LABEL");
    const tipoTestInp = document.createElement("SELECT");
    campoTipoTest.classList.add("campo");
    tipoTestLab.textContent = "Tipo de Test: ";
    tipoTestLab.setAttribute("for", "tipoTestId");
    tipoTestInp.classList.add("input");
    tipoTestInp.name = "tipoTestId";
    tipoTestInp.id = "tipoTestId";

    tipoTestInp.oninput = crearTest;

    const seleccioneTipoTest = document.createElement("OPTION");
    seleccioneTipoTest.value = "";
    seleccioneTipoTest.textContent = "-- Seleccione --";
    seleccioneTipoTest.selected = true;
    seleccioneTipoTest.disabled = true;

    tipoTestInp.appendChild(seleccioneTipoTest);

    tiposTests.forEach(tipoTest => {
        const { id, nombre } = tipoTest;

        const option = document.createElement("OPTION");
        option.value = id;
        option.textContent = nombre;

        if (parseInt(tipoTest.id) === parseInt(tipoTestId)) {
            option.selected = true;
        }

        tipoTestInp.appendChild(option);
    });

    campoTipoTest.appendChild(tipoTestLab);
    campoTipoTest.appendChild(tipoTestInp);

    formulario.appendChild(campoNombre);
    formulario.appendChild(campoDescripcion);
    formulario.appendChild(campoCategoria);
    formulario.appendChild(campoTipoTest);

    controles();
}

function formulario2() {
    funcionesTest.formulario2(formulario);
    
    controles()
}

function formulario3() {
    datos.maximo = test.calcularMinimoYMaximo().maximo;

    if(test.instrucciones.length === 0) {
        datos.minimo = test.calcularMinimoYMaximo().minimo;
    }

    const { minimo, maximo } = datos;

    const divInstrucciones = document.createElement("DIV");
    divInstrucciones.classList.add("instrucciones-crear");
    
    if (minimo <= maximo) {
        const divPuntos = document.createElement("DIV");
        divPuntos.innerHTML = `
            <p class="alerta error">${minimo} a ${maximo}</p>
        `;
        divInstrucciones.appendChild(divPuntos);
        
    } else {
        const divAlerta = document.createElement("DIV");
        divAlerta.innerHTML = `
            <p class="alerta exito">Has Cumplido Con Todos los Puntos</p>
        `;
        divInstrucciones.appendChild(divAlerta);
    }
    
    formulario.appendChild(divInstrucciones);

    if (minimo <= maximo) {
        const instruccionDiv = document.createElement("DIV");
        instruccionDiv.classList.add("campo-instruccion", "seccion");

        const campoMinimo = document.createElement("DIV");
        const minimoLab = document.createElement("LABEL");
        const minimoInp = document.createElement("INPUT");
        campoMinimo.classList.add("campo");
        minimoLab.textContent = "Minimo: ";
        minimoLab.setAttribute("for", "minimo");
        minimoInp.placeholder = "Puntaje Minimo";
        minimoInp.type = "number";
        minimoInp.value = minimo;
        minimoInp.disabled = true;
        minimoInp.id = "minimo";
        minimoInp.name = "minimo";
        minimoInp.classList.add("input");

        campoMinimo.appendChild(minimoLab);
        campoMinimo.appendChild(minimoInp);

        const campoMaximo = document.createElement("DIV");
        const maximoLab = document.createElement("LABEL");
        const maximoInp = document.createElement("INPUT");
        campoMaximo.classList.add("campo");
        maximoLab.textContent = "Maximo: ";
        maximoLab.setAttribute("for", "maximo");
        maximoInp.placeholder = "Puntaje Maximo";
        maximoInp.type = "number";
        maximoInp.id = "maximo";
        maximoInp.name = "maximo";
        maximoInp.min = minimo;
        maximoInp.max = maximo;
        maximoInp.classList.add("input");

        campoMaximo.appendChild(maximoLab);
        campoMaximo.appendChild(maximoInp);

        const campoTitulo = document.createElement("DIV");
        const tituloLab = document.createElement("LABEL");
        const tituloInp = document.createElement("INPUT");
        campoTitulo.classList.add("campo");
        tituloLab.textContent = "Titulo: ";
        tituloLab.setAttribute("for", "titulo");
        tituloInp.placeholder = "Titulo de Instruccion";
        tituloInp.type = "text";
        tituloInp.id = "titulo";
        tituloInp.name = "titulo";
        tituloInp.classList.add("input");

        campoTitulo.appendChild(tituloLab);
        campoTitulo.appendChild(tituloInp);

        const campoInstruccion = document.createElement("DIV");
        const instruccionLab = document.createElement("LABEL");
        const instruccionInp = document.createElement("TEXTAREA");
        campoInstruccion.classList.add("campo");
        instruccionLab.textContent = "Contenido: ";
        instruccionLab.setAttribute("for", "instruccion");
        instruccionInp.placeholder = "Contenido de Instruccion";
        instruccionInp.id = "instruccion";
        instruccionInp.name = "instruccion";
        instruccionInp.classList.add("input");

        campoInstruccion.appendChild(instruccionLab);
        campoInstruccion.appendChild(instruccionInp);

        const btnNuevaInstruccion = document.createElement("BUTTON");
        btnNuevaInstruccion.type = "button";
        btnNuevaInstruccion.textContent = "Agregar Instruccion";
        btnNuevaInstruccion.classList.add("boton-verde");

        btnNuevaInstruccion.onclick = e => {
            funcionesTest.validarInstruccion(e.target.parentElement, maximo);
        }

        instruccionDiv.appendChild(campoMinimo);
        instruccionDiv.appendChild(campoMaximo);
        instruccionDiv.appendChild(campoTitulo);
        instruccionDiv.appendChild(campoInstruccion);
        instruccionDiv.appendChild(btnNuevaInstruccion);

        formulario.appendChild(instruccionDiv);
    }

    controles();
}

function mostrarTest() {
    const {nombre, descripcion, numPreguntas, numOpciones, categoriaId, tipoTestId} = test;

    const contenidoTest = document.createElement("DIV");
    contenidoTest.classList.add("test-preview");

    const nombreP = document.createElement("H2");
    nombreP.textContent = nombre;

    const descripcionBlock = UI.formatearDescripcion(descripcion);

    const informacion = document.createElement("DIV");
    informacion.classList.add("informacion-test", "informacion");
    
    const numPreguntasP = document.createElement("P");
    numPreguntasP.textContent = `Numero de Preguntas: ${numPreguntas} `;
    
    const numOpcionesP = document.createElement("P");
    numOpcionesP.textContent = `Numero de Opciones: ${numOpciones} `;

    const [categoria] = categorias.filter(categoriaObj => parseInt(categoriaObj.id) === parseInt(categoriaId));
    const [tipoTest] = tiposTests.filter(tipoTestObj => parseInt(tipoTestObj.id) === parseInt(tipoTestId));

    const categoriaP = document.createElement("P");
    categoriaP.textContent = `Categoria: ${categoria.nombre}`;

    const tipoTestP = document.createElement("P");
    tipoTestP.textContent = `Test ${tipoTest.nombre}`;

    informacion.appendChild(numPreguntasP);
    informacion.appendChild(numOpcionesP);
    informacion.appendChild(categoriaP);
    informacion.appendChild(tipoTestP);

    const acciones = document.createElement("DIV");
    acciones.classList.add("acciones-test", "acciones-preview");

    acciones.innerHTML = `
        <button class="boton-gris" id="mostrar-preguntas" type="button">Mostrar las Preguntas</button>
        <button class="boton-gris" id="mostrar-opciones" type="button">Mostrar las Opciones</button>
        <button class="boton-gris" id="mostrar-instrucciones" type="button">Mostrar las instrucciones</button>
    `;

    acciones.onclick = e => {
        if(e.target.id === "mostrar-preguntas") {
            funcionesTest.mostrarModalPreguntas();
        }
        if(e.target.id === "mostrar-opciones") {
            funcionesTest.mostrarModalOpciones();
        }
        if(e.target.id === "mostrar-instrucciones") {
            funcionesTest.mostrarModalInstrucciones();
        }
    }

    contenidoTest.appendChild(nombreP);
    contenidoTest.appendChild(descripcionBlock);
    contenidoTest.appendChild(informacion);
    contenidoTest.appendChild(acciones);

    formulario.appendChild(contenidoTest);

    controles();
}

function controles() {
    const { pagina } = datos;

    if (pagina > 1) {
        const btnAnterior = document.createElement("BUTTON");
        btnAnterior.classList.add("boton-azul");
        btnAnterior.type = "button";
        btnAnterior.textContent = "Anterior";

        btnAnterior.onclick = () => {
            datos.pagina--;
            mostrarFormulario();
        }

        formulario.appendChild(btnAnterior);
    }

    if (pagina < 4) {
        const btnSiguiente = document.createElement("BUTTON");
        btnSiguiente.classList.add("boton-azul");
        btnSiguiente.type = "button";
        btnSiguiente.textContent = "Siguiente";

        btnSiguiente.onclick = () => {
            validarFormulario();
        }

        formulario.appendChild(btnSiguiente);
    }

    if(pagina === 4) {
        const btnCrearTest = document.createElement("BUTTON");
        btnCrearTest.classList.add("boton-verde");
        btnCrearTest.type = "button";
        btnCrearTest.textContent = "Crear Test";

        btnCrearTest.onclick = e => {
            consultarCrear();
        }

        formulario.appendChild(btnCrearTest);
    }
}

function validarFormulario1() {
    const nombre = formulario.querySelector(".campo #nombre").value.trim();
    const descripcion = formulario.querySelector(".campo #descripcion").value.trim();
    const categoriaId = formulario.querySelector(".campo #categoriaId").value.trim();
    const tipoTestId = formulario.querySelector(".campo #tipoTestId").value.trim();

    if (nombre === "" || descripcion === "" || categoriaId === "" || tipoTestId === "") {
        UI.mostrarAlerta("Todos los campos son Obligatorios", formulario);
        return;
    }

    const categoria = categorias.filter(categoria => parseInt(categoria.id) === parseInt(categoriaId));
    const tipoTest = tiposTests.filter(tipoTest => parseInt(tipoTest.id) === parseInt(tipoTestId));

    if (categoria.length === 0 || tipoTest.length === 0) {
        UI.mostrarAlerta("Datos Invalidos", formulario);
        return;
    }

    test.nombre = nombre;
    test.descripcion = descripcion;
    test.categoriaId = categoriaId;
    test.tipoTestId = tipoTestId;

    datos.pagina++;
    mostrarFormulario();
}

function validarFormulario2() {
    const { opciones, preguntas, tipoTestId } = test;

    switch (parseInt(tipoTestId)) {
        case 1:
            if (preguntas.length < 5) {
                UI.mostrarAlerta("Al Menos debes Agregar 5 Preguntas", formulario);
                return;
            }
            if (opciones.length < 2) {
                UI.mostrarAlerta("Al Menos debes Agregar 2 Opciones", formulario);
                return;
            }
            break;
        case 2:
        case 3:
            if(preguntas.length !== opciones.length) {
                UI.mostrarAlerta("Hubo Un Error Con La Cantida De Campos", formulario);
                return;
            }

            if(preguntas.length < 5) {
                UI.mostrarAlerta("AL Menos Deben de Ser 5 Campos", formulario);
                return;
            }
            break;
        default:
            console.error("Hubo Un Error")
    }                

    test.numOpciones = test.calcularNumOpciones();
    test.numPreguntas = preguntas.length;

    datos.pagina++;
    mostrarFormulario();
}

function validarFormulario3() {
    const {instrucciones} = test;
    const maximo = test.calcularMinimoYMaximo().maximo;
    const {minimo} = datos;

    if(instrucciones.length === 0) {
        UI.mostrarAlerta("Las Instrucciones Son Obligatorias", formulario);
        return;
    }

    if(minimo <= maximo) {
        UI.mostrarAlerta("Debes de Cubrir Todos Los Puntos", formulario);
        return;
    }

    datos.pagina++;
    mostrarFormulario();
}

function validarFormulario() {
    const { pagina } = datos;

    switch (pagina) {
        case 1:
            validarFormulario1();
            break;
        case 2:
            validarFormulario2();
            break;
        case 3:
            validarFormulario3();
            break;
        default:
            console.error("Hubo UN error");
    }
}

function crearTest(e) {
    switch (parseInt(e.target.value)) {
        case 1:
            test = new TestBasico;
            funcionesTest = new CrearTestBasico;
            break;
        case 2:
            test = new TestMedio;
            funcionesTest = new CrearTestMedio;
            break;
        case 3:
            test = new TestAvanzado;
            funcionesTest = new CrearTestAvanzado;
            break;
        default:
            console.error("Ocurrio un Error")
    }
}