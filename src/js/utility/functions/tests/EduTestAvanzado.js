import EduTest from "./EduTest.js";
import { test, visita } from "./funcionesTestEdu.js";

export default class EduTestAvanzado extends EduTest {
    mostrarFormulario(formulario) {
        const {opciones, preguntas} = test;

        const contenedorTest = document.createElement("DIV");
        contenedorTest.classList.add("contenedor-test");

        preguntas.forEach((preguntaObj, i) => {
            const contenedorCampo = document.createElement("DIV");
            contenedorCampo.classList.add("campo-radio");

            const {pregunta, id: preguntaId} = preguntaObj;
            const [opcionesCampoObj] = opciones.filter(opcionObj => opcionObj.id === preguntaId);
            const {opciones: opcionesCampo, multiple} = opcionesCampoObj;

            const preguntaLab = document.createElement("P");
            preguntaLab.textContent = `${i+1}. ${pregunta}`;
            preguntaLab.dataset.for = preguntaId;

            contenedorCampo.appendChild(preguntaLab);

            const contenedorOpciones = document.createElement("DIV");
            contenedorOpciones.classList.add("opciones-test");
            contenedorOpciones.dataset.name = preguntaId;

            const campoObj = {
                id: Math.round(Math.random() * Date.now()),
                name: preguntaId,
                pregunta,
                opciones: [],
                multiple,
                valor: multiple ? [] : {}
            }

            opcionesCampo.forEach((opcionObj, i) => {
                const {id: opcionId, opcion, valor} = opcionObj;

                const opcionDiv = document.createElement("DIV");
                opcionDiv.classList.add("radio");

                const opcionLab = document.createElement("LABEL");
                const opcionInp = document.createElement("INPUT");
                opcionLab.textContent = `${i+1}. ${opcion}`;
                opcionLab.setAttribute("for", opcionId);
                opcionInp.type = multiple ? "checkbox" : "radio";
                opcionInp.id = opcionId;
                opcionInp.name = preguntaId;

                opcionInp.oninput = e => {
                    this.sincronizarCampos(preguntaId, opcionId, e.target.checked);
                }

                opcionDiv.appendChild(opcionInp);
                opcionDiv.appendChild(opcionLab);

                contenedorOpciones.appendChild(opcionDiv);

                const opcionObjMemoria = {
                    id: opcionId,
                    opcion,
                    valor,
                    checked: false
                }

                campoObj.opciones = [...campoObj.opciones, opcionObjMemoria];
            });

            contenedorCampo.appendChild(contenedorOpciones);
            contenedorTest.appendChild(contenedorCampo);

            visita.agregarCampo(campoObj);
        });

        formulario.appendChild(contenedorTest);
    }
} 