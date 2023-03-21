import React from 'react';
import oca from '../../assets/img/oca.PNG'

function Login() {
  return (
    <div className="Inicio">
      <header className="Inicio-header">
        Login
      </header>
      <div className="body">
        Carrera hacia la meta
      </div>
      <div className="img">
        <img src={oca}/>
      </div>
      <button href="./log.js" className="button">
        JUEGA AHORA
      </button>
    </div>
    

    
  );
}

export default Login;
