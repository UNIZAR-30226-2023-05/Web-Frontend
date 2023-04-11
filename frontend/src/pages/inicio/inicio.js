import React, { useState } from 'react';
import './inicio.css';
import '../../components/PopupSignUp.css'
import '../../components/PopupLogIn.css'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import Login from '../../services/login_log';
import SignUp  from '../../services/signup_log.js';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const regla = /^[A-Za-z0-9]{8,16}$/

  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [cont, setCont] = useState('');
  const [contRep, setContRep] = useState('');
  const [error, setError] = useState(null);

  // Variables destinadas al popup de logIn
  // Estado para controlar si el popup está abierto o cerrado
  const [logInmodalIsOpen, setlogInModalIsOpen] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [path,navigation] = useLocation();

  //funcion lambda lo mismo que una funcion pero expresado así.
  const crearUsuario = async() => {  
    
    // Validar que el e-mail sigue el formato <nombre>@<dominio>.<extensión>
    if (name === '' || mail === '' || cont === '' || contRep === '' ){
      setError('Rellene todos los campos obligatorios')
    }
    else if (!mail.includes('@') || !mail.includes('.')) {
      setError('El e-mail no sigue el formato <nombre>@<dominio>.<extensión>');
    }
    else if(!regla.test(cont)){
      setError('La contraseña mínimo 8 caracteres. Debe contener mínimo una mayuscula, un número y un símbolo')
    }
    else if(cont != contRep){
      setError('Las contraseñas no coinciden');
    }
    else{
      let data =  await SignUp(name, mail, cont);
      console.log(data.ok);
      if(data.ok === true){
        setModalIsOpen(false);
        setlogInModalIsOpen(true);
      }
      else{
        setError(data.message);
      }
    }

  }; 

  //Funcion para cerrar el modal y poner el error a ""
  const closeModalSign = () => {
    setModalIsOpen(false);
    setError('');
    setName('');
    setMail('');
    setCont('');
    setContRep('');
  }

  // Validar datos de logIn
  const handleLogIn = async () => {
    // Validar que el usuario haya ingresado un e-mail y una contraseña
    if (email === '' || password === '') {
      setError('Por favor ingresa el e-mail y la contraseña'); 
    }
    else{
      let data = await Login(email,password);
      console.log(data.ok);
      if(data.ok){
        navigation("/principal");
      }
      else{
        setError(data.msg);
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

  const closeOpenModales = () => {
    setlogInModalIsOpen(false);
    setModalIsOpen(true);
    setError('');
    setEmail('');
    setPassword('');
  };



  return (
    <>
    <div className="Inicio">
      <button className="buttonCrear" onClick={() => setModalIsOpen(true)} >
        Crear cuenta
      </button>
      <Modal className="popup" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="popupS-content">
          <button className="closeButton" onClick={() => closeModalSign()}>X</button>
          <div className="titulo">REGÍSTRATE</div>
          <div className="texto">
            <p>Añade una foto:</p>
            <p>Nombre de usuario *</p>
            <input className="barraEscribirSign" type="text" placeholder="Nombre de usuario" value={name} onChange={(e) => setName(e.target.value)}/>
            <p>E-mail *</p>
            <input className="barraEscribirSign" type="text" placeholder="E-mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
            <p>Contraseña *</p>
            <input className="barraEscribirSign" type="password" placeholder="Contraseña" value={cont} onChange={(e) => setCont(e.target.value)}/>
            <p>Repetir contraseña *</p>
            <input className="barraEscribirSign" type="password" placeholder="Repetir contraseña" value={contRep} onChange={(e) => setContRep(e.target.value)}/>
            <div className="oblig">* Campo obligatorio</div>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button className="iniButton" onClick={crearUsuario}>CREAR USUARIO</button>
        </div>
      </Modal>

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
          <p className='textoEspecifico'onClick={() => closeOpenModales()} >Regístrate</p>
          <div className='abc'>
            <button className='startButton' onClick={handleLogIn}>INICIAR SESIÓN</button>
          </div>
          
        </div>
      </Modal>
      
    </div>
    
    </>
  );
}


export default Inicio;

