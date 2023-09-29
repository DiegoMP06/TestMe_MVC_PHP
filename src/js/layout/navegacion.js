document.addEventListener("DOMContentLoaded", () => {
    menuNavegacion();
});


function menuNavegacion() {
    const menu = document.querySelector("#menu-navegacion");
    menu.addEventListener("click", activarMenuNavegacion);
}

function activarMenuNavegacion(e) {
    e.target.classList.toggle("menu-activo");
    const body = document.body;
    const navegcion = document.querySelector(".header");
    navegcion.classList.toggle("header-fijo");
    body.classList.toggle("no-scroll");
}