import CrearTest from "./crearTest.js";
import { cambiarPagina, mostrarFormulario, test } from "./funcionesTestCrear.js";
import UI from "../../../layout/UI.js";

export default class CrearTestAvanzado extends CrearTest {
    formulario2(formulario) {
        const preguntaActual = test.preguntas.length + 1;
        const campoPregunta = document.createElement("DIV");
        campoPregunta.classList.add("campo-pregunta-opcion", "seccion")

        const preguntaDiv = document.createElement("DIV");
        const preguntaLab = document.createElement("LABEL");
        const preguntaInp = document.createElement("INPUT");
        preguntaDiv.classList.add("campo")
        preguntaLab.textContent = `Pregunta del Campo ${preguntaActual}: `;
        preguntaLab.setAttribute("for", "pregunta");
        preguntaInp.placeholder = "Pregunta del Campo";
        preguntaInp.id = "pregunta";
        preguntaInp.name = "pregunta";
        preguntaInp.type = "text";

        preguntaDiv.appendChild(preguntaLab);
        preguntaDiv.appendChild(preguntaInp);

        const multipleDiv = document.createElement("DIV");
        const multipleLab = document.createElement("LABEL");
        const multipleInp = document.createElement("INPUT");
        multipleDiv.classList.add("campo");
        multipleLab.textContent = "Opciones Multiples: ";
        multipleLab.setAttribute("for", "multiple");
        multipleInp.type = "checkbox";
        multipleInp.name = "multiple";
        multipleInp.id = "multiple";

        multipleDiv.appendChild(multipleLab);
        multipleDiv.appendChild(multipleInp);

        const numOpcionesDiv = document.createElement("DIV");
        const numOpcionesLab = document.createElement("LABEL");
        const numOpcionesInp = document.createElement("INPUT");
        numOpcionesDiv.classList.add("campo");
        numOpcionesLab.textContent = "Numero de Opciones: ";
        numOpcionesLab.setAttribute("for", "num-opciones");
        numOpcionesInp.placeholder = "Numero de Opciones Para Este Campo";
        numOpcionesInp.type = "number";
        numOpcionesInp.id = "num-opciones";
        numOpcionesInp.name = "num-opciones";
        numOpcionesInp.min = 2;
        numOpcionesInp.max = 10;

        numOpcionesInp.oninput = e => {
            this.validarNumOpciones(e.target.parentElement, e.target.value.trim());
        }

        numOpcionesDiv.appendChild(numOpcionesLab);
        numOpcionesDiv.appendChild(numOpcionesInp);

        campoPregunta.appendChild(preguntaDiv);
        campoPregunta.appendChild(multipleDiv);
        campoPregunta.appendChild(numOpcionesDiv);

        formulario.appendChild(campoPregunta);
    }

    mostrarModificarOpcion(opcionObj, pregunta, num) {
        const { id, opciones, multiple } = opcionObj;
        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const preguntaP = document.createElement("P");
        preguntaP.textContent = pregunta;
        preguntaP.classList.add("pregunta-opcion")
        formulario.appendChild(preguntaP);

        const multipleDiv = document.createElement("DIV");
        const multipleLab = document.createElement("LABEL");
        const multipleInp = document.createElement("INPUT");
        multipleDiv.classList.add("campo");
        multipleLab.textContent = "Opciones Multiples: ";
        multipleLab.setAttribute("for", "multiple-modal");
        multipleInp.type = "checkbox";
        multipleInp.name = "multiple-modal";
        multipleInp.id = "multiple-modal";
        multipleInp.checked = multiple;

        multipleDiv.appendChild(multipleLab);
        multipleDiv.appendChild(multipleInp);

        formulario.appendChild(multipleDiv);

        const btnCambiarNum = document.createElement("BUTTON");
        btnCambiarNum.type = "button";
        btnCambiarNum.textContent = "Cambiar Numero de opciones";
        btnCambiarNum.classList.add("boton-naranja");

        btnCambiarNum.onclick = e => {
            this.mostrarCambiarNumInp(opcionObj, pregunta)
        }

        if (num) {
            opcionObj = {
                id,
                multiple,
                opciones: []
            }
        }

        this.mostrarInputsOpciones(formulario, num ? num : opciones.length, opcionObj)

        formulario.appendChild(btnCambiarNum);
        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarCambiarNumInp(opcionObj, pregunta) {
        const { opciones } = opcionObj;
        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const preguntaP = document.createElement("P");
        preguntaP.textContent = pregunta;
        preguntaP.classList.add("pregunta-opcion")
        formulario.appendChild(preguntaP);

        const numOpcionesDiv = document.createElement("DIV");
        const numOpcionesLab = document.createElement("LABEL");
        const numOpcionesInp = document.createElement("INPUT");
        numOpcionesDiv.classList.add("campo");
        numOpcionesLab.textContent = "Numero de Opciones: ";
        numOpcionesLab.setAttribute("for", "num-opciones");
        numOpcionesInp.placeholder = "Numero de Opciones Para Este Campo";
        numOpcionesInp.type = "number";
        numOpcionesInp.id = "num-opciones";
        numOpcionesInp.name = "num-opciones";
        numOpcionesInp.min = 2;
        numOpcionesInp.max = 10;
        numOpcionesInp.value = opciones.length;

        numOpcionesDiv.appendChild(numOpcionesLab);
        numOpcionesDiv.appendChild(numOpcionesInp);

        const btnNumOpciones = document.createElement("BUTTON");
        btnNumOpciones.type = "submit";
        btnNumOpciones.classList.add("boton-naranja");
        btnNumOpciones.textContent = "Cambiar";

        const btnCancelar = document.createElement("BUTTON");
        btnCancelar.type = "button";
        btnCancelar.classList.add("boton-rojo");
        btnCancelar.textContent = "Cancelar";

        btnCancelar.onclick = () => {
            this.mostrarModificarOpcion(opcionObj, pregunta);
        }

        formulario.onsubmit = e => {
            e.preventDefault();
            this.validarNumOpciones(formulario, numOpcionesInp.value, opcionObj, pregunta);
        }

        formulario.appendChild(numOpcionesDiv);
        formulario.appendChild(btnNumOpciones);
        formulario.appendChild(btnCancelar);

        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarModalOpciones() {
        const { opciones, preguntas } = test;
        const contenido = document.createElement("DIV");

        const heading = document.createElement("H2");
        heading.textContent = "Opciones: ";

        const contenedorOpciones = document.createElement("DIV");
        contenedorOpciones.classList.add("seccion", "contenedor-opciones");

        if (opciones.length === 0) {
            const parrafo = document.createElement("P");
            parrafo.textContent = "No Hay Opciones";
            contenedorOpciones.appendChild(parrafo);
        } else {
            opciones.forEach(opcionObj => {
                const { id, opciones, multiple } = opcionObj;
                const preguntaObj = preguntas.filter(pregunta => parseInt(pregunta.id) === parseInt(id));

                if (preguntaObj.length === 1) {
                    const [{ pregunta }] = preguntaObj;
                    const contenedorOpcion = document.createElement("DIV");

                    const heading = document.createElement("H4");
                    heading.textContent = pregunta;

                    const multipleP = document.createElement("P");
                    multipleP.textContent = multiple ? "Opciones Multiples" : "Opciones Basicas";

                    contenedorOpcion.appendChild(heading);
                    contenedorOpcion.appendChild(multipleP);

                    opciones.forEach(({ opcion, valor }, i) => {
                        const li = document.createElement("LI");
                        const parrafo = document.createElement("SPAN");
                        const opcionP = document.createElement("SPAN");
                        const valorP = document.createElement("P");
                        parrafo.textContent = `Opcion ${i + 1}: `;
                        opcionP.textContent = opcion;
                        valorP.textContent = `Valor: ${valor}`;

                        li.appendChild(parrafo);
                        li.appendChild(opcionP);
                        li.appendChild(valorP);

                        contenedorOpcion.appendChild(li);
                    });

                    const acciones = document.createElement("SPAN");
                    acciones.classList.add("acciones");
                    acciones.innerHTML = `
                    <button type="button" class="boton-naranja" id="actualizar-opcion">Modificar</button>
                    <button type="button" class="boton-rojo" id="eliminar-opcion">Eliminar</button>
                `;

                    acciones.onclick = e => {
                        if (e.target.id === "actualizar-opcion") {
                            this.mostrarModificarOpcion({ ...opcionObj }, pregunta);
                        }

                        if (e.target.id === "eliminar-opcion") {
                            this.mostrarEliminarOpcion(id);
                        }
                    }

                    contenedorOpcion.appendChild(acciones);
                    contenedorOpciones.appendChild(contenedorOpcion);
                }
            });
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorOpciones);
        UI.crearModal(contenido);
    }

    mostrarInputsOpciones(formulario, num, opcionObj = {}) {
        const { id, opciones } = opcionObj;
        const campoOpcion = document.createElement("DIV");
        campoOpcion.classList.add("campo-opciones", "seccion");

        for (let i = 1; i <= num; i++) {
            let opcion, valor;
            if (opciones && opciones.length >= 1) {
                opcion = opciones[i - 1].opcion;
                valor = opciones[i - 1].valor;
            }

            const opcionDiv = document.createElement("DIV");
            const opcionLab = document.createElement("LABEL");
            const opcionInp = document.createElement("INPUT");
            opcionDiv.classList.add("campo");
            opcionLab.setAttribute("for", `opcion-${i}`);
            opcionLab.textContent = `Opcion ${i}: `;
            opcionInp.type = "text";
            opcionInp.name = `opcion-${i}`;
            opcionInp.id = `opcion-${i}`;
            opcionInp.classList.add(id ? "opcion-input-modal" : "opcion-input")
            opcionInp.placeholder = "Nueva Opcion";
            opcionInp.value = opcion ?? "";

            opcionDiv.appendChild(opcionLab);
            opcionDiv.appendChild(opcionInp);

            const valorDiv = document.createElement("DIV");
            const valorLab = document.createElement("LABEL");
            const valorInp = document.createElement("INPUT");
            valorDiv.classList.add("campo");
            valorLab.setAttribute("for", `valor-${i}`);
            valorLab.textContent = "Valor: ";
            valorInp.name = `valor-${i}`;
            valorInp.id = `valor-${i}`;
            valorInp.placeholder = "Valor de la Opcion";
            valorInp.classList.add(id ? "valor-input-modal" : "valor-input");
            valorInp.type = "number";
            valorInp.min = 1;
            valorInp.max = 10;
            valorInp.value = valor ?? "";

            valorDiv.appendChild(valorLab);
            valorDiv.appendChild(valorInp);

            campoOpcion.appendChild(opcionDiv)
            campoOpcion.appendChild(valorDiv);
        }

        const btnNuevoCampo = document.createElement("BUTTON");
        btnNuevoCampo.type = "button";
        btnNuevoCampo.textContent = id ? "Guardar Cambios" : "Agregar Campo";
        btnNuevoCampo.classList.add("boton-verde", "agregar-campo");

        btnNuevoCampo.onclick = e => {
            this.validarCampo(e.target.parentElement, num, id);
        }

        formulario.onsubmit = e => e.preventDefault();

        formulario.appendChild(campoOpcion);
        formulario.appendChild(btnNuevoCampo);
    }

    validarCampo(formulario, num, idOpcion) {
        const preguntaInp = formulario.querySelector(".campo #pregunta");
        const pregunta = preguntaInp ? preguntaInp.value.trim() : "";
        const multiple = formulario.querySelector(idOpcion ? ".campo #multiple-modal" : ".campo #multiple").checked ?? false;
        const opcionesInp = formulario.querySelectorAll(idOpcion ? ".campo .opcion-input-modal" : ".campo .opcion-input");
        const valoresInp = formulario.querySelectorAll(idOpcion ? ".campo .valor-input-modal" : ".campo .valor-input");

        let opciones = [];
        let valores = [];

        opcionesInp.forEach(opcionInp => opciones = [...opciones, opcionInp.value.trim()]);
        valoresInp.forEach(valorInp => valores = [...valores, valorInp.value.trim()]);

        if (!idOpcion) {
            if (pregunta === "") {
                UI.mostrarAlerta("La Pregunta Es Obligatoria", formulario);
                return;
            }

            if (parseInt(num) !== opcionesInp.length || parseInt(num) !== valoresInp.length) {
                UI.mostrarAlerta("Las Opciones NO Coinciden Con El Valor Dado", formulario);
                return;
            }
        }

        const opcionesInvalidas = opciones.filter(opcion => opcion === "");
        const valoresInvalidos = valores.filter(valor => valor === "" || isNaN(valor) || valor > 10 || valor < 1);

        if (opcionesInvalidas.length !== 0 || valoresInvalidos.length !== 0) {
            UI.mostrarAlerta("Todos los campos Son Obligatorios o Invalidos", formulario);
            return;
        }

        const id = Math.round(Math.random()*Date.now());

        const opcionesObj = {
            id,
            multiple,
            opciones: []
        }

        for (let i = 0; i < opciones.length; i++) {
            const opcion = opciones[i];
            const valor = valores[i];

            const opcionObj = {
                id: Math.round(Math.random()*Date.now()),
                opcion,
                valor
            }

            opcionesObj.opciones = [...opcionesObj.opciones, opcionObj];
        }

        if (idOpcion) {
            opcionesObj.id = idOpcion;
            test.modificarOpcion(opcionesObj);
            cambiarPagina(2);
            this.mostrarModalOpciones();
            this.validarMaximoInstrucciones();

            Swal.fire({
                title: "Exito",
                text: "Se Actualizo la Opcion",
                icon: "success"
            });
            return;
        }

        const preguntaObj = {
            id,
            pregunta
        }

        test.agregarPregunta(preguntaObj);
        test.agregarOpcion(opcionesObj);

        mostrarFormulario();

        Swal.fire({
            title: "Exito",
            text: "Se Creo el Campo",
            icon: "success"
        });
    }

    validarNumOpciones(formulario, valor, opcionObj, pregunta) {
        if (!opcionObj) {
            const divPrevio = formulario.parentElement.querySelector(".campo-opciones");
            const btnPrevio = formulario.parentElement.querySelector(".agregar-campo");

            if (divPrevio) {
                divPrevio.remove();
            }
            if (btnPrevio) {
                btnPrevio.remove();
            }
        }

        if (valor === "") {
            UI.mostrarAlerta("El Numero Es Obligatorio", formulario);
            return;
        }

        if (isNaN(valor) || valor > 10 || valor < 2) {
            UI.mostrarAlerta("Solo Se Pueden Agregar de 2 a 10 Opciones", formulario);
            return;
        }

        if (opcionObj) {
            this.mostrarModificarOpcion(opcionObj, pregunta, valor);
            return;
        }

        const alertaPrevia = formulario.querySelector(`.alerta`);
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
        this.mostrarInputsOpciones(formulario.parentElement, valor);
    }
}