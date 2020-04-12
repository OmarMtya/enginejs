import { Dibujar, Error, Inicializar } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";

let $ = (x) => document.querySelector(x);

Environment.agregarFigura(new Figura({
    tipo: "cuadrado",
    id: "linea",
    transform: new Transform({
        x: 575,
        y: 0,
        altura: 5,
        anchura: 100,
        relleno: "#000000"
    }),
    rigido: new Rigido()
}));

Environment.agregarFigura(new Figura({
    tipo: "cuadrado",
    id: "rojo",
    transform: new Transform({
        x: 550,
        y: 20,
        altura: 50,
        anchura: 50,
        relleno: "#FF0000"
    }),
    rigido: new Rigido(20)
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
        rigido: new Rigido()
    }));
};

Inicializar();

Dibujar();

setInterval(() => {
    Dibujar();
}, 1000 / Environment.FPS);
