import { tab } from "@testing-library/user-event/dist/tab";

//Array con las posiciones
const tabCoord = [
    [90, 30],
    [90, 30],
    [90, 41],
    [90, 46],
    [90, 51],
    [90, 56],
    [90, 61],
    [90, 66],
    [90, 71], //esquina
    [85, 76], 
    [76, 76],
    [68, 76],
    [61, 76],
    [53, 76],
    [45, 76],
    [38, 76],
    [30, 76],
    [22, 76],
    [14, 76], //esquina
    [3, 70],
    [3, 65],
    [3, 60],
    [3, 55],
    [3, 50],
    [3, 45],
    [3, 40],
    [3, 36],
    [3, 31],
    [3, 24], //esquina
    [15, 24], 
    [23, 24],
    [31, 24],
    [39, 24],
    [46, 24],
    [54, 24],
    [62, 24],
    [70, 24], // esquina
    [80, 24],
    [79, 30.5],
    [79, 35.5],
    [79, 40.5],
    [79, 45.5],
    [79, 50.5],
    [79, 55.5],
    [79, 61], // esquina
    [67, 69],
    [61, 69],
    [53, 69],
    [45, 69],
    [38, 69],
    [30, 69], // esquina
    [18, 61],
    [18, 55],
    [18, 50],
    [18, 45],
    [18, 40],
    [18, 36], // esquina
    [29, 30],
    [38, 30],
    [46, 30],
    [55, 30],
    [55, 38], // esquina
    [55, 43],
    [50, 50] // fin

]

//Falta corrección a partir del 27

//Funcion para calcular la posicion de la ficha
function calcularPosicion(idJugador, posicion) {
    if (posicion > 62) {
        posicion = 62;
    } 

    switch (idJugador) {
        case 1:
            return tabCoord[posicion];

        case 2: //jugador 2 posiciones
            if (posicion <= 8){
                return [tabCoord[posicion][0], tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 18){
                return [tabCoord[posicion][0] - 6, tabCoord[posicion][1] + 2];
            }
            else if (posicion < 28){
                return [tabCoord[posicion][0] + 5, tabCoord[posicion][1]];
            }
            else if (posicion == 28){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 36){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 2];
            }
            else if (posicion == 37) {
                return [tabCoord[posicion][0] - 5, tabCoord[posicion][1] + 3];
            }
            else if (posicion <= 44){
                return [tabCoord[posicion][0] - 13, tabCoord[posicion][1]];
            }
            else if (posicion <= 50){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 6];
            }
            else if (posicion < 56){
                return [tabCoord[posicion][0] + 4, tabCoord[posicion][1] + 0.5];
            }
            else if (posicion == 56){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 3];
            }
            else if (posicion <= 60){
                return [tabCoord[posicion][0] - 3.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion < 63){
                return [tabCoord[posicion][0] + 5, tabCoord[posicion][1]];
            }
            else if (posicion == 63){
                return [tabCoord[posicion][0] - 9, tabCoord[posicion][1] + 4];
            }

            break;

        case 3: //jugador 3 posiciones
            if (posicion <= 8){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 18){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 28){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 36){
                return [tabCoord[posicion][0] - 8, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 44){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1]];
            }
            else if (posicion == 45){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 50){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion <= 56){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion < 60){
                return [tabCoord[posicion][0] - 7.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion == 60){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 63){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            break;

        case 4: //jugador 4 posiciones
            if (posicion <= 8){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 18){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] + 2];
            }
            else if (posicion == 19){
                return [tabCoord[posicion][0] - 11.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 28){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 36){
                return [tabCoord[posicion][0] - 15, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 44){
                return [tabCoord[posicion][0] - 16, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 50){
                return [tabCoord[posicion][0] - 11.5, tabCoord[posicion][1] - 3];
            }
            else if (posicion <= 56){
                return [tabCoord[posicion][0] - 12.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion == 57){
                return [tabCoord[posicion][0] - 20, tabCoord[posicion][1]];
            }
            else if (posicion <= 60){
                return [tabCoord[posicion][0] - 16, tabCoord[posicion][1] + 5];
            }
            else if (posicion < 63){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1] - 3];
            }
            else if (posicion == 63){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1] + 4];
            }
            break;

        case 5: //jugador 5 posiciones
            if (posicion <= 8){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1]];
            }
            else if (posicion <= 18){
                return [tabCoord[posicion][0] - 18, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 28){
                return [tabCoord[posicion][0] - 15.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion == 29){
                return [tabCoord[posicion][0] - 23, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 36){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1] + 1];
            }
            else if (posicion < 44){
                return [tabCoord[posicion][0] - 24.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion == 44){
                return [tabCoord[posicion][0] - 16, tabCoord[posicion][1] + 6];
            }
            else if (posicion == 45){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] - 2.5];
            }
            else if (posicion <= 50){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1] - 3];
            }
            else if (posicion <= 56){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 60){
                return [tabCoord[posicion][0] - 20, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion < 63){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] - 3];
            }
            else if (posicion == 63){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] + 4];
            }
            break;

        case 6: //jugador 6 posiciones
            if (posicion <= 8){
                return [tabCoord[posicion][0] - 23, tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 18){
                return [tabCoord[posicion][0] - 22, tabCoord[posicion][1] + 0.2];
            }
            else if (posicion <= 28){
                return [tabCoord[posicion][0] - 15, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 36){
                return [tabCoord[posicion][0] - 23, tabCoord[posicion][1] - 1.5];
            }
            else if(posicion == 37){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1] - 3];
            }
            else if (posicion <= 44){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion == 45){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion < 50){
                return [tabCoord[posicion][0] - 23, tabCoord[posicion][1] - 6];
            }
            else if (posicion == 50){
                return [tabCoord[posicion][0] - 28, tabCoord[posicion][1]]
            }
            else if (posicion == 51){
                return [tabCoord[posicion][0] - 20.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 56){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 60){
                return [tabCoord[posicion][0] - 24, tabCoord[posicion][1]];
            }
            else if (posicion == 61){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] - 6];
            }
            else if (posicion < 63){
                return [tabCoord[posicion][0] - 20, tabCoord[posicion][1] - 3];
            }
            else if (posicion == 63){
                return [tabCoord[posicion][0] - 25, tabCoord[posicion][1]];
            }
            break;
    }   
}

export default calcularPosicion;