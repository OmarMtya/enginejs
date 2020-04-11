import { Environment } from "./models/environment.class.js";

function Dibujar(){
    const c = Environment.canvas;
    c.clearRect(0, 0, Environment.anchura, Environment.altura); // Limpia el canvas
    c.beginPath(); // Importante limpiar las líneas ya creadas
    


    Environment.figuras.sort((a , b) => { // Ordenar por la Y, para evitar problemas de físicas
        if(a.transform.y > b.transform.y){
            return -1;
        }
        if(a.transform.y < b.transform.y){
            return 1;
        }
        return 0;
    } ) .forEach(figura => { // Por cada figura creada, se redibuja
        if (figura.rigido) {
            if (!figura.rigido.sinColision) { // Si está definido el objeto como que si puede detectar colisiones
                figura.tocandoRigidos();
                if (!figura.rigido.colision) { // Si está en colisión, la gravedad no le afecta en un frame
                    figura.afectarGravedad();
                    figura.tocandoFondo();
                }
            } else {
                figura.afectarGravedad();
            }
        }
    });

    Environment.figuras.forEach((figura)=>{
        const transform = figura.transform;
        switch (figura.tipo) {
            case "circulo":
            case "circle": // En el circulo, el tamaño solamente se toma en cuenta la altura
                c.fillStyle = transform.relleno;
                c.arc(transform.x, transform.y, transform.radio, 0, 2 * Math.PI);
                break;
            case "cuadrado":
            case "square":
                c.fillStyle = transform.relleno;
                c.fillRect(transform.x, transform.y, transform.anchura, transform.altura);
                break;
            case "imagen":
                c.drawImage(transform.imagen, 0, 0, transform.imagen.width, transform.imagen.height, transform.x, transform.y, transform.anchura, transform.altura);
                break;
        }
        c.stroke();
    });

    
}

function Error(invoker){
    console.error("EXISTE UN ERROR", invoker);
}

export { Dibujar, Error }