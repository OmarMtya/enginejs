import { Dibujar, Error, Inicializar } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";
import { Imagen, Sprite } from "./models/multimedia/imagen.class.js";
import { Sonido } from "./models/multimedia/sonido.class.js";

let $ = (x) => document.querySelector(x);

Environment.agregarFigura(new Figura({
        tipo: "cuadrado",
        tipo: "cuadrado",
        transform: new Transform({
            x: 500,
            y: 0,
            anchura: 20,
            altura: 20,
            relleno: "#00FF00"
        }),
        rigido: new Rigido()
    }));


$("#imagen").onchange = function(e){
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    Environment.agregarFigura(new Figura({
        tipo: "imagen",
        transform: new Transform({
            x: 0,
            y: 0,
            altura: 100,
            anchura: 100,
            imagen: new Imagen(
                img, 
                new Sprite(
                    $("#rows").value - 1,
                    $("#cols").value,
                    $("#altura").value,
                    $("#anchura").value,
                    $("#velocidad").value
                )
            ),
        }),
        rigido: new Rigido()
    }));
};

$("#audio").onchange = function(e){
    let audio = new Audio();
    audio.src = URL.createObjectURL(this.files[0]);
    Environment.agregarFigura(new Figura({
        tipo: "cuadrado",
        tipo: "cuadrado",
        transform: new Transform({
            sonido: new Sonido({
                src: audio,
                activacion: 'colisionInversa'
            }),
            x: 500,
            y: 0,
            anchura: 20,
            altura: 20,
            relleno: "#00FF00"
        }),
        rigido: new Rigido()
    }));
};

Inicializar();

Dibujar();

setInterval(() => {
    Dibujar();
}, 1000 / Environment.FPS);
