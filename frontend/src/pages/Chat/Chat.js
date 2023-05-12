import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './Chat.css';
import '../../components/RestoPantallas.css';
import home from '../../assets/feather/home.svg';
import userMas from '../../assets/feather/user_plus.svg';
import userMenos from '../../assets/feather/user_minus.svg';
import user from '../../assets/feather/user.svg';

import Modal from 'react-modal';
import GetID from '../../services/getID_log.js';
import GetIDNickname from '../../services/getID_nickname_log.js';
import GetInfo from '../../services/getInfo_log.js';
import GetAmigos from '../../services/getAmigos_log.js';

// Librería de chat
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

function Chat() {
    /***************************************************************************
     * DECLARACION DE VARIABLES
     ***************************************************************************/
    const [contador, setContador] = useState(0);

    const nicknameUsuario = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');

    // Lista de amigos
    const [listaAmigos, setListaAmigos] = useState([]);

    // Booleano para renderizar
    const [render, setRender] = useState(true);
    //console.log(`Render: ${render}`);

    const [error, setError] = useState(null);
    const [path, navigation] = useLocation();

    /***************************************************************************
    * FUNCION OBTENER ID USUARIO
    ***************************************************************************/
    const IDUsuario = async () => {
        console.log(`Estoy en IDUsuario con email: ${nicknameUsuario}`);

        // Llama funcion moficicar contraseña en backend
        let dataId = await GetIDNickname(nicknameUsuario);
        //console.log(dataId);
        if (dataId.ok === true) {
            return dataId.id_usuario;
        }
        else {
            console.log(dataId.msg);
            return null;
        }
    }

    /***************************************************************************
     * FUNCION OBTENER AMIGOS
     ***************************************************************************/
    useEffect(() => {
        console.log('Estamos en useEffect de amigos');
        obtenerAmigos();
    }, [contador]);

    const obtenerAmigos = async () => {
        // Se espera hasta que se obtenga el id del usuario
        let id = await IDUsuario();
        console.log(`id: ${id}`);

        let data = await GetAmigos(id);
        console.log("estoy en obtenerAmigos y el data es:");
        console.log(data);
        if (data.ok === true) {
            console.log(`estoy en obtenerAmigos y el data.amigos es: ${data.amigos}`);
            setListaAmigos(data.amigos);
        }
        else {
            setError(data.msg);
        }
    }

    /***************************************************************************
     * FUNCION IMAGENES LINK
     ***************************************************************************/
    function ImagenesLink() {
        return (
            <div className="imagenes">
                <a href="/principal">
                    <img src={home} alt="Home" />
                </a>
            </div>
        );
    }

    function handleAmigoSeleccionado(amigoSeleccionado) {
        console.log("Amigo seleccionado:", amigoSeleccionado);
        setChatWith(amigoSeleccionado);
    }

    const ENDPOINT = "http://localhost:5000"; // dirección del servidor socket.io


    function handleEnviarMensaje(mensaje) {
        console.log("Aqui emitiria mensaje:", mensaje);
        //socket.emit("mensaje", { mensaje, remitente: "yo" });
    }



    /***************************************************************************
     * RENDERIZADO
     ***************************************************************************/
    const handleClick = () => {
        setContador(contador + 1);
    };

    const [chatWith, setChatWith] = useState("");
    const [value, setValue] = useState("");

    return (
        <div className="Principal">
            <header className="header">
                CHAT
            </header>
            <div className='barraTitulo'></div>
            <div className='imagenes-link'>
                <ImagenesLink />
            </div>

            <div className="contenedorPrincipal">
                <div className="contenedorAmigos">
                    <div className="lista-amigos">
                        {listaAmigos.length > 0 ? (
                        <ul>
                            {listaAmigos.map((amigo, index) => (
                            <div key={index} className="amigosSolicitudes" onClick={() => {handleAmigoSeleccionado(amigo);}}>
                                <img className='userIconoAmigos' src={user} alt='' />
                                {amigo}
                            </div>
                            ))}
                        </ul>
                        ) : (
                        <p className='mensaje'>Busca amigos con los que compartir esta experiencia</p>
                        )}
                    </div>
                </div>
                <div className="contenedorChat">
                    <MainContainer>
                        <ChatContainer>
                        <ConversationHeader>
                            {"https://i.postimg.cc/rwgky4HC/oca1.png"}
                            <ConversationHeader.Content userName={chatWith} />
                        </ConversationHeader>
                        <MessageList>
                        </MessageList>
                        <MessageInput value={value} onSend={() => { handleEnviarMensaje(value); setValue(''); }} placeholder="Escribe tu mensaje..." />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </div>

    );

}

export default Chat;
