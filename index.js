import { dibujar } from "./dibujar.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";

let $ = (x) => document.querySelector(x);

Environment.agregarFigura(new Figura({
    tipo: "circulo",
    transform: new Transform({
        x: 100,
        y: 100,
        altura: 50
    }),
    rigido: new Rigido()
}));

Environment.agregarFigura(new Figura({
    tipo: "cuadrado",
    transform: new Transform({
        x: 200,
        y: 100,
        altura: 100,
        anchura: 100,
        relleno: "#3142AB"
    }),
    rigido: new Rigido()
}));


dibujar();

setInterval(() => {
    dibujar();
}, 1000 / Environment.FPS);
