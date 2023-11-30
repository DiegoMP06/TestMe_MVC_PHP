import { RUTA_IMAGENES_USUARIOS } from "../../utilidades.js";
import UI from "../../../layout/UI.js";

export default class FuncionesTest {
    constructor(test, tipoTest, categoria, usuario) {
        this.test = test;
        this.tipoTest = tipoTest;
        this.categoria = categoria;
        this.usuario = usuario;
    }

    mostrarAside() {
        const { nombre, apellido, imagen, usuario } = this.usuario;

        const asideContenedor = document.querySelector(".aside-visible");

        const autor = document.createElement("A");
        autor.href = `/usuario/${usuario}`;
        autor.classList.add("autor");

        const imagenAutor = document.createElement("IMG");
        imagenAutor.src = `${RUTA_IMAGENES_USUARIOS}${usuario}/${imagen}`;
        imagenAutor.width = 100;
        imagenAutor.height = 100;

        const nombreAutor = document.createElement("SPAN");
        nombreAutor.classList.add("nombre");
        nombreAutor.textContent = `${nombre} ${apellido}`;

        const usuarioAutor = document.createElement("SPAN");
        usuarioAutor.classList.add("usuario");
        usuarioAutor.textContent = usuario;

        autor.appendChild(imagenAutor);
        autor.appendChild(nombreAutor);
        autor.appendChild(usuarioAutor);

        const favorito = document.createElement("DIV");
        favorito.classList.add("favorito", "inactivo");

        asideContenedor.appendChild(autor);
        asideContenedor.appendChild(favorito);
    }

    crearModalSobreTest() {
        const { nombre, descripcion, instrucciones } = this.test;

        const contenido = document.createElement("DIV");
        const nombreH2 = document.createElement("H2");
        const descripcionBlock = document.createElement("BLOCKQUOTE");
        const instruccionesBlock = document.createElement("BLOCKQUOTE");

        nombreH2.textContent = nombre;
        descripcionBlock.textContent = descripcion;
        instruccionesBlock.textContent = instrucciones;

        contenido.appendChild(nombreH2);
        contenido.appendChild(descripcionBlock);
        contenido.appendChild(instruccionesBlock);

        UI.crearModal(contenido);
    }

    crearModalTipoTest() {
        const { nombre, instrucciones } = this.tipoTest;

        const contenido = document.createElement("DIV");
        const nombreH2 = document.createElement("H2");
        const instruccionesBlock = document.createElement("BLOCKQUOTE");

        nombreH2.textContent = `Test tipo ${nombre}`;
        instruccionesBlock.textContent = instrucciones;
        contenido.appendChild(nombreH2);
        contenido.appendChild(instruccionesBlock);

        UI.crearModal(contenido);
    }

    crearModalSobreCategoria() {
        const { nombre, descripcion } = this.categoria;

        const contenido = document.createElement("DIV");
        const nombreH2 = document.createElement("H2");
        const descripcionBlock = document.createElement("BLOCKQUOTE");

        nombreH2.textContent = `Test de Categoria: ${nombre}`;
        descripcionBlock.textContent = descripcion;

        contenido.appendChild(nombreH2);
        contenido.appendChild(descripcionBlock)

        UI.crearModal(contenido);
    }
}