class Sonido{
    constructor({src, activacion}){
        this.src = src;
        this.activacion = activacion;
        if(this.activacion == 'inicial'){
            this.src.play();
        }
    }
}
export { Sonido }