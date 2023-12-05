import UI from"../../../layout/UI.js";import TiposCampos from"../../db/TiposCampos.js";import{limpiarHtml}from"../../utilidades.js";import{cambiarPagina,datos,mostrarFormulario,test}from"./funcionesTestCrear.js";export default class CrearTest{validarMaximoInstrucciones(){if(test.instrucciones.length>0){const t=test.calcularMinimoYMaximo().maximo;test.instrucciones=test.instrucciones.filter(e=>parseInt(e.maximo)<=t);const e=test.instrucciones[test.instrucciones.length-1];datos.minimo=parseInt(e.maximo)+1}}validarPregunta(t,e){const o=t.querySelector(e?".campo #pregunta-modal":".campo #pregunta").value.trim()??"";if(""===o)return void UI.mostrarAlerta("La Pregunta es Obligatoria",t);if(e){const t={id:e,pregunta:o};return test.modificarPregunta(t),this.mostrarModalPreguntas(),void Swal.fire({title:"Exito",text:"Se Actualizo la Pregunta",icon:"success"})}const a={id:Math.round(Math.random()*Date.now()),pregunta:o};test.agregarPregunta(a),mostrarFormulario(),Swal.fire({title:"Exito",text:"Se Creo la Pregunta",icon:"success"})}mostrarModificarPregunta(t,e){const{pregunta:o,id:a}=t,n=document.createElement("DIV"),i=document.createElement("FORM");i.classList.add("formulario","formulario-modal");const r=document.createElement("DIV"),c=document.createElement("LABEL"),m=document.createElement("INPUT");r.classList.add("campo"),c.textContent=`Pregunta ${e}: `,c.setAttribute("for","pregunta-modal"),m.placeholder="Nueva Pregunta",m.id="pregunta-modal",m.name="pregunta-modal",m.type="text",m.value=o,r.appendChild(c),r.appendChild(m);const l=document.createElement("BUTTON");l.type="submit",l.textContent="Guardar Cambios",l.classList.add("boton-verde"),i.appendChild(r),i.appendChild(l),i.onsubmit=t=>{t.preventDefault(),this.validarPregunta(t.target,a)},n.appendChild(i),UI.crearModal(n)}mostrarEliminarPregunta(t){Swal.fire({title:"Atencion",text:"¿Deseas Eliminar La Pregunta?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si",cancelButtonText:"No"}).then(e=>{e.isConfirmed&&(test.eliminarPregunta(t),this.mostrarModalPreguntas(),cambiarPagina(2),this.validarMaximoInstrucciones(),Swal.fire({title:"Exito",text:"La Pregunta Ha Sido Eliminada",icon:"success"}))})}mostrarModalPreguntas(){const{preguntas:t}=test,e=document.createElement("DIV"),o=document.createElement("H2");o.textContent="Preguntas: ";const a=document.createElement("DIV");if(a.classList.add("seccion","contenedor-preguntas"),0===t.length){const t=document.createElement("P");t.textContent="No Hay Preguntas",a.appendChild(t)}else t.forEach((t,e)=>{const{pregunta:o,id:n}=t,i=document.createElement("LI"),r=document.createElement("SPAN"),c=document.createElement("SPAN");r.textContent=`Pregunta ${e+1}: `,c.textContent=o;const m=document.createElement("SPAN");m.classList.add("acciones"),m.innerHTML='\n                <button type="button" class="boton-naranja" id="actualizar-pregunta">Modificar</button>\n                <button type="button" class="boton-rojo" id="eliminar-pregunta">Eliminar</button>\n            ',m.onclick=o=>{"actualizar-pregunta"===o.target.id&&this.mostrarModificarPregunta({...t},e+1),"eliminar-pregunta"===o.target.id&&this.mostrarEliminarPregunta(n)},i.appendChild(r),i.appendChild(c),i.appendChild(m),a.appendChild(i)});e.appendChild(o),e.appendChild(a),UI.crearModal(e)}validarInstruccion(t,e={}){const{id:o}=e,{minimo:a,maximo:n}=datos,i=t.querySelector(".campo #maximo"),r=o?e.maximo:i.value.trim(),c=t.querySelector(o?".campo #titulo-modal":".campo #titulo").value.trim(),m=t.querySelector(o?".campo #instruccion-modal":".campo #instruccion").value.trim();if(""===r||""===c||""===m)return void UI.mostrarAlerta("Todos Los campos son Obligatorios",t);if(o){const{minimo:t}=e,a={id:o,titulo:c,instruccion:m,maximo:r,minimo:t};return test.modificarInstruccion(a),this.mostrarModalInstrucciones(),void Swal.fire({title:"Exito",text:"Se Actualizo la instruccion",icon:"success"})}if(isNaN(r)||r>n||r<a)return void UI.mostrarAlerta("Datos Invalidos",t);const l={id:Math.round(Math.random()*Date.now()),titulo:c,instruccion:m,minimo:a,maximo:r};test.agregarInstruccion(l),datos.minimo=parseInt(r)+1,mostrarFormulario(),Swal.fire({title:"Exito",text:"Se Creo la instruccion",icon:"success"})}mostrarModificarinstruccion(t){const{titulo:e,instruccion:o,id:a,maximo:n,minimo:i}=t,r=document.createElement("DIV"),c=document.createElement("FORM");c.classList.add("formulario","formulario-modal");const m=document.createElement("DIV"),l=document.createElement("LABEL"),s=document.createElement("INPUT");m.classList.add("campo"),l.textContent="Titulo: ",l.setAttribute("for","titulo-modal"),s.placeholder="Titulo de Instruccion",s.type="text",s.id="titulo-modal",s.name="titulo-modal",s.classList.add("input"),s.value=e,m.appendChild(l),m.appendChild(s);const d=document.createElement("DIV"),p=document.createElement("LABEL"),u=document.createElement("TEXTAREA");d.classList.add("campo"),p.textContent="Contenido: ",p.setAttribute("for","instruccion-modal"),u.placeholder="Contenido de Instruccion",u.id="instruccion-modal",u.name="instruccion-modal",u.classList.add("input"),u.value=o,d.appendChild(p),d.appendChild(u);const C=document.createElement("BUTTON");C.type="submit",C.textContent="Guardar Cambios",C.classList.add("boton-verde"),c.appendChild(m),c.appendChild(d),c.appendChild(C),c.onsubmit=t=>{t.preventDefault(),this.validarInstruccion(t.target,{id:a,minimo:i,maximo:n})},r.appendChild(c),UI.crearModal(r)}mostrarEliminarinstruccion(){Swal.fire({title:"Atencion",text:"¿Deseas Eliminar La instruccion?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si",cancelButtonText:"No"}).then(t=>{if(t.isConfirmed){const t=test.eliminarInstruccion(),{minimo:e}=t;datos.minimo=e,this.mostrarModalInstrucciones(),cambiarPagina(3),Swal.fire({title:"Exito",text:"La instruccion Ha Sido Eliminada",icon:"success"})}})}mostrarModalInstrucciones(){const{instrucciones:t}=test,e=document.createElement("DIV"),o=document.createElement("H2");o.textContent="Instrucciones: ";const a=document.createElement("DIV");if(a.classList.add("seccion","contenedor-instrucciones"),0===t.length){const t=document.createElement("P");t.textContent="No Hay Instrucciones",a.appendChild(t)}else{t.forEach(t=>{const{titulo:e,instruccion:o,minimo:n,maximo:i}=t,r=document.createElement("LI"),c=document.createElement("H4"),m=UI.formatearDescripcion(o),l=document.createElement("P");c.textContent=e+": ",l.textContent=`Instruccion Valida de ${n} a ${i} Puntos`;const s=document.createElement("SPAN");s.classList.add("acciones"),s.innerHTML='\n                <button type="button" class="boton-naranja" id="actualizar-instruccion">Modificar</button>\n            ',s.onclick=e=>{"actualizar-instruccion"===e.target.id&&this.mostrarModificarinstruccion({...t})},r.appendChild(c),r.appendChild(m),r.appendChild(l),r.appendChild(s),a.appendChild(r)});const e=document.createElement("BUTTON");e.type="button",e.classList.add("boton-rojo"),e.id="eliminar-instruccion",e.textContent="Eliminar",e.onclick=t=>{this.mostrarEliminarinstruccion()},a.lastChild.querySelector(".acciones").appendChild(e)}e.appendChild(o),e.appendChild(a),UI.crearModal(e)}validarCampoExtra(t,e,o){const a=t.querySelector(".campo #nombre-campo").value.trim(),n={};if(""!==a){if(1===e||2===e?n.atributos={}:5!==e&&6!==e||(n.opciones=[]),1===e||2===e){const e=t.querySelector(".campo #placeholder").value.trim();if(""===e)return void UI.mostrarAlerta("El Texto Guia Es Obligatorio",t);n.atributos.placeholder=e}if(2===e){const e=t.querySelector(".campo #entero-campo").checked;if(t.querySelector(".campo #minimo-maximo-campo").checked){const e=t.querySelector(".campo #minimo-campo").value.trim(),o=t.querySelector(".campo #maximo-campo").value.trim();if(""===e||""===o||isNaN(e)||isNaN(o))return void UI.mostrarAlerta("El Numero Maximo O Minimo es Invalido",t);n.atributos.minimo=e,n.atributos.maximo=o}n.atributos.entero=e}if(5===e||6===e){const e=t.querySelectorAll(".campo .opcion-input-campo"),o=t.querySelectorAll(".campo .valor-input-campo");if(e.length!==o.length)return void UI.mostrarAlerta("Hubo UN Error Con las Opciones",t);if(o.length<1||e.length<1)return void UI.mostrarAlerta("Al Menos Debe Haber una Opcion",t);let a=[],i=[];e.forEach(t=>a=[...a,t.value.trim()]),o.forEach(t=>i=[...i,t.value.trim()]);const r=a.filter(t=>""===t),c=i.filter(t=>""===t);if(0!==r.length||0!==c.length)return void UI.mostrarAlerta("Todos Los Campos Son Obligatorios",t);for(let t=0;t<a.length;t++){const e=a[t],o=i[t],r={id:Math.round(Math.random()*Date.now()),opcion:e,valor:o};n.opciones=[...n.opciones,r]}}if(n.type=TiposCampos.filter(t=>t.id==e)[0].type,n.nombre=a,o)return n.id=o,test.modificarCampo(n),this.mostrarModalCamposExtras(),void Swal.fire({title:"Exito",text:"Se Actualizo El Campo",icon:"success"});n.id=Math.round(Math.random()*Date.now()),test.agregarCampo(n),this.mostrarModalCamposExtras(),Swal.fire({title:"Exito",text:"Se Creo El Campo",icon:"success"})}else UI.mostrarAlerta("El Titulo es Obligatorio",t)}validarTipoCampoExtra(t,e,o){const a=t.querySelector("#opciones-campo-modal");if(limpiarHtml(a),""===e)return void UI.mostrarAlerta("El tipo de Campo es Obligatorio",t);if(isNaN(e)||e<1||e>6)return void UI.mostrarAlerta("Tipo de Campo No Valido",t);const n=t.querySelector(".alerta");n&&n.remove(),this.crearCamposOpcionesCampoExtra(a,parseInt(e),o)}mostrarEliminarCampoExtra(t){Swal.fire({title:"Atencion",text:"¿Deseas Eliminar El Campo Extra?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si",cancelButtonText:"No"}).then(e=>{e.isConfirmed&&(test.eliminarCampo(t),this.mostrarModalCamposExtras(),Swal.fire({title:"Exito",text:"El Campo Ha Sido Eliminado",icon:"success"}))})}mostrarModalCamposExtras(t={}){const{campos:e}=test,{nombre:o,type:a,id:n}=t;let i={};n&&(i=TiposCampos.filter(t=>t.type===a)[0]);const r=document.createElement("DIV"),c=document.createElement("H2");c.textContent="Campos Extra: ";const m=document.createElement("FORM");m.classList.add("formulario","formulario-modal");const l=document.createElement("DIV"),s=document.createElement("LABEL"),d=document.createElement("INPUT");l.classList.add("campo"),s.textContent="Titulo del Campo: ",s.setAttribute("for","nombre-campo"),d.id="nombre-campo",d.name="nombre-campo",d.placeholder="Titulo del Campo",d.value=o??"",l.appendChild(s),l.appendChild(d);const p=document.createElement("DIV"),u=document.createElement("LABEL"),C=document.createElement("SELECT");p.classList.add("campo"),u.textContent="Tipo de Campo: ",u.setAttribute("for","tipo-campo"),C.id="tipo-campo",C.name="tipo-campo";let E="";TiposCampos.forEach(t=>{const{id:e,nombre:o}=t;E+=`<option value=${e} ${i.id==e?"selected":""}>${o}</option>`}),C.innerHTML=`\n        <option value="" selected disabled>-- Seleccione --</option>\n        ${E}\n    `;const h=document.createElement("DIV");h.id="opciones-campo-modal",C.oninput=e=>{this.validarTipoCampoExtra(e.target.parentElement.parentElement,e.target.value.trim(),t)},setTimeout(()=>{n&&this.crearCamposOpcionesCampoExtra(h,parseInt(i.id),t)},0),p.appendChild(u),p.appendChild(C);const x=document.createElement("DIV");x.classList.add("contenedor-campos"),e.forEach(t=>{const{nombre:e,type:o,id:a}=t,n=document.createElement("DIV"),i=document.createElement("H4");i.textContent=e,n.appendChild(i);const r=document.createElement("P");r.textContent=TiposCampos.filter(t=>t.type===o)[0].nombre,n.appendChild(r);const c=document.createElement("SPAN");c.classList.add("acciones"),c.innerHTML='\n            <button type="button" class="boton-naranja" id="actualizar-campo">Modificar</button>\n            <button type="button" class="boton-rojo" id="eliminar-campo">Eliminar</button>\n        ',c.onclick=e=>{"actualizar-campo"===e.target.id&&this.mostrarModalCamposExtras({...t}),"eliminar-campo"===e.target.id&&this.mostrarEliminarCampoExtra(a)},n.appendChild(c),x.appendChild(n)}),m.appendChild(l),m.appendChild(p),m.appendChild(h),r.appendChild(c),r.appendChild(m),r.appendChild(x),UI.crearModal(r)}crearMinioMaximoCampoExtra(t,e,o={}){if(limpiarHtml(e),t){const t=document.createElement("DIV"),a=document.createElement("LABEL"),n=document.createElement("INPUT");t.classList.add("campo"),a.textContent="Minimo: ",a.setAttribute("for","minimo-campo"),n.name="minimo-campo",n.id="minimo-campo",n.type="number",n.placeholder="Numero Minimo",n.step="any",n.value=o.minimo??"";const i=document.createElement("DIV"),r=document.createElement("LABEL"),c=document.createElement("INPUT");i.classList.add("campo"),r.setAttribute("for","maximo-campo"),r.textContent="Maximo: ",c.name="maximo-campo",c.id="maximo-campo",c.type="number",c.placeholder="Numero Maximo",c.step="any",c.value=o.maximo??"",t.appendChild(a),t.appendChild(n),i.appendChild(r),i.appendChild(c),e.appendChild(t),e.appendChild(i)}}crearOpcionesCampoExtra(t,e,o=[]){for(let a=1;a<=e;a++){let e="",n="";o.length>0&&(e=o[a-1].valor,n=o[a-1].opcion);const i=document.createElement("DIV"),r=document.createElement("LABEL"),c=document.createElement("INPUT");i.classList.add("campo"),r.setAttribute("for",`opcion-${a}-campo`),r.textContent=`Opcion ${a}: `,c.type="text",c.name=`opcion-${a}-campo`,c.id=`opcion-${a}-campo`,c.classList.add("opcion-input-campo"),c.placeholder="Nueva Opcion",c.value=n,i.appendChild(r),i.appendChild(c);const m=document.createElement("DIV"),l=document.createElement("LABEL"),s=document.createElement("INPUT");m.classList.add("campo"),l.setAttribute("for",`valor-${a}-campo`),l.textContent="Valor: ",s.name=`valor-${a}-campo`,s.id=`valor-${a}-campo`,s.placeholder="Valor de la Opcion",s.classList.add("valor-input-campo"),s.type="text",s.value=e,m.appendChild(l),m.appendChild(s),t.appendChild(i),t.appendChild(m)}}crearCamposOpcionesCampoExtra(t,e,o={}){const{id:a}=o;if(1===e||2===e){const e=document.createElement("DIV"),n=document.createElement("LABEL"),i=document.createElement("INPUT");e.classList.add("campo"),n.textContent="Texto Guia: ",n.setAttribute("for","placeholder"),i.placeholder="Texto Guia del Campo",i.id="placeholder",i.name="placeholder",i.type="text",i.value=a&&o.atributos&&o.atributos.placeholder?o.atributos.placeholder:"",e.appendChild(n),e.appendChild(i),t.appendChild(e)}if(2===e){const e=document.createElement("DIV");e.classList.add("campo");const n=document.createElement("LABEL"),i=document.createElement("INPUT");n.setAttribute("for","entero-campo"),n.textContent="Numeros Enteros: ",i.id="entero-campo",i.name="entero-campo",i.type="checkbox",i.checked=!!(a&&o.atributos&&o.atributos.entero)&&o.atributos.entero,e.appendChild(n),e.appendChild(i);const r=document.createElement("LABEL"),c=document.createElement("INPUT");r.setAttribute("for","minimo-maximo-campo"),r.textContent="Insertar Limite: ",c.id="minimo-maximo-campo",c.name="minimo-maximo-campo",c.type="checkbox",c.checked=!!(a&&o.atributos&&o.atributos.minimo&&o.atributos.maximo),e.appendChild(r),e.appendChild(c),t.appendChild(e);const m=document.createElement("DIV");m.classList.add("campo-minimo-maximo"),c.oninput=t=>{this.crearMinioMMaximoCampoExtra(t.target.checked,m)},setTimeout(()=>{a&&c.checked&&this.crearMinioMaximoCampoExtra(c.checked,m,o.atributos)},0),t.appendChild(m)}if(5===e||6===e){const{opciones:e}=o,n=document.createElement("DIV"),i=document.createElement("LABEL"),r=document.createElement("INPUT");n.classList.add("campo"),i.textContent="Numero de Opciones",i.setAttribute("for","num-opciones-campo"),r.placeholder="Numero de Opciones",r.type="number",r.min="1",r.max="15",r.name="num-opciones-campo",r.id="num-opciones-campo",r.value=a&&e?e.length:"",n.appendChild(i),n.appendChild(r);const c=document.createElement("DIV");c.classList.add("contenedor-opciones-campo"),r.oninput=t=>{if(limpiarHtml(c),""===t.target.value||isNaN(t.target.value)||t.target.value<1||t.target.value>15)return void UI.mostrarAlerta("Numero Invalido",t.target.parentElement);const e=t.target.parentElement.querySelector(".alerta");e&&e.remove(),this.crearOpcionesCampoExtra(c,t.target.value)},setTimeout(()=>{a&&this.crearOpcionesCampoExtra(c,r.value,e)},0),t.appendChild(n),t.appendChild(c)}const n=document.createElement("BUTTON");if(n.type="submit",n.classList.add(a?"boton-azul":"boton-verde"),n.textContent=a?"Guardar Cambios":"Crear Campo",t.appendChild(n),a){const e=document.createElement("BUTTON");e.textContent="Cancelar",e.classList.add("boton-naranja"),t.appendChild(e),e.onclick=()=>{this.mostrarModalCamposExtras()}}t.parentElement.onsubmit=t=>{t.preventDefault(),this.validarCampoExtra(t.target,e,a)}}mostrarModalOpciones(){const t=document.createElement("DIV"),e=document.createElement("H2");e.textContent="Opciones: ";const o=document.createElement("DIV");o.classList.add("seccion","contenedor-opciones");const a=document.createElement("P");a.textContent="No Hay Opciones",o.appendChild(a),t.appendChild(e),t.appendChild(o),UI.crearModal(t)}mostrarEliminarOpcion(t){Swal.fire({title:"Atencion",text:"¿Deseas Eliminar La Opcion?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si",cancelButtonText:"No"}).then(e=>{e.isConfirmed&&(test.eliminarOpcion(t),this.mostrarModalOpciones(),cambiarPagina(2),this.validarMaximoInstrucciones(),Swal.fire({title:"Exito",text:"La Opcion Ha Sido Eliminada",icon:"success"}))})}}