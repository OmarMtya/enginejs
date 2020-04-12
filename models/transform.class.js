class Transform{
    constructor({x, y, altura = 0, anchura = 0, radio = 0, relleno = "#000000", imagen = null, sonido = null}){
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.radio = radio;
        this.anchura = anchura;
        this.relleno = relleno;
        this.imagen = imagen;
        this.sonido = sonido;

        if(this.radio != 0){ // Es circulo
            this.anchura = this.radio;
            this.altura = this.radio;
        }
    }
}
export { Transform };
