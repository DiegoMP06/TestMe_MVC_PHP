(function() {
    const header = document.querySelector(".header");
    const cubreHeader = document.querySelector("#cubre-header");
    const contenido = document.querySelector(".contenido");

    document.addEventListener("DOMContentLoaded", () => {
        iniciarApp();
    });

    function iniciarApp() {
        cambiarTamaño();

        window.addEventListener("resize", cambiarTamaño)
    }

    function cambiarTamaño() {
        const heigth = header.getBoundingClientRect().height;
        
        if(contenido && window.innerWidth < 768) {
            contenido.style.marginTop = `${heigth}px`;
            cubreHeader.style.display = "none";
            return;
        }

        if(contenido) {
            contenido.style.marginTop = "0px";
            cubreHeader.style.display = "block";
        }
        
        cubreHeader.style.height = `${heigth}px`;
    }
}());