class Environment {
    static canvas;
    static FPS = 60;
    static altura = 800;
    static anchura = 1200;
    static gravedad = 9.8;
    static figuras = [];
    static contador = 0; // Contador de Frames registrados
    static audioGeneral;

    static Init(canvas) {
        Environment.canvas = canvas.getContext("2d");
    }

    static AgregarFigura(figura){
        Environment.figuras.push(figura);
    }
}

export { Environment };