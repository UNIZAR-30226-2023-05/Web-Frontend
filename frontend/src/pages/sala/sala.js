import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './sala.css';
import '../../components/SalaJuego.css'
import chat from '../../assets/feather/message-square.svg'
import help from '../../assets/feather/help-circle.svg'
import check from '../../assets/feather/check.svg'
import copy from '../../assets/feather/copy.svg'
import { useLocation } from 'wouter';
import Modal from 'react-modal';

function Sala() {

  // Coger el nombre e id de la sala
  const nombreSala = localStorage.getItem('nombreSala');
  const idRoom = localStorage.getItem('idRoom');
  const nickname = localStorage.getItem('nickname');

  // Controlar si el usuario es el lider o no
  const lider = localStorage.getItem('lider');
  const token = localStorage.getItem('token');
  const [jugadores, setJugadores] = useState([]);
  //const players = JSON.parse(localStorage.getItem('jugadores'));
  const numPlayers = jugadores ? jugadores.length : 0; // Numero de jugadores en la sala

  // Declaracion de variables
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [error, setError] = useState(null);
  const [path,navigation] = useLocation();

  /***************************************************************************
   * FUNCIONES SOCKET
   ***************************************************************************/
  //Puerto
  const port = process.env.PORT || 3000;
  const url = 'http://localhost:' + port;

  const socket = io.connect(url, {auth:{token}});

  socket.on('connect', () => {
    console.log('Conectado al servidor de websockets');
  });
  
  socket.on('disconnect', (reason) => {
    console.log(`Se ha perdido la conexión con el servidor de websockets: ${reason}`);
  });

  /***************************************************************************
   * FUNCION ACTUALIZAR JUGADORES
   ***************************************************************************/
  function playerNames() {
    setJugadores(playerNames);
  }
  
  // Cada vez que se lance el evento
  useEffect(() => {
    console.log('Escuchando actualizaciones de jugadores en sala');
    // Escuchar las actualizaciones de updatePlayers
    
    socket.on("updatePlayers", (nicknames) => {
      console.log('Estoy dentro de updatePlayers');
      console.log(nicknames);
      // localStorage.setItem('jugadores', JSON.stringify(playerNames));
      setJugadores(nicknames);
    });
    console.log('He salido de updatePlayers');

    // Limpiar evento de escucha
    return () => {
      socket.off("updatePlayers");
    }
  }, [socket]);

  /*
  useEffect(() => {
    console.log('Escuchando actualizaciones de jugadores en sala');
    // Escuchar las actualizaciones de updatePlayers
    
    socket.on("updatePlayers", (data) => {
      console.log('Estoy dentro de updatePlayers');
      console.log(data.nicknames);
      // localStorage.setItem('jugadores', JSON.stringify(playerNames));
      setJugadores(data.nicknames);
    });
    console.log('He salido de updatePlayers');

    // Limpiar evento de escucha
    return () => {
      socket.off("updatePlayers");
    }
  }, [socket]);
  */

  /***************************************************************************
   * FUNCION ELIMINAR SALA
   ***************************************************************************/
  const EliminarSala = () => {
    
    socket.emit("destroyRoom", idRoom, (data) => {
      if (data.status !== 'ok') {
        console.log(data.message);
        setError(data.message);
      } else {
        console.log(data.message);
        // ELiminar la base de datos de react
        localStorage.removeItem('idRoom');
        localStorage.removeItem('lider');
        localStorage.removeItem('players');
        localStorage.removeItem('nombreSala');
        navigation("/principal");
      }
    });
  }

  /***************************************************************************
   * FUNCION SALIR SALA USUARIO PARTICULAR
   ***************************************************************************/
  const SalirSala = () => {
    
    socket.emit("leaveTheRoom", idRoom, (data) => {
      if (data.status !== 'ok') {
        setError(data.message);
      } else {
        console.log(data.message);
        setError(data.message);
        // ELiminar la base de datos de react
        localStorage.removeItem('idRoom');
        localStorage.removeItem('lider');
        localStorage.removeItem('nombreSala');
        //navigation("/principal");
      }
    });
  }


  /***************************************************************************
    * FUNCION IMAGENES LINK
    ***************************************************************************/
  function ImagenesLink(){
    return (
      <div className="imagenes">
        <a href="/">
          <img src={chat} alt="Chat" />
        </a>
        <a href="/">
          <img src={help} alt="Ayuda" />
        </a>
      </div>
    );
  }


  /***************************************************************************
   * FUNCION COPIAR ID
   **************************************************************************/
  const copyToClipboard = () => {
    setIsCopying(true);
    navigator.clipboard.writeText(idRoom)
      .then(() => {
        setIsCopied(true);
        setIsCopying(false);
        setTimeout(() => {
          setIsCopied(false);
          setError('');
        }, 2000);
      })
      .catch((err) => {
        console.error('Error copying to clipboard:', err);
        setIsCopying(false);
      });
  };
  



  return (
    <div className="Sala">
      <header className="header">
        SALA
      </header>
      <div className='barraTitulo'>{nombreSala}</div>
      <div className='imagenes-link'>
        <ImagenesLink />
      </div>
      <button className='botonSalir' onClick={() => navigation('/principal')}>Salir de la sala</button>
      {error && <p className="mensaje-error-salas">{error}</p>}
      <p className='nombre_codigo'>Código de la sala</p>
      <div className='barraCodigo'>
        <div className='idRoom'>{idRoom}</div>
        {!isCopied && !isCopying &&
          <button className='botonCopiar' onClick={copyToClipboard}>
            <img className='copiadoIcono' src={copy} alt='Copiar'/>
          </button>
        }
        {isCopied &&
          <img className='copiadoIcono' src={check} alt='Copiar'/>
        }
      </div>
      {lider === 'true' && <button className='comenzarPartida' >Comenzar partida</button>}
      {lider === 'true' && <button className='eliminarSala' onClick={EliminarSala}>Eliminar sala</button>}
      <div className="players-container">
        <div className="texto-participante">Participantes: {numPlayers}</div>
        {lider !== 'true' && jugadores.map((player, index) => (
          <div key={index} className="player">{player}</div>
        ))}
      </div>
      {lider !== 'true' && <button className='abandonarSala' onClick={SalirSala}>Abandonar sala</button>}
      



    </div>
    
  );
}

export default Sala;
