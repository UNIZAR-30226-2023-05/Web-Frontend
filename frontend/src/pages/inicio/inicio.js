import React, {useState} from 'react';
import './inicio.css';
import '../../components/Popup.css';
import { Link, useLocation } from 'wouter';
import Modal from 'react-modal';
import SignUp  from '../../services/signup_log.js';

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Inicio() {
  let name;
  let mail;
  let cont;
  let contRep;

  const [modalIsOpen, setModalIsOpen] = useState(false); // estado para controlar si el popup está abierto o cerrado
  const [path, navigation] = useLocation();


  //funcion lambda lo mismo que una funcion pero expresado así.
  const crearUsuario = () => {  
    if(cont == contRep){
      SignUp(name, mail, cont);
      setModalIsOpen(false);
      navigation("/principal");
    }

  }; 

  //para coger los datos introducidos por el usuario en el nombre
  const handleName = (event) => {
    name = event.target.value
    console.log(name)
  };

   //para coger los datos introducidos por el usuario en email
   const handleEmail = (event) => {
    mail = event.target.value
    console.log(mail)
  };

   //para coger los datos introducidos por el usuario en 
   const handlePass = (event) => {
    cont = event.target.value
    console.log(cont)
  };

   //para coger los datos introducidos por el usuario
   const handlePassRep = (event) => {
    contRep = event.target.value
    console.log(contRep)
  };


  return (
    <>
    <div className="Inicio">
      <button className="buttonCrear" onClick={() => setModalIsOpen(true)} >
        Crear cuenta
      </button>
      <Modal className="popup" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="popup-content">
          <button className="closeButton" onClick={() => setModalIsOpen(false)}>X</button>
          <div className="titulo">REGÍSTRATE</div>
          <div className="texto">
            <p>Añade una foto:</p>
            <p>Nombre de usuario *</p>
            <input className="barraEscribir" type="text" placeholder="Nombre de usuario" onChange={handleName}/>
            <p>E-mail *</p>
            <input className="barraEscribir" type="text" placeholder="E-mail" onChange={handleEmail}/>
            <p>Contraseña *</p>
            <input className="barraEscribir" type="text" placeholder="Contraseña" onChange={handlePass}/>
            <p>Repetir contraseña *</p>
            <input className="barraEscribir" type="text" placeholder="Repetir contraseña" onChange={handlePassRep}/>
            <div className="oblig">* Campo obligatorio</div>
          </div>
          <button className='iniButton' disabled={cont!=contRep} onClick={() => crearUsuario()}>Crear usuario</button>
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
