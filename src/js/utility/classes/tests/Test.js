export default class Test {
    constructor(test = {}) {
        this.id = test.id ?? null;
        this.nombre = test.nombre ?? "";
        this.url = test.url ?? "";
        this.descripcion = test.descripcion ?? "";
        this.campos = test.campos ?? [];
        this.instrucciones = test.instrucciones ?? [];
        this.opciones = test.opciones ?? [];
        this.preguntas = test.preguntas ?? [];
        this.numOpciones = test.numOpciones ?? 0;
        this.numPreguntas = test.numPreguntas ?? 0;
        this.visitas = test.visitas ?? 0;
        this.creado = test.creado ?? "";
        this.actualizado = test.actualizado ?? null;
        this.publico = test.publico ?? 0;
        this.categoriaId = test.categoriaId ?? "";
        this.tipoTestId = test.tipoTestId ?? "";
        this.usuarioId = test.usuarioId ?? "";
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

    agregarCampo(campoObj) {
        this.campos = [...this.campos, campoObj];
    }

    modificarCampo(campoObj) {
        this.campos = this.campos.map(campo => parseInt(campoObj.id) === parseInt(campo.id) ? campoObj : campo);
    }

    eliminarCampo(id) {
        this.campos = this.campos.filter(campo => parseInt(campo.id) !== parseInt(id));
    }
}