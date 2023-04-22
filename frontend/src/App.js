import './App.css';
import { Route } from "wouter" //indica las rutas de la aplicacion

import Inicio from './pages/inicio/inicio'; // /carpeta/fichero
import Principal from './pages/principal/principal';
import Juego from './pages/juego/juego'


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
      </header>
    </div>
  );
}

export default App;