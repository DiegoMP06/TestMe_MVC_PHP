export default class UI{static mostrarAlerta(e,t,a=!0,o="error"){let c=t.classList.value.replaceAll(" ","-");const r=t.querySelector(".alerta.alerta-"+c);r&&r.remove();const l=document.createElement("P");l.classList.add("alerta",o,"alerta-"+c),l.textContent=e,t.appendChild(l),a&&this.eliminarAlerta(l)}static eliminarAlerta(e){setTimeout(()=>{e.remove()},3e3)}static primerasAlertas(){document.querySelectorAll(".alerta").forEach(e=>{this.eliminarAlerta(e)})}static crearModal(e){const t=document.querySelector(".modal");t&&t.remove();const a=document.createElement("DIV");a.classList.add("modal");const o=document.createElement("DIV");o.classList.add("menu","menu-activo"),o.onclick=()=>{document.body.classList.remove("no-scroll"),a.remove()};const c=document.createElement("DIV");c.classList.add("contenido-modal"),c.classList.add("contenedor"),c.appendChild(e),a.appendChild(o),a.appendChild(c),document.querySelector(".contenido").appendChild(a),document.body.classList.add("no-scroll")}static cerrarModal(){document.body.classList.remove("no-scroll"),document.querySelector(".modal").remove()}static formatearDescripcion(e){const t=e.split("\n"),a=document.createElement("BLOCKQUOTE");return a.classList.add("descripcion-formateada"),a.id="descripcion-formateada",t.forEach(e=>{const t=document.createElement("P");t.textContent=e,a.appendChild(t)}),a}}