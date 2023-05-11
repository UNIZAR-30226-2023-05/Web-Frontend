import logo from './logo.svg';
import './App.css';
import { Route } from "wouter" //indica las rutas de la aplicacion

import Inicio from './pages/inicio/inicio'; // /carpeta/fichero
import Principal from './pages/principal/principal';
import Juego from './pages/juego/juego'
import Sala from './pages/sala/sala';
import Ajustes from './pages/ajustes/ajustes';


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
          component={Juego}
          path="/juego"
        />

        <Route
          component={Sala}
          path="/sala"
        />
        <Route
          component={Ajustes}
          path="/ajustes"
        />
        
      </header>
    </div>
  );
}

export default App;