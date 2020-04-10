function dibujar(lienzo, figuras){
    const c = lienzo.canvas;
    c.clearRect(0, 0, lienzo.anchura, lienzo.altura);
    c.beginPath();
    
    figuras.forEach(figura => {
        console.log(figura);
        const transform = figura.transform;
        
        switch (figura.tipo) {
            case "circulo":
                c.arc(transform.x, transform.y, transform.anchura, 0, 2 * Math.PI);
                c.stroke();
                break;
        }
    
        if(figura.rigido){
            figura.afectarGravedad();
        }
    });
}

export { dibujar }