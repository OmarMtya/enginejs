import { Figura } from './figura.class.js';
import { Rigido } from './rigido.class.js';
import { Transform } from './transform.class.js';
class Environment {
    static canvas;
    static FPS = 60;
    static altura = 800;
    static anchura = 800;
    static container;
    static gravedad = 9.8;
    static figuras = [];
    static contador = 0; // Contador de Frames registrados
    static audioGeneral;
    static backup = [];

    /**
     * Función que inicializa el canvas mediante un container
     * @param {HTMLCanvas} canvas 
     * @param {HTML} container - Elemento HTML para calcular dinámicamente el HTML
     */
    static InitCanvas(canvas, container) {
        Environment.canvas = canvas.getContext("2d");
        Environment.container = container;
        Environment.altura = container.offsetHeight - 4;
        Environment.anchura = container.offsetWidth;
        canvas.setAttribute('height', Environment.altura);
        canvas.setAttribute('width', Environment.anchura);
    }

    /**
     * Función para inicializar el canvas con altura y anchura estatica
     * @param {HTMLCanvas} canvas 
     * @param {int} altura 
     * @param {int} anchura 
     */
    static InitCanvasStatic(canvas, anchura, altura) {
        Environment.canvas = canvas.getContext("2d");
        Environment.anchura = anchura;
        Environment.altura = altura;
    }

    static AgregarFigura(figura){
        Environment.figuras.push(figura);
    }

    static Copy(obj){
        console.log(obj);
        
        let clon = JSON.parse(JSON.stringify(obj));

        return new Figura({
            id: clon.id,
            nombre: clon.nombre,
            tipo: clon.tipo,
            transform: new Transform({
                x: clon.transform.x,
                y: clon.transform.y,
                anchura: clon.transform.anchura,
                altura: clon.transform.altura,
                relleno: clon.transform.relleno,
                imagen: clon.transform.imagen,
                radio: clon.transform.radio,
                sonido: clon.transform.sonido
            }),
            rigido: new Rigido(clon.rigido.valor, clon.rigido.sinColision)
        });
    }
}

export { Environment };