class Transform{
    constructor({x, y, altura = 0, anchura = 0, relleno = "#000000", imagen = null}){
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.anchura = anchura;
        this.relleno = relleno;
        this.imagen = imagen;
    }
}
export { Transform };
