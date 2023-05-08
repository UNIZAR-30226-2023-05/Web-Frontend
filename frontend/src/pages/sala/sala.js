import React, { useState } from 'react';
import './sala.css';
import '../../components/RestoPantallas.css'
import chat from '../../assets/feather/message-square.svg'
import amigos from '../../assets/feather/users.svg'
import ajustes from '../../assets/feather/settings.svg'
import tienda from '../../assets/feather/shopping-cart.svg'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';

function Sala() {
  
  const [path,navigation] = useLocation();

  function ImagenesLink(){
    return (
      <div className="imagenes">
        <a href="/">
          <img src={chat} alt="Chat" />
        </a>
        <a href="/">
          <img src={amigos} alt="Amigos" />
        </a>
        <a href="/">
          <img src={tienda} alt="Tienda" />
        </a>
        <a href="/">
          <img src={ajustes} alt="Ajustes" />
        </a>
      </div>
    );
  }





  return (
    <div className="Sala">
      <header className="header">
        PRINCIPAL
      </header>
      <div className='barraTitulo'></div>
      <div className='imagenes-link'>
        <ImagenesLink />
      </div>




    </div>
    
  );
}

export default Sala;
