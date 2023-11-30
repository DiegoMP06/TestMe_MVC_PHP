import Test from "./Test.js";
import UI from "../../../layout/UI.js";

export default class TestMedio extends Test {
    constructor(test = {}) {
        super(test);
    }

    calcularNumOpciones() {
        return this.opciones.reduce((total, opcionObj) => total + opcionObj.opciones.length, 0);
    }

    eliminarPregunta(id) {
        this.preguntas = this.preguntas.filter(pregunta => parseInt(pregunta.id) !== parseInt(id));
        this.opciones = this.opciones.filter(opcion => parseInt(opcion.id) !== parseInt(id));
    }

    eliminarOpcion(id) {
        this.eliminarPregunta(id);
    }

    calcularMinimoYMaximo() {
        const valores = this.opciones.map(({opciones}) => opciones.map(opcion => parseInt(opcion.valor)));

        const mayores = valores.map(valorArray => Math.max(...valorArray));
        const maximo = mayores.reduce((total, mayor) => total + mayor, 0);

        if(this.instrucciones.length === 0) {
            const menores = valores.map(valorArray => Math.min(...valorArray));
            
            const minimo = Math.min(...menores);

            return {
                maximo,
                minimo
            }
        }

        return {
            maximo
        }
    }

    mostrarModificarOpcion(opcionObj, pregunta, num) {
        const {id, opciones} = opcionObj;
        const contenido = document.createElement("DIV");

        const formulario = document.createElement("FORM");
        formulario.classList.add("formulario", "formulario-modal");

        const preguntaP = document.createElement("P");
        preguntaP.textContent = pregunta;
        preguntaP.classList.add("pregunta-opcion")
        formulario.appendChild(preguntaP);

        const btnCambiarNum = document.createElement("BUTTON");
        btnCambiarNum.type = "button";
        btnCambiarNum.textContent = "Cambiar Numero de opciones";
        btnCambiarNum.classList.add("boton-naranja");

        btnCambiarNum.onclick = e => {
            this.mostrarCambiarNumInp(opcionObj, pregunta)
        }

        if(num) {
            opcionObj = {
                id,
                opciones: []
            }
        }

        this.mostrarInputsOpciones(formulario, num ? num : opciones.length , opcionObj)

        formulario.appendChild(btnCambiarNum);
        contenido.appendChild(formulario);

        UI.crearModal(contenido);
    }

    mostrarCambiarNumInp(opcionObj, pregunta) {
        const {opciones} = opcionObj;
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
        const contenido = document.createElement("DIV");
        const { opciones, preguntas } = this;

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
                const {id, opciones} = opcionObj;
                const preguntaObj = preguntas.filter(pregunta => parseInt(pregunta.id) === parseInt(id));

                if(preguntaObj.length === 1) {
                    const [{pregunta}] = preguntaObj;
                    const contenedorOpcion = document.createElement("DIV");

                    const heading = document.createElement("H4");
                    heading.textContent = pregunta;

                    contenedorOpcion.appendChild(heading);

                    opciones.forEach(({opcion, valor}, i) => {
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

    formulario2(formulario) {
        const preguntaActual = this.preguntas.length + 1; 
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
        campoPregunta.appendChild(numOpcionesDiv);

        formulario.appendChild(campoPregunta);
    }

    mostrarInputsOpciones(formulario, num, opcionObj = {}) {
        const {id, opciones} = opcionObj;
        const campoOpcion = document.createElement("DIV");
        campoOpcion.classList.add("campo-opciones", "seccion");

        for(let i = 1; i <= num; i++) {
            let opcion, valor;
            if(opciones && opciones.length >= 1) {
                opcion = opciones[i-1].opcion;
                valor = opciones[i-1].valor;
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
        btnNuevoCampo.textContent =  id ? "Guardar Cambios" : "Agregar Campo";
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
        const numOpcionesInp = formulario.querySelector(".campo #num-opciones");
        const opcionesInp = formulario.querySelectorAll(idOpcion ? ".campo .opcion-input-modal" : ".campo .opcion-input");
        const valoresInp = formulario.querySelectorAll(idOpcion ? ".campo .valor-input-modal" : ".campo .valor-input");

        let opciones = [];
        let valores = [];

        opcionesInp.forEach(opcionInp => opciones = [...opciones, opcionInp.value.trim()]);
        valoresInp.forEach(valorInp => valores = [...valores, valorInp.value.trim()]);

        if(!idOpcion) {
            if(pregunta === "") {
                UI.mostrarAlerta("La Pregunta Es Obligatoria", formulario);
                return;
            }
    
            if(parseInt(num) !== opcionesInp.length || parseInt(num) !== valoresInp.length) {
                UI.mostrarAlerta("Las Opciones NO Coinciden Con El Valor Dado", formulario);
                return;
            }
        }

        const opcionesInvalidas = opciones.filter(opcion => opcion === "");
        const valoresInvalidos = valores.filter(valor => valor === "" || isNaN(valor) || valor > 10 || valor < 1);

        if(opcionesInvalidas.length !== 0 || valoresInvalidos.length !== 0) {
            UI.mostrarAlerta("Todos los campos Son Obligatorios o Invalidos", formulario);
            return;
        }
        
        const id = Date.now();
        
        const opcionesObj = {
            id,
            opciones: []
        }

        for(let i = 0; i < opciones.length; i++) {
            const opcion = opciones[i];
            const valor = valores[i];

            const opcionObj = {
                id: Date.now(),
                opcion,
                valor
            }

            opcionesObj.opciones = [...opcionesObj.opciones, opcionObj];
        }

        if(idOpcion) {
            opcionesObj.id = idOpcion;
            this.modificarOpcion(opcionesObj);
            this.mostrarModalOpciones();
            this.cambiarPagina(2);
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

        this.agregarPregunta(preguntaObj);
        this.agregarOpcion(opcionesObj);

        preguntaInp.previousElementSibling.textContent = `Pregunta del Campo ${this.preguntas.length+1}: `;
        preguntaInp.value = "";
        numOpcionesInp.value = "";

        opcionesInp[0].parentElement.parentElement.remove();
        formulario.parentElement.querySelector(".agregar-campo").remove();
    }

    validarNumOpciones(formulario, valor, opcionObj, pregunta) {
        if(!opcionObj) {
            const divPrevio = formulario.parentElement.querySelector(".campo-opciones");
            const btnPrevio = formulario.parentElement.querySelector(".agregar-campo");
    
            if(divPrevio) {
                divPrevio.remove();
            }
            if(btnPrevio) {
                btnPrevio.remove();
            }
        }

        if(valor === "") {
            UI.mostrarAlerta("El Numero Es Obligatorio", formulario);
            return;
        }

        if(isNaN(valor) || valor > 10 || valor < 2) {
            UI.mostrarAlerta("Solo Se Pueden Agregar de 2 a 10 Opciones", formulario);
            return;
        }

        if(opcionObj) {
            this.mostrarModificarOpcion(opcionObj, pregunta, valor);
            return;
        }

        const alertaPrevia = formulario.querySelector(`.alerta`);
        if(alertaPrevia) {
            alertaPrevia.remove();
        }
        this.mostrarInputsOpciones(formulario.parentElement, valor);
    }
}