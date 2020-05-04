import { Environment } from "./environment.class.js";
import { Tocando } from "./utilidades.class.js";
class Figura {
    constructor({nombre, tipo, transform, rigido = null}){
        this.id = Environment.GenerarId();
        this.tipo = tipo;
        this.transform = transform;
        this.rigido = rigido;
        if(nombre){
            this.nombre = nombre;
        }else{
            this.nombre = `Figura ${Environment.figuras.length + 1}`;
        }
    }

    afectarGravedad = function(){
        this.transform.y += this.rigido.valor;
        this.rigido.valor += (this.rigido.valor / (Environment.FPS * 100));
    }

    tocandoFondo = function () {
        let fondo;
        if(this.transform.imagen && this.transform.imagen.sprite){
            fondo = Environment.altura - (this.transform.imagen.sprite.altura); // Si es un sprite, tomar en cuenta el tamaño del sprite, no de la imagen
        }else{
            fondo = Environment.altura - this.transform.altura;
        }
        if (this.transform.y >= fondo) { // Si el fondo de la figura está igual que el fondo, o mayor
            this.transform.y = fondo;
            this.rigido.colision = true;
            return this.rigido.colision;
        }
        this.rigido.colision = false; // IMPORTANTE QUITARLO SI FALLA
        return this.rigido.colision;
    }

    tocandoRigidos = function(){
        let figuras = Environment.figuras.filter((x) => x != this && (x.rigido != undefined && !x.rigido.sinColision));
        if (this.rigido.gravedadReiniciada) {
            this.rigido.gravedadReiniciada = false;
            this.rigido.colision = false;
        }

        figuras.forEach((figura) => {
            if (Tocando(this, figura, figura.tipo == 'circulo')) { // Si se están tocando en el próximo vuelo de esta figura, solamente en el eje de las Y
                if(figura.transform.y > this.transform.y){ // Solamente si la figura a la que estoy tocando, está mas abajo que yo
                    let fondo = null;
                    if(figura.tipo == 'circulo'){
                        fondo = (figura.transform.y - figura.transform.radio) - this.transform.altura; // Nuevo fondo final: Altura de la figura de abajo, menos la mía
                    }else{
                        fondo = figura.transform.y - this.transform.altura; // Nuevo fondo final: Altura de la figura de abajo, menos la mía
                    }
                    this.transform.y = fondo;
                    this.rigido.colision = true;
                    if(figura.tocadoPor != this){
                        figura.tocadoPor = this;
                        figura.rigido.valor = this.rigido.valor; // El objeto afectado por el golpe toma la gravedad del objeto
                        // this.rigido.valor = this.rigido.valorBackup; // Se reinicia la gravedad del objeto
                        this.rigido.valor = Environment.gravedad; // Se reinicia la gravedad del objeto
                        this.rigido.gravedadReiniciada = true; // Se acaba de reiniciar
                    }
                } else { // El colisión en falso va al objeto que está debajo. No va en el siguiente else, porque FIGURA y THIS sí se están tocando (Se comen entre ellos)
                    this.rigido.colision = false;
                }
            }
        });

        
        
        if (this.transform.sonido && (this.transform.sonido.activacion == 'colision' || this.transform.sonido.activacion == 'colisionInversa')) {
            if (this.transform.sonido.activacion == 'colision'){
                if (this.rigido.colision && this.transform.sonido.src.paused ) {
                    this.transform.sonido.src.play();
                }
                if (!this.rigido.colision && !this.transform.sonido.src.paused) {
                    this.transform.sonido.src.pause();
                }
            }else{
                if (!this.rigido.colision && this.transform.sonido.src.paused) {
                    this.transform.sonido.src.play();
                }
                if (this.rigido.colision && !this.transform.sonido.src.paused) {
                    this.transform.sonido.src.pause();
                }
            }
        }

    }

}

export { Figura };