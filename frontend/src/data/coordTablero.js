//Array con las posiciones
const tabCoord = [
    [90, 30],
    [90, 41],
    [90, 46],
    [90, 51],
    [90, 56],
    [90, 61],
    [90, 66],
    [90, 71], //esquina
    [85, 77], 
    [76, 77],
    [68, 77],
    [61, 77],
    [53, 77],
    [45, 77],
    [38, 77],
    [30, 77],
    [22, 77],
    [14, 77], //esquina
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
    [14, 24], 
    [22, 24],
    [30, 24],
    [38, 24],
    [45, 24],
    [53, 24],
    [61, 24],
    [68, 24], // esquina
    [79, 24],
    [79, 31],
    [79, 36],
    [79, 41],
    [79, 46],
    [79, 51],
    [79, 56],
    [79, 61], // esquina
    [68, 68],
    [61, 68],
    [53, 68],
    [45, 68],
    [38, 68],
    [30, 68], // esquina
    [18, 61],
    [18, 56],
    [18, 51],
    [18, 46],
    [18, 41],
    [18, 37], // esquina
    [29, 30],
    [38, 30],
    [45, 30],
    [53, 30],
    [55, 37], // esquina
    [55, 41],
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
            if (posicion <= 7){
                return [tabCoord[posicion][0], tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 17){
                return [tabCoord[posicion][0] - 6, tabCoord[posicion][1] + 2];
            }
            else if (posicion < 27){
                return [tabCoord[posicion][0] + 5, tabCoord[posicion][1]];
            }
            else if (posicion == 27){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 35){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 2];
            }
            else if (posicion == 36) {
                return [tabCoord[posicion][0] - 5, tabCoord[posicion][1] + 3];
            }
            else if (posicion <= 43){
                return [tabCoord[posicion][0] - 13, tabCoord[posicion][1]];
            }
            else if (posicion <= 49){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 55){
                return [tabCoord[posicion][0] + 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 59){
                return [tabCoord[posicion][0] - 3.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 62){
                return [tabCoord[posicion][0] + 5, tabCoord[posicion][1]];
            }

            break;

        case 3: //jugador 3 posiciones
            if (posicion <= 7){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 17){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 27){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 35){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 43){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1]];
            }
            else if (posicion == 44){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 49){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion <= 55){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 59){
                return [tabCoord[posicion][0] - 7.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 62){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            break;

        case 4: //jugador 4 posiciones
            if (posicion <= 7){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 17){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1] + 2];
            }
            else if (posicion == 18){
                return [tabCoord[posicion][0] - 11.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 27){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 35){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 43){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1]];
            }
            else if (posicion == 44){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 49){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion <= 55){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 59){
                return [tabCoord[posicion][0] - 7.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 62){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            break;

        case 5: //jugador 5 posiciones
            if (posicion <= 7){
                return [tabCoord[posicion][0] - 19, tabCoord[posicion][1]];
            }
            else if (posicion <= 17){
                return [tabCoord[posicion][0] - 18, tabCoord[posicion][1] - 2];
            }
            else if (posicion <= 27){
                return [tabCoord[posicion][0] - 15.5, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 35){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 43){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1]];
            }
            else if (posicion == 44){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 49){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion <= 55){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 59){
                return [tabCoord[posicion][0] - 7.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 62){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            break;

        case 6: //jugador 6 posiciones
            if (posicion <= 7){
                return [tabCoord[posicion][0] - 23, tabCoord[posicion][1] + 2];
            }
            else if (posicion <= 17){
                return [tabCoord[posicion][0] - 22, tabCoord[posicion][1] + 0.2];
            }
            else if (posicion <= 27){
                return [tabCoord[posicion][0] - 15, tabCoord[posicion][1] + 2.5];
            }
            else if (posicion <= 35){
                return [tabCoord[posicion][0] - 7, tabCoord[posicion][1] - 4];
            }
            else if (posicion <= 43){
                return [tabCoord[posicion][0] - 12, tabCoord[posicion][1]];
            }
            else if (posicion == 44){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            else if (posicion <= 49){
                return [tabCoord[posicion][0] - 11, tabCoord[posicion][1]];
            }
            else if (posicion <= 55){
                return [tabCoord[posicion][0] - 4, tabCoord[posicion][1]];
            }
            else if (posicion <= 59){
                return [tabCoord[posicion][0] - 7.5, tabCoord[posicion][1] + 5];
            }
            else if (posicion <= 62){
                return [tabCoord[posicion][0] - 3, tabCoord[posicion][1]];
            }
            break;
    }   
}

export default calcularPosicion;
