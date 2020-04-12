/**
 * Función que devuelve un boleano si dos figuras se están tocando en este tick o en el próximo
 * @param {Figura} a 
 * @param {Figura} b 
 * @param {Boolean} circulo 
 * @param {Boolean} calcularGravedad - Tomando en cuenta la gravedad para el próximo tick
 */
function Tocando (a, b, circulo, calcularGravedad = true) {
    if (a.rigido.sinColision || b.rigido.sinColision){
        return false;
    }
    let fixGravedad = 0; // Variable para calcular si se necesita calcular la gravedad
    if (calcularGravedad) {
        fixGravedad = a.rigido.valor;
    }
    if (circulo) {
        return a.transform.x < (b.transform.x + b.transform.anchura) &&
            a.transform.x + a.transform.anchura > b.transform.x &&
            a.transform.y < (b.transform.y + (b.transform.altura * 2)) - fixGravedad &&
            a.transform.altura + a.transform.y > (b.transform.y - b.transform.altura) - fixGravedad;
    } else {
        return a.transform.x < (b.transform.x + b.transform.anchura) &&
            a.transform.x + a.transform.anchura > b.transform.x &&
            a.transform.y < (b.transform.y + b.transform.altura) - fixGravedad &&
            a.transform.altura + a.transform.y > b.transform.y - fixGravedad;
    }
}

export { Tocando }