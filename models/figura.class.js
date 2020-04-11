import { Environment } from "./environment.class.js";
class Figura {
    constructor({id, tipo, transform, rigido = null, audio = null}){
        this.id = id;
        this.tipo = tipo;
        this.transform = transform;
        this.rigido = rigido;
        this.audio = audio;
    }

    afectarGravedad = function(){
        this.transform.y += this.rigido.valor;
    }

    tocandoFondo = function () {
        let fondo = Environment.altura - this.transform.altura;
        if (this.transform.y >= fondo) { // Si el fondo de la figura está igual que el fondo, o mayor
            this.transform.y = fondo;
            this.rigido.colision = true;
            return this.rigido.colision;
        }
        this.rigido.colision = false; // IMPORTANTE QUITARLO SI FALLA
        return this.rigido.colision;
    }

    tocandoRigidos = function(){
        let figuras = Environment.figuras.filter((x) => x != this);

        figuras.forEach((figura) => {
            if (this.transform.x < (figura.transform.x + figura.transform.anchura) - this.rigido.valor &&
                this.transform.x + this.transform.anchura > figura.transform.x - this.rigido.valor &&
                this.transform.y < (figura.transform.y + figura.transform.altura) - this.rigido.valor &&
                this.transform.altura + this.transform.y > figura.transform.y - this.rigido.valor) { // Si se están tocando en el próximo vuelo de esta figura
                console.log("tocando");
                if(figura.transform.y > this.transform.y){ // Solamente si la figura a la que estoy tocando, está mas abajo que yo
                    let fondo = figura.transform.y - this.transform.altura; // Nuevo fondo final: Altura de la figura de abajo, menos la mía
                    this.transform.y = fondo;
                    this.rigido.colision = true;
                }
            } else { //
                this.rigido.colision = false;
            }
        });

    }

}

export { Figura };