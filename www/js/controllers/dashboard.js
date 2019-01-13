//var Promise = require('es6-promise').Promise;
controllersModule.controller("CntrlDashboard", function ($scope) {
    /** Arreglo numérico utiliza solo 15 numeros de momento. */
    var arreglo_numeros = new Array();
    /** Número de movimientos realizados por el jugador. */
    var movimientos = 0;
    /** Segundos transcurridos desde que el jugador se decidió a jugar. */
    var contador_segundos = 0;
    /** Minutos transcurridos desde que el jugador se decidió a jugar. */
    var contador_minutos = 0;
    /** Variable para controlar que el tiempo corra o no. */
    var esta_corriendo_el_tiempo = "no";
    //  var promise:Promise;// = setTimeout(tiempo, 1000);
    //var timer=$timeout(tiempo, 1000 );
    var handle;
    if (esta_corriendo_el_tiempo === "no") {
        esta_corriendo_el_tiempo = "si";
        handle = setTimeout(tiempo, 1000);
    }
    generar();
    $scope.init = function () {
        $scope.nuevo();
    };
    /**
     * Controla el avance del tiempo.
     * Cada segundo actualiza los valores de los contadores de minutos y
     * segundos para medir cuanto se trada el jugador en resolverlo.
     */
    function tiempo() {
        var segundero = document.getElementById("segundos");
        if (segundero !== null)
            segundero.innerText = "" + contador_segundos;
        var minutero = document.getElementById("minutos");
        if (minutero !== null) {
            minutero.innerText = "" + contador_minutos;
        }
        if (contador_segundos === 59) {
            contador_minutos++;
            contador_segundos = 0;
        }
        else {
            if (esta_corriendo_el_tiempo === "si") {
                contador_segundos++;
                handle = setTimeout(tiempo, 1000);
            }
            else {
                contador_segundos = 0;
            }
        }
        if (esta_corriendo_el_tiempo === "no") {
            reiniciaTiempo();
        }
        else {
        }
        //    resolve("Success!");
    }
    /**
     * Devuelve los contadores a cero.
     */
    function reiniciaTiempo() {
        contador_minutos = 0;
        contador_segundos = 0;
        //clearTimeout(tiempo);
    }
    /**
     * Genera aleatoriamente y sin repetir los números del tablero.
     */
    function generar() {
        reiniciaTiempo();
        arreglo_numeros.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        //for en donde colocaremos las tablas de una forma aleatoria
        for (var j = 1; j <= 16; j++) {
            if (document.getElementById("p" + j)
                .getAttribute("class").indexOf("vacio") < 0) {
                //GENERAR ALEATORIO
                var aleatorio = Math.floor((Math.random() * (arreglo_numeros.length - 1)));
                var num = arreglo_numeros[aleatorio];
                arreglo_numeros.splice(aleatorio, 1);
                //colocamos el numero
                document.getElementById("p" + j).innerText = num;
            }
        }
    }
    $scope.nuevo = function () {
        generar();
        //Reiniciamos los movimientos         
        movimientos = 0;
        document.getElementById("movimientos").innerText = "" + movimientos;
    };
    //---------------trabajando con javascript---------------------------
    /**
     * Decide si se ha ganado verificando que las celdas estén ordenadas
     * de menor a mayor.
     */
    function verificarGanarJuego() {
        var filasCorrectas = 0;
        if (document.getElementById("p1").innerText === "1" &&
            document.getElementById("p2").innerText === "2" &&
            document.getElementById("p3").innerText === "3" &&
            document.getElementById("p4").innerText === "4") {
            filasCorrectas++;
        }
        if (document.getElementById("p5").innerText === "5" &&
            document.getElementById("p6").innerText === "6"
            && document.getElementById("p7").innerText === "7" &&
            document.getElementById("p8").innerText === "8") {
            filasCorrectas++;
        }
        if (document.getElementById("p9").innerText === "9" &&
            document.getElementById("p10").innerText === "10" &&
            document.getElementById("p11").innerText === "11" &&
            document.getElementById("p12").innerText === "12") {
            filasCorrectas++;
        }
        if (document.getElementById("p13").innerText === "13" &&
            document.getElementById("p14").innerText === "14" &&
            document.getElementById("p15").innerText === "15") {
            filasCorrectas++;
        }
        //si fue 4 es por que gano
        if (filasCorrectas === 4) {
            alert("Has ganado el juego");
            alert("Movimiento: " + movimientos);
            alert("Tiempo: " + contador_minutos + ":" + contador_segundos);
            //inicializamos nuevamente el juego
            generar();
        }
    }
    $scope.mensaje = function (event) {
        //obtendremos la clases
        var posicion = parseInt(event.target.getAttribute("posicion"));
        var valor = event.target.innerText;
        //tabla padre
        var padre = event.target.parentNode.getAttribute("id");
        var valor_tabla_padre = parseInt(event.target.parentNode.getAttribute("id").substring(5, 999));
        var col_derecha;
        var col_izquierda;
        var fil_arriba;
        var fil_abajo;
        //obtendremos los valores a evaluar
        //mover a la derecha
        if (posicion < 3) {
            col_derecha = posicion + 1;
        }
        //mover a la izquierda
        if (posicion > 0) {
            col_izquierda = posicion - 1;
        }
        if ((valor_tabla_padre - 1) >= 1) {
            fil_arriba = valor_tabla_padre - 1;
        }
        if ((valor_tabla_padre + 1) <= 4) {
            fil_abajo = valor_tabla_padre + 1;
        }
        //obtenemos la posicion derecha
        var fila_actual = document.getElementById("tabla" + valor_tabla_padre)
            .getElementsByTagName("div")[posicion];
        var micol_derecha;
        var micol_izquierda;
        var fila_arriba;
        var fila_abajo;
        if (posicion < 3) {
            micol_derecha =
                document.getElementById("tabla" + valor_tabla_padre)
                    .getElementsByTagName("div")[col_derecha];
        }
        if (posicion > 0) {
            micol_izquierda =
                document.getElementById("tabla" + valor_tabla_padre)
                    .getElementsByTagName("div")[col_izquierda];
        }
        if ((valor_tabla_padre - 1) >= 1) {
            fila_arriba =
                document.getElementById("tabla" + fil_arriba)
                    .getElementsByTagName("div")[posicion];
        }
        if ((valor_tabla_padre + 1) <= 4) {
            fila_abajo =
                document.getElementById("tabla" + fil_abajo)
                    .getElementsByTagName("div")[posicion];
        }
        //mover a la izquierda
        if (posicion > 0) {
            if (micol_izquierda.getAttribute("class").indexOf("vacio") > (-1)) {
                fila_actual.innerText = "";
                fila_actual.removeAttribute("class");
                fila_actual.setAttribute("class", "col vacio");
                //ahora los valores a la fila derecha
                micol_izquierda.removeAttribute("class");
                micol_izquierda.setAttribute("class", "col");
                micol_izquierda.innerText = valor;
                //hacemos los movimientos
                movimientos++;
                document.getElementById("movimientos").innerText = "" + movimientos;
            }
        }
        //mover a la derecha
        if (posicion < 3) {
            if (micol_derecha.getAttribute("class").indexOf("vacio") > (-1)) {
                fila_actual.innerText = "";
                fila_actual.removeAttribute("class");
                fila_actual.setAttribute("class", "col vacio");
                //ahora los valores a la fila derecha
                micol_derecha.removeAttribute("class");
                micol_derecha.setAttribute("class", "col");
                micol_derecha.innerText = valor;
                //hacemos los movimientos
                movimientos++;
                document.getElementById("movimientos").innerText = "" + movimientos;
            }
        }
        //mover hacia arriba
        if ((valor_tabla_padre - 1) >= 1) {
            if (fila_arriba.getAttribute("class").indexOf("vacio") > (-1)) {
                fila_actual.innerText = "";
                fila_actual.removeAttribute("class");
                fila_actual.setAttribute("class", "col vacio");
                //ahora los valores a la fila derecha
                fila_arriba.removeAttribute("class");
                fila_arriba.setAttribute("class", "col");
                fila_arriba.innerText = valor;
                //hacemos los movimientos
                movimientos++;
                document.getElementById("movimientos").innerText = "" + movimientos;
            }
        } //cierre de mover hacia arriba
        //mover hacia abajo
        if ((valor_tabla_padre + 1) <= 4) {
            if (fila_abajo.getAttribute("class").indexOf("vacio") > (-1)) {
                fila_actual.innerText = "";
                fila_actual.removeAttribute("class");
                fila_actual.setAttribute("class", "col vacio");
                //ahora los valores a la fila derecha
                fila_abajo.removeAttribute("class");
                fila_abajo.setAttribute("class", "col");
                fila_abajo.innerText = valor;
                //hacemos los movimientos
                movimientos++;
                document.getElementById("movimientos").innerText = "" + movimientos;
            }
        } //cierre de mover hacia abajo
        verificarGanarJuego();
    };
    $scope.parar = function () {
        clearTimeout(handle);
        esta_corriendo_el_tiempo = "no";
    };
    //$scope.$on(
    //    "$destroy",
    //                        //$timeout.cancel(timer);
    //
    ////        clearTimeout(promise);
    //    }
    //);
    /*-------------------CIERRE DE LA LOGICA DEL JUEGO-----------------------*/
});
