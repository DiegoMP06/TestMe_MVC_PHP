export default class TestBasico {
    constructor(test) {
        this.testContenedor = document.querySelector("#test-formulario");
        this.test = test;
    }

    mostrarFormulario() {
        const {preguntas, opciones} = this.test;

        Object.entries(preguntas).forEach(([idPregunta, pregunta]) => {
            const campo = document.createElement("DIV");
            campo.classList.add("campo-radio");

            const preguntaP = document.createElement("P");
            preguntaP.classList.add("pregunta");
            preguntaP.dataset.idPregunta = idPregunta;
            preguntaP.id = idPregunta;
            preguntaP.textContent = pregunta;

            const opcionesDiv = document.createElement("DIV");
            opcionesDiv.classList.add("opciones-test");

            Object.entries(opciones).forEach(([idCampo, {valor, opcion}]) => {
                const radioContenedor = document.createElement("DIV");
                radioContenedor.classList.add("radio");

                const input = document.createElement("INPUT");
                input.type = "radio";
                input.name = idCampo;
                input.id = `${idPregunta}_${idCampo}`;
                input.dataset.idPregunta = idPregunta;
                input.dataset.valor = valor;

                const label = document.createElement("LABEL");
                label.setAttribute("for", `${idPregunta}_${idCampo}`);
                label.textContent = opcion;

                radioContenedor.appendChild(input);
                radioContenedor.appendChild(label);
                opcionesDiv.appendChild(radioContenedor);
            });

            campo.appendChild(preguntaP);
            campo.appendChild(opcionesDiv);
            this.testContenedor.appendChild(campo);
        });
    }
}