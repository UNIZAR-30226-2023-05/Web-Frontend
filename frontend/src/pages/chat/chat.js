import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './chat.css';
import '../../components/RestoPantallas.css';
import home from '../../assets/feather/home.svg';
import amigos from '../../assets/feather/users.svg'

import Modal from 'react-modal';
import GetID from '../../services/getID_log.js';
import GetIDNickname from '../../services/getID_nickname_log.js';
import GetInfo from '../../services/getInfo_log.js';
import GetAmigos from '../../services/getAmigos_log.js';

// Librería de chat
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer, Sidebar, ConversationList, Conversation, Avatar, MessageGroup, Message,
    ChatContainer, ConversationHeader, MessageList, MessageInput
} from "@chatscope/chat-ui-kit-react";

import { useChat, ChatMessage, MessageContentType, MessageDirection, MessageStatus } from "@chatscope/use-chat";

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

    
    const [messageList, setMessageList] = useState([]);
    const [chatWith, setChatWith] = useState("");

    const [amigoChatActivo, setAmigoChatActivo] = useState('');

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
                <a href="/amigos">
                    <img src={amigos} alt="Amigos" />
                </a>
                <a href="/principal">
                    <img src={home} alt="Home" />
                </a>
            </div>
        );
    }

    async function handleAmigoSeleccionado(amigoSeleccionado) {
        // Si ya está seleccionado, no lo volvemos a seleccionar
        if (amigoSeleccionado === amigoChatActivo) {
            return;
        }
        console.log("Amigo seleccionado:", amigoSeleccionado);
        setChatWith(amigoSeleccionado);
        setAmigoChatActivo(amigoSeleccionado);
        // Obtenemos usuarios para quedarnos con los IDs
        const sender = await GetIDNickname(nicknameUsuario);
        const receiver = await GetIDNickname(amigoSeleccionado);

        // Vaciamos messageList
        setMessageList([]);
        // Recuperamos chat con amigo
        console.log("Recuperamos chat con amigo");
        socket.emit('getPrivMessage', sender.id_usuario, receiver.id_usuario, (data) => {
            if (data.status !== 'ok') {
              console.log("Ha habido un error");
              console.log(data.status)
              setError(data.message);
            } else {
              console.log("Mensajes recibidos");
              console.log(data.messages);
              // Cargamos el chat
              for (let i = 0; i < data.messages.length; i++) {
                console.log(data.messages[i]);
                if(data.messages[i].emisor === sender.id_usuario){
                    const message = {
                        message: data.messages[i].contenido,
                        sentTime: data.messages[i].sentTime,
                        sender: "Yo",
                        direction: MessageDirection.Outgoing,
                    };
                    //setMessageList([...messageList, message]);
                    messageList.push(message);
                    
                }
                else{
                    const message = {
                        message: data.messages[i].contenido,
                        sentTime: data.messages[i].sentTime,
                        sender: data.messages[i].sender,
                        direction: MessageDirection.Incoming,
                    };
                    //setMessageList([...messageList, message]);
                    messageList.push(message);
                }
                setMessageList([...messageList]);
              }

            }
          });
    }

    const handleSend = text => {
        console.log("Mensaje enviado:", text);
        // Logger user (sender)
        const currentUserId = "123";
    
       /* const message = new ChatMessage({
          id: "",
          content: text,
          contentType: MessageContentType.TextHtml,
          direction: MessageDirection.Outgoing,
          status: MessageStatus.Sent
        });*/

        const message = {
            message: text,
            sentTime: "just now",
            sender: "Yo",
            direction: MessageDirection.Outgoing,
          };    

        setMessageList([...messageList, message]); // Agrega el mensaje a la lista
        //setValue("");
    
        /*sendMessage({
          message,
          conversationId: activeConversation.id,
          senderId: currentUserId,
        });*/
        // Enviar evento mensaje
        console.log('El receaver es ' + amigoChatActivo)
        socket.emit('sendPrivMessage', nicknameUsuario, amigoChatActivo, text, (data) => {
                if (data.status !== 'ok') {
                  setError(data.message);
                } else {
                  console.log(data.msg);
                }
              });
    
    };



    /***************************************************************************
     * RENDERIZADO
     ***************************************************************************/
    const handleClick = () => {
        setContador(contador + 1);
    };

    
    return (
        <div className="Principal">
            
            <header className="header">
                CHAT
            </header>
            <div className='barraTitulo'></div>
            <div className='contenderImagenes'>
                <div className='imagenesParaChat'>
                    <ImagenesLink />
                </div>
            </div>
            <div className="contenedorPrincipalChat">
                <div className="contenedorAmigosChat">
                    <div className="lista-amigosChat">
                        {listaAmigos.length > 0 ? (
                        <ul>
                            {listaAmigos.map((amigo, index) => (
                            <div key={index} className="amigosSolicitudesChat" onClick={() => {handleAmigoSeleccionado(amigo);}}>
                                {amigo}
                            </div>
                            ))}
                        </ul>
                        ) : (
                        <p className='mensajeChat'>Busca amigos con los que compartir esta experiencia</p>
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
                            {messageList.map(message => (
                                <Message model={message} />
                            ))}
                        </MessageList>
                        <MessageInput onSend={handleSend} placeholder="Escribe tu mensaje..." />
                        </ChatContainer>
                    </MainContainer>
                </div>
            </div>
        </div>

    );

}

export default Chat;
