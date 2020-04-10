import { Dibujar, Error } from "./dibujar.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";

let $ = (x) => document.querySelector(x);

// Environment.agregarFigura(new Figura({
//     tipo: "circulo",
//     transform: new Transform({
//         x: 100,
//         y: 100,
//         altura: 50,
//         relleno: "#3142AB"
//     }),
//     rigido: new Rigido()
// }));

// Environment.agregarFigura(new Figura({
//     tipo: "cuadrado",
//     transform: new Transform({
//         x: 200,
//         y: 100,
//         altura: 100,
//         anchura: 100,
//         relleno: "#3142AB"
//     }),
//     rigido: new Rigido()
// }));

$("#imagen").onchange = function(e){
    console.log("ENTRO");
    let img = new Image();
    img.src = URL.createObjectURL(this.files[0]);
    Environment.agregarFigura(new Figura({
        tipo: "imagen",
        transform: new Transform({
            x: 100,
            y: 100,
            altura: 100,
            anchura: 100,
            imagen: img
        }),
        rigido: new Rigido()
    }));
};

Dibujar();

setInterval(() => {
    Dibujar();
}, 1000 / Environment.FPS);
