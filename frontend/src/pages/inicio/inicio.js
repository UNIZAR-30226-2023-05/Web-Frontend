import React, { useState } from 'react';
import './inicio.css';
import oca from '../../assets/img/oca.PNG'
import { Link } from 'wouter';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado

  return (
    <>
    <div className="Inicio">
      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      
      <button className="button" onClick={() => setModalIsOpen(true)}>
        JUEGA AHORA
      </button>
      
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="modal-content">
          <h2>¡Bienvenido a Oca Loca!</h2>
          <p>Para comenzar a jugar, ingresa tu nombre:</p>
          <input type="text" placeholder="Nombre"/>
          <button onClick={() => setModalIsOpen(false)}>Comenzar</button>
        </div>
      </Modal>
      
    </div>
    <div className="img">
      <img src={oca}/>
    </div>
    </>
  );
}

export default Inicio;
