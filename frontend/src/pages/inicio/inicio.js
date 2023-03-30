import React, { useState } from 'react';
import './inicio.css';
import '../../components/Popup.css'
import { Link } from 'wouter';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const [logInmodalIsOpen, setlogInModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado

  return (
    <>
    <div className="Inicio">
      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      
      <button className="button" onClick={() => setlogInModalIsOpen(true)}>
        JUEGA AHORA
      </button>
      
      <Modal className="popup" isOpen={logInmodalIsOpen} onRequestClose={() => setlogInModalIsOpen(false)}>
        <div className="popup-content">
          <h2 className='titulo'>INICIAR SESIÓN</h2>
          <p className='texto'>E-mail</p>
          <input className='barraEscribir' type="text" placeholder="E-mail"/>
          <p className='texto'>Constraseña</p>
          <input className='barraEscribir' type="text" placeholder="Constraseña"/>
          <button className='closeButton' onClick={() => setlogInModalIsOpen(false)}>X</button>
          <button className='startButton'>INICIAR SESIÓN</button>
          <p className='texto'>¿No tienes cuenta?</p>
          <p className='textoEspecifico'onClick={() => setlogInModalIsOpen(false)} >Regístrate</p>
          
        </div>
      </Modal>
      
    </div>
    
    </>
  );
}

export default Inicio;
