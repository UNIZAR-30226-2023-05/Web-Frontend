import React from 'react';
import './inicio.css';
import oca from '../../assets/img/oca.PNG'

function Inicio() {
  return (
    <div className="Inicio">
      <header className="Inicio-header">
        OCA LOCA
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      <div className="img">
        <img src={oca}/>
      </div>
      <button to=/log.js className="button">
        JUEGA AHORA
      </button>
    </div>
    

    
  );
}

export default Inicio;
