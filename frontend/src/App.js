import logo from './logo.svg';
import './App.css';
import { Route } from "wouter" //indica las rutas de la aplicacion

import Inicio from './pages/inicio/inicio'; // /carpeta/fichero
import Principal from './pages/principal/principal';
import Sala from './pages/sala/sala';
import Ajustes from './pages/ajustes/ajustes';
import Amigos from './pages/amigos/amigos';
import Chat from './pages/chat/chat';


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
          component={Principal}
          path="/principal"
        />
        <Route
          component={Sala}
          path="/sala"
        />
        <Route
          component={Ajustes}
          path="/ajustes"
        />
        <Route
          component={Amigos}
          path="/amigos"
        />
        <Route
          component={Chat}
          path="/chat"
        />
        
      </header>
    </div>
  );
}

export default App;
