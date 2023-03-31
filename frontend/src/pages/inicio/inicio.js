import React, { useState } from 'react';
import './inicio.css';
import '../../components/Popup.css'
import { Link } from 'wouter';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  // Variables destinadas al popup de logIn
  // Estado para controlar si el popup está abierto o cerrado
  const [logInmodalIsOpen, setlogInModalIsOpen] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  // Validar datos de logIn
  const handleLogIn = () => {
    // Validar que el usuario haya ingresado un e-mail y una contraseña
    if (email === '' || password === '') {
      setError('Por favor ingresa el e-mail y la contraseña'); 
    }

    // Validar que el e-mail coincida con la contraseña
    else if (email !== password) {
      setError('El e-mail y la contraseña no coinciden');
    }
  };

  // Funcion para cerrar el modal y poner el error a ""
  const closeModal = () => {
    setlogInModalIsOpen(false);
    setError('');
  };


  return (
    <>
    <div className="Inicio">
      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      
      <button className="Botones" onClick={() => setlogInModalIsOpen(true)}>
        JUEGA AHORA
      </button>
      
      <Modal className="popup" isOpen={logInmodalIsOpen} onRequestClose={() => setlogInModalIsOpen(false)}>
        <div className="popup-content">
          <p className='titulo'>INICIAR SESIÓN</p>
          <p className='texto'>E-mail</p>
          <input className='barraEscribir' type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <p className='texto'>Constraseña</p>
          <input className='barraEscribir' type="text" placeholder="Constraseña"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='closeButton' onClick={() => closeModal()}>X</button>
          <button className={'startButton'} onClick={handleLogIn}>INICIAR SESIÓN</button>
          {error && <p className="error-message">{error}</p>}
          <p className='texto'>¿No tienes cuenta?</p>
          <p className='textoEspecifico'onClick={() => closeModal()} >Regístrate</p>
          
        </div>
      </Modal>
      
    </div>
    
    </>
  );
}

export default Inicio;
