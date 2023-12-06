import CrearTest from"./crearTest.js";import{cambiarPagina,mostrarFormulario,test}from"./funcionesTestCrear.js";import UI from"../../../layout/UI.js";export default class CrearTestMedio extends CrearTest{formulario2(e){const t=test.preguntas.length+1,o=document.createElement("DIV");o.classList.add("campo-pregunta-opcion","seccion");const n=document.createElement("DIV"),a=document.createElement("LABEL"),r=document.createElement("INPUT");n.classList.add("campo"),a.textContent=`Pregunta del Campo ${t}: `,a.setAttribute("for","pregunta"),r.placeholder="Pregunta del Campo",r.id="pregunta",r.name="pregunta",r.type="text",n.appendChild(a),n.appendChild(r);const i=document.createElement("DIV"),c=document.createElement("LABEL"),l=document.createElement("INPUT");i.classList.add("campo"),c.textContent="Numero de Opciones: ",c.setAttribute("for","num-opciones"),l.placeholder="Numero de Opciones Para Este Campo",l.type="number",l.id="num-opciones",l.name="num-opciones",l.min=2,l.max=10,l.oninput=e=>{this.validarNumOpciones(e.target.parentElement,e.target.value.trim())},i.appendChild(c),i.appendChild(l),o.appendChild(n),o.appendChild(i),e.appendChild(o)}mostrarModificarOpcion(e,t,o){const{id:n,opciones:a}=e,r=document.createElement("DIV"),i=document.createElement("FORM");i.classList.add("formulario","formulario-modal");const c=document.createElement("P");c.textContent=t,c.classList.add("pregunta-opcion"),i.appendChild(c);const l=document.createElement("BUTTON");l.type="button",l.textContent="Cambiar Numero de opciones",l.classList.add("boton-naranja"),l.onclick=o=>{this.mostrarCambiarNumInp(e,t)},o&&(e={id:n,opciones:[]}),this.mostrarInputsOpciones(i,o||a.length,e),i.appendChild(l),r.appendChild(i),UI.crearModal(r)}mostrarCambiarNumInp(e,t){const{opciones:o}=e,n=document.createElement("DIV"),a=document.createElement("FORM");a.classList.add("formulario","formulario-modal");const r=document.createElement("P");r.textContent=t,r.classList.add("pregunta-opcion"),a.appendChild(r);const i=document.createElement("DIV"),c=document.createElement("LABEL"),l=document.createElement("INPUT");i.classList.add("campo"),c.textContent="Numero de Opciones: ",c.setAttribute("for","num-opciones"),l.placeholder="Numero de Opciones Para Este Campo",l.type="number",l.id="num-opciones",l.name="num-opciones",l.min=2,l.max=10,l.value=o.length,i.appendChild(c),i.appendChild(l);const d=document.createElement("BUTTON");d.type="submit",d.classList.add("boton-naranja"),d.textContent="Cambiar";const s=document.createElement("BUTTON");s.type="button",s.classList.add("boton-rojo"),s.textContent="Cancelar",s.onclick=()=>{this.mostrarModificarOpcion(e,t)},a.onsubmit=o=>{o.preventDefault(),this.validarNumOpciones(a,l.value,e,t)},a.appendChild(i),a.appendChild(d),a.appendChild(s),n.appendChild(a),UI.crearModal(n)}mostrarModalOpciones(){const{opciones:e,preguntas:t}=test,o=document.createElement("DIV"),n=document.createElement("H2");n.textContent="Opciones: ";const a=document.createElement("DIV");if(a.classList.add("seccion","contenedor-opciones"),0===e.length){const e=document.createElement("P");e.textContent="No Hay Opciones",a.appendChild(e)}else e.forEach(e=>{const{id:o,opciones:n}=e,r=t.filter(e=>parseInt(e.id)===parseInt(o));if(1===r.length){const[{pregunta:t}]=r,i=document.createElement("DIV"),c=document.createElement("H4");c.textContent=t,i.appendChild(c),n.forEach(({opcion:e,valor:t},o)=>{const n=document.createElement("LI"),a=document.createElement("SPAN"),r=document.createElement("SPAN"),c=document.createElement("P");a.textContent=`Opcion ${o+1}: `,r.textContent=e,c.textContent="Valor: "+t,n.appendChild(a),n.appendChild(r),n.appendChild(c),i.appendChild(n)});const l=document.createElement("SPAN");l.classList.add("acciones"),l.innerHTML='\n                    <button type="button" class="boton-naranja" id="actualizar-opcion">Modificar</button>\n                    <button type="button" class="boton-rojo" id="eliminar-opcion">Eliminar</button>\n                ',l.onclick=n=>{"actualizar-opcion"===n.target.id&&this.mostrarModificarOpcion({...e},t),"eliminar-opcion"===n.target.id&&this.mostrarEliminarOpcion(o)},i.appendChild(l),a.appendChild(i)}});o.appendChild(n),o.appendChild(a),UI.crearModal(o)}mostrarInputsOpciones(e,t,o={}){const{id:n,opciones:a}=o,r=document.createElement("DIV");r.classList.add("campo-opciones","seccion");for(let e=1;e<=t;e++){let t,o;a&&a.length>=1&&(t=a[e-1].opcion,o=a[e-1].valor);const i=document.createElement("DIV"),c=document.createElement("LABEL"),l=document.createElement("INPUT");i.classList.add("campo"),c.setAttribute("for","opcion-"+e),c.textContent=`Opcion ${e}: `,l.type="text",l.name="opcion-"+e,l.id="opcion-"+e,l.classList.add(n?"opcion-input-modal":"opcion-input"),l.placeholder="Nueva Opcion",l.value=t??"",i.appendChild(c),i.appendChild(l);const d=document.createElement("DIV"),s=document.createElement("LABEL"),p=document.createElement("INPUT");d.classList.add("campo"),s.setAttribute("for","valor-"+e),s.textContent="Valor: ",p.name="valor-"+e,p.id="valor-"+e,p.placeholder="Valor de la Opcion",p.classList.add(n?"valor-input-modal":"valor-input"),p.type="number",p.min=1,p.max=10,p.value=o??"",d.appendChild(s),d.appendChild(p),r.appendChild(i),r.appendChild(d)}const i=document.createElement("BUTTON");i.type="button",i.textContent=n?"Guardar Cambios":"Agregar Campo",i.classList.add("boton-verde","agregar-campo"),i.onclick=e=>{this.validarCampo(e.target.parentElement,t,n)},e.onsubmit=e=>e.preventDefault(),e.appendChild(r),e.appendChild(i)}validarCampo(e,t,o){const n=e.querySelector(".campo #pregunta"),a=n?n.value.trim():"",r=e.querySelectorAll(o?".campo .opcion-input-modal":".campo .opcion-input"),i=e.querySelectorAll(o?".campo .valor-input-modal":".campo .valor-input");let c=[],l=[];if(r.forEach(e=>c=[...c,e.value.trim()]),i.forEach(e=>l=[...l,e.value.trim()]),!o){if(""===a)return void UI.mostrarAlerta("La Pregunta Es Obligatoria",e);if(parseInt(t)!==r.length||parseInt(t)!==i.length)return void UI.mostrarAlerta("Las Opciones NO Coinciden Con El Valor Dado",e)}const d=c.filter(e=>""===e),s=l.filter(e=>""===e||isNaN(e)||e>10||e<1);if(0!==d.length||0!==s.length)return void UI.mostrarAlerta("Todos los campos Son Obligatorios o Invalidos",e);const p=Math.round(Math.random()*Date.now()),m={id:p,opciones:[]};for(let e=0;e<c.length;e++){const t=c[e],o=l[e],n={id:Math.round(Math.random()*Date.now()),opcion:t,valor:o};m.opciones=[...m.opciones,n]}if(o)return m.id=o,test.modificarOpcion(m),cambiarPagina(2),this.mostrarModalOpciones(),this.validarMaximoInstrucciones(),void Swal.fire({title:"Exito",text:"Se Actualizo la Opcion",icon:"success"});const u={id:p,pregunta:a};test.agregarPregunta(u),test.agregarOpcion(m),mostrarFormulario(),Swal.fire({title:"Exito",text:"Se Creo el Campo",icon:"success"})}validarNumOpciones(e,t,o,n){if(!o){const t=e.parentElement.querySelector(".campo-opciones"),o=e.parentElement.querySelector(".agregar-campo");t&&t.remove(),o&&o.remove()}if(""===t)return void UI.mostrarAlerta("El Numero Es Obligatorio",e);if(isNaN(t)||t>10||t<2)return void UI.mostrarAlerta("Solo Se Pueden Agregar de 2 a 10 Opciones",e);if(o)return void this.mostrarModificarOpcion(o,n,t);const a=e.querySelector(".alerta");a&&a.remove(),this.mostrarInputsOpciones(e.parentElement,t)}}