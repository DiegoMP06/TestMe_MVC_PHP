export const RUTA_IMAGENES_USUARIOS = "/imagenes/users/";
export const RUTA_IMAGENES_CATEGORIA = "/imagenes/categorias/";

export function obtenerUrl() {
    const windowParams = new URLSearchParams(window.location.search);
    const parametros = Object.fromEntries(windowParams.entries());
    return parametros.url; 
}

export function limpiarHtml(referencia) {
    while (referencia.firstChild) {
        referencia.removeChild(referencia.firstChild);
    }
}