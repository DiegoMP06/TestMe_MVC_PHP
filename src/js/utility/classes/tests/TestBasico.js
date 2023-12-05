import Test from "./Test.js";

export default class TestBasico extends Test {
    constructor(test = {}) {
        super(test);
    }

    calcularNumOpciones() {
        return this.opciones.length;
    }

    calcularMinimoYMaximo() {
        const valores = this.opciones.map(opcion => parseInt(opcion.valor));
        const mayor = Math.max(...valores);
        const maximo = mayor * this.preguntas.length;

        if (this.instrucciones.length === 0) {
            const menor = Math.min(...valores);
            const minimo = menor * this.preguntas.length;

            return {
                maximo,
                minimo
            }
        }

        return {
            maximo
        }
    }
}