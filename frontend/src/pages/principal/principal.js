import React, { useState, useEffect } from "react";
import socket from "../../utils/socket.js";
import "./principal.css";
import "../../components/RestoPantallas.css";
import "../../components/PopupCrearSala.css";

import chat from "../../assets/feather/message-square.svg";
import amigos from "../../assets/feather/users.svg";
import ajustes from "../../assets/feather/settings.svg";
import tienda from "../../assets/feather/shopping-cart.svg";
import estrella from "../../assets/feather/star.svg";

import GetIDNickname from "../../services/getID_nickname_log.js";
import GetInfo from "../../services/getInfo_log.js";

import { Link, useLocation } from "wouter";
import Modal from "react-modal";

function Principal() {
  /***************************************************************************
   * DECLARACION DE VARIABLES
   ***************************************************************************/
  // Modal crear sala
  const [crearModalIsOpen, setCrearModalIsOpen] = useState(false);
  const [nombreSala, setNombreSala] = useState("");
  const [numJugadores, setNumJugadores] = useState("");
  const [estiloJuego, setEstiloJuego] = useState("");

  const nickname = localStorage.getItem("nickname");

  // Modal unirse a sala
  const [unirseModalIsOpen, setUnirseModalIsOpen] = useState(false);
  const [codigoSala, setCodigoSala] = useState("");

  const [error, setError] = useState(null);
  const [path, navigation] = useLocation();

  // Guardar las monedas
  const [monedas, setMonedas] = useState(0);
  const [cont, setCont] = useState(0);

  /***************************************************************************
   * FUNCIONES SOCKET
   ***************************************************************************/
  socket.on("connect", () => {
    console.log("Conectado al servidor de websockets");
  });

  socket.on("disconnect", (reason) => {
    console.log(
      `Se ha perdido la conexión con el servidor de websockets: ${reason}`
    );
  });

  /***************************************************************************
   * FUNCION OBTENER MONEDAS
   ***************************************************************************/
  const obtenerMonedas = async () => {
    // Coger id del usuario
    console.log(nickname);

    let dataId = await GetIDNickname(nickname);
    console.log(dataId);

    if (dataId.ok === true) {
    
        let data = await GetInfo(dataId.id_usuario);
    
        if(data.ok === true){
            // Se guardan los datos del usuario
            setMonedas(data.datos[0].monedas);
            
        }
        else{
            console.log(data.msg);
        }
    }
    else{
        console.log(dataId.msg);
    }
  };

  /***************************************************************************
   * FUNCION UNIR SALA
   ***************************************************************************/
  const unirSalaSocket = () => {
    socket.emit("joinRoom", codigoSala, { nickname: nickname }, (data) => {
      if (data.status !== "ok") {
        setError(data.message);
      } else {
        localStorage.setItem("jugadores", JSON.stringify(data.players));
        localStorage.setItem("nombreSala", data.roomName);
        localStorage.setItem("idRoom", codigoSala);
        // Variable para controlar quien es el lider
        localStorage.setItem("lider", false);
        navigation("/sala");
      }
    });
  };

  /***************************************************************************
   * FUNCION ACTUALIZAR JUGADORES
   ***************************************************************************/
  socket.on("updatePlayers", (nicknames) => {
    console.log("Estoy dentro de updatePlayers principal");
    console.log(nicknames);
    localStorage.setItem("jugadores", JSON.stringify(nicknames));
    console.log(JSON.stringify(nicknames));
  });

  /***************************************************************************
   * FUNCION CREAR SALA
   ***************************************************************************/
  const crearSalaSockets = () => {
    socket.emit("createRoom", { nickname: nickname }, nombreSala, numJugadores, estiloJuego, (data) => {
        if (data.status !== "ok") {
          setError(data.message);
        } else {
          localStorage.setItem("nombreSala", nombreSala);
          localStorage.setItem("idRoom", data.id);
          // Variable para controlar quien es el lider
          localStorage.setItem("lider", true);
          localStorage.setItem("liderNickname", nickname);
          navigation("/sala");
        }
      }
    );
  };

  /***************************************************************************
   * FUNCION IMAGENES LINK
   ***************************************************************************/
  function ImagenesLink() {
    return (
      <div className="imagenes">
        <a href="/chat">
          <img src={chat} alt="Chat" />
        </a>
        <a href="/amigos">
          <img src={amigos} alt="Amigos" />
        </a>
        <a href="/ajustes">
          <img src={ajustes} alt="Ajustes" />
        </a>
      </div>
    );
  }

  /***************************************************************************
   * FUNCION CERRAR MOmessage-square.svg'DAL CREAR SALA Y UNIRSE A SALA
   ***************************************************************************/
  const closeModalCrearSala = () => {
    setCrearModalIsOpen(false);
    setError("");
    setNombreSala("");
    setNumJugadores("");
  };

  const closeModalUnirseSala = () => {
    setUnirseModalIsOpen(false);
    setCodigoSala("");
    setError("");
  };

  /***************************************************************************
   * FUNCION HANDLE
   ***************************************************************************/
  // Funcion para crear la sala
  const crearSala = () => {
    if (nombreSala === "" || numJugadores === "" || estiloJuego === "") {
      setError("Rellene todos los campos obligatorios");
    } else {
      crearSalaSockets();
    }
  };

  // Funcion para unirse a la sala
  const unirseSala = () => {
    if (codigoSala === "") {
      setError("Rellene el campo obligatorio");
    } else {
      unirSalaSocket();
    }
  };


  /***************************************************************************
   * FUNCION COGER MONEDAS NADA MAS RENDERIZAR
   **************************************************************************/
  // Función para obtener la información de la cuenta al entrar en la pantalla
  useEffect(() => {
    console.log('useEffect');
    obtenerMonedas();
  }, [cont]);



  return (
    <div className="Principal">
      <header className="header">PRINCIPAL</header>
      <div className="barraTitulo"></div>
      <div className="imagenes-link">
        <ImagenesLink />
      </div>

      <div className="container">
        <img className="estrella" src={estrella} alt="Estrella" />
        <p className="monedas">Monedas: {monedas}</p>
      </div>
            
      <div className="mismaLinea">
        <div className="recuadro">
          <div className="titulo">CREA TU PROPIA SALA</div>
          <div className="subtitulo">
            Crea una sala y compartela con quien quieras
          </div>
          <button className="buttonSala" onClick={() => setCrearModalIsOpen(true)}>Crear</button>
        </div>
        <div className="recuadro">
          <div className="titulo">ÚNETE A UNA SALA</div>
          <div className="subtitulo">
            Comparte la experiencia con tus amigos
          </div>
          <button className="buttonSala" onClick={() => setUnirseModalIsOpen(true)}> Unirse </button>
        </div>
      </div>

      <Modal
        className="popup"
        isOpen={crearModalIsOpen}
        onRequestOpen={() => setCrearModalIsOpen(false)}
      >
        <div className="popup-sala">
          <p className="titulo">CREAR SALA</p>
          <p className="texto">¿Desea crear una sala?</p>
          <p className="texto">Nombre de la sala*</p>
          <input className="barraEscribirSala" type="text" placeholder="Nombre de la sala" value={nombreSala} onChange={(e) => setNombreSala(e.target.value)}/>

          <p className="texto">Número de jugadores*</p>
          <select className="barraDespegable" value={numJugadores} onChange={(e) => setNumJugadores(e.target.value)}>
            <option value="">Número de jugadores</option>
            {[2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <p className="texto">Estilo de juego*</p>
          <select className="barraDespegable" value={estiloJuego} onChange={(e) => setEstiloJuego(e.target.value)}>
            <option value="">Estilo de juego</option>
            {["clásico"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button className="closeButton" onClick={() => closeModalCrearSala()}>
            X
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="texto">* Campo obligatorio</p>

          <button className="elButton" onClick={crearSala}>
            Crear
          </button>
        </div>
      </Modal>

      <Modal
        className="popup"
        isOpen={unirseModalIsOpen}
        onRequestClose={() => setUnirseModalIsOpen(false)}
      >
        <div className="popup-sala">
          <p className="titulo">UNIRSE A UNA SALA</p>
          <p className="texto">¿Desea unirse a una sala existente?</p>
          <p className="texto">Código de la sala*</p>
          <input
            className="barraEscribirSala"
            type="text"
            placeholder="Código de la sala"
            value={codigoSala}
            onChange={(e) => setCodigoSala(e.target.value)}
          />

          <button
            className="closeButton"
            onClick={() => closeModalUnirseSala()}
          >
            X
          </button>
          {error && <p className="error-message">{error}</p>}
          <p className="texto">* Campo obligatorio</p>

          <button className="elButton" onClick={unirseSala}>
            Unirse
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Principal;
