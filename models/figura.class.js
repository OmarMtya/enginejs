import { Environment } from "./environment.class.js";
class Figura {
    constructor({tipo, transform, rigido = null, audio = null}){
        this.tipo = tipo;
        this.transform = transform;
        this.rigido = rigido;
        this.audio = audio;
    }

    afectarGravedad = function(){
        this.transform.y += this.rigido.valor;
        
    }

    tocandoFondo = function(){
       let fondo = Environment.altura - this.transform.altura;
       console.log(this.transform.altura);
       if(this.transform.y > fondo){
           this.transform.y = fondo;
       }
    }
}

export { Figura };