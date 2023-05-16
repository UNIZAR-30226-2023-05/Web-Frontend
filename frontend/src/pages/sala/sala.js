import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket.js';
import './sala.css';
import '../../components/SalaJuego.css'
import "../../components/PopupAyudaSala.css"
import help from '../../assets/feather/help-circle.svg'
import check from '../../assets/feather/check.svg'
import copy from '../../assets/feather/copy.svg'
import trash_2 from '../../assets/feather/trash_2.svg'
import { useLocation } from 'wouter';
import Modal from 'react-modal';

function Sala() {
  const [contador, setContador] = useState(0);

  // Coger el nombre e id de la sala
  const nombreSala = localStorage.getItem('nombreSala');
  const idRoom = localStorage.getItem('idRoom');
  const liderNickname = localStorage.getItem('liderNickname');
  const nickname = localStorage.getItem('nickname');


  // Controlar si el usuario es el lider o no
  const lider = localStorage.getItem('lider'); // booleano
  const [players, setJugadores] = useState([]);
  console.log(`los jugadores en sala son ${players}`);
  const numPlayers = players ? players.length : 0; // Numero de jugadores en la sala

  // Declaracion de variables
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Modal de ayuda
  const [ayudaModalIsOpen, setAyudaModalIsOpen] = useState(false);
  const [ayudaInvitadosModalIsOpen, setAyudaInvitadosModalIsOpen] = useState(false);

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
  useEffect(() => {
    console.log('Estamos en useEffect de sala');
    const players = localStorage.getItem('jugadores');
    console.log(`los jugadores en useEffect son ${players}`);
    const lista = players.replace(/[\[\]\s"]/g, "").split(",");
    setJugadores(lista);
    console.log(`los jugadores en useEffect son ${lista}`);
  }, [contador]);

  /***************************************************************************
   * FUNCION ELIMINAR SALA
   ***************************************************************************/
  socket.on("destroyingRoom", (roomId) => {
    console.log('Estoy dentro de destroyingRoom sala');
    if (idRoom === roomId) {

      // ELiminar la base de datos de react
      localStorage.removeItem('idRoom');
      localStorage.removeItem('lider');
      localStorage.removeItem('players');
      localStorage.removeItem('nombreSala');

      navigation("/principal");
    }
    socket.off("destroyingRoom");
  });


  /***************************************************************************
   * FUNCION ACTUALIZAR JUGADORES
   ***************************************************************************/
  socket.on("updatePlayers", (nicknames) => {
    console.log('Estoy dentro de updatePlayers sala');
    console.log(nicknames);
    localStorage.setItem('jugadores', JSON.stringify(nicknames));
    setJugadores(nicknames);
    socket.off("updatePlayers");
  });


  /***************************************************************************
   * FUNCION AVISAR JUGADOR ELIMINADO
   ***************************************************************************/
  socket.on("serverRoomMessage", (message) => {
    if (message === 'Has sido eliminado de la sala') {
      console.log("Mensaje del servidor:", message);
      navigation("/principal");
    }
    socket.off("serverRoomMessage");
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
        /* ELiminar la base de datos de react
        localStorage.removeItem('idRoom');
        localStorage.removeItem('lider');
        localStorage.removeItem('players');
        localStorage.removeItem('nombreSala');*/

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

        // Resetear num jugadores
        localStorage.setItem('jugadores', players);
      }
    });
  }

  /***************************************************************************
   * FUNCION AYUDA MODALES
   ***************************************************************************/
  const AyudaModal = () => {
    console.log(lider);
    if (lider === "true") {
      setAyudaModalIsOpen(true);
    } 
    else {
      console.log('Estoy en el else');
      setAyudaInvitadosModalIsOpen(true);
    }
  };




  /***************************************************************************
    * FUNCION IMAGENES LINK
    ***************************************************************************/
  function ImagenesLink() {
    return (
      <div className="imagenes">
        <img src={help} alt="Ayuda" onClick={AyudaModal} />
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
        }, 1000);
      })
      .catch((err) => {
        console.error('Error copiando el código', err);
        setIsCopying(false);
      });
  };

  /***************************************************************************
   * RENDERIZADO
   ***************************************************************************/
  const handleClick = () => {
    setContador(contador + 1);
  };


  /***************************************************************************
   * FUNCION INICIAR PARTIDA
   ***************************************************************************/
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


  /***************************************************************************
   * FUNCION ORDEN JUGADORES
   ***************************************************************************/
  socket.on('ordenTurnos', (jugadores) => {
    console.log('Estoy dentro de ordenTurnos sala');
    console.log(jugadores);
    if(jugadores.ok === false){
      setError(jugadores.message);
    } else {
      const ordenTurnos = jugadores.ordenTurnos;
      localStorage.setItem("ordenTurnos", JSON.stringify(ordenTurnos));
      
      console.log(ordenTurnos[0]);
      console.log(nickname)
      if(ordenTurnos[0] === nickname){
        console.log('soy primero');
        localStorage.setItem('turno', true);
      }
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
        <button className="botonAmigos" onClick={handleClick}>Refresca</button>
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


        <Modal className="popupAyuda" isOpen={ayudaModalIsOpen} onRequestClose={() => setAyudaModalIsOpen(false)}>
          <div className="popup-ayuda">
            <p className="tituloAyuda">AYUDA</p>
            <p className="textoAyuda">Una vez se hayan unido todos los participantes pulse el botón</p>
            <p className="textoEspecifico">“COMENZAR PARTIDA”</p>
            <p className="textoAyuda">Transcurridos 2 minutos si no se han unido todos los participantes</p>
            <p className="textoAyuda"> los huecos se rellenarán con bots.</p>

            <button className="closeButton" onClick={() => setAyudaModalIsOpen(false)}>X</button>
          </div>
        </Modal>

        <Modal className="popupAyuda" isOpen={ayudaInvitadosModalIsOpen} onRequestClose={() => setAyudaInvitadosModalIsOpen(false)}>
          <div className="popup-ayuda">
            <p className="tituloAyuda">AYUDA</p>
            <p className="textoAyuda">Una vez el líder de la sala presione</p>
            <p className="textoEspecifico">“COMENZAR PARTIDA”</p>
            <p className="textoAyuda">dará comienzo la partida.</p>

            <button className="closeButton" onClick={() => setAyudaInvitadosModalIsOpen(false)}>X</button>
          </div>
        </Modal>



      </div>
    </>
  );
}

export default Sala;
