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
        let {x, y, altura, anchura} = this.transform;
        let objetoColision = [];
        figuras.forEach((figura) => {
            if (objetoColision.length > 0) {
                return;
            }
            if (x < figura.transform.x + figura.transform.anchura && x + anchura > figura.transform.x && y < figura.transform.y + figura.transform.altura && altura + y > figura.transform.y) {
                if(!figura.rigido.sinColision){
                    objetoColision.push(figura);
                }
            }else{
                this.rigido.colision = false;
            }
        });

        objetoColision.forEach(obj => {
            if ((obj.transform.y) > (this.transform.y)) { // Si el otro objeto está más abajo que YO
                obj.rigido.valor = this.rigido.valor; // Equilibra la gravedad de los dos objetos
                if(obj.tocandoFondo()){
                    obj.rigido.colision = true;
                }else{
                    obj.rigido.colision = false;
                }
            }else{
                obj.rigido.colision = true;
            }
        });

        return false;
    }

}

export { Figura };