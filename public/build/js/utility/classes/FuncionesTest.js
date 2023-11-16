import{RUTA_IMAGENES_USUARIOS}from"../utilidades.js";import UI from"../../layout/UI.js";export default class FuncionesTest{constructor(e,t,o,n){this.test=e,this.tipoTest=t,this.categoria=o,this.usuario=n}mostrarAside(){const{nombre:e,apellido:t,imagen:o,usuario:n}=this.usuario,a=document.querySelector(".aside-visible"),c=document.createElement("A");c.href="/usuario/"+n,c.classList.add("autor");const r=document.createElement("IMG");r.src=`${RUTA_IMAGENES_USUARIOS}${n}/${o}`,r.width=100,r.height=100;const i=document.createElement("SPAN");i.classList.add("nombre"),i.textContent=`${e} ${t}`;const d=document.createElement("SPAN");d.classList.add("usuario"),d.textContent=n,c.appendChild(r),c.appendChild(i),c.appendChild(d);const s=document.createElement("DIV");s.classList.add("favorito","inactivo"),a.appendChild(c),a.appendChild(s),this.modalesInformacion()}modalesInformacion(){const e=document.querySelector("#informacion-test"),t=document.querySelector("#tipo-test"),o=document.querySelector("#informacion-categoria");e.addEventListener("click",()=>{this.crearModalSobreTest()}),t.addEventListener("click",()=>{this.crearModalTipoTest()}),o.addEventListener("click",()=>{this.crearModalSobreCategoria()})}crearModalSobreTest(){const{nombre:e,descripcion:t,instrucciones:o}=this.test,n=document.createElement("DIV"),a=document.createElement("H2"),c=document.createElement("BLOCKQUOTE"),r=document.createElement("BLOCKQUOTE");a.textContent=e,c.textContent=t,r.textContent=o,n.appendChild(a),n.appendChild(c),n.appendChild(r),UI.crearModal(n)}crearModalTipoTest(){const{nombre:e,instrucciones:t}=this.tipoTest,o=document.createElement("DIV"),n=document.createElement("H2"),a=document.createElement("BLOCKQUOTE");n.textContent="Test tipo "+e,a.textContent=t,o.appendChild(n),o.appendChild(a),UI.crearModal(o)}crearModalSobreCategoria(){const{nombre:e,descripcion:t}=this.categoria,o=document.createElement("DIV"),n=document.createElement("H2"),a=document.createElement("BLOCKQUOTE");n.textContent="Test de Categoria: "+e,a.textContent=t,o.appendChild(n),o.appendChild(a),UI.crearModal(o)}}