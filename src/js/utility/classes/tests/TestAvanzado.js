import Test from "./Test.js";

export default class TestAvanzado extends Test {
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
        
        const opcionesBasicas = this.opciones.filter(opcionObj => !opcionObj.multiple);
        const valoresBasicos = opcionesBasicas.map(({opciones}) => opciones.map(opcion => parseInt(opcion.valor)));
        const mayoresBasicos = valoresBasicos.map(valorArray => Math.max(...valorArray));
        const maximoBasicos = mayoresBasicos.reduce((total, mayor) => total + mayor, 0);
        
        const opcionesMultiples = this.opciones.filter(opcionObj => opcionObj.multiple);
        const maximoMultiples = opcionesMultiples.reduce((total, opcionObj) => total + opcionObj.opciones.reduce((totalValores, opcion) => totalValores + parseInt(opcion.valor), 0), 0);

        const maximo = maximoBasicos + maximoMultiples;

        if(this.instrucciones.length === 0) {
            const menores = valores.map(valorArray => Math.min(...valorArray));
            const minimo = menores.reduce((total, menor) => total + menor, 0);

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