import EduTest from"./EduTest.js";import{test,visita}from"./funcionesTestEdu.js";export default class EduTestBasico extends EduTest{mostrarFormulario(e){const{preguntas:t,opciones:o}=test,n=document.createElement("DIV");n.classList.add("contenedor-test"),t.forEach((e,t)=>{const a=document.createElement("DIV");a.classList.add("campo-radio");const{pregunta:s,id:d}=e,c=document.createElement("P");c.textContent=`${t+1}. ${s}`,c.dataset.for=d,a.appendChild(c);const i=document.createElement("DIV");i.classList.add("opciones-test"),i.dataset.name=d;const r={id:Math.round(Math.random()*Date.now()),name:d,pregunta:s,opciones:[],valor:{}};o.forEach((e,t)=>{const{id:o,opcion:n,valor:a}=e,s=document.createElement("DIV");s.classList.add("radio");const c=document.createElement("LABEL"),p=document.createElement("INPUT");c.textContent=`${t+1}. ${n}`,c.setAttribute("for",`${d}_${o}`),p.type="radio",p.id=`${d}_${o}`,p.name=d,p.oninput=e=>{this.sincronizarCampos(d,o)},s.appendChild(p),s.appendChild(c),i.appendChild(s);const m={id:o,opcion:n,valor:a};r.opciones=[...r.opciones,m]}),a.appendChild(i),n.appendChild(a),visita.agregarCampo(r)}),e.appendChild(n)}}