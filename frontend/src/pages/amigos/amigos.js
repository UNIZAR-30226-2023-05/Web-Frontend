import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './amigos.css';
import '../../components/RestoPantallas.css';
import '../../components/PopupAmigos.css';

import home from '../../assets/feather/home.svg';
import userMas from '../../assets/feather/user_plus.svg';
import userMenos from '../../assets/feather/user_minus.svg';
import user from '../../assets/feather/user.svg';

import Modal from 'react-modal';
import GetID from '../../services/getID_log.js';
import GetIDNickname from '../../services/getID_nickname_log.js';
import GetInfo from '../../services/getInfo_log.js';
import SolicitudAmigo from '../../services/solicitudAmigo_log.js';
import RechazarSolicitud from '../../services/rechazarSolicitud_log.js';
import GetSolicitudes from '../../services/getSolicitudes_log.js';
import GetAmigos from '../../services/getAmigos_log.js';

function Amigos() {

    /***************************************************************************
     * DECLARACION DE VARIABLES
     ***************************************************************************/
    const [contador, setContador] = useState(0);

    const nicknameUsuario = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');
    // Modal eliminar amigo
    const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);
    // Modal agregar amigo
    const [nuevoAmigoModalIsOpen, setNuevoAmigoModalIsOpen] = useState(false);
    // Modal solicitudes
    const [solicitudesModalIsOpen, setSolicitudesModalIsOpen] = useState(false);

    // Correo e id del amigo
    const [nicknameAmigo, setNicknameAmigo] = useState('');

    // Lista de amigos
    const [listaAmigos, setListaAmigos] = useState([]);

    // Lista solicitudes
    const [listaSolicitudes, setListaSolicitudes] = useState([]);

    // Booleano para renderizar
    const [render, setRender] = useState(true);
    //console.log(`Render: ${render}`);

    const [error, setError] = useState(null);
    const [path, navigation] = useLocation();

    /***************************************************************************
     * FUNCION OBTENER ID USUARIO
     ***************************************************************************
    const IDUsuario = async () => {
        console.log(`Estoy en IDUsuario con email: ${email}`);
        
        // Llama funcion moficicar contraseña en backend
        let dataId = await GetID(email);
        //console.log(dataId);
        if (dataId.ok === true) {
            return dataId.id_usuario;
        }
        else{
            setError(dataId.msg);
            return null;
        }
    }


    ***************************************************************************
     * FUNCION OBTENER ID AMIGO ANADIR
     ***************************************************************************
    const IDAmigo = async () => {
        
        // Llama funcion moficicar contraseña en backend
        let dataId = await GetID(correoAmigoAnadir);
        // console.log(dataId);
        if (dataId.ok === true) {
            return dataId.id_usuario;
        }
        else{
            setError(dataId.msg);
            return null;
        }
    }*/

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
     * FUNCION OBTENER ID AMIGO ANADIR
     ***************************************************************************/
    const IDAmigo = async (nicknameAmigo) => {
        console.log(`Estoy en IDAmigo con nickname: ${nicknameAmigo}`);
        // Llama funcion moficicar contraseña en backend
        let dataId = await GetIDNickname(nicknameAmigo);
        // console.log(dataId);
        if (dataId.ok === true) {
            return dataId.id_usuario;
        }
        else {
            console.log(dataId.msg);
            return null;
        }
    }


    /***************************************************************************
     * FUNCION ENVIAR Y ANADIR AMIGO
     ***************************************************************************/
    const anadirAmigo = async (nicknameAmigo) => {
        console.log(`Estoy en anadirAmigo con nickname: ${nicknameAmigo}`);
        // Se espera hasta que se obtengan ambos ids
        let id = await IDUsuario();
        let idAmigo = await IDAmigo(nicknameAmigo);

        console.log(`id: ${id}, idAmigo: ${idAmigo}`);

        let data = await SolicitudAmigo(id, idAmigo);
        console.log(data);
        if (data.ok === true) {
            console.log(data.message);
            closeModal();
            setError("");
        }
        else {
            setError(data.msg);
        }

    }

    /* {
        "ok": true,
        "message": "Solicitud enviada correctamente."
        } 
        {
        "ok": false,
        "msg": "Lo sentimos, ya existe una solicitud entre estos dos usuarios."
        }
        
        */


    /***************************************************************************
     * FUNCION RECHAZAR SOLICITUD
     ***************************************************************************/
    const rechazarSolicitud = async (nicknameAmigo) => {
        // Se espera hasta que se obtengan ambos ids
        let id = await IDUsuario();
        let idAmigo = await IDAmigo(nicknameAmigo);

        console.log(`id: ${id}, idAmigo: ${idAmigo}`);


        let data = await RechazarSolicitud(idAmigo, id);
        console.log(data);
        if (data.ok === true) {
            console.log(data.message);
            obtenerSolicitudes();
            setError("");
        }
        else {
            setError(data.msg);
        }

    }


    /***************************************************************************
     * FUNCION OBTENER SOLICITUDES
     ***************************************************************************/
    const obtenerSolicitudes = async () => {
        // Se espera hasta que se obtenga el id del usuario
        let id = await IDUsuario();

        let data = await GetSolicitudes(id);
        console.log(`estoy en obtenerSolicitudes y el data es: ${data}`);
        if (data.ok === true) {
            const nicknames = data.solicitudes.map((solicitud) => solicitud.usuario_solicitud_id_usuario_enviaTousuario.nickname);
            // Almacenar la lista de solicitudes
            setListaSolicitudes(nicknames);
            console.log(`estoy en obtenerSolicitudes y los nicknames es: ${nicknames}`);
            setError("");
        }
        else {
            console.log(data.msg);
        }

    }

    /*
    {
    "ok": true,
    "message": "Solicitudes para el usuario:",
    "solicitudes": [
        {
        "usuario_solicitud_id_usuario_enviaTousuario": {
            "nickname": "miguel"
        }
        }
    ]
    }
     */



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


    /***************************************************************************
     * FUNCION CERRAR MODAL
     ***************************************************************************/
    const closeModal = () => {
        setEliminarModalIsOpen(false);
        setNuevoAmigoModalIsOpen(false);
        setSolicitudesModalIsOpen(false);
        setError("");
    };


    /***************************************************************************
     * RENDERIZADO
     ***************************************************************************/
    const handleClick = () => {
        setContador(contador + 1);
    };

    return (

        <div className="Ajustes">
            <header className="header">
                AMIGOS
            </header>
            <div className='barraTitulo'></div>
            <div className='imagenes-link'>
                <ImagenesLink />
            </div>

            <button className="botonNuevoAmigo" onClick={() => setNuevoAmigoModalIsOpen(true)}>Añadir amigo</button>
            <button className="botonSolicitudes" onClick={() => { obtenerSolicitudes(); setSolicitudesModalIsOpen(true) }}>Solicitudes pendientes</button>
            <button className="botonAmigos" onClick={handleClick}>Refresca</button>

            <div className="contenedorAmigos">
                <div className="lista-amigos">
                    {listaAmigos.length > 0 ? (
                        <ul>
                            {listaAmigos.map((amigo, index) => (
                                <div key={index} className="amigosSolicitudes">
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

            <Modal className="popup" isOpen={nuevoAmigoModalIsOpen} onRequestClose={() => setNuevoAmigoModalIsOpen(false)}>
                <div className="popup-amigos">
                    <div className="tituloAmigos">AÑADIR AMIGO</div>
                    <p className="textoAmigos">Añade nuevos amigos mediante el nombre de usuario</p>
                    <p className="textoAmigos">Nombre de usuario</p>
                    <input className="barraEscribirAmigos" type="text" placeholder="Nombre de usuario" value={nicknameAmigo} onChange={(e) => setNicknameAmigo(e.target.value)} />

                    <button className='closeButtonAmigos' onClick={() => closeModal()}>X</button>
                    {error && <p className="error-messageAmigos">{error}</p>}
                    <button className='elButtonAmigos' onClick={() => anadirAmigo(nicknameAmigo)}>Añadir amigo</button>

                </div>
            </Modal>

            <Modal className="popup" isOpen={solicitudesModalIsOpen} onRequestClose={() => setSolicitudesModalIsOpen(false)}>
                <div className="popup-amigos">
                    <div className="tituloAmigos">SOLICITUDES PENDIENTES</div>

                    {listaSolicitudes.map((solicitudNickname, index) => (
                        <div key={index} className="amigosSolicitudes">
                            {solicitudNickname}
                            <img className='anadirIconoSolicitudes' src={userMas} alt='Añadir' onClick={() => anadirAmigo(solicitudNickname)} />
                            <img className='eliminarIconoSolicitudes' src={userMenos} alt='Eliminar' onClick={() => rechazarSolicitud(solicitudNickname)} />
                        </div>
                    ))}

                    <button className='closeButtonAmigos' onClick={() => closeModal()}>X</button>
                    {error && <p className="error-messageAmigos">{error}</p>}

                </div>
            </Modal>


        </div>

    );

}

export default Amigos;