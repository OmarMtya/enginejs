class Rigido {
    constructor(valor = 9.8, sinColision = false){
        this.valor = valor; // Valor de la gravedad
        this.colision = false; // Bandera para manipular el objeto, saber si está colisionando con otro
        this.sinColision = sinColision; // Bandera para evaluar si el objeto tiene colisiones o no
    }
}

export { Rigido };