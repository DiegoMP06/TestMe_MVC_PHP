import UI from "../../../layout/UI.js";
import TiposCampos from "../../db/TiposCampos.js";
import { crearVisita, test } from "./funcionesTestEdu.js";

export default class EduTest {
    constructor() {
        this.camposExtra = [];
        this.campos = [];
        this.puntuacion = 0;
        this.total = 0;
    }

    modificarCampo(campoObj) {
        this.campos = this.campos.map(campo => parseInt(campoObj.id) === parseInt(campo.id) ? campoObj : campo);
    }

    modificarCampoExtra(campoExtraObj) {
        this.camposExtra = this.camposExtra.map(campo => parseInt(campoExtraObj.id) === parseInt(campo.id) ? campoExtraObj : campo);
    }
    
    mostrarCamposExtra(formulario) {
        console.log(test.instrucciones)
        const {campos} = test;
        const contenedorCampos = document.createElement("DIV");
        contenedorCampos.classList.add("contenedor-campos");

        campos.forEach(campo => {
            const {id, type, nombre} = campo;
            const tipoCampo = TiposCampos.filter(tipoCampo => tipoCampo.type === type)[0];
            const campoDiv = document.createElement("DIV");
            campoDiv.classList.add("campo");

            const campoExtraObj = {
                id: Math.round(Math.random() * Date.now()),
                name: id,
                type,
                pregunta: nombre,
                valor: ""
            }

            if(tipoCampo.id === 1 || tipoCampo.id === 2) {
                const {atributos: {placeholder}, atributos} = campo;
                const campoLab = document.createElement("LABEL");
                campoLab.textContent = nombre;
                campoLab.setAttribute("for", id);

                const campoInp = document.createElement("INPUT");
                campoInp.placeholder = placeholder;
                campoInp.name = id;
                campoInp.id = id;
                campoInp.type = type;

                campoInp.oninput = e => {
                    this.validarCampoExtra(e.target.parentElement, e.target.value.trim(), id);
                }
                
                if(tipoCampo.id === 2) {
                    const {entero, maximo, minimo} = atributos;

                    campoExtraObj.entero = entero;

                    if(entero) {
                        campoInp.step = 1;
                    } else {
                        campoInp.step = "any";
                    }

                    if(maximo == 0 || maximo) {
                        campoInp.max = maximo;
                        campoExtraObj.maximo = maximo;
                    }

                    if(maximo == 0 || minimo) {
                        campoInp.min = minimo;
                        campoExtraObj.minimo = minimo;
                    }
                }

                campoDiv.appendChild(campoLab);
                campoDiv.appendChild(campoInp);
            }

            if(tipoCampo.id === 3 || tipoCampo.id === 4) {
                const campoLab = document.createElement("LABEL");
                campoLab.textContent = nombre;
                campoLab.setAttribute("for", id);

                const campoInp = document.createElement("INPUT");
                campoInp.name = id;
                campoInp.id = id;
                campoInp.type = type;

                campoInp.oninput = e => {
                    this.validarCampoExtra(e.target.parentElement, e.target.value.trim(), id);
                }

                campoDiv.appendChild(campoLab);
                campoDiv.appendChild(campoInp);
            }

            if(tipoCampo.id === 5 || tipoCampo.id === 6) {
                campoDiv.className = "campo-radio";
                const {opciones} = campo;
                campoExtraObj.opciones = [];

                const campoLab = document.createElement("P");
                campoLab.textContent = nombre;
                campoLab.dataset.for = id;

                const opcionesDiv = document.createElement("DIV");
                opcionesDiv.classList.add("campo-multiple", "opciones-test");
                opcionesDiv.dataset.id = id;

                opciones.forEach(opcion => {
                    const {id: idOpcion, opcion: nombreOpcion, valor} = opcion;
                    const opcionDiv = document.createElement("DIV");
                    opcionDiv.classList.add("radio");

                    const opcionLab = document.createElement("LABEL");
                    const opcionInp = document.createElement("INPUT");

                    opcionLab.textContent = nombreOpcion;
                    opcionLab.setAttribute("for", idOpcion);
                    opcionInp.name = id;
                    opcionInp.id = idOpcion;
                    opcionInp.type = type;

                    opcionInp.oninput = e => {
                        this.validarCampoExtra(e.target.parentElement.parentElement.parentElement, valor, id, idOpcion, e.target.checked);
                    }

                    opcionDiv.appendChild(opcionInp);
                    opcionDiv.appendChild(opcionLab);
                    opcionesDiv.appendChild(opcionDiv);

                    const opcionObj = {
                        id: idOpcion,
                        opcion: nombreOpcion,
                        valor,
                    }

                    if(tipoCampo.id === 5) {
                        opcionObj.checked = false;
                    }

                    campoExtraObj.opciones = [...campoExtraObj.opciones, opcionObj];
                });
                
                campoDiv.appendChild(campoLab);
                campoDiv.appendChild(opcionesDiv);

                if(tipoCampo.id === 5) {   
                    campoExtraObj.valor = [];
                }
            }

            contenedorCampos.appendChild(campoDiv);

            this.camposExtra = [...this.camposExtra, campoExtraObj];
        });

        formulario.appendChild(contenedorCampos);
    }

    validarCampoExtra(campoDiv, valor, name, opcionId, checked) {
        const {camposExtra} = this;
        const [campo] = camposExtra.filter(campoExtra => parseInt(campoExtra.name) === parseInt(name));

        if(valor === "") {
            UI.mostrarAlerta("El Campo es Obligatorio", campoDiv, false);
            return;
        }

        if(campo.type === "number") {
            const {entero, minimo, maximo} = campo;

            if(entero && !Number.isInteger(Number(valor))) {
                UI.mostrarAlerta("El Valor Es Invalido", campoDiv, false);
                return;
            }

            if(minimo && maximo && (Number(valor) < minimo || Number(valor) > maximo)) {
                UI.mostrarAlerta("Numero Invalido", campoDiv, false);
                return;
            }
        }

        if(campo.type === "date" && isNaN(Date.parse(valor))) {
            UI.mostrarAlerta("Fecha Invalida", campoDiv, false);
            return;
        }

        const alertaPrevia = campoDiv.querySelector(".alerta");

        if(alertaPrevia) {
            alertaPrevia.remove();
        }

        this.obtenerDatosCampoExtra(valor, {...campo}, opcionId, checked);
    }

    obtenerDatosCampoExtra(valor, campoObj, opcionId, checked) {
        const {type} = campoObj;

        if(type !== "checkbox") {
            campoObj.valor = valor;

            this.modificarCampoExtra(campoObj);
            return;
        }

        const [opcionObj] = campoObj.opciones.filter(opcion => parseInt(opcion.id) === parseInt(opcionId));
        opcionObj.checked = checked;
        campoObj.opciones = campoObj.opciones.map(opcion => parseInt(opcion.id) === opcionId ? opcionObj : opcion);

        const {opciones} = campoObj;
        const opcionesSeleccionadas = opciones.filter(opcion => opcion.checked);
        campoObj.valor = opcionesSeleccionadas.map(opcion => opcion.valor);

        this.modificarCampoExtra(campoObj);
    }

    sincronizarCampos(name, opcionid, checked) {
        const [{...campoObj}] = this.campos.filter(campo => parseInt(name) === parseInt(campo.name));
        const {multiple} = campoObj;
        const [opcionSeleccionada] = campoObj.opciones.filter(opcion => parseInt(opcionid) === opcion.id);

        if(!multiple) {
            campoObj.valor = opcionSeleccionada;
            this.modificarCampo(campoObj);
            
            return;
        }

        opcionSeleccionada.checked = checked;
        campoObj.opciones = campoObj.opciones.map(opcion => parseInt(opcion.id) === parseInt(opcionid) ? opcionSeleccionada : opcion);
        const opcionesSeleccionadas = campoObj.opciones.filter(opcion => opcion.checked);
        campoObj.valor = opcionesSeleccionadas;

        this.modificarCampo(campoObj);
    }

    validarFormulario(formulario) {
        const camposExtraVacios = this.camposExtra.filter(campo => campo.valor === "" || campo.valor.length === 0);
        const camposVacios = this.campos.filter(campo => (!campo.multiple && !campo.valor.id) || (campo.multiple && campo.valor.length === 0));

        if(camposVacios.length > 0 || camposExtraVacios.length > 0) {
            UI.mostrarAlerta("Todos Los Campos Son Obligatorios", formulario);
            this.mostrarAlertasCampos([...camposExtraVacios, ...camposVacios], formulario);
            return;
        }

        const camposBasicos = this.campos.filter(campo => !campo.multiple);
        const camposMultiples = this.campos.filter(campo => campo.multiple);

        const sumaBasicos = camposBasicos.reduce((total, campo) => total + parseInt(campo.valor.valor), 0);

        const sumaMultiples = camposMultiples.reduce((total, {valor}) => total + valor.reduce((total, {valor}) => total + parseInt(valor), 0), 0);

        this.puntuacion = sumaBasicos + sumaMultiples;
        this.total = test.calcularMinimoYMaximo().maximo;

        crearVisita();
    }

    mostrarAlertasCampos(campos, formulario) {
        campos.forEach(campo => {
            const {opciones, name} = campo;
            if(opciones) {
                const contenedorCampo = formulario.querySelector(`p[data-for='${name}']`).parentElement;
                UI.mostrarAlerta("El Campo es Obligatorio", contenedorCampo);
                return;
            }

            const contenedorCampo = formulario.querySelector(`label[for="${name}"]`).parentElement;
            UI.mostrarAlerta("El Campo es Obligatorio", contenedorCampo);
        });
    }

    mostrarInformacionTest(formulario) {
        const contenedorPrincipal = formulario.parentElement;
        formulario.remove();
        const {instrucciones} = test;
        const {puntuacion} = this;

        const [instruccion] = instrucciones.filter(({minimo, maximo}) => parseInt(puntuacion) >= parseInt(minimo) && parseInt(puntuacion) <= parseInt(maximo));
        const {titulo, instruccion: contenidoInstruccion} = instruccion;

        const contenedorDatos = document.createElement("DIV");
        contenedorDatos.classList.add("contenedor-test-edu");

        const contenedorInstruccion = document.createElement("DIV");
        contenedorInstruccion.classList.add("contenedor-instruccion");
        const heading = document.createElement("H3");
        heading.textContent = titulo;
        const instruccionBlock = UI.formatearDescripcion(contenidoInstruccion);

        contenedorInstruccion.appendChild(heading);
        contenedorInstruccion.appendChild(instruccionBlock);
        
        const contenedorAcciones = document.createElement("DIV");
        contenedorAcciones.classList.add("acciones");
        const btnVerPDF = document.createElement("A");
        btnVerPDF.classList.add("boton-verde");
        btnVerPDF.textContent = "Ver Reporte";
        btnVerPDF.href = `/pdf/visita?id=${this.id}`;

        const btnDescargarPDF = document.createElement("A");
        btnDescargarPDF.classList.add("boton-azul");
        btnDescargarPDF.textContent = "Descargar Reporte";
        btnDescargarPDF.href = `/pdf/visita?id=${this.id}`;
        btnDescargarPDF.download = test.nombre.replaceAll(" ", "_").replaceAll(".", "_");

        contenedorAcciones.appendChild(btnVerPDF);
        contenedorAcciones.appendChild(btnDescargarPDF);

        contenedorDatos.appendChild(contenedorInstruccion);
        contenedorDatos.appendChild(contenedorAcciones)

        contenedorPrincipal.appendChild(contenedorDatos);
    }
} 