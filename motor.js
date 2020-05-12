import { Environment } from "./models/environment.class.js";
import { Tocando } from "./models/utilidades.class.js";

let start;
let requestId;
let animando = false;

/**
 * Función que dibuja los objetos dentro del canvas
 * @param {*} sinAvance - Calcular el siguiente paso
 */
function Dibujar(sinAvance = true){
    if(!sinAvance && !animando){
        Inicializar();
    }
    animando = true;
    Environment.contador += 1;
    const c = Environment.canvas;
    c.clearRect(0, 0, Environment.anchura, Environment.altura); // Limpia el canvas
    c.beginPath(); // Importante limpiar las líneas ya creadas
    

    Environment.figuras.forEach((figura)=>{ // Dibuja los objetos
        const transform = figura.transform;
        switch (figura.tipo) {
            case "circulo": // En el circulo, el tamaño solamente se toma en cuenta la altura
                c.fillStyle = transform.relleno;
                c.arc(transform.x, transform.y, transform.radio, 0, 2 * Math.PI);
                c.fill();
                break;
            case "cuadrado":
                c.fillStyle = transform.relleno;
                c.fillRect(transform.x, transform.y, transform.anchura, transform.altura);
                c.stroke();
                break;
            case "imagen":
                if(!transform.imagen){
                    console.error("Objeto tipo imagen no contiene una imagen");
                    return;
                }
                if(transform.imagen.sprite){
                    DibujarSprite(c, transform);
                }else{
                    try {
                        c.drawImage(transform.imagen.src, 0, 0, transform.imagen.src.width, transform.imagen.src.height, transform.x, transform.y, transform.anchura, transform.altura);
                    } catch (error) {
                        console.error("La imagen ingresada no tiene formato de objeto tipo \"Image\"");
                    }
                }
                break;
        }
    });

    if(!sinAvance){
        calcularSiguientePaso();
    }
    
}

function calcularSiguientePaso(){
    // Calcula el próximo movimiento
    [...Environment.figuras].sort((a, b) => { // Ordenar por la Y, para evitar problemas de físicas. (...) se clona para no manipular el original
        if (a.transform.y > b.transform.y) {
            return -1;
        }
        if (a.transform.y < b.transform.y) {
            return 1;
        }
        return 0;
    }).forEach(figura => { // Por cada figura creada, se redibuja
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

function DibujarSprite(c, transform){
    let {src, sprite} = transform.imagen;
    let frameX = sprite.anchura * sprite.frame.valor; // El valor de la X es igual a la anchura de cada imagen por el valor del frame
    c.drawImage(src, frameX, sprite.altura * sprite.row, sprite.anchura, sprite.altura, transform.x, transform.y, sprite.anchura, sprite.altura);
    if(sprite.frame.ultimo < Date.now() - (sprite.velocidad * 1000) ){ // Si el ultimo frame actualizado es mas pequeño que el tiempo actual más los segundos de cada frame
        sprite.frame.valor = ++sprite.frame.valor % sprite.cols;
        sprite.frame.ultimo = Date.now();
    }
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
                    pivote.transform.x = figura.transform.x - (figura.transform.radio * 3);
                } else {
                    if(pivote.tipo == 'circulo'){
                        pivote.transform.x = (pivote.transform.x + pivote.transform.radio) + figura.transform.anchura; // Se empuja a la izquierda del punto de origen de la otra figura
                    }else{
                        pivote.transform.x = pivote.transform.x + figura.transform.anchura; // Se empuja a la izquierda del punto de origen de la otra figura
                    }
                }
            }
        }
    });

    Environment.figuras.filter((x)=> x.transform.sonido && x.transform.sonido.src && x.transform.sonido.activacion == 'inicial').forEach(objeto => {
        objeto.transform.sonido.src.play();
    });
}

function Step(timestamp) {
    if (!start) start = timestamp;
    Dibujar(false);
    requestId = window.requestAnimationFrame(Step);
}

function IniciarAnimacion(){
    Inicializar();
    Environment.backup = Environment.figuras.map((x) => Environment.Copy(x) );
    requestId = window.requestAnimationFrame(Step);
}

function DetenerAnimacion(){
    if(requestId){
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
        Environment.figuras = Environment.backup.map(x => Environment.Copy(x) );
        animando = false;
        Environment.figuras.filter((x) => x.transform.sonido && x.transform.sonido.src && x.transform.sonido.activacion == 'inicial').forEach(objeto => {
            objeto.transform.sonido.src.pause();
        });
    }
}

function Error(){
    throw "EXISTE UN ERROR";
}

export { Error, IniciarAnimacion, DetenerAnimacion, Step, Dibujar }