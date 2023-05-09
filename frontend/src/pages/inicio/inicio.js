import React, { useState } from 'react';
import socket from '../../utils/socket.js';
import io from 'socket.io-client';
import './inicio.css';
import '../../components/PopupSignUp.css'
import '../../components/PopupLogIn.css'
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import Login from '../../services/login_log';
import SignUp  from '../../services/signup_log.js';
import GetID from '../../services/getID_log.js';
import GetInfo from '../../services/getInfo_log.js';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const regla = /^[A-Za-z0-9!?]{8,16}$/;

  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [cont, setCont] = useState('');
  const [contRep, setContRep] = useState('');
  const [error, setError] = useState(null);

  //const [nickname, setNickname] = useState('');

  // Variables destinadas al popup de logIn
  // Estado para controlar si el popup está abierto o cerrado
  const [logInmodalIsOpen, setlogInModalIsOpen] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [path,navigation] = useLocation();

  /***************************************************************************
   * FUNCIONES SOCKET
   ***************************************************************************/
  socket.on('connect', () => {
    console.log('Conectado al servidor de websockets');
  });
  
  socket.on('disconnect', (reason) => {
    console.log(`Se ha perdido la conexión con el servidor de websockets: ${reason}`);
  });

  /***************************************************************************
   * FUNCION ABRIR SESION LOG IN
   ***************************************************************************/
  const comprobarLogIn = (nickname) => {
    socket.emit("openSession", {'nickname': nickname}, (data) => {
      if (data.ok === false) {
        setError(data.message);
      } else {
        // Guardar la contaseña en la base de datos de react
        localStorage.setItem('contrasena', password);
        console.log(`La contrasena del usuario es ${password}`);
        localStorage.setItem('email', email);
        navigation("/principal");
      }
    });
  }

  /***************************************************************************
   * FUNCION CREAR USUARIO
   ****************************************************************************/
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
    else if(cont !== contRep){
      setError('Las contraseñas no coinciden');
    }
    else{
      let data =  await SignUp(name, mail, cont);
      console.log(data.ok);
      if(data.ok === true){ 
        closeModalSign();
        setlogInModalIsOpen(true);
        setError('');
      }
      else{
        setError(data.msg);
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

  /***************************************************************************
   * FUNCION LOG IN
   ****************************************************************************/
  const handleLogIn = async () => {
    // Validar que el usuario haya ingresado un e-mail y una contraseña
    if (email === '' || password === '') {
      setError('Por favor ingresa el e-mail y la contraseña'); 
    }
    else{
      let data = await Login(email, password);
      if(data.ok === true){
        // Guarda el token en el localStorage. Con get te lo devuelve
        localStorage.setItem('token', data.token);
        // Para esperar a que termine
        let nickname = await cogerNickname();
        comprobarLogIn(nickname);
      }
      else{
        setError(data.msg);
      }
    }
  };

  /***************************************************************************
   * FUNCION COGER NICKNAME
   ****************************************************************************/
  const cogerNickname = async () => {
    // Coger id del usuario
  
    let dataID = await GetID(email);
    //console.log(dataID);

    if (dataID.ok === true) {
        console.log('He entrado en el if')
        console.log(dataID.id_usuario);
        // Eliminar cuenta
        let data = await GetInfo(dataID.id_usuario);
    
        if(data.ok === true){
            // Se guardan los datos del usuario
            //console.log(data.datos[0].nickname);
            localStorage.setItem('nickname', data.datos[0].nickname); 
            //setNickname(data.datos[0].nickname);
            return data.datos[0].nickname;
        }
        else{
            setError(data.msg);
        }
    }
    else{
      setError(dataID.msg);
    }
    return null;
  }

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
      <button className="buttonCrear" onClick={() => {localStorage.clear(); setModalIsOpen(true);}} >
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
