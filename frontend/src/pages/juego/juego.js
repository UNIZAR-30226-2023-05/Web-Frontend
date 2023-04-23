import React, { useEffect, useState } from 'react';
import './juego.css';
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import image from '../../assets/img/Skin_dorada.png'
Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Juego() {

  const [myTop, setTop] = useState("90%");
  const [myLeft, setLeft] = useState("30%");
  const [idFicha1, setIdCasilla] = useState(0);
  
  
  /*Funcion para mover las fichas*/
  /*Fucnion para hacer la logica del juego: puentes, preguntas...*/
  /*Por defecto: Renderiza cuando se modifica el valor y cuando se renderiza por primera vez la pantalla*/
  useEffect(() => {
    //Si no es ninguna de las logicas
    if (idFicha1 != 0) {
      setTop("90%");
      setLeft("47%");
    }
  }, [idFicha1])


    
  return (
    <> 
      <header className="header">
        JUEGO
      </header>
      <div className='cont'>
        <button classname='botonAbandonar' as={Link} to='/principal'>Abandonar la sala</button>
        <div className='barraTitulo'></div>
      </div>
      
      <div className='contenedor'>  
          <div className='tablero'>
            <div className='ficha' style={ {top:myTop,left:myLeft}}>
              <img className='fichaTam' src={image} />
            </div> 
          </div>
          <div className='chat'>
              <button onClick={() => setIdCasilla(1)}>saltar1</button>
              <button onClick={() => setIdCasilla(2)}>saltar2</button>
          </div>
      </div> 
    </>
  );
}


export default Juego;

