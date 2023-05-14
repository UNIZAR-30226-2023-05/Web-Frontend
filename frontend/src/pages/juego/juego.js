import React, { useEffect, useState } from 'react';
import './juego.css';
import { Link, useLocation } from 'wouter';
import '../../components/PopupJuego.css';

import socket from '../../utils/socket.js';
import Modal from 'react-modal';
import image1 from '../../assets/img/Skin_dorada.png'
import image2 from '../../assets/img/Skin_rosa.png'
import image3 from '../../assets/img/Skin_verde.png'
import image4 from '../../assets/img/Skin_azul.png'
import image5 from '../../assets/img/Skin_roja.png'
import image6 from '../../assets/img/Skin_negra.png'
import dadoImg from '../../assets/img/dado.png'
import calcularPosicion from '../../data/coordTablero';

// Librería de chat
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer, Sidebar, ConversationList, Conversation, Avatar, MessageGroup, Message,
    ChatContainer, ConversationHeader, MessageList, MessageInput
} from "@chatscope/chat-ui-kit-react";

import { useChat, ChatMessage, MessageContentType, MessageDirection, MessageStatus } from "@chatscope/use-chat";

Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Juego() {

  const posIni = 0;
  const [turno, setTurno] = useState(null);
  const [posicion, setPosicion] = useState([]);
  //Coger id de la sala
  const nickname = localStorage.getItem('nickname');
  const idRoom = localStorage.getItem('idRoom');
  const nombreSala = localStorage.getItem('nombreSala');
  const listaNombres = JSON.parse(localStorage.getItem('ordenTurnos'));

  const listaFichas = ['ficha1', 'ficha2', 'ficha3', 'ficha4', 'ficha5', 'ficha6'];

  // Lista de mensajes para el chat de la sala
  const [messageList, setMessageList] = useState([]);

  //  Emparejamiento de cada jugador con su ficha.
  const parejas = listaNombres.map((nombre, index) => [nombre, listaFichas[index]]);

  useEffect(() => {
    //const turnoAlmacenado = localStorage.getItem('turno');
    if (listaNombres[0] === nickname) {
      setTurno('true');
    } else {
      setTurno('false');
    }
  }, []);

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
   * POSICIONES INICIALES DE LAS FICHAS
   ***************************************************************************/

  //Posicion inicial del jugador 1
  const [inicialT1, inicialL1] = calcularPosicion(1, posIni);
  const [myTop1, setMyTop1] = useState(inicialT1);
  const [myLeft1, setMyLeft1] = useState(inicialL1);


  //Posicion inicial del jugador 2
  const [inicialT2, inicialL2] = calcularPosicion(2, posIni);  
  const [myTop2, setMyTop2] = useState(inicialT2);
  const [myLeft2, setMyLeft2] = useState(inicialL2);


  //Posicion inicial del jugador 3
  const [inicialT3, inicialL3] = calcularPosicion(3, posIni);
  const [myTop3, setMyTop3] = useState(inicialT3);
  const [myLeft3, setMyLeft3] = useState(inicialL3);

  //Posicion inicial del jugador 4
  const [inicialT4, inicialL4] = calcularPosicion(4, posIni);
  const [myTop4, setMyTop4] = useState(inicialT4);
  const [myLeft4, setMyLeft4] = useState(inicialL4);

  //Posicion inicial del jugador 5
  const [inicialT5, inicialL5] = calcularPosicion(5, posIni);
  const [myTop5, setMyTop5] = useState(inicialT5);
  const [myLeft5, setMyLeft5] = useState(inicialL5);

  //Posicion inicial del jugador 6
  const [inicialT6, inicialL6] = calcularPosicion(6, posIni);
  const [myTop6, setMyTop6] = useState(inicialT6);
  const [myLeft6, setMyLeft6] = useState(inicialL6);


  const [idFicha1, setIdFicha1] = useState(0); //lo que me llegue de backend ira a idFicha1
  const [idFicha2, setIdFicha2] = useState(0);
  const [idFicha3, setIdFicha3] = useState(0);
  const [idFicha4, setIdFicha4] = useState(0);
  const [idFicha5, setIdFicha5] = useState(0);
  const [idFicha6, setIdFicha6] = useState(0);

  //Inicialización de dado
  const [dado, setDado] = useState(0);

  const [error, setError] = useState(null);

  const [casilla, setCasilla] = useState(0);

  /***************************************************************************
   * INICIO CASILLAS ESPECIALES
   ***************************************************************************/
  //Modal dado
  const [modalDado, setModalDado] = useState(false);

  //Modal no turno
  const [modalNoTurno, setModalNoTurno] = useState(false);

  // Modal oca
  const [ocaModal, setOcaModal] = useState(false);
  
  // Modal puente
  const [puenteModal, setPuenteModal] = useState(false);

  // Modal posada
  const [posadaModal, setPosadaModal] = useState(false);

  // Modal pozo
  const [pozoModal, setPozoModal] = useState(false);

  // Modal laberinto
  const [laberintoModal, setLaberintoModal] = useState(false);

  // Modal carcel
  const [carcelModal, setCarcelModal] = useState(false);

  // Modal dados
  const [dadosModal, setDadosModal] = useState(false);

  // Modal calavera
  const [calaveraModal, setCalaveraModal] = useState(false);

  // Modal ganador
  const [ganadorModal, setGanadorModal] = useState(false);


  /***************************************************************************
   * FUNCIÓN PARA ESCUCHAR EL TURNO
   ***************************************************************************/
   /*socket.on("sigTurno", (data) => {
    console.log("Estoy dentro de la funcion SIG TURN escuchar backend");
    if (data.status !== 'ok') {
      setError(data.message);
    }
    else {
      console.log('Estas en la funcion SIG TURN');
      console.log(data);
      //Si es mi turno
      if (data.turno === nickname){
        console.log("Es mi turno");
      }
      else{
        console.log("No es mi turno");
      }
    }
     
  });*/

  /***************************************************************************
   * FUNCION CERRAR MODALES
   ***************************************************************************/
  const closeModal = () => {
    
    setModalNoTurno(false);

    setOcaModal(false);

    setPuenteModal(false);

    setPosadaModal(false);

    setPozoModal(false);

    setLaberintoModal(false);

    setCarcelModal(false);

    setDadosModal(false);

    setCalaveraModal(false);

    //Abre el modal del dado
    setModalDado(true);
  };

  const closeModalDado = () => {
    setModalDado(false);

    setDado(null);
  };

  /***************************************************************************
   * FUNCION COMIENZO DE LA JUGADA
   ***************************************************************************/
  const comenzarJugada = () => {


    if (turno === 'true'){
      console.log("Estoy en la funcion comenzar jugada");
      console.log('el id de la sala es: ' + idRoom);
      
      //Mando a backen turn con parametro el id de sala
      socket.emit("turn", parseInt(idRoom), (data) => {
        console.log("Mando turn");
        if (data.status !== 'ok') {
          setError(data.message);

        } else {

          // Datos recibidos correctamente, hacer algo con ellos
          const { dice, afterDice, rollAgain, finalCell } = data.res;
          console.log('Dice:', dice);
          console.log('AfterDice:', afterDice);
          console.log('RollAgain:', rollAgain);
          console.log('FinalCell:', finalCell)

          // Se inicializa el valor del dado con el valor que llega del backend
          setDado(dice);
          
          // Funcion para cerrar el modal del dado despues de 500ms
          setTimeout(() => {
            setModalDado(false);
          }, 500);
          

          //Se inicializa la ficha que corresponde con el valor de la casilla que llega del backend
          //setIdFicha1(afterDice);
          inicializarFicha(afterDice);


          //Si rollAgain es true, turno sigue siendo true
          if(rollAgain === true){
            setTurno('true');
            setIdFicha1(finalCell);
            console.log('Turno' + turno);

          } else {
            setTurno('false');
            console.log('Turno: ' + turno);
          }

          //Se comprueba si es una casilla especial
          comprobarCasilla(afterDice);

                   
        }
      });
      
    }
  }
  
  const inicializarFicha = (casilla) => {
    console.log("Estoy en la funcion inicializar ficha");
    const indi = listaNombres.indexOf(nickname);

      switch(indi){
        case 0:
          setIdFicha1(casilla);
          break;

        case 1:
          setIdFicha2(casilla);
          break;

        case 2:
          setIdFicha3(casilla);
          break;

        case 3:
          setIdFicha4(casilla);
          break;

        case 4:
          setIdFicha5(casilla);
          break;

        case 5:
          setIdFicha6(casilla);
          break;
      }
  }
  
  //Si es una casilla especial se abre el modal correspondiente
  const comprobarCasilla = (casilla) => { 
    //Si es una casilla de oca se abre el modal de oca
    if (casilla === 5 || casilla === 9 || casilla === 14 || casilla === 18 || 
      casilla === 23 || casilla === 27 || casilla === 32 || casilla === 36 || 
      casilla === 41 || casilla === 45 || casilla === 50 || casilla === 54 || 
      casilla === 59){
      setOcaModal(true);
      console.log("OCA")

    } else if (casilla === 6){ //Si es una casilla de puente se abre el modal de puente
      setPuenteModal(true);
      console.log("PUENTE")

    } else if (casilla === 19){ //Si es una casilla de posada se abre el modal de posada
      setPosadaModal(true);
      console.log("POSADA")

    } else if (casilla === 31){ //Si es una casilla de pozo se abre el modal de pozo
      setPozoModal(true);
      console.log("POZO")
      
    } else if (casilla === 42){ //Si es una casilla de laberinto se abre el modal de laberinto
      setLaberintoModal(true);
      console.log("LABERINTO")

    } else if (casilla === 56){ //Si es una casilla de carcel se abre el modal de carcel
      setCarcelModal(true);
      console.log("CARCEL")

    } else if (casilla === 26){ //Si es una casilla de dados se abre el modal de dados
      setDadosModal(true);
      console.log("DADOS")

    } else if (casilla === 58){ //Si es una casilla de calavera se abre el modal de calaveras
      setCalaveraModal(true);setDadosModal(true);
      console.log("CALAVERA")
      
    } else if (casilla === 62){
      console.log("GANASTE")
      //Mando a backend que he ganado****************************************************** MIRAR
    /*  socket.emit("ganar", parseInt(idRoom), (data) => {
        console.log("Mando ganar");
        if (data.status !== 'ok') {
          setError(data.message);

        } else {
          // Datos recibidos correctamente, hacer algo con ellos
          console.log('GANASTE');
          setModalGanar(true);
        }
      });*/
    }

  }


  /***************************************************************************
   * FUNCIÓN RECIBE LA INFORMACIÓN DEL LOS DEMÁS JUGADORES
   ***************************************************************************/
  socket.on("estadoPartida", (data) => {
    console.log("Estoy dentro de la funcion escuchar backend");
    
    if (data.status !== 'ok') {
      setError(data.message);
    } else {
      console.log('Estas en la funcion estadoParetida');
      
      setPosicion(data.posicion);
      console.log("posicion: " + posicion);

      let nombre = posicion['nickname'];
      console.log("nombre: " + nombre);
      
      let celda = posicion['celda'];
      console.log("celda: " + celda);

      const posicion = listaNombres.indexOf(nickname);

      switch(posicion){
        case 0:
          setIdFicha1(celda);
          break;

        case 1:
          setIdFicha2(celda);
          break;

        case 2:
          setIdFicha3(celda);
          break;

        case 3:
          setIdFicha4(celda);
          break;

        case 4:
          setIdFicha5(celda);
          break;

        case 5:
          setIdFicha6(celda);
          break;
      }
    }
  });

  
  /***************************************************************************
   * FUNCIÓN PARA MOVER LAS FICHAS
   ***************************************************************************/
  /*Funcion para hacer la logica del juego: puentes, preguntas...*/
  /*Por defecto: Renderiza cuando se modifica el valor y cuando se renderiza por primera vez la pantalla*/
  //  Ficha 1
  useEffect(() => {
    //Si no es ninguna de las logicas
    const [nuevoTop1, nuevoLeft1] = calcularPosicion(1, idFicha1);
    console.log(nuevoTop1, nuevoLeft1)
    setMyTop1(nuevoTop1);
    setMyLeft1(nuevoLeft1);
    
  }, [idFicha1])

  //  Ficha 2
  useEffect(() => {
    
    const [nuevoTop2, nuevoLeft2] = calcularPosicion(2, idFicha2);
    console.log(nuevoTop2, nuevoLeft2)
    setMyTop2(nuevoTop2);
    setMyLeft2(nuevoLeft2);
    
  }, [idFicha2])

  //  Ficha 3
  useEffect(() => {
    
    //ficha 3
    const [nuevoTop3, nuevoLeft3] = calcularPosicion(3, idFicha3);
    console.log(nuevoTop3, nuevoLeft3)
    setMyTop3(nuevoTop3);
    setMyLeft3(nuevoLeft3);
  }, [idFicha3])

  //  Ficha 4
  useEffect(() => {
    //ficha 4
    const [nuevoTop4, nuevoLeft4] = calcularPosicion(4, idFicha4);
    console.log(nuevoTop4, nuevoLeft4)
    setMyTop4(nuevoTop4);
    setMyLeft4(nuevoLeft4);
    
  }, [idFicha4])

  //  Ficha 5
  useEffect(() => {
      //ficha 5
    const [nuevoTop5, nuevoLeft5] = calcularPosicion(5, idFicha5);
    console.log(nuevoTop5, nuevoLeft5)
    setMyTop5(nuevoTop5);
    setMyLeft5(nuevoLeft5);
  }, [idFicha5])

  //  Ficha 6
  useEffect(() => {
    //ficha 6
    const [nuevoTop6, nuevoLeft6] = calcularPosicion(6, idFicha6);
    console.log(nuevoTop6, nuevoLeft6)
    setMyTop6(nuevoTop6);
    setMyLeft6(nuevoLeft6);
    

  }, [idFicha6])

  /***************************************************************************
   * FUNCIONES PARA ACTUALIZAR CHAT
   ***************************************************************************/
  const handleSend = text => {
    console.log("Mensaje enviado:", text);

    const message = {
        message: text,
        sentTime: "just now",
        sender: "Yo",
        direction: MessageDirection.Outgoing,
      };    

    setMessageList([...messageList, message]); // Agrega el mensaje a la lista

    // Enviar evento mensaje
    socket.emit('sendMessage', idRoom, text, (data) => {
            if (data.status !== 'ok') {
              setError(data.message);
            } else {
              console.log(data.msg);
            }
          });

  };

  socket.on('roomMessage', (data) => {
    console.log("Mensaje de otro usuario");
    console.log(data);
    const message = {
        message: data.message,
        sentTime: "just now",
        sender: data.user,
        direction: MessageDirection.Incoming,
      };    

    setMessageList([...messageList, message]); // Agrega el mensaje a la lista
  });

  socket.on('serverRoomMessage', (data) => {
    console.log("Mensaje de otro usuario");
    console.log(data);
    const message = {
        message: data.message,
        sentTime: "just now",
        sender: "Servidor",
        direction: MessageDirection.Incoming,
      };    

    setMessageList([...messageList, message]); // Agrega el mensaje a la lista
  });


    
  return (
    <> 
      <header className="header">
        JUEGO
      </header>
      <div className='cont'>
        <Link to='/principal'>
          <button className='botonAbandonar'>Abandonar</button>
        </Link>
       
        <div className='barraTitulo'>{nombreSala}</div>
      </div>
      
      <div className='contenedor'>  
          <div className='tablero'>
            <div className='ficha1' style={ {top:`${myTop1}%`,left:`${myLeft1}%`}}>
              <img className='fichaTam' src={image1} />
            </div>
            <div className='ficha2' style={ {top:`${myTop2}%`,left:`${myLeft2}%`}}>
              <img className='fichaTam' src={image2} />
            </div>
            <div className='ficha3' style={ {top:`${myTop3}%`,left:`${myLeft3}%`}}>
              <img className='fichaTam' src={image3} />
            </div>
            <div className='ficha4' style={ {top:`${myTop4}%`,left:`${myLeft4}%`}}>
              <img className='fichaTam' src={image4} />
            </div>
            <div className='ficha5' style={ {top:`${myTop5}%`,left:`${myLeft5}%`}}>
              <img className='fichaTam' src={image5} />
            </div> 
            <div className='ficha6' style={ {top:`${myTop6}%`,left:`${myLeft6}%`}}>
              <img className='fichaTam' src={image6} />
            </div>

           
            
            {/* MODAL TIRAR DADO */}
            {/*Cuando sea turno true se mostrara el modal de dado*/}
            {turno === 'true' && <button className='botonJugar' onClick={() => setModalDado(true)}>Tirar Dado</button>}
            <Modal className="popup" isOpen={modalDado} onRequestClose={() => setModalDado(false)}> <div className='valorDado' style={{top:'70%', left:'35%'}}>
              <p>{dado}</p>
            </div>
            <div className="popup-juego">
                <div className="tituloJuego">TIRA EL DADO</div>
                <div className='dado'>
                  <img className='dadoTam' src={dadoImg} onClick={() => comenzarJugada()} />
                  <div className='textoDado'>
                    <p>{dado}</p>
                  </div>
                
                </div>

                <button className='closeButtonJuego' onClick={() => closeModalDado()}>X</button>
                
            </div>
            </Modal>

            {/*Cuando sea turno false se mostrara un modal de no poder tirar aun.*/}
            {/* {turno !== 'true' && <button className='botonJugar' onClick={() => setModalDado(true)}>Tirar Dado</button>}
            <Modal className="popup" isOpen={modalNoTurno} onRequestClose={() => setModalNoTurno(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">NO TIRAR</div>
                <div className="textoJuego">
                    <p>No es tu turno, no puedes tirar aún.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModalDado()}>X</button>
                
            </div>
            </Modal> */}
            
            {/* MODAL OCA */}
            
            <Modal className="popup" isOpen={ocaModal} onRequestClose={() => setOcaModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">OCA</div>
                <div className="textoJuego">
                    <p>De oca a oca y tiro porque me toca. ¡Vuelve a tirar!</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL PUENTE */}
            
            <Modal className="popup" isOpen={puenteModal} onRequestClose={() => setPuenteModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">PUENTE</div>
                <div className="textoJuego">
                    <p>De puente a puente y tiro porque pasa la corriente. ¡Vuelve a tirar!</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL POSADA */}
            {/* <button className='botonPeligro' onClick={() => setPosadaModal(true)}>Posada</button> */}
            <Modal className="popup" isOpen={posadaModal} onRequestClose={() => setPosadaModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">POSADA</div>
                <div className="textoJuego">
                    <p>!La POSADA¡ No puedes jugar durante 1 turno.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL POZO */}
            {/* <button className='botonPeligro' onClick={() => setPozoModal(true)}>POZO</button> */}
            <Modal className="popup" isOpen={pozoModal} onRequestClose={() => setPozoModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">POZO</div>
                <div className="textoJuego">
                    <p>No puedes jugar 2 turnos.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL LABERINTO */}
            {/* <button className='botonPeligro' onClick={() => setLaberintoModal(true)}>Laberinto</button> */}
            <Modal className="popup" isOpen={laberintoModal} onRequestClose={() => setLaberintoModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">LABERINTO</div>
                <div className="textoJuego">
                    <p>¡Te has perdido! No puedes jugar 3 turnos.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL CARCEL */}
            {/* <button className='botonPeligro' onClick={() => setCarcelModal(true)}>carcel</button> */}
            <Modal className="popup" isOpen={carcelModal} onRequestClose={() => setCarcelModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">CARCEL</div>
                <div className="textoJuego">
                    <p>Encarcelado. No puedes jugar durante 4 turnos.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/* MODAL DADOS */}
            {/* <button className='botonPeligro' onClick={() => setDadosModal(true)}>DADOS</button> */}
            <Modal className="popup" isOpen={dadosModal} onRequestClose={() => setDadosModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">DADOS</div>
                <div className="textoJuego">
                    <p>De dado a dado y tiro porque son cuadrados.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div> 
            </Modal>

            {/* MODAL CALAVERA */}
            {/* <button className='botonPeligro' onClick={() => setCalaveraModal(true)}>CALAVERA</button> */}
            <Modal className="popup" isOpen={calaveraModal} onRequestClose={() => setCalaveraModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">CALAVERA</div>
                <div className="textoJuego">
                    <p>¡¡Oh no!! Vuelves a la casilla incial.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/*  MODAL GANADOR */}
            <Modal className="popup" isOpen={ganadorModal} onRequestClose={() => setGanadorModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">¡¡¡GANADOR!!!</div>
                <div className="textoJuego">
                    <p>¡¡¡ENHORABUENA!!!</p>
                </div>
                
                <button className='closeButtonJuego' onClick={() => closeModalDado()}>X</button>
                
              </div>
              </Modal>

            

            
          </div>
          <div className='chat'>
            <MainContainer>
              <ChatContainer>
              <ConversationHeader>
                {"https://i.postimg.cc/rwgky4HC/oca1.png"}
                <ConversationHeader.Content userName={"Chat de partida"} />
              </ConversationHeader>
              <MessageList>
                {messageList.map((message, index) => {
                  const isFirstMessage = index === 0;
                  const isDifferentUser = message.sender !== messageList[index - 1]?.sender;
                  const shouldDisplayHeader = isFirstMessage || isDifferentUser;
                  console.log(message);
                  console.log(shouldDisplayHeader);
                  console.log(message.sender);
                  return (
                    <Message model={message} key={index}>
                      {shouldDisplayHeader && message.sender !== 'Yo' && (
                        <Message.Header>{message.sender}</Message.Header>
                      )}
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput onSend={handleSend} placeholder="Escribe tu mensaje..." />
              </ChatContainer>
            </MainContainer>

              {/* <button onClick={() => setIdFicha1(/*valorBackend*/ /*(idFicha1 + 1) % 63)}>saltar1</button> 
              <button onClick={() => setIdFicha2(idFicha2+1)}>saltar2</button>
              <button onClick={() => setIdFicha3(idFicha3+1)}>saltar3</button>
              <button onClick={() => setIdFicha4(idFicha4+1)}>saltar4</button>
              <button onClick={() => setIdFicha5(idFicha5 + 1)}>saltar5</button>
              <button onClick={() => setIdFicha6(idFicha6+1)}>saltar6</button>*/}
          </div>
      </div> 
    </>
  );
}


export default Juego;

