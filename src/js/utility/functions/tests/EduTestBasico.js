import EduTest from "./EduTest.js";
import { test } from "./funcionesTestEdu.js";

export default class EduTestBasico extends EduTest {
    mostrarFormulario(formulario) {
        const {preguntas, opciones} = test;
        
        const contenedorTest = document.createElement("DIV");
        contenedorTest.classList.add("contenedor-test");

        preguntas.forEach(preguntaObj => {
            const contenedorCampo = document.createElement("DIV");
            contenedorCampo.classList.add("campo-radio");
            
            const {pregunta, id: preguntaId} = preguntaObj;
            
            const preguntaLab = document.createElement("P");
            preguntaLab.textContent = pregunta;
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
                valor: {}
            }
            
            opciones.forEach((opcionObj, i) => {
                const {id: opcionId, opcion, valor} = opcionObj;
                
                const opcionDiv = document.createElement("DIV");
                opcionDiv.classList.add("radio");

                const opcionLab = document.createElement("LABEL");
                const opcionInp = document.createElement("INPUT");
                opcionLab.textContent = `${i+1}. ${opcion}`;
                opcionLab.setAttribute("for", `${preguntaId}_${opcionId}`);
                opcionInp.type = "radio";
                opcionInp.id = `${preguntaId}_${opcionId}`;
                opcionInp.name = preguntaId;

                opcionInp.oninput = e => {
                    this.sincronizarCampos(preguntaId, opcionId);
                }

                opcionDiv.appendChild(opcionInp);
                opcionDiv.appendChild(opcionLab);
 
                contenedorOpciones.appendChild(opcionDiv);

                const opcionObjMemoria = {
                    id: opcionId,
                    opcion,
                    valor,
                }

                campoObj.opciones = [...campoObj.opciones, opcionObjMemoria];
            });

            contenedorCampo.appendChild(contenedorOpciones);
            contenedorTest.appendChild(contenedorCampo);

            this.campos = [...this.campos, campoObj]
        });

        formulario.appendChild(contenedorTest);
    }
} 