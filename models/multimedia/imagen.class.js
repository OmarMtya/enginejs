
class Imagen{
    /**
     * Constructor de la imagen
     * @param {Image} src - Archivo con URI de imagen
     * @param {Sprite} sprite - Objeto tipo Sprite, solamente si es un sprite
     */
    constructor(src, sprite = null){
        this.src = src;
        this.sprite = sprite;
    }
}

class Sprite {
    /**
     * Constructor de Sprite
     * @param {int} rows - Número de hileras de la imagen
     * @param {int} cols - Número de columnas de la imagen
     * @param {number} altura - Altura individual de cada fragmento de imagen
     * @param {number} anchura - Anchura individual de cada fragmento de imagen
     * @param {number} velocidad - Velocidad de reproducción
     */
    constructor(row, cols, altura, anchura, velocidad) {
        this.row = parseInt(row);
        this.cols = parseInt(cols);
        this.altura = parseFloat(altura);
        this.anchura = parseFloat(anchura);
        this.velocidad = parseFloat(velocidad) / (this.cols / parseFloat(velocidad)); // La velocidad es igual a la cantidad de segundos que quiero que dure la animación. Esto es igual a lo que dura cada frame
        this.frame = { valor: 0, ultimo: null };
    }
}

export { Imagen, Sprite }