import UI from "../../../layout/UI.js";
import TiposCampos from "../../db/TiposCampos.js";
import { limpiarHtml } from "../../utilidades.js";
import { cambiarPagina, datos, mostrarFormulario, test } from "./funcionesTestCrear.js";

export default class CrearTest {
    validarMaximoInstrucciones() {
        if (test.instrucciones.length > 0) {
            const maximo = test.calcularMinimoYMaximo().maximo;

            test.instrucciones = test.instrucciones.filter(instruccionObj => parseInt(instruccionObj.maximo) <= maximo);
            const ultimaInstruccion = test.instrucciones[test.instrucciones.length - 1];
            datos.minimo = parseInt(ultimaInstruccion.maximo) + 1;
        }
    }

    validarPregunta(formulario, id) {
        const input = formulario.querySelector(id ? ".campo #pregunta-modal" : ".campo #pregunta");
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

            test.modificarPregunta(preguntaObj);
            this.mostrarModalPreguntas();

            Swal.fire({
                title: "Exito",
                text: "Se Actualizo la Pregunta",
                icon: "success"
            });
            return;
        }

        const preguntaObj = {
            id: Math.round(Math.random()*Date.now()),
            pregunta
        }

        test.agregarPregunta(preguntaObj);
        mostrarFormulario();

        Swal.fire({
            title: "Exito",
            text: "Se Creo la Pregunta",
            icon: "success"
        });
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
                test.eliminarPregunta(id);
                this.mostrarModalPreguntas();
                cambiarPagina(2);
                this.validarMaximoInstrucciones();

                Swal.fire({
                    title: "Exito",
                    text: "La Pregunta Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }

    mostrarModalPreguntas() {
        const { preguntas } = test;
        const contenido = document.createElement("DIV");

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

    validarInstruccion(formulario, instruccionMemoria = {}) {
        const { id } = instruccionMemoria;
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

        if (id) {
            const { minimo } = instruccionMemoria;
            const instruccionObj = {
                id,
                titulo,
                instruccion,
                maximo,
                minimo,
            }

            test.modificarInstruccion(instruccionObj);
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
            id: Math.round(Math.random()*Date.now()),
            titulo,
            instruccion,
            minimo,
            maximo
        }

        test.agregarInstruccion(instruccionObj);
        datos.minimo = parseInt(maximo) + 1;
        mostrarFormulario();

        Swal.fire({
            title: "Exito",
            text: "Se Creo la instruccion",
            icon: "success"
        });
    }

    mostrarModificarinstruccion(instruccionObj) {
        const { titulo, instruccion, id, maximo, minimo } = instruccionObj;
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
                const instruccion = test.eliminarInstruccion()
                const { minimo } = instruccion;
                datos.minimo = minimo;
                this.mostrarModalInstrucciones();
                cambiarPagina(3);

                Swal.fire({
                    title: "Exito",
                    text: "La instruccion Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }

    mostrarModalInstrucciones() {
        const { instrucciones } = test;
        const contenido = document.createElement("DIV");

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

    validarCampoExtra(formulario, num, id) {
        const nombre = formulario.querySelector(".campo #nombre-campo").value.trim();
        const campoObj = {};

        if (nombre === "") {
            UI.mostrarAlerta("El Titulo es Obligatorio", formulario);
            return;
        }

        if (num === 1 || num === 2) {
            campoObj.atributos = {};
        } else if (num === 5 || num === 6) {
            campoObj.opciones = [];
        }

        if (num === 1 || num === 2) {
            const placeholder = formulario.querySelector(".campo #placeholder").value.trim();

            if (placeholder === "") {
                UI.mostrarAlerta("El Texto Guia Es Obligatorio", formulario);
                return;
            }

            campoObj.atributos.placeholder = placeholder;
        }

        if (num === 2) {
            const entero = formulario.querySelector(".campo #entero-campo").checked;
            const minimoMaximo = formulario.querySelector(".campo #minimo-maximo-campo").checked;

            if (minimoMaximo) {
                const minimo = formulario.querySelector(".campo #minimo-campo").value.trim();
                const maximo = formulario.querySelector(".campo #maximo-campo").value.trim();

                if (minimo === "" || maximo === "" || isNaN(minimo) || isNaN(maximo)) {
                    UI.mostrarAlerta("El Numero Maximo O Minimo es Invalido", formulario);
                    return;
                }

                campoObj.atributos.minimo = minimo;
                campoObj.atributos.maximo = maximo;
            }

            campoObj.atributos.entero = entero;
        }

        if (num === 5 || num === 6) {
            const opcionesInp = formulario.querySelectorAll(".campo .opcion-input-campo");
            const valoresInp = formulario.querySelectorAll(".campo .valor-input-campo");

            if (opcionesInp.length !== valoresInp.length) {
                UI.mostrarAlerta("Hubo UN Error Con las Opciones", formulario);
                return;
            }

            if (valoresInp.length < 1 || opcionesInp.length < 1) {
                UI.mostrarAlerta("Al Menos Debe Haber una Opcion", formulario);
                return;
            }

            let opciones = [];
            let valores = [];

            opcionesInp.forEach(opcionInp => opciones = [...opciones, opcionInp.value.trim()]);
            valoresInp.forEach(valorInp => valores = [...valores, valorInp.value.trim()]);

            const opcionesVacias = opciones.filter(opcion => opcion === "");
            const valoresVacios = valores.filter(valor => valor === "");

            if (opcionesVacias.length !== 0 || valoresVacios.length !== 0) {
                UI.mostrarAlerta("Todos Los Campos Son Obligatorios", formulario);
                return;
            }

            for (let i = 0; i < opciones.length; i++) {
                const opcion = opciones[i];
                const valor = valores[i];

                const opcionObj = {
                    id: Math.round(Math.random()*Date.now()),
                    opcion,
                    valor
                }

                campoObj.opciones = [...campoObj.opciones, opcionObj];
            }
        }

        campoObj.type = TiposCampos.filter(tipoCampo => tipoCampo.id == num)[0].type;
        campoObj.nombre = nombre;

        if (id) {
            campoObj.id = id;
            test.modificarCampo(campoObj);
            this.mostrarModalCamposExtras();

            Swal.fire({
                title: "Exito",
                text: "Se Actualizo El Campo",
                icon: "success"
            });
            return;
        }
        campoObj.id = Math.round(Math.random()*Date.now());

        test.agregarCampo(campoObj);
        this.mostrarModalCamposExtras();

        Swal.fire({
            title: "Exito",
            text: "Se Creo El Campo",
            icon: "success"
        });
    }

    validarTipoCampoExtra(formulario, valor, campoObj) {
        const contenedor = formulario.querySelector("#opciones-campo-modal");
        limpiarHtml(contenedor);

        if (valor === "") {
            UI.mostrarAlerta("El tipo de Campo es Obligatorio", formulario);
            return;
        }

        if (isNaN(valor) || valor < 1 || valor > 6) {
            UI.mostrarAlerta("Tipo de Campo No Valido", formulario);
            return;
        }

        const alertaPrevia = formulario.querySelector(".alerta");

        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        this.crearCamposOpcionesCampoExtra(contenedor, parseInt(valor), campoObj);
    }

    mostrarEliminarCampoExtra(id) {
        Swal.fire({
            title: "Atencion",
            text: "¿Deseas Eliminar El Campo Extra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                test.eliminarCampo(id);
                this.mostrarModalCamposExtras();

                Swal.fire({
                    title: "Exito",
                    text: "El Campo Ha Sido Eliminado",
                    icon: "success"
                });
            }
        });
    }

    mostrarModalCamposExtras(campoObj = {}) {
        const {campos} = test;
        const {nombre, type, id} = campoObj;
        
        let tipo = {};

        if(id) {
            tipo = TiposCampos.filter(tipoCampo => tipoCampo.type === type)[0];
        }

        const contenido = document.createElement("DIV");

        const heading = document.createElement("H2");
        heading.textContent = "Campos Extra: ";

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const tituloDiv = document.createElement("DIV");
        const tituloLab = document.createElement("LABEL");
        const tituloInp = document.createElement("INPUT");
        tituloDiv.classList.add("campo");
        tituloLab.textContent = "Titulo del Campo: ";
        tituloLab.setAttribute("for", "nombre-campo");
        tituloInp.id = "nombre-campo";
        tituloInp.name = "nombre-campo";
        tituloInp.placeholder = "Titulo del Campo";
        tituloInp.value = nombre ?? "";

        tituloDiv.appendChild(tituloLab);
        tituloDiv.appendChild(tituloInp);

        const tipoDiv = document.createElement("DIV");
        const tipoLab = document.createElement("LABEL");
        const tipoinp = document.createElement("SELECT");
        tipoDiv.classList.add("campo");
        tipoLab.textContent = "Tipo de Campo: ";
        tipoLab.setAttribute("for", "tipo-campo");
        tipoinp.id = "tipo-campo";
        tipoinp.name = "tipo-campo";

        let opciones = "";

        TiposCampos.forEach(tipoCampo => {
            const {id, nombre} = tipoCampo;
            opciones += `<option value=${id} ${tipo.id == id ? "selected" : ""}>${nombre}</option>`;
        });

        tipoinp.innerHTML = `
        <option value="" selected disabled>-- Seleccione --</option>
        ${opciones}
    `;

        const contenidoOpciones = document.createElement("DIV");
        contenidoOpciones.id = "opciones-campo-modal";

        tipoinp.oninput = e => {
            this.validarTipoCampoExtra(e.target.parentElement.parentElement, e.target.value.trim(), campoObj);
        }

        setTimeout(() => {
            if (id) {
                this.crearCamposOpcionesCampoExtra(contenidoOpciones, parseInt(tipo.id), campoObj);
            }
        }, 0);

        tipoDiv.appendChild(tipoLab);
        tipoDiv.appendChild(tipoinp);

        const contenedorCampos = document.createElement("DIV");
        contenedorCampos.classList.add("contenedor-campos");

        campos.forEach(campoObj => {
            const { nombre, type, id } = campoObj;
            const contenedorCampo = document.createElement("DIV");

            const nombreP = document.createElement("H4");
            nombreP.textContent = nombre;

            contenedorCampo.appendChild(nombreP);

            const tipoCampo = document.createElement("P");

            tipoCampo.textContent = TiposCampos.filter(tipoCampo => tipoCampo.type === type)[0].nombre;

            contenedorCampo.appendChild(tipoCampo);

            const acciones = document.createElement("SPAN");
            acciones.classList.add("acciones");
            acciones.innerHTML = `
            <button type="button" class="boton-naranja" id="actualizar-campo">Modificar</button>
            <button type="button" class="boton-rojo" id="eliminar-campo">Eliminar</button>
        `;

            acciones.onclick = e => {
                if (e.target.id === "actualizar-campo") {
                    this.mostrarModalCamposExtras({ ...campoObj });
                }

                if (e.target.id === "eliminar-campo") {
                    this.mostrarEliminarCampoExtra(id);
                }
            }

            contenedorCampo.appendChild(acciones);

            contenedorCampos.appendChild(contenedorCampo);
        });

        formulario.appendChild(tituloDiv);
        formulario.appendChild(tipoDiv);
        formulario.appendChild(contenidoOpciones);

        contenido.appendChild(heading);
        contenido.appendChild(formulario);
        contenido.appendChild(contenedorCampos);

        UI.crearModal(contenido);
    }

    crearMinioMaximoCampoExtra(checked, minimoMaximoDiv, atributos = {}) {
        limpiarHtml(minimoMaximoDiv);

        if (checked) {
            const minimoDiv = document.createElement("DIV");
            const minimoLab = document.createElement("LABEL");
            const minimoInp = document.createElement("INPUT");
            minimoDiv.classList.add("campo");
            minimoLab.textContent = "Minimo: ";
            minimoLab.setAttribute("for", "minimo-campo");
            minimoInp.name = "minimo-campo";
            minimoInp.id = "minimo-campo";
            minimoInp.type = "number";
            minimoInp.placeholder = "Numero Minimo";
            minimoInp.step = "any";
            minimoInp.value = atributos.minimo ?? "";

            const maximoDiv = document.createElement("DIV");
            const maximoLab = document.createElement("LABEL");
            const maximoInp = document.createElement("INPUT");
            maximoDiv.classList.add("campo");
            maximoLab.setAttribute("for", "maximo-campo");
            maximoLab.textContent = "Maximo: ";
            maximoInp.name = "maximo-campo";
            maximoInp.id = "maximo-campo";
            maximoInp.type = "number";
            maximoInp.placeholder = "Numero Maximo";
            maximoInp.step = "any";
            maximoInp.value = atributos.maximo ?? "";

            minimoDiv.appendChild(minimoLab);
            minimoDiv.appendChild(minimoInp);
            maximoDiv.appendChild(maximoLab);
            maximoDiv.appendChild(maximoInp);

            minimoMaximoDiv.appendChild(minimoDiv);
            minimoMaximoDiv.appendChild(maximoDiv);
        }
    }

    crearOpcionesCampoExtra(contenedorOpciones, num, opciones = []) {
        for (let i = 1; i <= num; i++) {
            let valor = "";
            let opcion = "";
            if (opciones.length > 0) {
                valor = opciones[i - 1].valor;
                opcion = opciones[i - 1].opcion;
            }
            const opcionDiv = document.createElement("DIV");
            const opcionLab = document.createElement("LABEL");
            const opcionInp = document.createElement("INPUT");
            opcionDiv.classList.add("campo");
            opcionLab.setAttribute("for", `opcion-${i}-campo`);
            opcionLab.textContent = `Opcion ${i}: `;
            opcionInp.type = "text";
            opcionInp.name = `opcion-${i}-campo`;
            opcionInp.id = `opcion-${i}-campo`;
            opcionInp.classList.add("opcion-input-campo")
            opcionInp.placeholder = "Nueva Opcion";
            opcionInp.value = opcion;

            opcionDiv.appendChild(opcionLab);
            opcionDiv.appendChild(opcionInp);

            const valorDiv = document.createElement("DIV");
            const valorLab = document.createElement("LABEL");
            const valorInp = document.createElement("INPUT");
            valorDiv.classList.add("campo");
            valorLab.setAttribute("for", `valor-${i}-campo`);
            valorLab.textContent = "Valor: ";
            valorInp.name = `valor-${i}-campo`;
            valorInp.id = `valor-${i}-campo`;
            valorInp.placeholder = "Valor de la Opcion";
            valorInp.classList.add("valor-input-campo");
            valorInp.type = "text";
            valorInp.value = valor;

            valorDiv.appendChild(valorLab);
            valorDiv.appendChild(valorInp);

            contenedorOpciones.appendChild(opcionDiv)
            contenedorOpciones.appendChild(valorDiv);
        }
    }

    crearCamposOpcionesCampoExtra(contenidoOpciones, num, campoObj = {}) {
        const { id } = campoObj;

        if (num === 1 || num === 2) {
            const placeholderDiv = document.createElement("DIV");
            const placeholderLab = document.createElement("LABEL");
            const placeholderInp = document.createElement("INPUT");
            placeholderDiv.classList.add("campo");
            placeholderLab.textContent = "Texto Guia: ";
            placeholderLab.setAttribute("for", "placeholder");
            placeholderInp.placeholder = "Texto Guia del Campo";
            placeholderInp.id = "placeholder"
            placeholderInp.name = "placeholder"
            placeholderInp.type = "text";
            placeholderInp.value = id && campoObj.atributos && campoObj.atributos.placeholder ? campoObj.atributos.placeholder : "";

            placeholderDiv.appendChild(placeholderLab);
            placeholderDiv.appendChild(placeholderInp);

            contenidoOpciones.appendChild(placeholderDiv);
        }

        if (num === 2) {
            const opcionesDiv = document.createElement("DIV");
            opcionesDiv.classList.add("campo");

            const enterosLab = document.createElement("LABEL");
            const enterosInp = document.createElement("INPUT");
            enterosLab.setAttribute("for", "entero-campo");
            enterosLab.textContent = "Numeros Enteros: ";
            enterosInp.id = "entero-campo";
            enterosInp.name = "entero-campo";
            enterosInp.type = "checkbox";
            enterosInp.checked = id && campoObj.atributos && campoObj.atributos.entero ? campoObj.atributos.entero : false;

            opcionesDiv.appendChild(enterosLab);
            opcionesDiv.appendChild(enterosInp);

            const minimoMaximoLab = document.createElement("LABEL");
            const minimoMaximoinp = document.createElement("INPUT");
            minimoMaximoLab.setAttribute("for", "minimo-maximo-campo");
            minimoMaximoLab.textContent = "Insertar Limite: ";
            minimoMaximoinp.id = "minimo-maximo-campo";
            minimoMaximoinp.name = "minimo-maximo-campo";
            minimoMaximoinp.type = "checkbox";
            minimoMaximoinp.checked = id && campoObj.atributos && campoObj.atributos.minimo && campoObj.atributos.maximo ? true : false;

            opcionesDiv.appendChild(minimoMaximoLab);
            opcionesDiv.appendChild(minimoMaximoinp);

            contenidoOpciones.appendChild(opcionesDiv);

            const minimoMaximoDiv = document.createElement("DIV");
            minimoMaximoDiv.classList.add("campo-minimo-maximo");

            minimoMaximoinp.oninput = e => {
                this.crearMinioMMaximoCampoExtra(e.target.checked, minimoMaximoDiv);
            }

            setTimeout(() => {
                if (id && minimoMaximoinp.checked) {
                    this.crearMinioMaximoCampoExtra(minimoMaximoinp.checked, minimoMaximoDiv, campoObj.atributos);
                }
            }, 0);

            contenidoOpciones.appendChild(minimoMaximoDiv);
        }

        if (num === 5 || num === 6) {
            const { opciones } = campoObj;
            const numOpcionesDiv = document.createElement("DIV");
            const numOpcionesLab = document.createElement("LABEL");
            const numOpcionesInp = document.createElement("INPUT");
            numOpcionesDiv.classList.add("campo");
            numOpcionesLab.textContent = "Numero de Opciones";
            numOpcionesLab.setAttribute("for", "num-opciones-campo");
            numOpcionesInp.placeholder = "Numero de Opciones";
            numOpcionesInp.type = "number";
            numOpcionesInp.min = "1";
            numOpcionesInp.max = "15";
            numOpcionesInp.name = "num-opciones-campo";
            numOpcionesInp.id = "num-opciones-campo";
            numOpcionesInp.value = id && opciones ? opciones.length : "";

            numOpcionesDiv.appendChild(numOpcionesLab);
            numOpcionesDiv.appendChild(numOpcionesInp);

            const contenedorOpciones = document.createElement("DIV");
            contenedorOpciones.classList.add("contenedor-opciones-campo");

            numOpcionesInp.oninput = e => {
                limpiarHtml(contenedorOpciones);

                if (e.target.value === "" || isNaN(e.target.value) || e.target.value < 1 || e.target.value > 15) {
                    UI.mostrarAlerta("Numero Invalido", e.target.parentElement);
                    return;
                }

                const alertaPrevia = e.target.parentElement.querySelector(".alerta");

                if (alertaPrevia) {
                    alertaPrevia.remove();
                }

                this.crearOpcionesCampoExtra(contenedorOpciones, e.target.value);
            }

            setTimeout(() => {
                if (id) {
                    this.crearOpcionesCampoExtra(contenedorOpciones, numOpcionesInp.value, opciones);
                }
            }, 0);

            contenidoOpciones.appendChild(numOpcionesDiv);
            contenidoOpciones.appendChild(contenedorOpciones);
        }


        const btnCrearCampo = document.createElement("BUTTON");
        btnCrearCampo.type = "submit";
        btnCrearCampo.classList.add(id ? "boton-azul" : "boton-verde");
        btnCrearCampo.textContent = id ? "Guardar Cambios" : "Crear Campo";
        contenidoOpciones.appendChild(btnCrearCampo);

        if(id) {
            const btnCancelar = document.createElement("BUTTON");
            btnCancelar.textContent = "Cancelar";
            btnCancelar.classList.add("boton-naranja");

            contenidoOpciones.appendChild(btnCancelar);

            btnCancelar.onclick = () => {
                this.mostrarModalCamposExtras();
            }
        }

        contenidoOpciones.parentElement.onsubmit = e => {
            e.preventDefault();
            this.validarCampoExtra(e.target, num, id);
        }
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
                test.eliminarOpcion(id);
                this.mostrarModalOpciones();
                cambiarPagina(2);
                this.validarMaximoInstrucciones();

                Swal.fire({
                    title: "Exito",
                    text: "La Opcion Ha Sido Eliminada",
                    icon: "success"
                });
            }
        });
    }
}