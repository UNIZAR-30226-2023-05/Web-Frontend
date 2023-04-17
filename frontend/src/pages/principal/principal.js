import React, { useState } from 'react';
import './principal.css';
import '../../components/RestoPantallas.css'
import '../../components/PopupCrearSala.css'
import chat from '../../assets/feather/message-square.svg'
import amigos from '../../assets/feather/users.svg'
import ajustes from '../../assets/feather/settings.svg'
import tienda from '../../assets/feather/shopping-cart.svg'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';

function Principal() {
  /***************************************************************************
   * DECLARACION DE VARIABLES
   ***************************************************************************/
  // Modal crear sala
  const [crearModalIsOpen, setCrearModalIsOpen] = useState(false); 
  const [nombreSala, setNombreSala] = useState('');
  const [numJugadores, setNumJugadores] = useState('');
  

  // Modal unirse a sala
  const [unirseModalIsOpen, setUnirseModalIsOpen] = useState(false);
  const [codigoSala, setCodigoSala] = useState('');

  const [error, setError] = useState(null);
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

  /***************************************************************************
   * FUNCION CERRAR MODAL CREAR SALA Y UNIRSE A SALA
   ***************************************************************************/
  const closeModalCrearSala = () => {
    setCrearModalIsOpen(false);
    setError('');
    setNombreSala('');
    setNumJugadores('');
  };

  const closeModalUnirseSala = () => {
    setUnirseModalIsOpen(false);
    setCodigoSala('');
    setError('');
  };

  /***************************************************************************
   * FUNCION HANDLE
   ***************************************************************************/

  // Funcion para crear la sala
  const crearSala = () => {
    if (nombreSala === '' || numJugadores === ''){
      setError('Rellene todos los campos obligatorios')
    }
    else{
      // Aqui se llama a la funcion que crea la sala
    }
  };

  // Funcion para unirse a la sala
  const unirseSala = () => {
    if (codigoSala === ''){
      setError('Rellene el campo obligatorio')
    }
    else{
      // Aqui se llama a la funcion que unirse a la sala
    }
  };

  /***************************************************************************
   * FUNCION MODAL CREAR SALA Y UNIRSE A SALA
   ***************************************************************************/
  function ModalCrearSala(){
    return (
      <Modal className="popup" isOpen={crearModalIsOpen} onRequestOpen={() => setCrearModalIsOpen(true)}>
        <div className="popup-content">
          <p className='titulo'>CREAR SALA</p>
          <p className='texto'>¿Desea crear una sala?</p>
          <p className='texto'>Nombre de la sala*</p>
          <input className='barraEscribir' type="text" placeholder="Nombre de la sala" value={nombreSala} onChange={(e) => setNombreSala(e.target.value)}/>
          
          <p className='texto'>Número de jugadores*</p>
          <select className='barraDespegable' value={numJugadores} onChange={(e) => setNumJugadores(e.target.value)}>
            <option value="">Número de jugadores</option>
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          
          <button className='closeButton' onClick={() => closeModalCrearSala()}>X</button>
          {error && <p className="error-message">{error}</p>}
          <p className='texto'>* Campo obligatorio</p>
          
          <button className='elButton' onClick={crearSala}>Crear</button>
          
        </div>
      </Modal>
    );
  }


  function ModalUnirseSala(){
    return (
      <Modal className="popup" isOpen={unirseModalIsOpen} onRequestClose={() => setUnirseModalIsOpen(true)}>
        <div className="popup-content">
          <p className='titulo'>UNIRSE A UNA SALA</p>
          <p className='texto'>¿Desea unirse a una sala existente?</p>
          <p className='texto'>Código de la sala*</p>
          <input className='barraEscribir' type="text" placeholder="Código de la sala" value={codigoSala} onChange={(e) => setCodigoSala(e.target.value)}/>
        
          <button className='closeButton' onClick={() => closeModalUnirseSala()}>X</button>
          {error && <p className="error-message">{error}</p>}
          <p className='texto'>* Campo obligatorio</p>
          
          <button className='elButton' onClick={unirseSala}>Unirse</button>
          
        </div>
      </Modal>
    );
  }




  return (
    <div className="Principal">
      <header className="header">
        PRINCIPAL
      </header>
      <div className='barraTitulo'></div>
      <div className='imagenes-link'>
        <ImagenesLink />
      </div>

      <div className='mismaLinea'>
        <div className='recuadro'>
          <div className="titulo">CREA TU PROPIA SALA</div>
          <div className="subtitulo">Crea una sala y compartela con quien quieras</div>
          <button className="buttonSala" onClick={() => setCrearModalIsOpen(true)}>Crear</button>
        </div>
        <div className='recuadro'>
          <div className="titulo">ÚNETE A UNA SALA</div>
          <div className="subtitulo">Comparte la experiencia con tus amigos</div>
          <button className="buttonSala" onClick={() => setUnirseModalIsOpen(true)}>Unirse</button>
        </div>
      </div>

      <div className='modal'>
        <ModalCrearSala />
      </div>
      <div className='modal'>
        <ModalUnirseSala />
      </div>

    </div>
    
    
  );
}

export default Principal;
