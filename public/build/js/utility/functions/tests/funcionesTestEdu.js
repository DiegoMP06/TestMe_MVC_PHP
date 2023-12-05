import{RUTA_IMAGENES_USUARIOS,limpiarHtml,obtenerUrl}from"../../utilidades.js";import UI from"../../../layout/UI.js";import Test from"../../classes/tests/Test.js";import TestBasico from"../../classes/tests/TestBasico.js";import TestMedio from"../../classes/tests/TestMedio.js";import TestAvanzado from"../../classes/tests/TestAvanzado.js";import EduTest from"./EduTest.js";import EduTestBasico from"./EduTestBasico.js";import EduTestMedio from"./EduTestMedio.js";import EduTestAvanzado from"./EduTestAvanzado.js";const asideVisible=document.querySelector("#aside-visible"),formulario=document.querySelector("#formulario-test"),nombreP=document.querySelector("#nombre-test");let categoria={},usuario={},tipoTest={},favorito={},sesion={};export let test=new Test;let funcionesTest=new EduTest;export async function consultarTest(){const t="/api/test?url="+obtenerUrl();try{const e=await Promise.all([fetch("/api/session"),fetch(t)]),[o,a]=e,i=await o.json(),s=await a.json();"exito"===s.tipo&&"exito"===i.tipo&&(sesion=i.session,darTipoTest(s.test))}catch(t){console.error(t)}}function darTipoTest(t){const{tipoTestId:e}=t;switch(parseInt(e)){case 1:test=new TestBasico(t),funcionesTest=new EduTestBasico;break;case 2:test=new TestMedio(t),funcionesTest=new EduTestMedio;break;case 3:test=new TestAvanzado(t),funcionesTest=new EduTestAvanzado;break;default:console.error("Hubo un error")}imprimirNombre(),consultarDatos()}async function consultarDatos(){const{categoriaId:t,usuarioId:e,tipoTestId:o,id:a}=test;try{const i="/api/categoria?id="+t,s="/api/usuario?id="+e,n="/api/tipotest?id="+o,r="/api/favorito?testId="+a,[c,d,l,m]=await Promise.all([fetch(i),fetch(s),fetch(n),fetch(r)]),p=await c.json(),u=await d.json(),f=await l.json(),T=await m.json();"exito"===p.tipo&&"exito"===u.tipo&&f.tipo&&"exito"===T.tipo&&(categoria=p.categoria,usuario=u.usuario,tipoTest=f.tipoTest,favorito=T.favorito??{},mostrarAside(),mostrarFormulario())}catch(t){console.error(t)}}async function crearFavorito(){const{id:t}=test,e=new FormData;e.append("testId",t);try{const t=await fetch("/api/favorito/crear",{method:"POST",body:e}),o=await t.json();"exito"===o.tipo&&(favorito=o.favorito,mostrarAside())}catch(t){console.log(t)}}async function eliminarFavorito(){const{id:t}=favorito,e=new FormData;e.append("id",t);try{const t=await fetch("/api/favorito/eliminar",{method:"POST",body:e});"exito"===(await t.json()).tipo&&(favorito={},mostrarAside())}catch(t){console.log(t)}}export async function crearVisita(){const t=new FormData,{camposExtra:e,campos:o,puntuacion:a,total:i}=funcionesTest,{id:s}=test;t.append("camposExtra",JSON.stringify(e)),t.append("campos",JSON.stringify(o)),t.append("puntuacion",a),t.append("total",i),t.append("testId",s);try{const e=await fetch("/api/visita/crear",{method:"POST",body:t}),o=await e.json();"exito"===o.tipo&&(funcionesTest.id=o.id,funcionesTest.mostrarInformacionTest(formulario))}catch(t){console.log(t)}}function imprimirNombre(){nombreP.textContent=test.nombre}function mostrarAside(){limpiarHtml(asideVisible);const{nombre:t,apellido:e,imagen:o,usuario:a}=usuario,i=document.createElement("A");i.href="/usuario/"+a,i.classList.add("autor");const s=document.createElement("IMG");s.src=`${RUTA_IMAGENES_USUARIOS}${a}/${o}`,s.width=100,s.height=100;const n=document.createElement("SPAN");n.classList.add("nombre"),n.textContent=`${t} ${e}`;const r=document.createElement("SPAN");r.classList.add("usuario"),r.textContent=a,i.appendChild(s),i.appendChild(n),i.appendChild(r);const c=document.createElement("DIV");c.classList.add("favorito",favorito.id?"activo":"inactivo"),c.onclick=t=>{añadirFavorito(t.target,favorito.id)},asideVisible.appendChild(i),asideVisible.appendChild(c);const d=document.createElement("DIV");d.classList.add("opciones");const l=document.createElement("BUTTON");l.textContent="Informacion del Test",l.classList.add("boton-gris-block");const m=document.createElement("BUTTON");m.textContent="Como Contestar el test",m.classList.add("boton-gris-block");const p=document.createElement("BUTTON");p.textContent="Informacion de la Categoria",p.classList.add("boton-gris-block"),l.addEventListener("click",()=>{crearModalSobreTest()}),m.addEventListener("click",()=>{crearModalTipoTest()}),p.addEventListener("click",()=>{crearModalSobreCategoria()}),d.appendChild(l),d.appendChild(m),d.appendChild(p),asideVisible.appendChild(d)}function añadirFavorito(t,e){e?eliminarFavorito(t):crearFavorito(t)}function crearModalSobreTest(){const{nombre:t,descripcion:e}=test,o=document.createElement("DIV"),a=document.createElement("H2"),i=UI.formatearDescripcion(e);a.textContent=t,o.appendChild(a),o.appendChild(i),UI.crearModal(o)}function crearModalTipoTest(){const{nombre:t,instrucciones:e}=tipoTest,o=document.createElement("DIV"),a=document.createElement("H2"),i=document.createElement("BLOCKQUOTE");a.textContent="Test tipo "+t,i.textContent=e,o.appendChild(a),o.appendChild(i),UI.crearModal(o)}function crearModalSobreCategoria(){const{nombre:t,descripcion:e}=categoria,o=document.createElement("DIV"),a=document.createElement("H2"),i=document.createElement("BLOCKQUOTE");a.textContent="Test de Categoria: "+t,i.textContent=e,o.appendChild(a),o.appendChild(i),UI.crearModal(o)}function mostrarFormulario(){if(funcionesTest.mostrarCamposExtra(formulario),funcionesTest.mostrarFormulario(formulario),parseInt(sesion.id)!==parseInt(test.usuarioId)){const t=document.createElement("BUTTON");t.textContent="Enviar",t.classList.add("boton-azul"),t.type="submit",formulario.appendChild(t),formulario.onsubmit=t=>{t.preventDefault(),funcionesTest.validarFormulario(t.target)}}}