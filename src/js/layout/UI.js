export default class UI {
    static mostrarAlerta(mensaje, referencia, eliminar = true, tipo = "error") {
        let id = referencia.classList.value.replaceAll(" ", "-");
    
        const alertaPrevia = referencia.querySelector(`.alerta.alerta-${id}`);
    
        if(alertaPrevia) {
            alertaPrevia.remove();
        }
        
        const alerta = document.createElement("P");
        alerta.classList.add("alerta", tipo, `alerta-${id}`);
        alerta.textContent = mensaje;
        
        referencia.appendChild(alerta);
        
        if(eliminar) {
            this.eliminarAlerta(alerta);
        }
    }

    static eliminarAlerta(alerta) {
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    static primerasAlertas() {
        const alertas = document.querySelectorAll(".alerta");

        alertas.forEach(alerta => {
            this.eliminarAlerta(alerta);
        });
    }

    static crearModal(contenido) {
        const modalPrevio = document.querySelector(".modal");
        if(modalPrevio) {
            modalPrevio.remove();
        }

        const modalContenedor = document.createElement("DIV");
        modalContenedor.classList.add("modal");

        const cerrarBtn = document.createElement("DIV");
        cerrarBtn.classList.add("menu", "menu-activo");
        
        cerrarBtn.onclick = () => {
            document.body.classList.remove("no-scroll");
            modalContenedor.remove();
        };
        
        const contenidoModal = document.createElement("DIV");
        contenidoModal.classList.add("contenido-modal");
        contenidoModal.classList.add("contenedor");
        
        contenidoModal.appendChild(contenido);
        
        modalContenedor.appendChild(cerrarBtn);
        modalContenedor.appendChild(contenidoModal);
        document.querySelector(".contenido").appendChild(modalContenedor);
        document.body.classList.add("no-scroll");
    }

    static cerrarModal() {
        document.body.classList.remove("no-scroll");
        document.querySelector(".modal").remove();
    }

    static formatearDescripcion(descripcion) {
        const descripcionFormateada = descripcion.split("\n");
        const descripcionBlock = document.createElement("BLOCKQUOTE");
        descripcionBlock.classList.add("descripcion-formateada");
        descripcionBlock.id = "descripcion-formateada";

        descripcionFormateada.forEach(parrafo => {
            const lineaDescripcion = document.createElement("P");
            lineaDescripcion.textContent = parrafo;

            descripcionBlock.appendChild(lineaDescripcion);
        });

        return descripcionBlock;
    }
}