import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './amigos.css';
import '../../components/RestoPantallas.css';
import '../../components/PopupAmigos.css';
import home from '../../assets/feather/home.svg';
import trash_2 from '../../assets/feather/trash_2.svg'
import plus from '../../assets/feather/plus.svg';
import Modal from 'react-modal';
import GetID from '../../services/getID_log.js';
import GetInfo from '../../services/getInfo_log.js';
import SolicitudAmigo from '../../services/solicitudAmigo_log.js';
import RechazarSolicitud from '../../services/rechazarSolicitud_log.js';
import GetSolicitudes from '../../services/getSolicitudes_log.js';
import GetAmigos from '../../services/getAmigos_log.js';

function Amigos() {

    /***************************************************************************
     * DECLARACION DE VARIABLES
     ***************************************************************************/
    const email = localStorage.getItem('email');
    // Modal eliminar amigo
    const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);
    // Modal agregar amigo
    const [nuevoAmigoModalIsOpen, setNuevoAmigoModalIsOpen] = useState(false);
    // Modal solicitudes
    const [solicitudesModalIsOpen, setSolicitudesModalIsOpen] = useState(false);

    // Correo e id del amigo
    const [correoAmigoAnadir, setCorreoAmigoAnadir] = useState('');

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
     ***************************************************************************/
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


    /***************************************************************************
     * FUNCION OBTENER ID AMIGO ANADIR
     ***************************************************************************/
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
    }


    /***************************************************************************
     * FUNCION ENVIAR Y ANADIR AMIGO
     ***************************************************************************/
    const anadirAmigo = async () => {
        // Se espera hasta que se obtengan ambos ids
        let id = await IDUsuario();
        let idAmigo = await IDAmigo();

        console.log(`id: ${id}, idAmigo: ${idAmigo}`);

        let data = await SolicitudAmigo(id, idAmigo);
        console.log(data);
        if (data.ok === true) {
            console.log(data.message);
            closeModal();
        }
        else{
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
    const rechazarSolicitud = async () => {
        // Se espera hasta que se obtengan ambos ids
        let id = await IDAmigo();
        let idAmigo = await IDUsuario();

        let data = await RechazarSolicitud(id, idAmigo);
        console.log(data);
        if (data.ok === true) {
            setEliminarModalIsOpen(false);
        }
        else{
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
        }
        else{
            setError(data.msg);
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
    /*useEffect(() => {
        console.log(`Estoy en useEffect de amigos y render es: ${render}`);
    
        if (render) {
            obtenerAmigos();
            setRender(false);
        }
    }, [render]);*/

    const obtenerAmigos = async () => {
        // Se espera hasta que se obtenga el id del usuario
        let id = await IDUsuario();
        console.log(`id: ${id}`);

        let data = await GetAmigos(id);
        console.log(data);
        if (data.ok === true) {
            setListaAmigos(data.amigos);
        }
        else{
            setError(data.msg);
        }
    }
    /* Info BBDD 
    {
        "ok": true,
        "message": "Amigos del usuario:",
        "amigos": []
    }
    */

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
            <button className="botonSolicitudes" onClick={() => {obtenerSolicitudes();setSolicitudesModalIsOpen(true)}}>Solicitudes pendientes</button>

            <div className="contenedorAmigos">
                <div className="lista-amigos">
                    {listaAmigos.length > 0 ? (
                        <ul>
                        {listaAmigos.map((amigo) => (
                            <li key={amigo.id}>{amigo.nombre}</li>
                        ))}
                        </ul>
                    ) : (
                        <p>Busca amigos con los que compartir esta experiencia</p>
                    )}
                </div>
            </div>

            <Modal className="popup" isOpen={eliminarModalIsOpen} onRequestClose={() => setEliminarModalIsOpen(false)}>
            <div className="popup-amigos">
                <div className="tituloAmigos">ELIMINAR SOLICITUD DE AMISTAD</div>
                <div className="textoAmigos">
                    <p>¿Estás segudo de que quieres eliminar</p>
                    <p>la solicitud de amistad?</p>
                </div>

                <button className='closeButtonAmigos' onClick={() => closeModal()}>X</button>
                {error && <p className="error-messageAmigos">{error}</p>}
                
                <button className='elButtonAmigos' onClick={rechazarSolicitud}>Eliminar solicitud</button>
            </div>
            </Modal>

            <Modal className="popup" isOpen={nuevoAmigoModalIsOpen} onRequestClose={() => setNuevoAmigoModalIsOpen(false)}>
            <div className="popup-amigos">
                <div className="tituloAmigos">AÑADIR AMIGO</div>
                <p className="textoAmigos">Añade nuevos amigos mediante el e-mail</p>
                <p className="textoAmigos">E-mail </p>
                <input className="barraEscribirAmigos" type="text" placeholder="E-mail" value={correoAmigoAnadir} onChange={(e) => setCorreoAmigoAnadir(e.target.value)}/>
               
                <button className='closeButtonAmigos' onClick={() => closeModal()}>X</button>
                {error && <p className="error-messageAmigos">{error}</p>}
                <button className='elButtonAmigos' onClick={anadirAmigo}>Añadir amigo</button>
                
            </div>
            </Modal>

            <Modal className="popup" isOpen={solicitudesModalIsOpen} onRequestClose={() => setSolicitudesModalIsOpen(false)}>
            <div className="popup-amigos">
                <div className="tituloAmigos">SOLICITUDES PENDIENTES</div>

                {listaSolicitudes.map((solicitudNickname, index) => (
                    <div key={index} className="amigosSolicitudes">
                        {solicitudNickname}
                        {<img className='eliminarIconoSolicitudes' src={plus} alt='Añadir' onClick={() => rechazarSolicitud(solicitudNickname)} />}
                        {<img className='eliminarIconoSolicitudes' src={trash_2} alt='Eliminar' onClick={() => rechazarSolicitud(solicitudNickname)} />}
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