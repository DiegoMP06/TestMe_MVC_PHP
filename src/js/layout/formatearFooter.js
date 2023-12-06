(function() {
    const footer = document.querySelector(".footer");
    const cubreFooter = document.querySelector("#cubre-footer");

    document.addEventListener("DOMContentLoaded", () => {
        iniciarApp();
    });

    function iniciarApp() {
        cambiarTamaño();

        window.addEventListener("resize", cambiarTamaño)
    }

    function cambiarTamaño() {
        const heigth = footer.getBoundingClientRect().height;
        cubreFooter.style.height = `${heigth}px`;
    }
}());