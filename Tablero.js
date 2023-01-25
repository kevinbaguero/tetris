class Tablero {
    constructor(){
        this.columnas = 10;
        this.filas = 20;
        this.lado_celda = 25;
        this.ancho = this.columnas * this.lado_celda;
        this.alto = this.filas * this.lado_celda;
        this.posicion = createVector(
            MARGEN_TABLERO,
            MARGEN_TABLERO + 2*this.lado_celda);

        //Memoria es la variable que se encargara de representar los minos almacenados
        this.minosAlmacenados= [];
        for (let fila = 0; fila < this.filas; fila++){
            this.minosAlmacenados[fila] = [];
            for (let columna = 0; columna < this.columnas; columna++){
                this.minosAlmacenados[fila].push("");
            }
        }
    }

    set almacenarMino(tetrimino){
        for (const pmino of tetrimino.mapaTablero) {
            if (pmino.y < 0){
                //Juego terminado
                tablero = new Tablero();
                tetrimino = new Tetrimino();
                lineas_hechas = 0;
            }
            this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre;
        }
        this.buscarLineasHorizontalesBorrar();
    }

    buscarLineasHorizontalesBorrar(){
        let lineas = [];
        for (let fila = this.filas; fila >= 0; fila--){
            let agregar = true;
            for (let columna = 0; columna < this.columnas; columna++){
                if (!this.minosAlmacenados[columna][fila]){
                    agregar = false;
                    break;
                }
            }
            if (agregar){
                lineas.push(fila);
            }
        }
        this.borrarLineasHorizontales(lineas);

    }

    borrarLineasHorizontales(lineas){
        lineas_hechas += lineas.length;
        for (const linea of lineas) {
            for (let fila = linea; fila >= 0; fila--){
                for (let columna = 0; columna < this.columnas; columna++){
                    if (fila == 0){
                        this.minosAlmacenados[columna][fila] = "";
                        continue;
                    }
                    this.minosAlmacenados[columna][fila] =
                        this.minosAlmacenados[columna][fila -1];
                }
            }
            
        }
            
    }
    

    /*
    La coordenada es una transformacion no lineal donde se aplica un escalamiento(multiplicacion)
    para el ajuste de las medidas y una traslacion(suma) para el ajuste de las posiciones.

    En este caso, no usaremos rotaciones, no se necesita.
    */

    coordenada(x,y){
        return createVector (x,y).mult(this.lado_celda).add(this.posicion);
    }

    /*
    Se encargara del procesamiento logico para el dibujado
    de este elemento
    */

    dibujar(){
        push();
        noStroke();
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                if((columna + fila) % 2 == 0){
                    fill("black");
                }else{
                    fill("#004");
                }
                let c = this.coordenada (columna, fila);
                rect(c.x, c.y, this.lado_celda);
            }
        }
        pop();
        this.dibujarMinosAlmacenados();
    }

    dibujarMinosAlmacenados(){
        push();
        for (let columna = 0; columna < this.columnas; columna++){
            for (let fila = 0; fila < this.filas; fila++ ){
                let nombreMino = this.minosAlmacenados[columna][fila];
                if(nombreMino){
                    fill(tetriminosBase[nombreMino].color);
                    Tetrimino.dibujarMino(this.coordenada(columna, fila));
                }
            }
        }
        pop();
    }
}   
