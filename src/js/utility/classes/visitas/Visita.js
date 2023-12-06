export default class Visita {
    constructor(visita = {}) {
        this.id = visita.id ?? null;
        this.hora = visita.hora ?? "";
        this.fecha = visita.fecha ?? "";
        this.camposExtra = visita.camposExtra ?? [];
        this.campos = visita.campos ?? [];
        this.instruccion = visita.instruccion ?? {};
        this.puntuacion = visita.puntuacion ?? 0;
        this.total = visita.total ?? 0;
        this.testId = visita.testId ?? "";
        this.usuarioId = visita.usuarioId ?? "";
    }

    agregarCampo(campoObj) {
        this.campos = [...this.campos, campoObj];
    }

    modificarCampo(campoObj) {
        this.campos = this.campos.map(campo => parseInt(campoObj.id) === parseInt(campo.id) ? campoObj : campo);
    }

    agregarCampoExtra(campoObj) {
        this.camposExtra = [...this.camposExtra, campoObj];
    }

    modificarCampoExtra(campoExtraObj) {
        this.camposExtra = this.camposExtra.map(campo => parseInt(campoExtraObj.id) === parseInt(campo.id) ? campoExtraObj : campo);
    }
}