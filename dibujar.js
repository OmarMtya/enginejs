import { Environment } from "./models/environment.class.js";

function dibujar(){
    const c = Environment.canvas;
    c.clearRect(0, 0, Environment.anchura, Environment.altura); // Limpia el canvas
    c.beginPath(); // Importante limpiar las líneas ya creadas
    
    Environment.figuras.forEach(figura => { // Por cada figura creada, se redibuja
        const transform = figura.transform;
        
        switch (figura.tipo) {
            case "circulo":
            case "circle": // En el circulo, el tamaño solamente se toma en cuenta la altura
                c.arc(transform.x, transform.y, transform.altura, 0, 2 * Math.PI);
                break;
            case "cuadrado":
            case "square":
                c.fillRect(transform.x, transform.y, transform.anchura, transform.altura);
                break;
        }
        c.stroke();
    
        if(figura.rigido){
            figura.afectarGravedad();
        }
        figura.tocandoFondo();
    });
}

export { dibujar }