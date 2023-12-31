import CrearTest from "./crearTest.js";
import { cambiarPagina, mostrarFormulario, test } from "./funcionesTestCrear.js";
import UI from "../../../layout/UI.js";

export default class CrearTestBasico extends CrearTest {
    formulario2(formulario) {
        const preguntaActual = test.preguntas.length + 1;
        const campoPregunta = document.createElement("DIV");
        const preguntaDiv = document.createElement("DIV");
        const preguntaLab = document.createElement("LABEL");
        const preguntaInp = document.createElement("INPUT");
        campoPregunta.classList.add("campo-pregunta", "seccion");
        preguntaDiv.classList.add("campo")
        preguntaLab.textContent = `Pregunta ${preguntaActual}: `;
        preguntaLab.setAttribute("for", "pregunta");
        preguntaInp.placeholder = "Nueva Pregunta";
        preguntaInp.id = "pregunta";
        preguntaInp.name = "pregunta";
        preguntaInp.type = "text";

        preguntaDiv.appendChild(preguntaLab);
        preguntaDiv.appendChild(preguntaInp);

        campoPregunta.appendChild(preguntaDiv);
        const btnNuevaPregunta = document.createElement("BUTTON");
        btnNuevaPregunta.type = "button";
        btnNuevaPregunta.textContent = "Agregar Pregunta";
        btnNuevaPregunta.classList.add("boton-verde");

        btnNuevaPregunta.onclick = e => {
            this.validarPregunta(e.target.parentElement);
        }

        campoPregunta.appendChild(btnNuevaPregunta);

        const opcionActual = test.opciones.length + 1;

        const campoOpcion = document.createElement("DIV");
        const opcionDiv = document.createElement("DIV");
        const opcionLab = document.createElement("LABEL");
        const opcionInp = document.createElement("INPUT");
        campoOpcion.classList.add("campo-opcion", "seccion");
        opcionDiv.classList.add("campo");
        opcionLab.setAttribute("for", "opcion");
        opcionLab.textContent = `Opcion ${opcionActual}: `;
        opcionInp.type = "text";
        opcionInp.name = "opcion";
        opcionInp.id = "opcion";
        opcionInp.placeholder = "Nueva Opcion";

        const valorDiv = document.createElement("DIV");
        const valorLab = document.createElement("LABEL");
        const valorInp = document.createElement("INPUT");
        valorDiv.classList.add("campo");
        valorLab.setAttribute("for", "valor");
        valorLab.textContent = "Valor: ";
        valorInp.name = "valor";
        valorInp.id = "valor";
        valorInp.placeholder = "Valor de la Opcion";
        valorInp.type = "number";
        valorInp.min = 1;
        valorInp.max = 10;

        const btnNuevaOpcion = document.createElement("BUTTON");
        btnNuevaOpcion.type = "button";
        btnNuevaOpcion.textContent = "Agregar Opcion";
        btnNuevaOpcion.classList.add("boton-verde");

        btnNuevaOpcion.onclick = e => {
            this.validarOpcion(e.target.parentElement);
        }

        opcionDiv.appendChild(opcionLab);
        opcionDiv.appendChild(opcionInp);

        valorDiv.appendChild(valorLab);
        valorDiv.appendChild(valorInp);

        campoOpcion.appendChild(opcionDiv);
        campoOpcion.appendChild(valorDiv);
        campoOpcion.appendChild(btnNuevaOpcion);

        formulario.appendChild(campoPregunta);
        formulario.appendChild(campoOpcion);
    }

    mostrarModificarOpcion(opcionObj, i) {
        const { opcion, valor, id } = opcionObj;
        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const opcionDiv = document.createElement("DIV");
        const opcionLab = document.createElement("LABEL");
        const opcionInp = document.createElement("INPUT");
        opcionDiv.classList.add("campo");
        opcionLab.setAttribute("for", "opcion-modal");
        opcionLab.textContent = `Opcion ${i}: `;
        opcionInp.type = "text";
        opcionInp.name = "opcion-modal";
        opcionInp.id = "opcion-modal";
        opcionInp.placeholder = "Nueva Opcion";
        opcionInp.value = opcion;

        opcionDiv.appendChild(opcionLab);
        opcionDiv.appendChild(opcionInp);

        const valorDiv = document.createElement("DIV");
        const valorLab = document.createElement("LABEL");
        const valorInp = document.createElement("INPUT");
        valorDiv.classList.add("campo");
        valorLab.setAttribute("for", "valor-modal");
        valorLab.textContent = "Valor: ";
        valorInp.name = "valor-modal";
        valorInp.id = "valor-modal";
        valorInp.placeholder = "Valor de la Opcion";
        valorInp.type = "number";
        valorInp.min = 1;
        valorInp.max = 10;
        valorInp.value = valor;

        valorDiv.appendChild(valorLab);
        valorDiv.appendChild(valorInp);

        const btnNuevaOpcion = document.createElement("BUTTON");
        btnNuevaOpcion.type = "submit";
        btnNuevaOpcion.textContent = "Guardar Cambios";
        btnNuevaOpcion.classList.add("boton-verde");

        formulario.appendChild(opcionDiv);
        formulario.appendChild(valorDiv);
        formulario.appendChild(btnNuevaOpcion);

        formulario.onsubmit = e => {
            e.preventDefault();
            this.validarOpcion(e.target, id);
        }

        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarModalOpciones() {
        const { opciones } = test;
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
            opciones.forEach((opcionObj, i) => {
                const { opcion, valor, id } = opcionObj;
                const li = document.createElement("LI");
                const parrafo = document.createElement("SPAN");
                const opcionP = document.createElement("SPAN");
                const valorP = document.createElement("P");
                parrafo.textContent = `Opcion ${i + 1}: `;
                opcionP.textContent = opcion;
                valorP.textContent = `Valor: ${valor}`;

                const acciones = document.createElement("SPAN");
                acciones.classList.add("acciones");
                acciones.innerHTML = `
                <button type="button" class="boton-naranja" id="actualizar-opcion">Modificar</button>
                <button type="button" class="boton-rojo" id="eliminar-opcion">Eliminar</button>
            `;

                acciones.onclick = e => {
                    if (e.target.id === "actualizar-opcion") {
                        this.mostrarModificarOpcion({ ...opcionObj }, i + 1);
                    }

                    if (e.target.id === "eliminar-opcion") {
                        this.mostrarEliminarOpcion(id);
                    }
                }

                li.appendChild(parrafo);
                li.appendChild(opcionP);
                li.appendChild(valorP);
                li.appendChild(acciones);

                contenedorOpciones.appendChild(li);
            });
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorOpciones);
        UI.crearModal(contenido);
    }

    validarOpcion(formulario, id) {
        const opcionInp = formulario.querySelector(id ? ".campo #opcion-modal" : ".campo #opcion");
        const opcion = opcionInp.value.trim();
        const valorInp = formulario.querySelector(id ? ".campo #valor-modal" : ".campo #valor");
        const valor = valorInp.value.trim();

        if (opcion === "" || valor === "") {
            UI.mostrarAlerta("Todos los Campos Son Obligatorios", formulario);
            return;
        }

        if (isNaN(valor) || valor < 1 || valor > 10) {
            UI.mostrarAlerta("Valor Invalido", formulario);
            return;
        }

        if (id) {
            const opcionObj = {
                id,
                opcion,
                valor
            }

            test.modificarOpcion(opcionObj);
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

        const opcionObj = {
            id: Math.round(Math.random()*Date.now()),
            opcion,
            valor
        }

        test.agregarOpcion(opcionObj);
        mostrarFormulario();

        Swal.fire({
            title: "Exito",
            text: "Se Creo la Opcion",
            icon: "success"
        });
    }
}