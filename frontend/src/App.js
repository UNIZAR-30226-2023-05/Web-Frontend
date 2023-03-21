import logo from './logo.svg';
import './App.css';
import { Route } from "wouter" //indica las rutas de la aplicacion

import Inicio from './pages/inicio/inicio'; // /carpeta/fichero
import Login from './pages/login/log';
import SignUp from './pages/sign/sign';

//path por defecto /

//hay que hacer un "if" para cuando el usuario está loggeado y cuando no

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route 
          component={Inicio}
          path="/" 
        /> 
        <Route 
          component={SignUp}
          path="/sign" 
        /> 
      </header>
    </div>
  );
}

export default App;
