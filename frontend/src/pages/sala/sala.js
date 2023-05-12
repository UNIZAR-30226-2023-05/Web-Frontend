import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket.js';
import './sala.css';
import '../../components/SalaJuego.css'
import help from '../../assets/feather/help-circle.svg'
import check from '../../assets/feather/check.svg'
import copy from '../../assets/feather/copy.svg'
import trash_2 from '../../assets/feather/trash_2.svg'
import { useLocation } from 'wouter';
import Modal from 'react-modal';

function Sala() {

  // Coger el nombre e id de la sala
  const nombreSala = localStorage.getItem('nombreSala');
  const idRoom = localStorage.getItem('idRoom');
  const liderNickname = localStorage.getItem('liderNickname');
  //const nickname = localStorage.getItem('nickname');

  let interval;

  // Controlar si el usuario es el lider o no
  const lider = localStorage.getItem('lider'); // booleano
  const [players, setJugadores] = useState([]);
  //console.log(`los jugadores en sala son ${players}`);
  const numPlayers = players ? players.length : 0; // Numero de jugadores en la sala

  // Declaracion de variables
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [error, setError] = useState(null);
  const [path, navigation] = useLocation();

  /***************************************************************************
   * FUNCIONES SOCKET
   ***************************************************************************/
  socket.on('connect', () => {
    console.log('Conectado al servidor de websockets');
  });

  socket.on('disconnect', (reason) => {
    console.log(`Se ha perdido la conexión con el servidor de websockets: ${reason}`);
  });

  /***************************************************************************
   * FUNCION ACTUALIZAR JUGADORES
   ***************************************************************************/
  const nomInterval = setInterval(() => {
    //console.log('Estamos en useEffect de sala');
    const players = JSON.parse(localStorage.getItem('jugadores'));
    if (players) {
      //console.log(`Estamos en useEffect de sala dentro del if y jugadoresLocalStorage= ${players}`);
      setJugadores(players);
    }
    clearInterval(interval);
  }, 2000);


  /***************************************************************************
   * FUNCION ELIMINAR SALA
   ***************************************************************************/
  socket.on("destroyingRoom", (idRoom) => {
    console.log('Estoy dentro de destroyingRoom sala');
    // ELiminar la base de datos de react
    localStorage.removeItem('idRoom');
    localStorage.removeItem('lider');
    localStorage.removeItem('players');
    localStorage.removeItem('nombreSala');
    clearInterval(nomInterval);
    navigation("/principal");
  });

  
  /***************************************************************************
   * FUNCION ACTUALIZAR JUGADORES
   ***************************************************************************/
  socket.on("updatePlayers", (nicknames) => {
    //console.log('Estoy dentro de updatePlayers sala');
    //console.log(nicknames);
    localStorage.setItem('jugadores', JSON.stringify(nicknames));
  });


  /***************************************************************************
   * FUNCION AVISAR JUGADOR ELIMINADO
   ***************************************************************************/
  socket.on("serverRoomMessage", (message) => {
    if (message === 'Has sido eliminado de la sala') {
      console.log("Mensaje del servidor:", message);
      navigation("/principal");
    }
  });
  

  /***************************************************************************
   * FUNCION ELIMINAR SALA
   ***************************************************************************/
  const EliminarSala = () => {

    socket.emit("destroyRoom", idRoom, (data) => {
      if (data.status !== 'ok') {
        setError(data.message);
      } else {
        console.log(data.message);
        // ELiminar la base de datos de react
        localStorage.removeItem('idRoom');
        localStorage.removeItem('lider');
        localStorage.removeItem('players');
        localStorage.removeItem('nombreSala');
        clearInterval(nomInterval);
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
        // ELiminar la base de datos de react
        localStorage.removeItem('idRoom');
        localStorage.removeItem('lider');
        localStorage.removeItem('nombreSala');
        clearInterval(nomInterval);
        navigation("/principal");
      }
    });
  }

  /***************************************************************************
   * FUNCION ELIMINAR USUARIO SALA DECISION LIDER
   ***************************************************************************/
  const EliminarUsuario = (nicknameDelete) => {

    socket.emit("removePlayerFromRoom", idRoom, { 'nickname': nicknameDelete }, (data) => {
      if (data.status !== 'ok') {
        setError(data.message);
      } else {
        clearInterval(nomInterval);
        // Resetear num jugadores
        localStorage.setItem('jugadores', players);
      }
    });
  }



  /***************************************************************************
    * FUNCION IMAGENES LINK
    ***************************************************************************/
  function ImagenesLink() {
    return (
      <div className="imagenes">
        <a href="/">
          <img src={help} alt="Ayuda" />
        </a>
      </div>
    );
  }


  /***************************************************************************
   * FUNCION COPIAR IDROOM
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
        console.error('Error copiando el código', err);
        setIsCopying(false);
      });
  };

  /***
   * FUNCION INICIAR PARTIDA
   **/
  const inicioPartida = () => {
    socket.emit("startGame", idRoom, 200, (data) => {
      console.log("Inicio de partida")
      if (data.status !== 'ok') {
        setError(data.message);
      } else {
        console.log(data.message);
      }
    });
  };

  /***
   * ORDEN JUGADORES
   ***/
  socket.on('ordenTurnos', (jugadores) => {
    console.log('Estoy dentro de ordenTurnos sala');
    console.log(jugadores);
    if(jugadores.ok === false){
      setError(jugadores.message);
    } else {

      const ordenTurnos = jugadores.ordenTurnos;
      const tiempo = jugadores.tiempo.ordenTurnos;
      navigation("/juego");
    }
  });



  return (
    <>

      <div className="Sala">
        <header className="header">
          SALA
        </header>
        <div className='barraTitulo'>{nombreSala}</div>
        <div className='imagenes-link'>
          <ImagenesLink />
        </div>
        {error && <p className="mensaje-error-salas">{error}</p>}
        <p className='nombre_codigo'>Código de la sala</p>
        <div className='barraCodigo'>
          <div className='idRoom'>{idRoom}</div>
          {!isCopied && !isCopying &&
            <button className='botonCopiar' onClick={copyToClipboard}>
              <img className='copiadoIcono' src={copy} alt='Copiar' />
            </button>
          }
          {isCopied &&
            <img className='copiadoIcono' src={check} alt='Copiar' />
          }
        </div>
        {lider === 'true' && <button className='comenzarPartida' onClick={() => inicioPartida()} >Comenzar partida</button>}
        {lider === 'true' && <button className='eliminarSala' onClick={EliminarSala}>Eliminar sala</button>}
        <div className="players-container">
          <div className="texto-participante">Participantes: {numPlayers}</div>
          {players.map((player, index) => (
            <div key={index} className="player">
              {player}
              {lider === 'true' && liderNickname !== player &&
                <img className='eliminarIcono' src={trash_2} alt='Eliminar' onClick={() => EliminarUsuario(player)} />}
            </div>
          ))}
        </div>
        {lider !== 'true' && <button className='abandonarSala' onClick={SalirSala}>Abandonar sala</button>}

      </div>
    </>
  );
}

export default Sala;
