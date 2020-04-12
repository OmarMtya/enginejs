import { Dibujar, Error, Inicializar } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";

let $ = (x) => document.querySelector(x);


Environment.agregarFigura(new Figura({
    id: "esteban",
    tipo: "cuadrado",
    transform: new Transform({
        x: 500,
        y: 10,
        anchura: 20,
        altura: 20,
        relleno: "#00FF00"
    }),
    rigido: new Rigido()
}));

Environment.agregarFigura(new Figura({
    id: "daniel",
    tipo: "cuadrado",
    transform: new Transform({
        x: 500,
        y: 0,
        altura: 20,
        anchura: 20,
        relleno: "#000000"
    }),
    rigido: new Rigido(Environment.gravedad, true)
}));





$("#imagen").onchange = function(e){
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    Environment.agregarFigura(new Figura({
        tipo: "imagen",
        transform: new Transform({
            x: 350,
            y: 100,
            altura: 100,
            anchura: 100,
            imagen: img
        }),
        rigido: new Rigido(10)
    }));
};

$("#audio").onchange = function(e){
    let audio = new Audio();
    audio.src = URL.createObjectURL(this.files[0]);
    audio.play();
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
};

Inicializar();

Dibujar();

setInterval(() => {
    Dibujar();
}, 1000 / Environment.FPS);
