import React, { useState } from 'react';
import './inicio.css';
import '../../components/Popup.css'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import Login from '../../services/login_log';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  // Variables destinadas al popup de logIn
  // Estado para controlar si el popup está abierto o cerrado
  const [logInmodalIsOpen, setlogInModalIsOpen] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [path,navigation] = useLocation();


  // Validar datos de logIn
  const handleLogIn = async () => {
    // Validar que el usuario haya ingresado un e-mail y una contraseña
    if (email === '' || password === '') {
      setError('Por favor ingresa el e-mail y la contraseña'); 
    }
    else{
      let data = await Login(email,password);
      console.log(data.ok);
      if(data.ok === true){
        navigation("/principal");
      }
      else{
        setError('Error en el e-mail o la contraseña');
      }
    }
  };

  // Funcion para cerrar el modal y poner el error a ""
  const closeModal = () => {
    setlogInModalIsOpen(false);
    setError('');
    setEmail('');
    setPassword('');
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
          <input className='barraEscribir' type="password" placeholder="Constraseña"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='closeButton' onClick={() => closeModal()}>X</button>
          {error && <p className="error-message">{error}</p>}
          <p className='texto'>¿No tienes cuenta?</p>
          <p className='textoEspecifico'onClick={() => closeModal()} >Regístrate</p>
          <button className='startButton' onClick={handleLogIn}>INICIAR SESIÓN</button>
          
        </div>
      </Modal>
      
    </div>
    
    </>
  );
}

export default Inicio;
