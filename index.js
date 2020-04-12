import { Animar } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";
import { Imagen, Sprite } from "./models/multimedia/imagen.class.js";
import { Sonido } from "./models/multimedia/sonido.class.js";

(function(){
    let $ = (x) => document.querySelector(x);
    window.$ = $;

    Environment.Figura = Figura;
    Environment.Transform = Transform;
    Environment.Rigido = Rigido;
    Environment.Imagen = Imagen;
    Environment.Sprite = Sprite;
    Environment.Sonido = Sonido;
    Environment.Animar = Animar;

    let $g = Environment;

    window.$g = $g;
})();
