import { dibujar } from "./dibujar.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";

let $ = (x) => document.querySelector(x);
const c = {canvas: $("canvas").getContext("2d"), altura: 800, anchura: 1200};
const figuras = [];

figuras.push(new Figura({
    tipo: "circulo",
    transform: new Transform({
        x: 100,
        y: 100,
        altura: 10,
        anchura: 40
    }),
    rigido: new Rigido()
}));

dibujar(c, figuras);
setInterval(() => {
    dibujar(c, figuras);
}, 30);

