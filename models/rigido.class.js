class Rigido {
    constructor(valor = 9.8, sinColision = false){
        this.valor = valor; // Valor de la gravedad
        this.colision = false; // Bandera para manipular el objeto, saber si está colisionando con otro. La idea de colisión está en el documento (Solamente bandera colisión es verdadera, si hay un objeto abajo de él, el de abajo no está en colisión hasta que toca el piso u otra pieza)
        this.sinColision = sinColision; // Bandera para evaluar si el objeto tiene colisiones o no
        this.tocandoPor = null;
        this.gravedadReiniciada = false; // Bandera para que el objeto, en el próximo tick, no tenga colisión y reinicie la su grevadad por un golpe
    }
}

export { Rigido };