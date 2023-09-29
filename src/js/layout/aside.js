document.addEventListener("DOMContentLoaded", () => {
    menuAside();
});


function menuAside() {
    const menu = document.querySelector("#menu-aside");

    menu.addEventListener("click", activarMenuAside);
}

function activarMenuAside(e) {
    e.target.classList.toggle("menu-activo");
    const aside = document.querySelector("#aside");
    const contenido = document.querySelector("#contenido");
    contenido.classList.toggle("contenido-completo");
    aside.classList.toggle("sidebar-oculto");
}