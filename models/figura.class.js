class Figura {
    constructor({tipo, transform, rigido = null, audio = null}){
        this.tipo = tipo;
        this.transform = transform;
        this.rigido = rigido;
        this.audio = audio;
    }

    afectarGravedad = function(){
        console.log("Afectado");
        this.transform.y += this.rigido.valor;
        console.log(this.transform.y);
        
    }
}

export { Figura };