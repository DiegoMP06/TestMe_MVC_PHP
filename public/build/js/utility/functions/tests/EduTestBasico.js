import EduTest from"./EduTest.js";import{test}from"./funcionesTestEdu.js";export default class EduTestBasico extends EduTest{mostrarFormulario(t){const{preguntas:e,opciones:o}=test,n=document.createElement("DIV");n.classList.add("contenedor-test"),e.forEach(t=>{const e=document.createElement("DIV");e.classList.add("campo-radio");const{pregunta:a,id:s}=t,d=document.createElement("P");d.textContent=a,d.dataset.for=s,e.appendChild(d);const c=document.createElement("DIV");c.classList.add("opciones-test"),c.dataset.name=s;const i={id:Math.round(Math.random()*Date.now()),name:s,pregunta:a,opciones:[],valor:{}};o.forEach((t,e)=>{const{id:o,opcion:n,valor:a}=t,d=document.createElement("DIV");d.classList.add("radio");const r=document.createElement("LABEL"),p=document.createElement("INPUT");r.textContent=`${e+1}. ${n}`,r.setAttribute("for",`${s}_${o}`),p.type="radio",p.id=`${s}_${o}`,p.name=s,p.oninput=t=>{this.sincronizarCampos(s,o)},d.appendChild(p),d.appendChild(r),c.appendChild(d);const m={id:o,opcion:n,valor:a};i.opciones=[...i.opciones,m]}),e.appendChild(c),n.appendChild(e),this.campos=[...this.campos,i]}),t.appendChild(n)}}