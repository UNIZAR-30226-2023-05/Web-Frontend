import React from 'react';
import './inicio.css';
import oca from '../../assets/img/oca.PNG'
import { Link } from 'wouter';

function Inicio() {
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
    </>

    
  );
}

export default Inicio;
