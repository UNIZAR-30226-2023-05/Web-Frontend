import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import socket from '../../utils/socket.js';
import './estadisticas.css';
import '../../components/RestoPantallas.css';
import home from '../../assets/feather/home.svg';
import Modal from 'react-modal';

import GetID from '../../services/getID_log.js';
import GetInfo from '../../services/getInfo_log.js';
import GetLogros from '../../services/getLogros_log.js';
import GetRankingPartidas from '../../services/getRankingPartidas.js';
import GetRankingOcas from '../../services/getRankingOcas_log.js';
import GetMisEstadisticas from '../../services/getMisEstadisticas_log.js';

import ocaFondo from '../../assets/ocas/ocas_fondo.JPG';
import imagen1 from '../../assets/medallas/imagen1.jpg';
import imagen2 from '../../assets/medallas/imagen2.jpg';
import imagen3 from '../../assets/medallas/imagen3.jpg';
import blanco from '../../assets/medallas/blanco.jpg';


function Ajustes() {

    /***************************************************************************
     * DECLARACION DE VARIABLES
     ***************************************************************************/
    // Informacion del usuario
    const email = localStorage.getItem('email');

    // Informacion modificada
    const [newNickname, setNewNickname] = useState('');
    const [newContrasena, setNewContrasena] = useState('');
    const [newContrasenaRep, setNewContrasenaRep] = useState('');

    // Modal eliminar cuenta
    const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);

    const [error, setError] = useState(null);
    const [path,navigation] = useLocation();

    /***************************
     * VALOR LOGROS
     **************************/
    const [juegaUnaPartida, setJuegaUnaPartida] = useState(false);
    const [ganarUnaPartida, setGanarUnaPartida] = useState(false);
    const [ganarDiezPartidas, setGanarDiezPartidas] = useState(false);
    const [ganarCincuentaPartidas, setGanarCincuentaPartidas] = useState(false);
    const [caerEnDiezOcas, setCaerEnDiezOcas] = useState(false);
    const [caerEnSeisSeises, setCaerEnSeisSeises] = useState(false);


    /***************************
     * RANKING PARTIDAS
     **************************/
    let rankingList = [];
    const [rankingGlobal, setRankingGlobal] = useState(rankingList);


    /***************************
     * RANKING OCAS
     **************************/
    let rankingListOcas = [];
    const [rankingGlobalOcas, setRankingGlobalOcas] = useState(rankingListOcas);
    console.log(rankingGlobalOcas);


    /***************************
     * MIS ESTADISTICAS
     **************************/
    const [partidasJugadas, setPartidasJugadas] = useState(0);
    const [partidasGanadas, setPartidasGanadas] = useState(0);
    const [vecesOca, setVecesOca] = useState(0);
    const [vecesSeis, setVecesSeis] = useState(0);
    const [vecesCalavera, setVecesCalavera] = useState(0);


    // Desplegable barra lateral
    const [menuDesplegadoLogros, setMenuDesplegadoLogros] = useState(false);
    const [menuDesplegadoConf, setMenuDesplegadoConf] = useState(false);

    const [cont, setCont] = useState(0);


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
     * FUNCIONES COGER INFORMACION NADA MAS RENDERIZAR
     **************************************************************************/
    // Función para obtener la información de la cuenta al entrar en la pantalla
    useEffect(() => {
        console.log('useEffect');
        obtenerLogros();
        obtenerRankingPartidas();
        obtenerRankingOcas();
        obtenerMisEstadisticas();
    }, [cont]);


    /***************************************************************************
     * FUNCION OBTENER LOGROS
     ***************************************************************************/
    const obtenerLogros = async () => {

        let dataId = await GetID(email);
        console.log(dataId);

        if (dataId.ok === true) {
        
            let data = await GetLogros(dataId.id_usuario);
        
            if(data.ok === true){
                //Se guardan los logros en variables
                if (data.logros.juegaunapartida === false) {
                    setJuegaUnaPartida("Aun no es tuyo  :(");
                }
                else {
                    setJuegaUnaPartida("¡¡Conseguido!!");
                }

                if (data.logros.ganaunapartida === false) {
                    setGanarUnaPartida("Aun no es tuyo  :(");
                }
                else {
                    setGanarUnaPartida("¡¡Conseguido!!");
                }

                if (data.logros.ganadiezpartidas === false) {
                    setGanarDiezPartidas("Aun no es tuyo  :(");
                }
                else {
                    setGanarDiezPartidas("¡¡Conseguido!!");
                }

                if (data.logros.ganacincuentapartidas === false) {
                    setGanarCincuentaPartidas("Aun no es tuyo :(");
                }
                else {
                    setGanarCincuentaPartidas("¡¡Conseguido!!");
                }

                if (data.logros.caeendiezocas === false) {
                    setCaerEnDiezOcas("Aun no es tuyo  :(");
                }
                else {
                    setCaerEnDiezOcas("¡¡Conseguido!!");
                }

                if (data.logros.caeenseisseises === false) {
                    setCaerEnSeisSeises("Aun no es tuyo  :(");
                }
                else {
                    setCaerEnSeisSeises("¡¡Conseguido!!");
                }               
            }
            else{
                console.log(data.msg);
            }
        }
        else{
            console.log(dataId.msg);
        }
    }

    /***************************************************************************
     * FUNCION ONTENER RANKING PARTIDAS
     ***************************************************************************/
    const obtenerRankingPartidas = async () => {
            
        let data = await GetRankingPartidas();
        console.log(data);

        if (data.ok === true) {
            let rankingLista = data.ranking.map(item => ({
                usuario: item.usuario,
                partidasGanadas: item.partidasganadas
            }));

            setRankingGlobal(rankingLista);
              
        }
        else {
            console.log(data.msg);
        }
    }

    /***************************************************************************
     * FUNCION ONTENER RANKING PARTIDAS
     ***************************************************************************/
     const obtenerRankingOcas = async () => {
            
        let data = await GetRankingOcas();
        console.log(data);

        if (data.ok === true) {
            let rankingListaOcas = data.ranking.map(item => ({
                usuario: item.usuario,
                vecesoca: item.vecesoca
            }));

            setRankingGlobalOcas(rankingListaOcas);
              
        }
        else {
            console.log(data.msg);
        }
    }

    /***************************************************************************
     * FUNCION ONTENER RANKING PARTIDAS
     ***************************************************************************/
    const obtenerMisEstadisticas = async () => {
            
        let dataId = await GetID(email);
        console.log(dataId);

        if (dataId.ok === true) {
            let data = await GetMisEstadisticas(dataId.id_usuario);
            console.log(data);

            if (data.ok === true) {
                setPartidasJugadas(data.estadisticas.partidasjugadas);
                setPartidasGanadas(data.estadisticas.partidasganadas);
                setVecesOca(data.estadisticas.vecesoca);
                setVecesSeis(data.estadisticas.vecesseis);
                setVecesCalavera(data.estadisticas.vecescalavera);
                
            }
            else {
                console.log(data.msg);
            }
        }
        else{
            console.log(dataId.msg);
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
     * FUNCION DESPLEGABLE
     ***************************************************************************/
    const toggleMenuDesplegadoConf = () => {
        setMenuDesplegadoConf(!menuDesplegadoConf);
    };

    const toggleMenuDesplegadoLogros = () => {
        setMenuDesplegadoLogros(!menuDesplegadoLogros);
    };


    return (

        <div className="Ajustes">
            <header className="header">
                ESTADISTICAS
            </header>
            <div className='barraTitulo'></div>
            <div className='imagenes-link'>
                <ImagenesLink />
            </div>

            
            <div className="stats-interface">
                <div className="tituloLogros">CONSIGUE TODOS LOS LOGROS</div>
                <div className="stats-container">
                    <div className="stat">
                    <h2>Juega una partida</h2>
                    <p>{juegaUnaPartida}</p>
                    </div>
                    <div className="stat">
                    <h2>Gana una partida</h2>
                    <p>{ganarUnaPartida}</p>
                    </div>
                    <div className="stat">
                    <h2>Gana 10 partidas</h2>
                    <p>{ganarDiezPartidas}</p>
                    </div>
                    <div className="stat">
                    <h2>Gana 50 partidas</h2>
                    <p>{ganarCincuentaPartidas}</p>
                    </div>
                    <div className="stat">
                    <h2>Cae en 10 ocas</h2>
                    <p>{caerEnDiezOcas}</p>
                    </div>
                    <div className="stat">
                    <h2>Cae en 6 seises</h2>
                    <p>{caerEnSeisSeises}</p>
                    </div>
                </div>
            </div>


            <div className="stats-interface-mis-estadisticas">
                <div className="tituloMisEstadisticas">MIS ESTADÍSTICAS</div>
                <div className="stats-container">
                    <div className="stat">
                    <h2>Partidas jugadas</h2>
                    <p>{partidasJugadas}</p>
                    </div>
                    <div className="stat">
                    <h2>Partidas ganadas</h2>
                    <p>{partidasGanadas}</p>
                    </div>
                    <div className="stat">
                    <h2>Veces caídas en la oca</h2>
                    <p>{vecesOca}</p>
                    </div>
                    <div className="stat">
                    <h2>Veces caídas en el 6</h2>
                    <p>{vecesSeis}</p>
                    </div>
                    <div className="stat">
                    <h2>Veces caídas en la calavera</h2>
                    <p>{vecesCalavera}</p>
                    </div>
                </div>
            </div>


            <div className="ranking-container">
                <h2>RANKING DE PARTIDAS GANADAS</h2>
                <ul className="ranking-list">
                    {rankingGlobal.map((jugador, index) => (
                    <li key={index} className={`ranking-item ${index < 3 ? 'top-ranking' : 'resto'}`}>
                        <span className="ranking-position">{index + 1}º</span>
                        <img src={index === 0 ? imagen1 : index === 1 ? imagen2 : index === 2 ? imagen3 : blanco} alt="Avatar" className="ranking-avatar" />
                        <span className="ranking-username">{jugador.usuario}</span>
                        <span className="ranking-score">{jugador.partidasGanadas} partidas ganadas</span>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="ranking-container-ocas">
                <h2>RANKING DE OCAS</h2>
                <ul className="ranking-list-ocas">
                    {rankingGlobalOcas.map((jugadorOca, index) => (
                    <li key={index} className={`ranking-item ${index < 3 ? 'top-ranking-ocas' : 'resto'}`}>
                        <span className="ranking-position">{index + 1}º</span>
                        <img src={index === 0 ? imagen1 : index === 1 ? imagen2 : index === 2 ? imagen3 : blanco} alt="Avatar" className="ranking-avatar" />
                        <span className="ranking-username">{jugadorOca.usuario}</span>
                        <span className="ranking-score">{jugadorOca.vecesoca} veces caidas en la oca</span>
                    </li>
                    ))}
                </ul>
            </div>
            
            <div className='opcionesDespegableJunto'>
                <div className='opcionesDespegable'>
                    <div onClick={() => navigation("/ajustes")}>
                        <h2> - Configuración</h2>
                        <i className={menuDesplegadoConf ? 'arrow up' : 'arrow down'}></i>
                    </div>
                    {menuDesplegadoConf && (
                        <ul>
                        <li>Nombre de usuario</li>
                        <li>Contraseña</li>
                        <li>Foto de perfil</li>
                        </ul>
                    )}
                </div>

                <div className='opcionesDespegableLogros'>
                    <div onClick={(toggleMenuDesplegadoLogros)}>
                        <h2> - Estadísticas</h2>
                        <i className={menuDesplegadoLogros ? 'arrow up' : 'arrow down'}></i>
                    </div>
                    {menuDesplegadoLogros && (
                        <ul>
                        <li>Mis estadísticas</li>
                        <li>Logros</li>
                        <li>Ranking partidas</li>
                        <li>Ranking de ocas</li>
                        </ul>
                    )}
                </div>
            </div>

        </div>
    
    );

}

export default Ajustes;
