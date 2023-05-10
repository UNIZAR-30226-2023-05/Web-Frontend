import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './amigos.css';
import '../../components/RestoPantallas.css';
import home from '../../assets/feather/home.svg';
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
    const [id, setId] = useState('');

    // Modal eliminar amigo
    const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);
    // Modal agregar amigo
    const [nuevoAmigoModalIsOpen, setNuevoAmigoModalIsOpen] = useState(false);

    // Correo e id del amigo
    const [correoAmigoAnadir, setCorreoAmigoAnadir] = useState('');
    const [idAmigo, setIdAmigo] = useState('');

    // Lista de amigos
    const [listaAmigos, setListaAmigos] = useState([]);

    const [error, setError] = useState(null);
    const [path,navigation] = useLocation();

    /***************************************************************************
     * FUNCION OBTENER ID USUARIO
     ***************************************************************************/
    const IDUsuario = async () => {
        
        // Llama funcion moficicar contraseña en backend
        let dataId = await GetID(email);
        // console.log(dataId);
        if (dataId.ok === true) {
            setId(dataId.id_usuario);
        }
        else{
            setError(dataId.msg);
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
            setIdAmigo(dataId.id_usuario);
        }
        else{
            setError(dataId.msg);
        }
    }


    /***************************************************************************
     * FUNCION ENVIAR Y ANADIR AMIGO
     ***************************************************************************/
    const anadirAmigo = async () => {
        // Se espera hasta que se obtengan ambos ids
        await IDAmigo();
        await IDUsuario();

        let data = await SolicitudAmigo(id, idAmigo);
        console.log(data);
        if (data.ok === true) {
            //setNuevoAmigoModalIsOpen(false);
        }
        else{
            setError(data.msg);
        }

    }


    /***************************************************************************
     * FUNCION RECHAZAR SOLICITUD
     ***************************************************************************/
    const rechazarSolicitud = async () => {
        // Se espera hasta que se obtengan ambos ids
        await IDAmigo();
        await IDUsuario();

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
        await IDUsuario();

        let data = await GetSolicitudes(id);
        console.log(data);
        if (data.ok === true) {
            
        }
        else{
            setError(data.msg);
        }

    }



    /***************************************************************************
     * FUNCION OBTENER AMIGOS
     ***************************************************************************/
    useEffect(() => {
        obtenerAmigos();
    }, []);

    const obtenerAmigos = async () => {
        // Se espera hasta que se obtenga el id del usuario
        await IDUsuario();

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
                <p>E-mail </p>
                <input className="barraEscribirAmigos" type="text" placeholder="E-mail" value={correoAmigoAnadir} onChange={(e) => setCorreoAmigoAnadir(e.target.value)}/>
               
                <button className='closeButtonAmigos' onClick={() => closeModal()}>X</button>
                {error && <p className="error-messageAmigos">{error}</p>}
                
                <button className='elButtonAmigos' onClick={anadirAmigo}>Añadir amigo</button>
                
            </div>
            </Modal>
            
            
        </div>
    
    );

}

export default Amigos;