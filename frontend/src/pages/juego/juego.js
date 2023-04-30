import React, { useEffect, useState } from 'react';
import './juego.css';
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import image1 from '../../assets/img/Skin_dorada.png'
import image2 from '../../assets/img/Skin_rosa.png'
import image3 from '../../assets/img/Skin_verde.png'
import image4 from '../../assets/img/Skin_azul.png'
import image5 from '../../assets/img/Skin_roja.png'
import image6 from '../../assets/img/Skin_negra.png'
import calcularPosicion from '../../data/coordTablero';
Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Juego() {

  const posIni = 62;
  const [contador, setContador] = useState(posIni);

  //Posicion inicial del jugador 1
  const [inicialT1, inicialL1] = calcularPosicion(1, posIni);
  const [myTop1, setMyTop1] = useState(inicialT1);
  const [myLeft1, setMyLeft1] = useState(inicialL1);


  //Posicion inicial del jugador 2
  const [inicialT2, inicialL2] = calcularPosicion(2, posIni);  
  const [myTop2, setMyTop2] = useState(inicialT2);
  const [myLeft2, setMyLeft2] = useState(inicialL2);


  //Posicion inicial del jugador 3
  const [inicialT3, inicialL3] = calcularPosicion(3, posIni);
  const [myTop3, setMyTop3] = useState(inicialT3);
  const [myLeft3, setMyLeft3] = useState(inicialL3);

  //Posicion inicial del jugador 4
  const [inicialT4, inicialL4] = calcularPosicion(4, posIni);
  const [myTop4, setMyTop4] = useState(inicialT4);
  const [myLeft4, setMyLeft4] = useState(inicialL4);

  //Posicion inicial del jugador 5
  const [inicialT5, inicialL5] = calcularPosicion(5, posIni);
  const [myTop5, setMyTop5] = useState(inicialT5);
  const [myLeft5, setMyLeft5] = useState(inicialL5);

  //Posicion inicial del jugador 6
  const [inicialT6, inicialL6] = calcularPosicion(6, posIni);
  const [myTop6, setMyTop6] = useState(inicialT6);
  const [myLeft6, setMyLeft6] = useState(inicialL6);


  const [idFicha1, setIdCasilla1] = useState(0);
  
 
  

  const [idFicha2, setIdCasilla2] = useState(0);
  const [idFicha3, setIdCasilla3] = useState(0);
  const [idFicha4, setIdCasilla4] = useState(0);
  const [idFicha5, setIdCasilla5] = useState(0);
  const [idFicha6, setIdCasilla6] = useState(0);

  

  
  
  /*Funcion para mover las fichas*/
  /*Funcion para hacer la logica del juego: puentes, preguntas...*/
  /*Por defecto: Renderiza cuando se modifica el valor y cuando se renderiza por primera vez la pantalla*/
  useEffect(() => {
    //Si no es ninguna de las logicas
    if (idFicha1 != 0) {
      setContador(contador + 1);
      console.log(contador);
      const [nuevoTop1, nuevoLeft1] = calcularPosicion(1, contador);
      console.log(nuevoTop1, nuevoLeft1)
      setMyTop1(nuevoTop1);
      setMyLeft1(nuevoLeft1);

      //ficha 2
      const [nuevoTop2, nuevoLeft2] = calcularPosicion(2, contador);
      console.log(nuevoTop2, nuevoLeft2)
      setMyTop2(nuevoTop2);
      setMyLeft2(nuevoLeft2);

      //ficha 3
      const [nuevoTop3, nuevoLeft3] = calcularPosicion(3, contador);
      console.log(nuevoTop3, nuevoLeft3)
      setMyTop3(nuevoTop3);
      setMyLeft3(nuevoLeft3);

      //ficha 4
      const [nuevoTop4, nuevoLeft4] = calcularPosicion(4, contador);
      console.log(nuevoTop4, nuevoLeft4)
      setMyTop4(nuevoTop4);
      setMyLeft4(nuevoLeft4);

      //ficha 5
      const [nuevoTop5, nuevoLeft5] = calcularPosicion(5, contador);
      console.log(nuevoTop5, nuevoLeft5)
      setMyTop5(nuevoTop5);
      setMyLeft5(nuevoLeft5);

      //ficha 6
      const [nuevoTop6, nuevoLeft6] = calcularPosicion(6, contador);
      console.log(nuevoTop6, nuevoLeft6)
      setMyTop6(nuevoTop6);
      setMyLeft6(nuevoLeft6);


      
    }
  /*  if (idFicha2 != 0) {
      calcularPosicion(idFicha1, posicion)
    }*/
  }, [idFicha1])


    
  return (
    <> 
      <header className="header">
        JUEGO
      </header>
      <div className='cont'>
        <button className='botonAbandonar' as={Link} to='/principal'>Abandonar la sala</button>
        <div className='barraTitulo'></div>
      </div>
      
      <div className='contenedor'>  
          <div className='tablero'>
            <div className='ficha1' style={ {top:`${myTop1}%`,left:`${myLeft1}%`}}>
              <img className='fichaTam' src={image1} />
            </div>
            <div className='ficha2' style={ {top:`${myTop2}%`,left:`${myLeft2}%`}}>
              <img className='fichaTam' src={image2} />
            </div>
            <div className='ficha3' style={ {top:`${myTop3}%`,left:`${myLeft3}%`}}>
              <img className='fichaTam' src={image3} />
            </div>
            <div className='ficha4' style={ {top:`${myTop4}%`,left:`${myLeft4}%`}}>
              <img className='fichaTam' src={image4} />
            </div>
            <div className='ficha5' style={ {top:`${myTop5}%`,left:`${myLeft5}%`}}>
              <img className='fichaTam' src={image5} />
            </div> 
            <div className='ficha6' style={ {top:`${myTop6}%`,left:`${myLeft6}%`}}>
              <img className='fichaTam' src={image6} />
            </div>
            

            
          </div>
          <div className='chat'>
              <button onClick={() => setIdCasilla1(1)}>saltar1</button>
              <button onClick={() => setIdCasilla1(2)}>saltar2</button>
          </div>
      </div> 
    </>
  );
}


export default Juego;

