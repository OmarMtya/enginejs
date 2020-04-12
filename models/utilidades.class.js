function Tocando (a, b, circulo) {
    if (circulo) {
        return a.transform.x < (b.transform.x + b.transform.anchura) &&
            a.transform.x + a.transform.anchura > b.transform.x &&
            a.transform.y < (b.transform.y + (b.transform.altura * 2)) - a.rigido.valor &&
            a.transform.altura + a.transform.y > (b.transform.y - b.transform.altura) - a.rigido.valor;
    } else {
        return a.transform.x < (b.transform.x + b.transform.anchura) &&
            a.transform.x + a.transform.anchura > b.transform.x &&
            a.transform.y < (b.transform.y + b.transform.altura) - a.rigido.valor &&
            a.transform.altura + a.transform.y > b.transform.y - a.rigido.valor;
    }
}

export { Tocando }