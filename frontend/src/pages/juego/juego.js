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
Modal.setAppElement('#root'); // para asegurarnos de que react-modal funcione correctamente

function Juego() {

  const posIni = 0;
  //Coger id de la sala
  const nickname = localStorage.getItem('nickname');
  const idRoom = localStorage.getItem('idRoom');

  /***************************************************************************
   * TURNO PRIMERA JUGADA
   ***************************************************************************/
  socket.on("ordenTurnos", (data) => {
    console.log('El orden de los turnos es: ' + data.ordenTurnos);
    const ordenTurnos = data.ordenTurnos;
    const tiempo = data.tiempo;
  });

  const turno = localStorage.getItem('turno'); // booleano

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



  /***************************************************************************
   * FUNCIÓN PARA ESCUCHAR EL TURNO
   ***************************************************************************/
   socket.on("sigTurno", (data) => {
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
     
  });

  /***************************************************************************
   * FUNCION MODAL OCA
   ***************************************************************************/
  const casillaOca = async () => {
  
    //Comprobar que ha caido en oca

    //Si ha caido en oca mostrar modal
    setOcaModal(true);

  }

  /***************************************************************************
   * FUNCION CERRAR MODALES
   ***************************************************************************/
  const closeModal = () => {
    setModalDado(false);
    setDado(null);
    setModalNoTurno(false);
    setOcaModal(false);
    setPuenteModal(false);
    setPosadaModal(false);
    setPozoModal(false);
    setLaberintoModal(false);
    setCarcelModal(false);
    setDadosModal(false);
    setCalaveraModal(false);
  };

  /***************************************************************************
   * FUNCION COMIENZO DE LA JUGADA
   ***************************************************************************/
  const comenzarJugada = () => {
    if (turno === true){
      console.log("Estoy en la funcion comenzar jugada");
      console.log('el id de la sala es: ' + idRoom);
      
      //Mando a backen turn con parametro el id de sala
      socket.emit("turn", parseInt(idRoom), (data) => {
        console.log("Mando turn");
        if (data.status !== 'ok') {
          setError(data.message);

        } else {
          // Se inicializa el valor del dado con el valor que llega del backend
          setDado(data.dice);
          console.log("El valor del dado es: " + data.dice);

          //Se inicializa la casilla con el valor que llega del backend
          setIdFicha1(data.casilla);


                   
        }
      });
      

    }}

  /***************************************************************************
   * FUNCIÓN RECIBE LA INFORMACIÓN DEL DADO
   ***************************************************************************/
  /*socket.on("tirarDados", (data) => {
    console.log("Estoy dentro de la funcion escuchar backend");
    if (estoyJugando === true){
      if (data.status !== 'ok') {
        setError(data.message);
      } else {
        console.log('Estas en la funcion tirarDado');
        
        //Hasta que no tire el dado no puede mover la animacion
        setDadoHab(true);

        //Valor del dado recibido del backend
        setDado(data.valor);
        
        //Posicion de la ficha
        //data.nuevaCelda
      }
    }
    
     
  });*/

  //Funcion para hacer todo lo visual que tenga que ver con el dado
  const tirarDado = () => {

  }
  
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


    
  return (
    <> 
      <header className="header">
        JUEGO
      </header>
      <div className='cont'>
        <Link to='/principal'>
          <button className='botonAbandonar'>Abandonar</button>
        </Link>
       
        <div className='barraTitulo'></div>
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
            

            {/* MODAL DADO */}
            {/*Cuando sea turno true se mostrara el modal de dado*/}
            {turno === true && <button className='botonJugar' onClick={() => setModalDado(true)}>Tirar Dado</button>}
            <Modal className="popup" isOpen={modalDado} onRequestClose={() => setModalDado(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">TIRA EL DADO</div>
                <div className='dado'>
                  <img className='dadoTam' src={dadoImg} onClick={() => comenzarJugada()} />
                  <div className='textoDado'>
                    <p>{dado}</p>
                  </div>
                
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>

            {/*Cuando sea turno false se mostrara un modal de no poder tirar aun.*/}
            {turno !== true && <button className='botonJugar' onClick={() => setModalNoTurno(true)}>Tirar Dado</button>}
            <Modal className="popup" isOpen={modalNoTurno} onRequestClose={() => setModalNoTurno(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">NO TIRAR</div>
                <div className="textoJuego">
                    <p>No es tu turno, no puedes tirar aún.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>
            
            {/* MODAL OCA */}
            <button className='botonPeligro' onClick={() => setOcaModal(true)}>OCa</button>
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
            <button className='botonPeligro' onClick={() => setPuenteModal(true)}>Puente</button>
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
            <button className='botonPeligro' onClick={() => setPosadaModal(true)}>Posada</button>
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
            <button className='botonPeligro' onClick={() => setPozoModal(true)}>POZO</button>
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
            <button className='botonPeligro' onClick={() => setLaberintoModal(true)}>Laberinto</button>
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
            <button className='botonPeligro' onClick={() => setCarcelModal(true)}>carcel</button>
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
            <button className='botonPeligro' onClick={() => setDadosModal(true)}>DADOS</button>
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
            <button className='botonPeligro' onClick={() => setCalaveraModal(true)}>CALAVERA</button>
            <Modal className="popup" isOpen={calaveraModal} onRequestClose={() => setCalaveraModal(false)}>
            <div className="popup-juego">
                <div className="tituloJuego">CALAVERA</div>
                <div className="textoJuego">
                    <p>¡¡Oh no!! Vuelves a la casilla incial.</p>
                    
                </div>

                <button className='closeButtonJuego' onClick={() => closeModal()}>X</button>
                
            </div>
            </Modal>
            

            
          </div>
          <div className='chat'>
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

