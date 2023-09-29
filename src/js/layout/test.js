const DOM = {
    informacion: {
        boton: "#btn-informacion",
        ventana: ".informacion-test",
    },
    instrucciones: {
        boton: "#btn-instrucciones",
        ventana: ".intrucciones-test",
    },
    informacionTipo: {
        boton: "#btn-info-test",
        ventana: ".tipo-test",
    }
}

document.addEventListener("DOMContentLoaded", () => {
    informacion();
    instrucciones();
    tipo();
});

function informacion() {
    const {informacion} = DOM;
    mostrarVentana(informacion);
}

function instrucciones() {
    const {instrucciones} = DOM;
    mostrarVentana(instrucciones);
}

function tipo() {
    const {informacionTipo} = DOM;
    mostrarVentana(informacionTipo);
}

function mostrarVentana(rutasDOM) {
    const boton = document.querySelector(rutasDOM.boton);

    boton.addEventListener("click", () => {
        const ventana = document.querySelector(rutasDOM.ventana);
        const botonCerrar = document.querySelector(`${rutasDOM.ventana} .menu`);
        botonCerrar.id = "btn-cerrar-ventana";
        ventana.classList.remove("display-none");
        ventana.classList.add("ventana");
        document.body.classList.add("no-scroll");
        
        ocultarVentana(rutasDOM);
    });
}

function ocultarVentana(rutasDOM) {
    const ventana = document.querySelector(rutasDOM.ventana);
    const botonCerrar = document.querySelector(`${rutasDOM.ventana} .menu`);

    const botonEliminar = document.querySelector("#btn-cerrar-ventana");
    botonEliminar.addEventListener("click", () => {
        botonCerrar.id = "";
        ventana.classList.add("display-none");
        ventana.classList.remove("ventana");
        document.body.classList.remove("no-scroll");
    });
}