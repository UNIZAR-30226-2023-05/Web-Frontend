import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './ajustes.css';
import '../../components/RestoPantallas.css'
import '../../components/PopupAjustes.css'
import home from '../../assets/feather/home.svg'
import Modal from 'react-modal';
import DeleteUser  from '../../services/deleteUser_log.js';
import GetID from '../../services/getID_log.js';
import PutInfoContrasena from '../../services/putInfoContrasena_log.js';
import GetInfo from '../../services/getInfo_log.js';
import PutInfoNickname from '../../services/putInfoNickname_log.js';
import PutInfoFotoPerfil from '../../services/putInfoFotoPerfil_log.js';

function Ajustes() {

    /***************************************************************************
     * DECLARACION DE VARIABLES
     ***************************************************************************/
    // Regla de la constraseña
    const regla = /^[A-Za-z0-9!?]{8,16}$/;

    // Informacion del usuario
    const nickname = localStorage.getItem('nickname');
    const [email, setEmail] = useState('');
    const [monedas, setMonedas] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const contrasena = localStorage.getItem('contrasena');

    // Informacion modificada
    const [newContrasena, setNewContrasena] = useState('');
    const [newContrasenaRep, setNewContrasenaRep] = useState('');

    // Modal eliminar cuenta
    const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);
    const [codigoSala, setCodigoSala] = useState('');

    const [okInfo, setOkInfo] = useState(false);

    const [error, setError] = useState(null);
    const [path,navigation] = useLocation();

    /***************************************************************************
     * FUNCIONES SOCKET
     **************************************************************************/
    socket.on('connect', () => {
    console.log('Conectado al servidor de websockets');
    });

    socket.on('disconnect', (reason) => {
    console.log(`Se ha perdido la conexión con el servidor de websockets: ${reason}`);
    });


    /***************************************************************************
     * FUNCION ABRIR SESION LOG IN
     ***************************************************************************/
    const cerrarSesion = () => {
        socket.emit("closeSession", {'nickname': nickname}, (data) => {
        if (data.ok === false) {
            setError(data.message);
        } else {
            // ELiminar la base de datos de react
            localStorage.removeItem('nickname');
            navigation("/inicio");
        }
        });
    }


    /***************************************************************************
     * FUNCION ELIMINAR CUENTA
     ***************************************************************************/
    const eliminarCuenta = async () => {
        // Coger id del usuario
        let dataId = await GetID(nickname);
        console.log(dataId);

        if (dataId.ok === true) {
        
            // Eliminar cuenta
            let data = await DeleteUser(dataId.id_usuario);
        
            if(data.ok === true){
                // Cerrar la sesion del usuario al eliminar la cuenta
                cerrarSesion();
            }
            else{
                setError(data.msg);
            }
        }
        else{
            setError(dataId.msg);
        }
    }

    /***************************************************************************
     * FUNCIONES COGER INFORMACION NADA MAS RENDERIZAR
     **************************************************************************/
    // Función para obtener la información de la cuenta al entrar en la pantalla
    useEffect(() => {
        //cogerInfoCuenta();
    }, []);


    /***************************************************************************
     * FUNCION MODIFICAR DATOS CUENTA
     **************************************************************************/
    const cogerInfoCuenta = async () => {
        // Coger id del usuario
        console.log(nickname);

        let dataId = await GetID(nickname);
        console.log(dataId);

        if (dataId.ok === true) {
        
            // Eliminar cuenta
            let data = await GetInfo(dataId.id_usuario);
        
            if(data.ok === true){
                // Se guardan los datos del usuario
                setEmail(data.datos[0].email);
                setMonedas(data.datos[0].monedas);
                setFotoPerfil(data.datos[0].profilephoto);

                // Los datos ya han sido recogidos
                setOkInfo(true);
                
            }
            else{
                setError(data.msg);
            }
        }
        else{
            setError(dataId.msg);
        }
    }

    /***************************************************************************
     * FUNCION COMPROBAR CONTRASEÑA
     ***************************************************************************/
    const comprobarContrasena = async () => {
        // Comprobar que la contraseña cumple la regla
        if (contrasena === newContrasena) {
            setError('La contraseña es la misma que la anterior');
        }
        else if (!regla.test(contrasena)) {
            setError('a contraseña mínimo 8 caracteres. Debe contener mínimo una mayuscula, un número y un símbolo');
        } 
        else {
            // Comprobar que la contraseña es correcta
            if (newContrasena !== newContrasenaRep) {
                setError('Las contraseñas no coinciden');
            } else {
                // Llama funcion moficicar datos en backend
                let dataId = await GetID(nickname);
                // console.log(dataId);
                if (dataId.ok === true) {
                
                    // Eliminar cuenta
                    let data = await PutInfoContrasena(dataId.id_usuario, newContrasena);
                
                    if(data.ok === true){
                        localStorage.setItem('contrasena', newContrasena);
                    }
                    else{
                        setError(data.msg);
                    }
                }
                else{
                    setError(dataId.msg);
                }
            
            }
        }

    }


    /***************************************************************************
     * FUNCION UNIR SALA
     ***************************************************************************
    const unirSalaSocket = () => {
        socket.emit("joinRoom", codigoSala, {'nickname': nickname}, (data) => {
            if (data.status !== 'ok') {
            setError(data.message);
            } else {
            localStorage.setItem('jugadores', JSON.stringify(data.players));
            localStorage.setItem('nombreSala', data.roomName);
            localStorage.setItem('idRoom', codigoSala);
            // Variable para controlar quien es el lider
            localStorage.setItem('lider', false);
            navigation("/sala");
            }
        });
    }*/


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
    };


    return (

        <div className="Ajustes">
            <header className="header">
                AJUSTES
            </header>
            <div className='barraTitulo'></div>
            <div className='imagenes-link'>
                <ImagenesLink />
            </div>

            <div className='contenedorInfo'>
                <div className='info'>Nickname</div>
                    <div className='info'>{nickname}</div>
                <div className='info'>E-mail</div>
                    <div className='info'>{email}</div>

            </div>
            <div className='contenedorBotonesTodos'>
                <div className='contenedorBotones'>
                    <button className='botonConfirmarCancelar' onClick={cerrarSesion}>Confirmar</button>
                    <button className='botonConfirmarCancelar' >Cancelar</button>
                </div>

                <div className='contenedorBotonesPeligro'>
                    <button className='botonPeligro' onClick={cerrarSesion}>Cerrar sesión</button>
                    <button className='botonPeligro' onClick={() => setEliminarModalIsOpen(true)}>Eliminar cuenta</button>
                </div>
            </div>

            <Modal className="popup" isOpen={eliminarModalIsOpen} onRequestClose={() => setEliminarModalIsOpen(false)}>
            <div className="popup-ajustes">
                <div className="tituloAjustes">ELIMINAR CUENTA</div>
                <div className="textoAjustes">
                    <p>¿Desea eliminar su cuenta?</p>
                    <p>Estás a punto de eliminar tu cuenta de forma permanente.</p>
                </div>

                <button className='closeButtonAjustes' onClick={() => closeModal()}>X</button>
                {error && <p className="error-messageAjustes">{error}</p>}
                
                <button className='elButtonAjustes' onClick={eliminarCuenta}>Eliminar cuenta</button>
                
            </div>
            </Modal>

        </div>
    
    );
}

export default Ajustes;