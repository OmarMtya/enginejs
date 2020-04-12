import { Environment } from "./models/environment.class.js";
import { Tocando } from "./models/utilidades.class.js";

function Dibujar(){
    Environment.contador += 1;
    const c = Environment.canvas;
    c.clearRect(0, 0, Environment.anchura, Environment.altura); // Limpia el canvas
    c.beginPath(); // Importante limpiar las líneas ya creadas
    


    

    Environment.figuras.forEach((figura)=>{
        const transform = figura.transform;
        switch (figura.tipo) {
            case "circulo": // En el circulo, el tamaño solamente se toma en cuenta la altura
                c.fillStyle = transform.relleno;
                c.arc(transform.x, transform.y, transform.radio, 0, 2 * Math.PI);
                break;
            case "cuadrado":
                c.fillStyle = transform.relleno;
                c.fillRect(transform.x, transform.y, transform.anchura, transform.altura);
                break;
            case "imagen":
                c.drawImage(transform.imagen, 0, 0, transform.imagen.width, transform.imagen.height, transform.x, transform.y, transform.anchura, transform.altura);
                break;
        }
        c.stroke();
    });

    [...Environment.figuras].sort((a , b) => { // Ordenar por la Y, para evitar problemas de físicas. (...) se clona para no manipular el original
        if(a.transform.y > b.transform.y){
            return -1;
        }
        if(a.transform.y < b.transform.y){
            return 1;
        }
        return 0;
    } ) .forEach(figura => { // Por cada figura creada, se redibuja
        if (figura.rigido) {
            if (!figura.rigido.sinColision) { // Si está definido el objeto como que si puede detectar colisiones
                figura.tocandoRigidos();
                if (!figura.rigido.colision) { // Si está en colisión, la gravedad no le afecta en un frame
                    figura.afectarGravedad();
                    figura.tocandoFondo();
                }
            } else {
                figura.afectarGravedad();
            }
        }
    });

    
}

/**
 * Funcion que inicializa el canvas con reglas de superposición y otros
 */
function Inicializar() {

    Environment.figuras.forEach((pivote, index) => { // Empieza el ordenamiento burbuja para mover a los objetos que se tocan al incio del renderizado
        if(index === Environment.figuras.length){
            return;
        }
        for (let i = 0; i < (Environment.figuras.length); i++) {
            const figura = Environment.figuras[i];
            if(pivote == figura){
                return;
            }
            if (Tocando(pivote, figura, figura.tipo == 'circulo', false)) {
                if (figura.tipo == 'circulo') {
                    pivote.transform.x = figura.transform.x - (pivote.transform.anchura + figura.transform.anchura); // Si es circulo lo empuja a la izquierda mas la anchura de ambos
                } else {
                    pivote.transform.x = figura.transform.x - pivote.transform.anchura; // Se empuja a la izquierda del punto de origen de la otra figura
                }
            }
        }
    });
}

function Error(invoker){
    console.error("EXISTE UN ERROR", invoker);
}

export { Dibujar, Error, Inicializar }