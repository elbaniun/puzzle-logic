//import * as $ from 'jquery';
$(document).ready(function () {

    //utilizar solo 15 numeros
    let arreglo_numeros: number[] = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
    var num: number = 0;
    var movimientos: number = 0;

    //llenar los numeros


    /**Inicia un nuevo juego */
    var nuevo_juego=function():void {
        $("#movimientos").text(`${movimientos}`);
        //haremos un each para generar los numeros 
        $("table#tablero").find("tr").each(function (row) {
            //recorreremos ahora las columnas 
            $(this).find("td").each(function (column) {
                //generar los numeros aleatorios
                let aleatorio: number = Math.floor((Math.random() * (arreglo_numeros.length - 1)));
                num = arreglo_numeros[aleatorio];
                arreglo_numeros.splice(aleatorio, 1);
                //guardamos el numero
                if (column != 15) {
                    $(this).text(`${num}`);
                }
            });
        });
    };//realizar el juego

    //iniciamos la partida
    nuevo_juego();


    //iniciamos el juego 
    $("table#tablero tr td").click(function () {
        //numero
        let minumero: string = $(this).text();
        //fila actual
        let fila: number = $(this).parent().index();

        //columnas actuales
        let columna = $(this).index();
        let tam_tablero: number = $("table#tablero tr").length - 1;

        //preguntar por espacios
        //obtenemos los espacios en columnas 
        let col_derecha = $("table#tablero tr").eq(fila).find("td").eq(columna + 1);
        let col_izquierda = $("table#tablero tr").eq(fila).find("td").eq(columna - 1);

        //obtenemos los espacios de filas
        let fil_arriba = $("table#tablero tr").eq(fila + 1).find("td").eq(columna);
        let fil_abajo = $("table#tablero tr").eq(fila - 1).find("td").eq(columna);


        //------REALIZAMOS LAS CORRESPONDIENTES CONDICIONALES PARA MOVER PIEZA----
        if (col_derecha.hasClass("vacio")) {
            col_derecha.removeClass("vacio");
            col_derecha.text(minumero);

            //colocaremos los datos de este modo vacio
            $("table#tablero tr").eq(fila).find("td").eq(columna).text("");
            $("table#tablero tr").eq(fila).find("td").eq(columna).addClass("vacio");

            //hacemos el movimiento
            movimientos++;
            $("#movimientos").text(`${movimientos}`);

        } else if (col_izquierda.hasClass("vacio")) {
            col_izquierda.removeClass("vacio");
            col_izquierda.text(minumero);

            //colocaremos los datos de este modo vacio
            $("table#tablero tr").eq(fila).find("td").eq(columna).text("");
            $("table#tablero tr").eq(fila).find("td").eq(columna).addClass("vacio");

            //hacemos el movimiento
            movimientos++;
            $("#movimientos").text(`${movimientos}`);

        } else if (fil_arriba.hasClass("vacio")) {
            fil_arriba.removeClass("vacio");
            fil_arriba.text(minumero);

            //colocaremos los datos de este modo vacio
            $("table#tablero tr").eq(fila).find("td").eq(columna).text("");
            $("table#tablero tr").eq(fila).find("td").eq(columna).addClass("vacio");

            //hacemos el movimiento
            movimientos++;
            $("#movimientos").text(`${movimientos}`);

        } else if (fil_abajo.hasClass("vacio")) {
            fil_abajo.removeClass("vacio");
            fil_abajo.text(minumero);
            //colocaremos los datos de este modo vacio
            $("table#tablero tr").eq(fila).find("td").eq(columna).text("");
            $("table#tablero tr").eq(fila).find("td").eq(columna).addClass("vacio");

            //hacemos el movimiento
            movimientos++;
            $("#movimientos").text(`${movimientos}`);
        }
    });
});