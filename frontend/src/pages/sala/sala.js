import React, { useState, useEffect } from 'react';
import './sala.css';
import '../../components/SalaJuego.css'
import chat from '../../assets/feather/message-square.svg'
import help from '../../assets/feather/help-circle.svg'
import check from '../../assets/feather/check.svg'
import copy from '../../assets/feather/copy.svg'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';

function Sala() {

  // Coger el nombre de la sala
  const nombreSala = localStorage.getItem('nombreSala');
  const idRoom = localStorage.getItem('idRoom');

  // Declaracion de variables
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [path,navigation] = useLocation();

  function ImagenesLink(){
    return (
      <div className="imagenes">
        <a href="/">
          <img src={chat} alt="Chat" />
        </a>
        <a href="/">
          <img src={help} alt="Ayuda" />
        </a>
      </div>
    );
  }


  /***************************************************************************
   * FUNCION COPIAR ID
   **************************************************************************/
  const copyToClipboard = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(idRoom)
      .then(() => {
        setIsCopied(true);
        setIsCopying(false);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Error copying to clipboard:', err);
        setIsCopying(false);
      });
  };
  



  return (
    <div className="Sala">
      <header className="header">
        SALA
      </header>
      <div className='barraTitulo'>{nombreSala}</div>
      <div className='imagenes-link'>
        <ImagenesLink />
      </div>
      <button className='botonSalir' onClick={() => navigation('/principal')}>Salir de la sala</button>
      <p className='nombre_codigo'>Código de la sala</p>
      <div className='barraCodigo'>
        <div className='idRoom'>{idRoom}</div>
        {!isCopied && !isCopying &&
        <button className='botonCopiar' onClick={copyToClipboard}>
          <img className='copiadoIcono' src={copy} alt='Copiar'/>
        </button>
      }
      {isCopied &&
        <img className='copiadoIcono' src={check} alt='Copiar'/>
      }
    </div>
      


    </div>
    
  );
}

export default Sala;
