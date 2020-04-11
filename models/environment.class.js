class Environment {
    static canvas = document.querySelector("canvas").getContext("2d");
    static FPS = 10;
    static altura = 800;
    static anchura = 1200;
    static gravedad = 9.8;
    static figuras = [];

    static agregarFigura(figura){
        Environment.figuras.push(figura);
    }
}

export { Environment };