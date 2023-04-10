import React, { useState } from 'react';
import './principal.css';
import '../../components/DisegnoGeneral.css'
import oca from '../../assets/img/oca.PNG'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';

function ImagenesLink(){
  return (
    <div className="imagenes">
      <a href="/">
        <img src={oca} alt="Chat" />
      </a>
      <a href="/">
        <img src={oca} alt="Amigos" />
      </a>
      <a href="/">
        <img src={oca} alt="Tienda" />
      </a>
      <a href="/">
        <img src={oca} alt="Ajustes" />
      </a>
    </div>
  );
}

function Principal() {
  return (
    <div className="Principal">
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

export default Principal;
