function menuAside(){document.querySelector("#menu-aside").addEventListener("click",activarMenuAside)}function activarMenuAside(e){e.target.classList.toggle("menu-activo");const t=document.querySelector("#aside");document.querySelector("#contenido").classList.toggle("contenido-completo"),t.classList.toggle("sidebar-oculto")}document.addEventListener("DOMContentLoaded",()=>{menuAside()});