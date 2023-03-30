import React, {useState} from 'react';
import './inicio.css';
import '../../components/Popup.css';
import oca from '../../assets/img/oca.PNG'
import { Link } from 'wouter';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado

  return (
    <>
    <div className="Inicio">
      <button className="buttonCrear" onClick={() => setModalIsOpen(true)} >
        Crear cuenta
      </button>
      <Modal className="popup" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="popup-content">
          <button className="closeButton" onClick={() => setModalIsOpen(false)}>x</button>
          <div className="titulo">REGÍSTRATE</div>
          <div className="texto">
            <p>Añade una foto:</p>
            <p>Nombre de usuario *</p>
            <input className="barraEscribir" type="text" placeholder="Nombre de usuario"/>
            <p>E-mail *</p>
            <input className="barraEscribir" type="text" placeholder="E-mail"/>
            <p>Contraseña *</p>
            <input className="barraEscribir" type="text" placeholder="Contraseña"/>
            <p>Repetir contraseña *</p>
            <input className="barraEscribir" type="text" placeholder="Repetir contraseña"/>
            <div className="oblig">* Campo obligatorio</div>
          </div>
          <button className='iniButton' onClick={() => setModalIsOpen(false)}>Iniciar sesión</button>
        </div>
      </Modal>

      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      <Link to="/log">
        <button className="button">
          JUEGA AHORA
        </button>
      </Link>
    </div>
    </>

    
  );
}

export default Inicio;
