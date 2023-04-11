import React, {useState} from 'react';
import './inicio.css';
import '../../components/PopupSignUp.css';
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import SignUp  from '../../services/signup_log.js';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  const regla = /^[A-Za-z0-9]{8,16}$/

  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado
  const [name, setName] = useState('');
  const [mail, setEmail] = useState('');
  const [cont, setCont] = useState('');
  const [contRep, setContRep] = useState('');
  const [error, setError] = useState(null);

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
      setError('La contraseña mínimo 8 caracteres. Debe contener mínimo una mayuscula, un número y un simbolos')
    }
    else if(cont != contRep){
      setError('Las contraseñas no coinciden');
    }
    else{
      let data =  await SignUp(name, mail, cont);
      console.log(data.ok);
      if(data.ok === true){
        setModalIsOpen(false);
        //setlogInModalIsOpen(true);
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
    setEmail('');
    setCont('');
    setContRep('');
  }


  return (
    <>
    <div className="Inicio">
      <button className="buttonCrear" onClick={() => setModalIsOpen(true)} >
        Crear cuenta
      </button>
      <Modal className="popup" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="popup-content">
          <button className="closeButton" onClick={() => closeModalSign()}>X</button>
          <div className="titulo">REGÍSTRATE</div>
          <div className="texto">
            <p>Añade una foto:</p>
            <p>Nombre de usuario *</p>
            <input className="barraEscribir" type="text" placeholder="Nombre de usuario" value={name} onChange={(e) => setName(e.target.value)}/>
            <p>E-mail *</p>
            <input className="barraEscribir" type="text" placeholder="E-mail" value={mail} onChange={(e) => setEmail(e.target.value)}/>
            <p>Contraseña *</p>
            <input className="barraEscribir" type="password" placeholder="Contraseña" value={cont} onChange={(e) => setCont(e.target.value)}/>
            <p>Repetir contraseña *</p>
            <input className="barraEscribir" type="password" placeholder="Repetir contraseña" value={contRep} onChange={(e) => setContRep(e.target.value)}/>
            <div className="oblig">* Campo obligatorio</div>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button className="iniButton" onClick={crearUsuario}>Crear usuario</button>
        </div>
      </Modal>

      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      <button className="button">
        JUEGA AHORA
      </button>
      
    </div>
    </>
  );
  
}


export default Inicio;
