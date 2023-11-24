import { limpiarHtml } from "../utility/utilidades.js";
import UI from "../layout/UI.js";

(function() {
    const formulario = document.querySelector("#formulario-test");
    const asideVisible = document.querySelector("#aside-visible");

    let categorias = [];
    let tiposTests = [];
    const test = {
        nombre: "",
        descripcion: "",
        instrucciones: "",
        opciones: [],
        preguntas: [],
        numOpciones: "",
        numPreguntas: "",
        categoriaId: "",
        tipoTestId: "",
        usuarioId: ""
    };

    let pagina = 1;

    obtenerDatos();
    async function obtenerDatos() {
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

            if(resultadoCategorias.tipo === "exito" && resultadoTiposTests.tipo === "exito") {
                categorias = resultadoCategorias.categorias;
                tiposTests = resultadoTiposTests.tiposTests;

                mostrarFormulario();
                mostrarOpcionesAside();
            }
        } catch (error) {
            console.log(error)
        }
    }

    function mostrarOpcionesAside() {
        const opciones = document.createElement("DIV");
        opciones.classList.add("opciones");

        const btnPreguntas = document.createElement("BUTTON");
        btnPreguntas.textContent = "Mostrar Preguntas";
        btnPreguntas.classList.add("boton-gris-block");

        btnPreguntas.onclick = () => {
            mostrarModalPreguntas();
        }

        const btnOpciones = document.createElement("BUTTON");
        btnOpciones.textContent = "Mostrar Opciones";
        btnOpciones.classList.add("boton-gris-block");

        btnOpciones.onclick = () => {
            mostrarModalOpciones();
        }

        opciones.appendChild(btnPreguntas)
        opciones.appendChild(btnOpciones)

        asideVisible.appendChild(opciones);
    }

    function mostrarFormulario() {
        limpiarHtml(formulario);

        switch(pagina) {
            case 1:
                formulario1();
                break;
            case 2:
                formulario2();
                break;
            case 3:
                break;
            default:
                console.error("Hubo UN error");
        }
    }

    function mostrarModalPreguntas() {
       const contenido = document.createElement("DIV");

       const {preguntas} = test;

       const heading = document.createElement("H2");
       heading.textContent = "Preguntas: ";

       const contenedorPreguntas = document.createElement("DIV");
       contenedorPreguntas.classList.add("seccion", "contenedor-preguntas");

        if(preguntas.length === 0) {
            const parrafo = document.createElement("P");
            parrafo.textContent = "No Hay Preguntas";

            contenedorPreguntas.appendChild(parrafo);
        } else {
            preguntas.forEach(({pregunta}, i) => {
                const li = document.createElement("LI");
                const parrafo = document.createElement("SPAN");
                const preguntaP = document.createElement("SPAN");
                parrafo.textContent = `Pregunta ${i+1}: `;
                preguntaP.textContent = pregunta;

                li.appendChild(parrafo);
                li.appendChild(preguntaP);

                contenedorPreguntas.appendChild(li);
            });
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorPreguntas);
        UI.crearModal(contenido);
    }

    function mostrarModalOpciones() {
        const contenido = document.createElement("DIV");
        const {opciones, tipoTestId} = test;

        const heading = document.createElement("H2");
        heading.textContent = "Opciones: ";

        const contenedorOpciones = document.createElement("DIV");
        contenedorOpciones.classList.add("seccion", "contenedor-opciones");

        if(opciones.length === 0) {
            const parrafo = document.createElement("P");
            parrafo.textContent = "No Hay Opciones";
            contenedorOpciones.appendChild(parrafo);
        } else {
            switch(parseInt(tipoTestId)) {
                case 1:
                    opciones.forEach(({opcion, valor}, i) => {
                        const li = document.createElement("LI");
                        const parrafo = document.createElement("SPAN");
                        const opcionP = document.createElement("SPAN");
                        const valorP = document.createElement("P");
                        parrafo.textContent = `Opcion ${i+1}: `;
                        opcionP.textContent = opcion;
                        valorP.textContent = `Valor: ${valor}`;

                        li.appendChild(parrafo);
                        li.appendChild(opcionP);
                        li.appendChild(valorP);

                        contenedorOpciones.appendChild(li);
                    });
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    console.error("Hubo Un Problema");
            }
        }

        contenido.appendChild(heading);
        contenido.appendChild(contenedorOpciones);
        UI.crearModal(contenido);
    }

    function formulario1() {
        const {nombre, descripcion, categoriaId, tipoTestId} = test;

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
            const {id, nombre} = categoria;

            const option = document.createElement("OPTION");
            
            option.value = id;
            option.textContent = nombre;
            
            if(parseInt(categoria.id) === parseInt(categoriaId)) {
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
        
        const seleccioneTipoTest = document.createElement("OPTION");
        seleccioneTipoTest.value = "";
        seleccioneTipoTest.textContent = "-- Seleccione --";
        seleccioneTipoTest.selected = true;
        seleccioneTipoTest.disabled = true;

        tipoTestInp.appendChild(seleccioneTipoTest);

        tiposTests.forEach(tipoTest => {
            const {id, nombre} = tipoTest;

            const option = document.createElement("OPTION");
            option.value = id;
            option.textContent = nombre;
            
            if(parseInt(tipoTest.id) === parseInt(tipoTestId)) {
                option.selected = true;
            }

            tipoTestInp.appendChild(option);
        });

        campoTipoTest.appendChild(tipoTestLab);
        campoTipoTest.appendChild(tipoTestInp);
        
        const btnSiguiente = document.createElement("BUTTON");
        btnSiguiente.classList.add("boton-azul");
        btnSiguiente.type = "button";
        btnSiguiente.textContent = "Siguiente";

        btnSiguiente.onclick = e => {
            validarFormulario(e.target.parentElement);
        }

        formulario.appendChild(campoNombre);
        formulario.appendChild(campoDescripcion);
        formulario.appendChild(campoCategoria);
        formulario.appendChild(campoTipoTest);
        formulario.appendChild(btnSiguiente);
    }

    function formulario2() {
        const campoPregunta = document.createElement("DIV");
        const preguntaDiv = document.createElement("DIV");
        const preguntaLab = document.createElement("LABEL");
        const preguntaInp = document.createElement("INPUT");
        campoPregunta.classList.add("campo-pregunta", "seccion");
        preguntaDiv.classList.add("campo")
        preguntaLab.textContent = "Pregunta: ";
        preguntaLab.setAttribute("for", "pregunta");
        preguntaInp.placeholder = "Nueva Pregunta";
        preguntaInp.id = "pregunta";
        preguntaInp.name = "pregunta";

        preguntaDiv.appendChild(preguntaLab);
        preguntaDiv.appendChild(preguntaInp);

        campoPregunta.appendChild(preguntaDiv);

        const {tipoTestId} = test;

        switch(parseInt(tipoTestId)) {
            case 1: 
                const btnNuevaPregunta = document.createElement("BUTTON");
                btnNuevaPregunta.type = "button";
                btnNuevaPregunta.textContent = "Agregar Pregunta";
                btnNuevaPregunta.classList.add("boton-verde");

                btnNuevaPregunta.onclick = e => {
                    validarPregunta(e.target.parentElement);
                }

                campoPregunta.appendChild(btnNuevaPregunta);

                const campoOpcion = document.createElement("DIV");
                const opcionDiv = document.createElement("DIV");
                const opcionLab = document.createElement("LABEL");
                const opcionInp = document.createElement("INPUT");
                campoOpcion.classList.add("campo-opcion", "seccion");
                opcionDiv.classList.add("campo");
                opcionLab.setAttribute("for", "opcion");
                opcionLab.textContent = "Opcion: ";
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
                    validarOpcion(e.target.parentElement);
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
                break;
            case 2:
                formulario.appendChild(campoPregunta);
                break;
            case 3:
                formulario.appendChild(campoPregunta);
                break;
            default:
                console.error("Hubo Un Error")
        }

        const btnAnterior = document.createElement("BUTTON");
        btnAnterior.classList.add("boton-azul");
        btnAnterior.type = "button";
        btnAnterior.textContent = "Anterior";

        btnAnterior.onclick = e => {
            pagina--;
            mostrarFormulario();
        }

        const btnSiguiente = document.createElement("BUTTON");
        btnSiguiente.classList.add("boton-azul");
        btnSiguiente.type = "button";
        btnSiguiente.textContent = "Siguiente";

        btnSiguiente.onclick = e => {
            validarFormulario(e.target.parentElement);
        }

        formulario.appendChild(btnAnterior);
        formulario.appendChild(btnSiguiente);
    }

    function validarPregunta(formulario) {
        const input = formulario.querySelector(".campo #pregunta");
        const pregunta = input.value.trim();

        if(pregunta === "") {
            UI.mostrarAlerta("La Pregunta es Obligatoria", formulario);
            return;
        }

        const preguntaObj = {
            id: Date.now(),
            pregunta
        }

        test.preguntas = [...test.preguntas, preguntaObj];
        input.value = "";
        UI.mostrarAlerta("La Pregunta se Agrego Corretamente", formulario, "exito");
    }

    function validarOpcion(formulario) {
        const {tipoTestId} = test;
        const opcionInp = formulario.querySelector(".campo #opcion");
        const opcion = opcionInp.value.trim();
        const valorInp = formulario.querySelector(".campo #valor");
        const valor = valorInp.value.trim();

        switch(parseInt(tipoTestId)) {
            case 1:
                if(opcion === "" || valor === "") {
                    UI.mostrarAlerta("Todos los Campos Son Obligatorios", formulario);
                    return;
                }

                if(isNaN(valor) || valor < 1 || valor > 10) {
                    UI.mostrarAlerta("Valor Invalido", formulario);
                    return;
                }

                const opcionObj = {
                    id: Date.now(),
                    opcion,
                    valor
                }

                test.opciones = [...test.opciones, opcionObj];
                opcionInp.value = "";
                valorInp.value = "";
                UI.mostrarAlerta("La Opcion se Agrego Correctamente", formulario, "exito");
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.error("Hubo un Error")
        }

        console.log(test);
    }

    function validarFormulario(formulario) {
        const testObj = {};
        const inputs = document.querySelectorAll(".campo .input");

        inputs.forEach(input => testObj[input.name] = input.value.trim());

        switch(pagina) {
            case 1:
                const {nombre, descripcion, categoriaId, tipoTestId} = testObj;

                if(nombre === "" || descripcion === "" || categoriaId === "" || tipoTestId === "") {
                    UI.mostrarAlerta("Todos los campos son Obligatorios", formulario);
                    return;
                }

                const categoria = categorias.filter(categoria => parseInt(categoria.id) === parseInt(categoriaId));
                const tipoTest = tiposTests.filter(tipoTest => parseInt(tipoTest.id) === parseInt(tipoTestId));

                if(categoria.length === 0 || tipoTest.length === 0) {
                    UI.mostrarAlerta("Datos Invalidos", formulario);
                    return;
                }

                Object.entries(testObj).forEach(([campo, valor]) => {
                    if(test.hasOwnProperty(campo)) {
                        test[campo] = valor;
                    }
                });

                pagina++;
                mostrarFormulario();
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.error("Hubo UN error");
        }
    }
})();