import React, {useState} from 'react';
import './inicio.css';
import oca from '../../assets/img/oca.PNG'
import { Link } from 'wouter';
import Modal from '../Modal';



function Inicio() {

  // El modal esta cerrado por defecto
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
  }
  

  return (
    <>
    <div className="Inicio">
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
    <div className="img">
      <img src={oca}/>
    </div>
    
    <Modal active={active} toggle={toggle}> {/* funcion toggle para cerrar el modal */}
        <h1>Modal works!</h1>
      </Modal>

    </>

    
  );
}

export default Inicio;
