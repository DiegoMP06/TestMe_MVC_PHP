import{limpiarHtml}from"../utility/utilidades.js";import UI from"../layout/UI.js";!function(){const e=document.querySelector("#formulario-test"),t=document.querySelector("#aside-visible");let n=[],o=[];const a={nombre:"",descripcion:"",instrucciones:"",opciones:[],preguntas:[],numOpciones:"",numPreguntas:"",categoriaId:"",tipoTestId:"",usuarioId:""};let c=1;function r(){switch(limpiarHtml(e),c){case 1:!function(){const{nombre:t,descripcion:c,categoriaId:r,tipoTestId:i}=a,s=document.createElement("DIV"),l=document.createElement("LABEL"),p=document.createElement("INPUT");s.classList.add("campo"),l.textContent="Nombre: ",l.setAttribute("for","nombre"),p.classList.add("input"),p.placeholder="Nombre del Test",p.name="nombre",p.id="nombre",p.value=t,s.appendChild(l),s.appendChild(p);const m=document.createElement("DIV"),u=document.createElement("LABEL"),C=document.createElement("TEXTAREA");m.classList.add("campo"),u.textContent="Descripcion: ",u.setAttribute("for","descripcion"),C.classList.add("input"),C.placeholder="Descipcion del Test",C.name="descripcion",C.id="descripcion",C.value=c,m.appendChild(u),m.appendChild(C);const E=document.createElement("DIV"),h=document.createElement("LABEL"),I=document.createElement("SELECT");E.classList.add("campo"),h.textContent="Categoria: ",h.setAttribute("for","categoriaId"),I.classList.add("input"),I.name="categoriaId",I.id="categoriaId";const b=document.createElement("OPTION");b.value="",b.textContent="-- Seleccione --",b.selected=!0,b.disabled=!0,I.appendChild(b),n.forEach(e=>{const{id:t,nombre:n}=e,o=document.createElement("OPTION");o.value=t,o.textContent=n,parseInt(e.id)===parseInt(r)&&(o.selected=!0),I.appendChild(o)}),E.appendChild(h),E.appendChild(I);const g=document.createElement("DIV"),L=document.createElement("LABEL"),f=document.createElement("SELECT");g.classList.add("campo"),L.textContent="Tipo de Test: ",L.setAttribute("for","tipoTestId"),f.classList.add("input"),f.name="tipoTestId",f.id="tipoTestId";const T=document.createElement("OPTION");T.value="",T.textContent="-- Seleccione --",T.selected=!0,T.disabled=!0,f.appendChild(T),o.forEach(e=>{const{id:t,nombre:n}=e,o=document.createElement("OPTION");o.value=t,o.textContent=n,parseInt(e.id)===parseInt(i)&&(o.selected=!0),f.appendChild(o)}),g.appendChild(L),g.appendChild(f);const A=document.createElement("BUTTON");A.classList.add("boton-azul"),A.type="button",A.textContent="Siguiente",A.onclick=e=>{d(e.target.parentElement)},e.appendChild(s),e.appendChild(m),e.appendChild(E),e.appendChild(g),e.appendChild(A)}();break;case 2:!function(){const t=document.createElement("DIV"),n=document.createElement("DIV"),o=document.createElement("LABEL"),i=document.createElement("INPUT");t.classList.add("campo-pregunta","seccion"),n.classList.add("campo"),o.textContent="Pregunta: ",o.setAttribute("for","pregunta"),i.placeholder="Nueva Pregunta",i.id="pregunta",i.name="pregunta",n.appendChild(o),n.appendChild(i),t.appendChild(n);const{tipoTestId:s}=a;switch(parseInt(s)){case 1:const n=document.createElement("BUTTON");n.type="button",n.textContent="Agregar Pregunta",n.classList.add("boton-verde"),n.onclick=e=>{!function(e){const t=e.querySelector(".campo #pregunta"),n=t.value.trim();if(""===n)return void UI.mostrarAlerta("La Pregunta es Obligatoria",e);const o={id:Date.now(),pregunta:n};a.preguntas=[...a.preguntas,o],t.value="",UI.mostrarAlerta("La Pregunta se Agrego Corretamente",e,"exito")}(e.target.parentElement)},t.appendChild(n);const o=document.createElement("DIV"),c=document.createElement("DIV"),r=document.createElement("LABEL"),d=document.createElement("INPUT");o.classList.add("campo-opcion","seccion"),c.classList.add("campo"),r.setAttribute("for","opcion"),r.textContent="Opcion: ",d.name="opcion",d.id="opcion",d.placeholder="Nueva Opcion";const i=document.createElement("DIV"),s=document.createElement("LABEL"),l=document.createElement("INPUT");i.classList.add("campo"),s.setAttribute("for","valor"),s.textContent="Valor: ",l.name="valor",l.id="valor",l.placeholder="Valor de la Opcion",l.type="number",l.min=1,l.max=10;const p=document.createElement("BUTTON");p.type="button",p.textContent="Agregar Opcion",p.classList.add("boton-verde"),p.onclick=e=>{!function(e){const{tipoTestId:t}=a,n=e.querySelector(".campo #opcion"),o=n.value.trim(),c=e.querySelector(".campo #valor"),r=c.value.trim();switch(parseInt(t)){case 1:if(""===o||""===r)return void UI.mostrarAlerta("Todos los Campos Son Obligatorios",e);if(isNaN(r)||r<1||r>10)return void UI.mostrarAlerta("Valor Invalido",e);const t={id:Date.now(),opcion:o,valor:r};a.opciones=[...a.opciones,t],n.value="",c.value="",UI.mostrarAlerta("La Opcion se Agrego Correctamente",e,"exito");break;case 2:case 3:break;default:console.error("Hubo un Error")}console.log(a)}(e.target.parentElement)},c.appendChild(r),c.appendChild(d),i.appendChild(s),i.appendChild(l),o.appendChild(c),o.appendChild(i),o.appendChild(p),e.appendChild(t),e.appendChild(o);break;case 2:case 3:e.appendChild(t);break;default:console.error("Hubo Un Error")}const l=document.createElement("BUTTON");l.classList.add("boton-azul"),l.type="button",l.textContent="Anterior",l.onclick=e=>{c--,r()};const p=document.createElement("BUTTON");p.classList.add("boton-azul"),p.type="button",p.textContent="Siguiente",p.onclick=e=>{d(e.target.parentElement)},e.appendChild(l),e.appendChild(p)}();break;case 3:break;default:console.error("Hubo UN error")}}function d(e){const t={};switch(document.querySelectorAll(".campo .input").forEach(e=>t[e.name]=e.value.trim()),c){case 1:const{nombre:d,descripcion:i,categoriaId:s,tipoTestId:l}=t;if(""===d||""===i||""===s||""===l)return void UI.mostrarAlerta("Todos los campos son Obligatorios",e);const p=n.filter(e=>parseInt(e.id)===parseInt(s)),m=o.filter(e=>parseInt(e.id)===parseInt(l));if(0===p.length||0===m.length)return void UI.mostrarAlerta("Datos Invalidos",e);Object.entries(t).forEach(([e,t])=>{a.hasOwnProperty(e)&&(a[e]=t)}),c++,r();break;case 2:case 3:break;default:console.error("Hubo UN error")}}!async function(){try{const e=await Promise.all([fetch("/api/categorias"),fetch("/api/tipostests")]),[c,d]=e,i=await c.json(),s=await d.json();"exito"===i.tipo&&"exito"===s.tipo&&(n=i.categorias,o=s.tiposTests,r(),function(){const e=document.createElement("DIV");e.classList.add("opciones");const n=document.createElement("BUTTON");n.textContent="Mostrar Preguntas",n.classList.add("boton-gris-block"),n.onclick=()=>{!function(){const e=document.createElement("DIV"),{preguntas:t}=a,n=document.createElement("H2");n.textContent="Preguntas: ";const o=document.createElement("DIV");if(o.classList.add("seccion","contenedor-preguntas"),0===t.length){const e=document.createElement("P");e.textContent="No Hay Preguntas",o.appendChild(e)}else t.forEach(({pregunta:e},t)=>{const n=document.createElement("LI"),a=document.createElement("SPAN"),c=document.createElement("SPAN");a.textContent=`Pregunta ${t+1}: `,c.textContent=e,n.appendChild(a),n.appendChild(c),o.appendChild(n)});e.appendChild(n),e.appendChild(o),UI.crearModal(e)}()};const o=document.createElement("BUTTON");o.textContent="Mostrar Opciones",o.classList.add("boton-gris-block"),o.onclick=()=>{!function(){const e=document.createElement("DIV"),{opciones:t,tipoTestId:n}=a,o=document.createElement("H2");o.textContent="Opciones: ";const c=document.createElement("DIV");if(c.classList.add("seccion","contenedor-opciones"),0===t.length){const e=document.createElement("P");e.textContent="No Hay Opciones",c.appendChild(e)}else switch(parseInt(n)){case 1:t.forEach(({opcion:e,valor:t},n)=>{const o=document.createElement("LI"),a=document.createElement("SPAN"),r=document.createElement("SPAN"),d=document.createElement("P");a.textContent=`Opcion ${n+1}: `,r.textContent=e,d.textContent="Valor: "+t,o.appendChild(a),o.appendChild(r),o.appendChild(d),c.appendChild(o)});break;case 2:case 3:break;default:console.error("Hubo Un Problema")}e.appendChild(o),e.appendChild(c),UI.crearModal(e)}()},e.appendChild(n),e.appendChild(o),t.appendChild(e)}())}catch(e){console.log(e)}}()}();