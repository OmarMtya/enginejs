import { IniciarAnimacion, DetenerAnimacion, Dibujar, detectarClick } from "./motor.js";
import { Figura } from "./models/figura.class.js";
import { Transform } from "./models/transform.class.js";
import { Rigido } from "./models/rigido.class.js";
import { Environment } from "./models/environment.class.js";
import { Imagen, Sprite } from "./models/multimedia/imagen.class.js";
import { Sonido } from "./models/multimedia/sonido.class.js";

(function(){
    Environment.Figura = Figura;
    Environment.Transform = Transform;
    Environment.Rigido = Rigido;
    Environment.Imagen = Imagen;
    Environment.Sprite = Sprite;
    Environment.Sonido = Sonido;
    Environment.Animar = IniciarAnimacion;
    Environment.DetenerAnimacion = DetenerAnimacion;
    Environment.Dibujar = Dibujar;
    Environment.DetectarClick = detectarClick;

    let $g = Environment;

    window.$g = $g;
})();
