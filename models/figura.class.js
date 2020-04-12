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
        this.rigido.valor += (this.rigido.valor / 60);
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
        let figuras = Environment.figuras.filter((x) => x != this && !x.rigido.sinColision);
        if (this.rigido.gravedadReiniciada) {
            this.rigido.gravedadReiniciada = false;
            this.rigido.colision = false;
        }

        figuras.forEach((figura) => {
            if (this.transform.x < (figura.transform.x + figura.transform.anchura)&&
                this.transform.x + this.transform.anchura > figura.transform.x &&
                this.transform.y < (figura.transform.y + figura.transform.altura) - this.rigido.valor &&
                this.transform.altura + this.transform.y > figura.transform.y - this.rigido.valor) { // Si se están tocando en el próximo vuelo de esta figura, solamente en el eje de las Y
                if(figura.transform.y > this.transform.y){ // Solamente si la figura a la que estoy tocando, está mas abajo que yo
                    let fondo = figura.transform.y - this.transform.altura; // Nuevo fondo final: Altura de la figura de abajo, menos la mía
                    this.transform.y = fondo;
                    this.rigido.colision = true;
                    if(figura.tocadoPor != this){
                        figura.tocadoPor = this;
                        figura.rigido.valor = this.rigido.valor; // El objeto afectado por el golpe toma la gravedad del objeto
                        this.rigido.valor = this.rigido.valorBackup; // Se reinicia la gravedad del objeto
                        this.rigido.gravedadReiniciada = true; // Se acaba de reiniciar
                    }
                } else { // El colisión en falso va al objeto que está debajo. No va en el siguiente else, porque FIGURA y THIS sí se están tocando (Se comen entre ellos)
                    this.rigido.colision = false;
                }
            }
        });

    }

}

export { Figura };