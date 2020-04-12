import { Dibujar, Error, Inicializar } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";

let $ = (x) => document.querySelector(x);

Environment.agregarFigura(new Figura({
    id: "debugeado",
    tipo: "cuadrado",
    transform: new Transform({
        x: 500,
        y: 0,
        altura: 20,
        anchura: 20,
        relleno: "#000000"
    }),
    rigido: new Rigido(15)
}));

Environment.agregarFigura(new Figura({
    tipo: "circulo",
    id: "debug",
    transform: new Transform({
        x: 510,
        y: 50,
        radio: 10,
        relleno: "#FF0000"
    }),
    rigido: new Rigido()
}));

Environment.agregarFigura(new Figura({
    id: "segundo",
    tipo: "cuadrado",
    transform: new Transform({
        x: 500,
        y: 90,
        anchura: 20,
        altura: 20,
        relleno: "#00FF00"
    }),
    rigido: new Rigido(20)
}));

Environment.agregarFigura(new Figura({
    id: "primero",
    tipo: "cuadrado",
    transform: new Transform({
        x: 500,
        y: 150,
        anchura: 20,
        altura: 20,
        relleno: "#0000FF"
    }),
    rigido: new Rigido()
}));


$("#imagen").onchange = function(e){
    console.log("ENTRO");
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

Inicializar();

Dibujar();

setInterval(() => {
    Dibujar();
}, 1000 / Environment.FPS);
