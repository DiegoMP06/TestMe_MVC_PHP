import { obtenerUrl, limpiarHtml } from "../utility/utilidades.js";
import UI from "../layout/UI.js";

(function () {
    let salaObj;
    const contenedorSala = document.querySelector("#contenido-sala");

    obtenerSala();
    async function obtenerSala() {
        const url = `/api/sala?url=${obtenerUrl()}`;

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            if (resultado.tipo === "exito") {
                salaObj = resultado.sala;
                mostrarSala();
            }
        } catch (error) {
            console.error(error);
        }
    } 

    function mostrarSala() {
        imprimirHtml();
    }

    function imprimirHtml() {
        const { nombre, descripcion, alumnos, alumnosMax, profesores, profesoresMax, url, publico, acceso, password } = salaObj;
        
        limpiarHtml(contenedorSala);
        const nombreH1 = document.querySelector(".nombre-pagina");
        nombreH1.textContent = nombre;
        nombreH1.ondblclick = () => {
            modalNombre({...salaObj});
        }
    
        const descripcionDiv = document.createElement("DIV");
        descripcionDiv.classList.add("descripcion", "seccion-sala");
    
        const botonDescripcion = document.createElement("BUTTON");
        botonDescripcion.classList.add("boton-naranja-block");
        botonDescripcion.textContent = "Editar Descripcion"
    
        botonDescripcion.onclick = () => {
            modalDescripcion({...salaObj});
        }
    
        descripcionDiv.appendChild(UI.formatearDescripcion(descripcion));
        descripcionDiv.appendChild(botonDescripcion);
    
        const alumnosDiv = document.createElement("DIV");
        alumnosDiv.classList.add("alumnos", "seccion-sala");
    
        alumnosDiv.innerHTML = `
            <h4>Alumnos: </h4>
    
            <div class="seccion-flex">
                <p class="alumnos-contador">${alumnos} de ${alumnosMax}</p>
            
                <div class="opciones-hover">
    
                    <div class="tres-puntos"></div> 
    
                    <div class="opciones">
                        <a class="opcion" href="/sala/alumnos?url=${url}">Ver Alumnos</a>
                        <button class="opcion" id="modificar-alumnos">Modificar Cantidad Alumnos</button>
                    </div>
                </div>
            </div>
        `;

        alumnosDiv.onclick = e => {
            if(e.target.id === "modificar-alumnos") {
                modalAlumnos({...salaObj});
            }
        }
    
        const profesoresDiv = document.createElement("DIV");
        profesoresDiv.classList.add("profesores", "seccion-sala");
    
        profesoresDiv.innerHTML = `
            <h4>Profesores Colaboradores: </h4>
    
            <div class="seccion-flex">
                <p>${profesoresMax === "0" ? "Sin Profesores Colaboradores" : `${profesores} de ${profesoresMax}`}</p>
    
                <div class="opciones-hover">
    
                    <div class="tres-puntos"></div> 
                    <div class="opciones" id="opciones-profesores">
                        ${profesoresMax !== "0" ? `<a href="/sala/profesores?url=${url}" class="opcion">Ver Profesores</a>` : ""}
                        <button class="opcion" id="modificar-profesores">Modificar Cantidad Profesores</button>
                    </div>
                </div>
            </div>
        `;

        profesoresDiv.onclick = e => {
            if(e.target.id === "modificar-profesores") {
                modalProfesores({...salaObj});
            }
        }
    
        const panelDiv = document.createElement("DIV");
        panelDiv.classList.add("panel-sala");
    
        const estatusDiv = document.createElement("DIV");
        estatusDiv.classList.add("accion");
        const estatusHeading = document.createElement("H4");
        estatusHeading.textContent = "Estatus: ";
        const estatusBtn = document.createElement("BUTTON");
        estatusBtn.className = publico === "1" ? "boton-azul-block" : "boton-naranja-block";
        estatusBtn.textContent = publico === "1" ? "Publico" : "Privado";

        estatusBtn.onclick = () => {
            modificarEstatus({...salaObj});
        }

        estatusDiv.appendChild(estatusHeading);
        estatusDiv.appendChild(estatusBtn);
    
        const accesoDiv = document.createElement("DIV");
        accesoDiv.classList.add("accion");
        const accesoHeading = document.createElement("H4");
        accesoHeading.textContent = "Acceso a Alumnos: ";
        const accesoBtn = document.createElement("BUTTON");
        accesoBtn.className = acceso === "1" ? "boton-azul-block" : "boton-naranja-block";
        accesoBtn.textContent = acceso === "1" ? "Activado" : "Desactivado";

        accesoBtn.onclick = () => {
            modificarAcceso({...salaObj});
        }

        accesoDiv.appendChild(accesoHeading);
        accesoDiv.appendChild(accesoBtn);
    
        const testsDiv = document.createElement("DIV");
        testsDiv.classList.add("accion");
        const testsHeading = document.createElement("H4");
        testsHeading.textContent = "Administrar Tests: ";
        const testsBtn = document.createElement("A");
        testsBtn.className = "boton-verde-block";
        testsBtn.textContent = "Ver Tests";
        testsBtn.href = `/sala/tests?url=${url}`;
        testsDiv.appendChild(testsHeading);
        testsDiv.appendChild(testsBtn);
    
        panelDiv.appendChild(estatusDiv);
        panelDiv.appendChild(accesoDiv);
    
        if (publico === "0") {
            const tokenDivCopiar = document.createElement("DIV");
            tokenDivCopiar.classList.add("accion");
            const tokenHeadingCopiar = document.createElement("H4");
            tokenHeadingCopiar.textContent = "Copiar Token de Acceso: ";
            const tokenBtnCopiar = document.createElement("BUTTON");
            tokenBtnCopiar.className = "boton-verde-block";
            tokenBtnCopiar.textContent = "Copiar Token";

            tokenBtnCopiar.onclick = () => {
                copiarToken();
            }

            tokenDivCopiar.appendChild(tokenHeadingCopiar);
            tokenDivCopiar.appendChild(tokenBtnCopiar);
    
            const tokenDiv = document.createElement("DIV");
            tokenDiv.classList.add("accion");
            const tokenHeading = document.createElement("H4");
            tokenHeading.textContent = "Cambiar Token de Acceso: ";
            const tokenParrafo = document.createElement("P");
            tokenParrafo.textContent = formatoToken(password);
            const tokenBtn = document.createElement("BUTTON");
            tokenBtn.className = "boton-azul-block";
            tokenBtn.textContent = "Cambiar Token";

            tokenBtn.onclick = () => {
                modificarToken({...salaObj});
            }

            tokenDiv.appendChild(tokenHeading);
            tokenDiv.appendChild(tokenParrafo);
            tokenDiv.appendChild(tokenBtn);
            
            panelDiv.appendChild(tokenDivCopiar);
            panelDiv.appendChild(tokenDiv);
        }
    
        panelDiv.appendChild(testsDiv);
    
        contenedorSala.appendChild(descripcionDiv);
        contenedorSala.appendChild(alumnosDiv);
        contenedorSala.appendChild(profesoresDiv);
        contenedorSala.appendChild(panelDiv);
    }

    function modalNombre(sala) {
        const {nombre} = sala;
    
        const formularioModal = document.createElement("FORM");
        formularioModal.classList.add("formulario", "formulario-modal")
    
        formularioModal.onsubmit = e => {
            e.preventDefault();
            validarNombre(sala, e.target);
        }
    
        const campo = document.createElement("DIV");
        campo.classList.add("campo")
    
        const label = document.createElement("LABEL");
        label.textContent = `Cambiar Nombre`;
        label.setAttribute("for", "nombre");
    
        const input = document.createElement("INPUT");
        input.placeholder = "Actualizar Nombre de Sala";
        input.name = "nombre";
        input.type = "text";
        input.id = "nombre";
        input.value = nombre;
    
        campo.appendChild(label);
        campo.appendChild(input);
    
        const btnSubmit = document.createElement("INPUT");
        btnSubmit.type = "Submit"
        btnSubmit.value = "Guardar Cambios";
        btnSubmit.classList.add("boton-verde-block");
    
        formularioModal.appendChild(campo);
        formularioModal.appendChild(btnSubmit);
    
        UI.crearModal(formularioModal);
    }

    function validarNombre(sala, referencia) {
        const nombre = referencia.querySelector("#nombre").value.trim();

        if(nombre === "") {
            UI.mostrarAlerta("La Descripcion es Obligatoria", referencia);
            return;
        }

        sala.nombre = nombre;
        actualizarSala(sala, "modal");

    }

    function modalDescripcion(sala) {
        const {nombre, descripcion} = sala;
    
        const formularioModal = document.createElement("FORM");
        formularioModal.classList.add("formulario", "formulario-modal")
    
        formularioModal.onsubmit = e => {
            e.preventDefault();
            validarDescripcion(sala, e.target);
        }
    
        const campo = document.createElement("DIV");
        campo.classList.add("campo")
    
        const label = document.createElement("LABEL");
        label.textContent = `Descripcion de Sala ${nombre}`;
        label.setAttribute("for", "descripcion");
    
        const input = document.createElement("TEXTAREA");
        input.placeholder = "Actualizar Descripcion de Sala";
        input.name = "descripcion";
        input.id = "descripcion";
        input.value = descripcion;
    
        campo.appendChild(label);
        campo.appendChild(input);
    
        const btnSubmit = document.createElement("INPUT");
        btnSubmit.type = "Submit"
        btnSubmit.value = "Guardar Cambios";
        btnSubmit.classList.add("boton-verde-block");
    
        formularioModal.appendChild(campo);
        formularioModal.appendChild(btnSubmit);
    
        UI.crearModal(formularioModal);
    }
    
    function validarDescripcion(sala, referencia) {
        const descripcion = referencia.querySelector("#descripcion").value.trim();

        if(descripcion === "") {
            UI.mostrarAlerta("La Descripcion es Obligatoria", referencia);
            return;
        }

        if(descripcion.length < 50) {
            UI.mostrarAlerta("La Descripcion debe llevar al menos 50 Caracteres", referencia);
            return;
        }

        sala.descripcion = descripcion;
        actualizarSala(sala, "modal");
    }

    function modalAlumnos(sala) {
        const {alumnosMax} = sala;
        const formularioModal = document.createElement("FORM");
        formularioModal.classList.add("formulario", "formulario-modal")

        formularioModal.onsubmit = e => {
            e.preventDefault();
            validarNumeroAlumnos(sala, e.target);
        }

        const campo = document.createElement("DIV");
        campo.classList.add("campo")

        const label = document.createElement("LABEL");
        label.textContent = "Maximo de Alumnos";
        label.setAttribute("for", "alumnosMax");

        const input = document.createElement("INPUT");
        input.placeholder = "Actualizar Numero de Alumnos";
        input.type = "number";
        input.name = "alumnosMax";
        input.id = "alumnosMax";
        input.value = alumnosMax;
        input.min = "1";
        input.max = "60";

        campo.appendChild(label);
        campo.appendChild(input);

        const btnSubmit = document.createElement("INPUT");
        btnSubmit.type = "Submit"
        btnSubmit.value = "Guardar Cambios";
        btnSubmit.classList.add("boton-verde-block");

        formularioModal.appendChild(campo);
        formularioModal.appendChild(btnSubmit);

        UI.crearModal(formularioModal);
    }

    function validarNumeroAlumnos(sala, referencia) {
        const { alumnos } = sala;
        const alumnosMax = referencia.querySelector("#alumnosMax").value.trim();

        if (alumnosMax > 60 || alumnosMax < 1 || isNaN(alumnosMax)) {
            UI.mostrarAlerta("Numero Invalido", referencia)
            return;
        }

        if (alumnosMax < alumnos) {
            UI.mostrarAlerta("Hay mas alumnos ya unidos", referencia);
            return;
        }

        sala.alumnosMax = alumnosMax;
        actualizarSala(sala, "modal");
    }

    function modalProfesores(sala) {
        const {profesoresMax} = sala;
        const formularioModal = document.createElement("FORM");
        formularioModal.classList.add("formulario", "formulario-modal")

        formularioModal.onsubmit = e => {
            e.preventDefault();
            validarNumeroProfesores(sala, e.target);
        }

        const campo = document.createElement("DIV");
        campo.classList.add("campo")

        const label = document.createElement("LABEL");
        label.textContent = "Maximo de Maestros Colaboradores";
        label.setAttribute("for", "profesoresMax");

        const input = document.createElement("INPUT");
        input.placeholder = "Actualizar Numero de Profesores";
        input.type = "number";
        input.name = "profesoresMax";
        input.id = "profesoresMax";
        input.value = profesoresMax;
        input.min = "0";
        input.max = "4";

        campo.appendChild(label);
        campo.appendChild(input);

        const btnSubmit = document.createElement("INPUT");
        btnSubmit.type = "Submit"
        btnSubmit.value = "Guardar Cambios";
        btnSubmit.classList.add("boton-verde-block");

        formularioModal.appendChild(campo);
        formularioModal.appendChild(btnSubmit);

        UI.crearModal(formularioModal);
    }

    function validarNumeroProfesores(sala, referencia) {
        const { profesores } = sala;
        const profesoresMax = referencia.querySelector("#profesoresMax").value.trim();

        if (profesoresMax > 4 || profesoresMax < 0 || isNaN(profesoresMax)) {
            UI.mostrarAlerta("Numero Invalido", referencia);
            return;
        }

        if (profesoresMax < profesores) {
            UI.mostrarAlerta("hay mas profesores ya unidos", referencia);
            return;
        }

        sala.profesoresMax = profesoresMax;
        actualizarSala(sala, "modal");
    }

    function modificarEstatus(sala) {
        sala.publico = sala.publico === "1" ? "0" : "1";
        sala.password = "";

        actualizarSala(sala, "token");
    }

    function modificarAcceso(sala) {
        sala.acceso = sala.acceso === "1" ? "0" : "1";

        actualizarSala(sala, "acceso");
    }

    function modificarToken(sala) {
        sala.password = "";
        actualizarSala(sala, "token");
    }

    async function copiarToken() {
        const {id, password} = salaObj;
        try {
            const token = `${password}_${id}`;

            await navigator.clipboard.writeText(token);
            Swal.fire(
                "Token Copiado",
                "Se Ha Copiado a Tu Portapapeles",
                "success"
            );
        } catch (error) {
            console.error(error);
        }
    }

    function formatoToken(password) {
        const arregloToken = [...password];
        let token = "";

        arregloToken.forEach((caracter, i) => {
            if (i >= 5) {
                token += "*";
                return;
            }

            token += caracter;
        });

        return token;
    }

    async function actualizarSala(sala, tipo) {
        const { id, nombre, url, descripcion, alumnos, profesores, alumnosMax, profesoresMax, password, creado, actualizado, publico, acceso, usuarioId } = sala;
        const datos = new FormData();
        const urlConsulta = "/api/sala/actualizar";

        datos.append("id", id);
        datos.append("nombre", nombre);
        datos.append("url", url);
        datos.append("descripcion", descripcion);
        datos.append("alumnos", alumnos);
        datos.append("profesores", profesores);
        datos.append("alumnosMax", alumnosMax);
        datos.append("profesoresMax", profesoresMax);
        datos.append("password", password);
        datos.append("creado", creado);
        datos.append("actualizado", actualizado);
        datos.append("publico", publico);
        datos.append("acceso", acceso);
        datos.append("usuarioId", usuarioId);
        datos.append("tipoConsulta", tipo);


        try {
            const respuesta = await fetch(urlConsulta, {
                method: "POST",
                body: datos
            });

            const resultado = await respuesta.json();

            if (resultado.tipo === "exito") {
                salaObj = resultado.sala;
                imprimirHtml();
            }

            if(resultado.tipo === "exito" && tipo === "modal") {
                UI.cerrarModal();
            }
        } catch (error) {
            console.error(error)
        }
    }
}());