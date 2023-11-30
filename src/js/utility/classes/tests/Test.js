import UI from "../../../layout/UI.js";
import { datos, mostrarFormulario } from "../../functions/tests/funcionesTestCrear.js";

export default class Test {
    constructor(test = {}) {
        this.nombre = test.nombre ?? "";
        this.descripcion = test.descripcion ?? "";
        this.instrucciones = test.instrucciones ?? [];
        this.opciones = test.opciones ?? [];
        this.preguntas = test.preguntas ?? [];
        this.numOpciones = test.opciones ?? 0;
        this.numPreguntas = test.numPreguntas ?? 0;
        this.categoriaId = test.categoriaId ?? "";
        this.tipoTestId = test.tipoTestId ?? "";
    }

    agregarPregunta(preguntaObj) {
        this.preguntas = [...this.preguntas, preguntaObj];
    }

    modificarPregunta(preguntaObj) {
        this.preguntas = this.preguntas.map(pregunta => parseInt(pregunta.id) === preguntaObj.id ? preguntaObj : pregunta);
    }

    eliminarPregunta(id) {
        this.preguntas = this.preguntas.filter(pregunta => parseInt(pregunta.id) !== parseInt(id));
    }

    agregarOpcion(opcionObj) {
        this.opciones = [...this.opciones, opcionObj];
    }

    modificarOpcion(opcionObj) {
        this.opciones = this.opciones.map(opcion => parseInt(opcion.id) === parseInt(opcionObj.id) ? opcionObj : opcion);
    }

    eliminarOpcion(id) {
        this.opciones = this.opciones.filter(opcion => parseInt(opcion.id) !== parseInt(id));
    }

    agregarInstruccion(instruccionObj) {
        this.instrucciones = [...this.instrucciones, instruccionObj];
    }

    modificarInstruccion(instruccionObj) {
        this.instrucciones = this.instrucciones.map(instruccion => parseInt(instruccion.id) === parseInt(instruccionObj.id) ? instruccionObj : instruccion);
    }

    eliminarInstruccion() {
        return this.instrucciones.pop();
    }

    cambiarPagina(pagina) {
        datos.pagina = pagina;
        mostrarFormulario();
    }

    validarMaximoInstrucciones() {
        if(this.instrucciones.length > 0) {
            const maximo = this.calcularMinimoYMaximo().maximo;

            this.instrucciones = this.instrucciones.filter(instruccionObj => parseInt(instruccionObj.maximo) <= maximo);
            const ultimaInstruccion = this.instrucciones[this.instrucciones.length - 1];
            datos.minimo = parseInt(ultimaInstruccion.maximo) + 1;
        }
    }

    mostrarModificarinstruccion(instruccionObj) {
        const {titulo, instruccion, id, maximo, minimo} = instruccionObj;

        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const campoTitulo = document.createElement("DIV");
        const tituloLab = document.createElement("LABEL");
        const tituloInp = document.createElement("INPUT");
        campoTitulo.classList.add("campo");
        tituloLab.textContent = "Titulo: ";
        tituloLab.setAttribute("for", "titulo-modal");
        tituloInp.placeholder = "Titulo de Instruccion";
        tituloInp.type = "text";
        tituloInp.id = "titulo-modal";
        tituloInp.name = "titulo-modal";
        tituloInp.classList.add("input");
        tituloInp.value = titulo;

        campoTitulo.appendChild(tituloLab);
        campoTitulo.appendChild(tituloInp);

        const campoInstruccion = document.createElement("DIV");
        const instruccionLab = document.createElement("LABEL");
        const instruccionInp = document.createElement("TEXTAREA");
        campoInstruccion.classList.add("campo");
        instruccionLab.textContent = "Contenido: ";
        instruccionLab.setAttribute("for", "instruccion-modal");
        instruccionInp.placeholder = "Contenido de Instruccion";
        instruccionInp.id = "instruccion-modal";
        instruccionInp.name = "instruccion-modal";
        instruccionInp.classList.add("input");
        instruccionInp.value = instruccion;

        campoInstruccion.appendChild(instruccionLab);
        campoInstruccion.appendChild(instruccionInp);

        const btnNuevaInstruccion = document.createElement("BUTTON");
        btnNuevaInstruccion.type = "submit";
        btnNuevaInstruccion.textContent = "Guardar Cambios";
        btnNuevaInstruccion.classList.add("boton-verde");   

        formulario.appendChild(campoTitulo);
        formulario.appendChild(campoInstruccion);
        formulario.appendChild(btnNuevaInstruccion);

        formulario.onsubmit = e => {
            e.preventDefault();
            this.validarInstruccion(e.target, {
                id,
                minimo,
                maximo
            });
        }

        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarModalInstrucciones() {
        const contenido = document.createElement("DIV");

        const { instrucciones } = this;

        const heading = document.createElement("H2");
        heading.textContent = "Instrucciones: ";

        const contenedorInstrucciones = document.createElement("DIV");
        contenedorInstrucciones.classList.add("seccion", "contenedor-instrucciones");

        if (instrucciones.length === 0) {
            const parrafo = document.createElement("P");
            parrafo.textContent = "No Hay Instrucciones";

            contenedorInstrucciones.appendChild(parrafo);
        } else {
            instrucciones.forEach((instruccionObj) => {
                const { titulo, instruccion, minimo, maximo } = instruccionObj;

                const li = document.createElement("LI");
                const parrafo = document.createElement("H4");
                const instruccionP = UI.formatearDescripcion(instruccion);
                const limiteP = document.createElement("P");
                parrafo.textContent = `${titulo}: `;
                limiteP.textContent = `Instruccion Valida de ${minimo} a ${maximo} Puntos`; 

                const acciones = document.createElement("SPAN");
                acciones.classList.add("acciones");
                acciones.innerHTML = `
                    <button type="button" class="boton-naranja" id="actualizar-instruccion">Modificar</button>
                `;

                acciones.onclick = e => {
                    if (e.target.id === "actualizar-instruccion") {
                        this.mostrarModificarinstruccion({ ...instruccionObj });
                    }
                }

                li.appendChild(parrafo);
                li.appendChild(instruccionP);
                li.appendChild(limiteP);
                li.appendChild(acciones);

                contenedorInstrucciones.appendChild(li);
            });

            const btnEliminar = document.createElement("BUTTON");
            btnEliminar.type = "button";
            btnEliminar.classList.add("boton-rojo");
            btnEliminar.id = "eliminar-instruccion";
            btnEliminar.textContent = "Eliminar";

            btnEliminar.onclick = e => {
                this.mostrarEliminarinstruccion();
            }

            contenedorInstrucciones.lastChild.querySelector(".acciones").appendChild(btnEliminar);
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorInstrucciones);
        UI.crearModal(contenido);
    }

    mostrarModalOpciones() {
        const contenido = document.createElement("DIV");

        const heading = document.createElement("H2");
        heading.textContent = "Opciones: ";

        const contenedorOpciones = document.createElement("DIV");
        contenedorOpciones.classList.add("seccion", "contenedor-opciones");

        const parrafo = document.createElement("P");
        parrafo.textContent = "No Hay Opciones";
        contenedorOpciones.appendChild(parrafo);

        contenido.appendChild(heading);
        contenido.appendChild(contenedorOpciones);
        UI.crearModal(contenido);
    }

    mostrarModalPreguntas() {
        const contenido = document.createElement("DIV");

        const { preguntas } = this;

        const heading = document.createElement("H2");
        heading.textContent = "Preguntas: ";

        const contenedorPreguntas = document.createElement("DIV");
        contenedorPreguntas.classList.add("seccion", "contenedor-preguntas");

        if (preguntas.length === 0) {
            const parrafo = document.createElement("P");
            parrafo.textContent = "No Hay Preguntas";

            contenedorPreguntas.appendChild(parrafo);
        } else {
            preguntas.forEach((preguntaObj, i) => {
                const { pregunta, id } = preguntaObj;

                const li = document.createElement("LI");
                const parrafo = document.createElement("SPAN");
                const preguntaP = document.createElement("SPAN");
                parrafo.textContent = `Pregunta ${i + 1}: `;
                preguntaP.textContent = pregunta;

                const acciones = document.createElement("SPAN");
                acciones.classList.add("acciones");
                acciones.innerHTML = `
                    <button type="button" class="boton-naranja" id="actualizar-pregunta">Modificar</button>
                    <button type="button" class="boton-rojo" id="eliminar-pregunta">Eliminar</button>
                `;

                acciones.onclick = e => {
                    if (e.target.id === "actualizar-pregunta") {
                        this.mostrarModificarPregunta({ ...preguntaObj }, i + 1);
                    }

                    if (e.target.id === "eliminar-pregunta") {
                        this.mostrarEliminarPregunta(id);
                    }
                }

                li.appendChild(parrafo);
                li.appendChild(preguntaP);
                li.appendChild(acciones);

                contenedorPreguntas.appendChild(li);
            });
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorPreguntas);
        UI.crearModal(contenido);
    }

    mostrarModificarPregunta(preguntaObj, i) {
        const { pregunta, id } = preguntaObj;
        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const preguntaDiv = document.createElement("DIV");
        const preguntaLab = document.createElement("LABEL");
        const preguntaInp = document.createElement("INPUT");
        preguntaDiv.classList.add("campo")
        preguntaLab.textContent = `Pregunta ${i}: `;
        preguntaLab.setAttribute("for", "pregunta-modal");
        preguntaInp.placeholder = "Nueva Pregunta";
        preguntaInp.id = "pregunta-modal";
        preguntaInp.name = "pregunta-modal";
        preguntaInp.type = "text";
        preguntaInp.value = pregunta;

        preguntaDiv.appendChild(preguntaLab);
        preguntaDiv.appendChild(preguntaInp);

        const btnNuevaPregunta = document.createElement("BUTTON");
        btnNuevaPregunta.type = "submit";
        btnNuevaPregunta.textContent = "Guardar Cambios";
        btnNuevaPregunta.classList.add("boton-verde");

        formulario.appendChild(preguntaDiv);
        formulario.appendChild(btnNuevaPregunta);

        formulario.onsubmit = e => {
            e.preventDefault();
            this.validarPregunta(e.target, id);
        }

        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarEliminarinstruccion() {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar La instruccion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                const instruccion = this.eliminarInstruccion()
                const {minimo} = instruccion;
                datos.minimo = minimo;
                this.mostrarModalInstrucciones();
                this.cambiarPagina(3);

                Swal.fire({
                    title: "Exito",
                    text: "La instruccion Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }

    mostrarEliminarOpcion(id) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar La Opcion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                this.eliminarOpcion(id);
                this.mostrarModalOpciones();
                this.cambiarPagina(2);
                this.validarMaximoInstrucciones();

                Swal.fire({
                    title: "Exito",
                    text: "La Opcion Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }

    mostrarEliminarPregunta(id) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar La Pregunta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                this.eliminarPregunta(id);
                this.mostrarModalPreguntas();
                this.cambiarPagina(2);
                this.validarMaximoInstrucciones();

                Swal.fire({
                    title: "Exito",
                    text: "La Pregunta Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }

    validarPregunta(formulario, id) {
        const selector = id ? ".campo #pregunta-modal" : ".campo #pregunta";
        const input = formulario.querySelector(selector);
        const pregunta = input.value.trim() ?? "";

        if (pregunta === "") {
            UI.mostrarAlerta("La Pregunta es Obligatoria", formulario);
            return;
        }

        if (id) {
            const preguntaObj = {
                id,
                pregunta
            }

            this.modificarPregunta(preguntaObj);
            this.mostrarModalPreguntas();
            Swal.fire({
                title: "Exito",
                text: "Se Actualizo la Pregunta",
                icon: "success"
            });
            return;
        }

        const preguntaObj = {
            id: Date.now(),
            pregunta
        }

        this.agregarPregunta(preguntaObj);
        input.value = "";
        input.previousElementSibling.textContent = `Pregunta: ${this.preguntas.length + 1}`;
        UI.mostrarAlerta("La Pregunta se Agrego Corretamente", formulario, "exito");
    }

    validarInstruccion(formulario, instruccionMemoria = {}) {
        const {id} = instruccionMemoria;
        const { minimo, maximo: mayor } = datos;

        const maximoInp = formulario.querySelector(".campo #maximo");
        const maximo = id ? instruccionMemoria.maximo : maximoInp.value.trim();
        const tituloInp = formulario.querySelector(id ? ".campo #titulo-modal" : ".campo #titulo");
        const titulo = tituloInp.value.trim();
        const instruccionInp = formulario.querySelector(id ? ".campo #instruccion-modal" : ".campo #instruccion");
        const instruccion = instruccionInp.value.trim();

        if (maximo === "" || titulo === "" || instruccion === "") {
            UI.mostrarAlerta("Todos Los campos son Obligatorios", formulario);
            return;
        }

        if(id) {
            const {minimo} = instruccionMemoria;
            const instruccionObj = {
                id,
                titulo,
                instruccion,
                maximo,
                minimo,
            }

            this.modificarInstruccion(instruccionObj);
            this.mostrarModalInstrucciones();

            Swal.fire({
                title: "Exito",
                text: "Se Actualizo la instruccion",
                icon: "success"
            });
            return;
        }

        if (isNaN(maximo) || maximo > mayor || maximo < minimo) {
            UI.mostrarAlerta("Datos Invalidos", formulario);
            return;
        }

        const instruccionObj = {
            id: Date.now(),
            titulo,
            instruccion,
            minimo,
            maximo
        }

        this.agregarInstruccion(instruccionObj);
        datos.minimo = parseInt(maximo) + 1;

        mostrarFormulario();
    }
}