import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import socket from "../../utils/socket.js";
import "./ajustes.css";
import "../../components/RestoPantallas.css";
import "../../components/PopupAjustes.css";
import "../../components/PopupAjustesImagen.css";
import home from "../../assets/feather/home.svg";
import Modal from "react-modal";
import DeleteUser from "../../services/deleteUser_log.js";
import GetID from "../../services/getID_log.js";
import PutInfoContrasena from "../../services/putInfoContrasena_log.js";
import GetInfo from "../../services/getInfo_log.js";
import PutInfoNickname from "../../services/putInfoNickname_log.js";
import PutInfoFotoPerfil from "../../services/putInfoFotoPerfil_log.js";

// Import de las imagenes
import img1 from "../../assets/ocas/oca1.png";
import img2 from "../../assets/ocas/oca2.png";
import img3 from "../../assets/ocas/oca3.png";
import img4 from "../../assets/ocas/oca4.png";
import img5 from "../../assets/ocas/oca5.png";
import img6 from "../../assets/ocas/oca6.png";

function Ajustes() {
  /***************************************************************************
   * DECLARACION DE VARIABLES
   ***************************************************************************/
  // Regla de la constraseña
  const regla = /^[A-Za-z0-9!?]{8,16}$/;

  // Informacion del usuario
  //const nickname = localStorage.getItem('nickname');
  //const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState("");
  const email = localStorage.getItem("email");
  const [monedas, setMonedas] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const contrasena = localStorage.getItem("contrasena");

  // Comprobacion de la contraseña y el nickname
  // console.log(`El nickname es ${nickname}`);
  // console.log(`La contraseña es ${contrasena}`);

  // Informacion modificada
  const [newNickname, setNewNickname] = useState("");
  const [newContrasena, setNewContrasena] = useState("");
  const [newContrasenaRep, setNewContrasenaRep] = useState("");

  // Modal eliminar cuenta
  const [eliminarModalIsOpen, setEliminarModalIsOpen] = useState(false);
  const [codigoSala, setCodigoSala] = useState("");

  const [error, setError] = useState(null);
  const [path, navigation] = useLocation();

  // Modal imagenes
  const [imagenesModalIsOpen, setImagenesModalIsOpen] = useState(false);
  // Seleccionar la imagen
  const [newFotoPerfil, setSelectedImage] = useState("");
  const images = [img1, img2, img3, img4, img5, img6];

  // Desplegable barra lateral
  const [menuDesplegado, setMenuDesplegado] = useState(false);

  /***************************************************************************
   * FUNCIONES SOCKET
   **************************************************************************/
  socket.on("connect", () => {
    console.log("Conectado al servidor de websockets");
  });

  socket.on("disconnect", (reason) => {
    console.log(
      `Se ha perdido la conexión con el servidor de websockets: ${reason}`
    );
  });

  /***************************************************************************
   * FUNCION ABRIR SESION LOG IN
   ***************************************************************************/
  const cerrarSesion = () => {
    socket.emit("closeSession", { nickname: nickname }, (data) => {
      if (data.ok === false) {
        setError(data.message);
      } else {
        // ELiminar la base de datos de react
        localStorage.removeItem("nickname");
        navigation("/");
      }
    });
  };

  /***************************************************************************
   * FUNCION ELIMINAR CUENTA
   ***************************************************************************/
  const eliminarCuenta = async () => {
    // Coger id del usuario
    let dataId = await GetID(email);
    console.log(dataId);

    if (dataId.ok === true) {
      // Eliminar cuenta
      let data = await DeleteUser(dataId.id_usuario);

      if (data.ok === true) {
        // Cerrar la sesion del usuario al eliminar la cuenta
        cerrarSesion();
      } else {
        setError(data.msg);
      }
    } else {
      setError(dataId.msg);
    }
  };

  /***************************************************************************
   * FUNCIONES COGER INFORMACION NADA MAS RENDERIZAR
   **************************************************************************/
  // Función para obtener la información de la cuenta al entrar en la pantalla
  useEffect(() => {
    cogerInfoCuenta();
  }, []);

  /***************************************************************************
   * FUNCION COGER DATOS CUENTA
   **************************************************************************/
  const cogerInfoCuenta = async () => {
    // Coger id del usuario
    console.log(email);

    let dataId = await GetID(email);
    console.log(dataId);

    if (dataId.ok === true) {
      // Eliminar cuenta
      let data = await GetInfo(dataId.id_usuario);

      if (data.ok === true) {
        // Se guardan los datos del usuario
        setNickname(data.datos[0].nickname);
        setNewNickname(data.datos[0].nickname);
        setMonedas(data.datos[0].monedas);
        setFotoPerfil(data.datos[0].profilephoto);
      } else {
        setError(data.msg);
      }
    } else {
      setError(dataId.msg);
    }
  };

  /***************************************************************************
   * FUNCION COMPROBAR Y CAMBIAR CONTRASEÑA
   ***************************************************************************/
  const comprobarContrasena = async () => {
    // Comprobar que la contraseña cumple la regla
    if (newContrasena === "" || newContrasenaRep === "") {
      setError("Contraseña y confirmar contraseña deben estar rellenos");
    } else if (!regla.test(newContrasena)) {
      setError(
        "La contraseña mínimo 8 caracteres. Debe contener mínimo una mayuscula, un número y un símbolo"
      );
    } else if (newContrasena !== newContrasenaRep) {
      setError("Las contraseñas no coinciden");
    } else {
      // Llama funcion moficicar contraseña en backend
      let dataId = await GetID(email);
      // console.log(dataId);
      if (dataId.ok === true) {
        console.log(
          `Estoy en comprbarContrasena y el id es ${dataId.id_usuario}`
        );

        let data = await PutInfoContrasena(dataId.id_usuario, newContrasena);

        if (data.ok === true) {
          localStorage.setItem("contrasena", newContrasena);
        } else {
          setError(data.msg);
        }
      } else {
        setError(dataId.msg);
      }
    }
  };

  /***************************************************************************
   * FUNCION COMPROBAR Y CAMBIAR CONTRASEÑA
   ***************************************************************************/
  const comprobarNickname = async () => {
    if (newNickname === "") {
      setError("Nickname debe estar relleno");
    } else {
      // Llama funcion moficicar contraseña en backend
      let dataId = await GetID(email);
      // console.log(dataId);
      if (dataId.ok === true) {
        let data = await PutInfoNickname(dataId.id_usuario, newNickname);

        if (data.ok === true) {
          localStorage.setItem("nickname", newNickname);
        } else {
          setError(data.msg);
        }
      } else {
        setError(dataId.msg);
      }
    }
  };

  /***************************************************************************
   * FUNCION COMPROBAR Y CAMBIAR FOTO DE PERFIL
   ***************************************************************************/
  const comprobarFotoPerfil = async () => {
    // Llama funcion moficicar contraseña en backend
    let dataId = await GetID(email);
    // console.log(dataId);
    if (dataId.ok === true) {
      let data = await PutInfoFotoPerfil(dataId.id_usuario, newFotoPerfil);

      if (data.ok !== true) {
        setError(data.msg);
      }
    } else {
      setError(dataId.msg);
    }
  };

  /***************************************************************************
   * FUNCION CAMBIOS EN LA CUENTA
   ***************************************************************************/
  const cambiosCuenta = async () => {
    if (nickname !== newNickname && newNickname !== "") {
      // Llama funcion moficicar nickname en backend
      console.log("Se va a cambiar el nickname");
      comprobarNickname();
    }
    /*else if (nickname === newNickname && newNickname !== ""){
            setError('El nickname es el mismo que el anterior');
        }*/

    if (contrasena !== newContrasena && newContrasena !== "") {
      // Llama funcion moficicar contraseña en backend
      console.log("Se va a cambiar la contraseña");
      comprobarContrasena();
    } else if (contrasena === newContrasena && newContrasena !== "") {
      setError("La contraseña es la misma que la anterior");
    }

    console.log(`FotoPerfil: ${fotoPerfil}`);
    console.log(`newFotoPerfil: ${newFotoPerfil}`);
    if (newFotoPerfil !== fotoPerfil && newFotoPerfil !== "") {
      // Llama funcion moficicar contraseña en backend
      console.log("Se va a cambiar la foto de perfil");
      comprobarFotoPerfil();
    } else if (newFotoPerfil === fotoPerfil && newFotoPerfil !== "") {
      setError("La foto de perfil es la misma que la anterior");
    }
  };

  /***************************************************************************
   * FUNCION CANCELAR CAMBIOS
   ***************************************************************************/
  const cancelarCambios = () => {
    setNickname(nickname);
    setNewNickname("");
    setNewContrasena("");
    setNewContrasenaRep("");
  };

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
    setImagenesModalIsOpen(false);
  };

  /***************************************************************************
   * FUNCION DESPLEGABLE
   ***************************************************************************/
  const toggleMenuDesplegado = () => {
    setMenuDesplegado(!menuDesplegado);
  };

  return (
    <div className="Ajustes">
      <header className="header">AJUSTES</header>
      <div className="barraTitulo"></div>
      <div className="imagenes-link">
        <ImagenesLink />
      </div>

      <div className="contenedorInfo">
        <div className="info">E-mail</div>
        <div className="barraEscribirAjustesEmail">{email}</div>
        <div className="info">Nickname</div>
        <input
          className="barraEscribirAjustes"
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <div className="info">Contraseña</div>
        <input
          className="barraEscribirAjustes"
          type="password"
          placeholder="Contraseña"
          value={newContrasena}
          onChange={(e) => setNewContrasena(e.target.value)}
        />
        <div className="info">Confirmar contraseña</div>
        <input
          className="barraEscribirAjustes"
          type="password"
          placeholder="Confirmar contraseña"
          value={newContrasenaRep}
          onChange={(e) => setNewContrasenaRep(e.target.value)}
        />
      </div>

      <div className="contenedorBotonesTodos">
        <div className="contenedorBotones">
          <button className="botonConfirmarCancelar" onClick={cambiosCuenta}>
            Confirmar
          </button>
          <button className="botonConfirmarCancelar" onClick={cancelarCambios}>
            Cancelar
          </button>
        </div>

        <div className="contenedorBotonesPeligro">
          <button className="botonPeligro" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
          <button
            className="botonPeligro"
            onClick={() => setEliminarModalIsOpen(true)}
          >
            Eliminar cuenta
          </button>
        </div>
      </div>

      {error && <p className="errorAjustes">{error}</p>}

      <div className="contenedorImagen">
        <img
          className="imagenAjustes"
          src={newFotoPerfil ? newFotoPerfil : fotoPerfil}
          alt="Foto sin usuario"
        />
        <button
          className="botonAjustes"
          onClick={() => setImagenesModalIsOpen(true)}
        >
          Cambiar foto
        </button>
      </div>

      <Modal
        className="popup"
        isOpen={eliminarModalIsOpen}
        onRequestClose={() => setEliminarModalIsOpen(false)}
      >
        <div className="popup-ajustes">
          <div className="tituloAjustes">ELIMINAR CUENTA</div>
          <div className="textoAjustes">
            <p>¿Desea eliminar su cuenta?</p>
            <p>Estás a punto de eliminar tu cuenta de forma permanente.</p>
          </div>

          <button className="closeButtonAjustes" onClick={() => closeModal()}>
            X
          </button>
          {error && <p className="error-messageAjustes">{error}</p>}

          <button className="elButtonAjustes" onClick={eliminarCuenta}>
            Eliminar cuenta
          </button>
        </div>
      </Modal>

      <Modal
        className="popup"
        isOpen={imagenesModalIsOpen}
        onRequestClose={() => setImagenesModalIsOpen(false)}
      >
        <div className="popup-imagen">
          <div className="tituloImagen">CAMBIAR DE FOTO DE PERFIL</div>

          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Oca ${index + 1}`}
                className={newFotoPerfil === image ? "selected" : ""}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          <button className="closeButtonImagen" onClick={() => closeModal()}>
            X
          </button>
          {error && <p className="error-messageImagen">{error}</p>}

          <button className="elButtonImagen" onClick={() => closeModal()}>
            Seleccionar imagen
          </button>
        </div>
      </Modal>
      <div
        className="opcionesStats"
        onClick={() => {
          window.location.href = "/stats";
        }}
      >
        <h2> - Estadísticas</h2>
        <i className={menuDesplegado ? "arrow up" : "arrow down"}></i>
      </div>

      <div className="opcionesDespegable">
        <div onClick={toggleMenuDesplegado}>
          <h2> - Configuración</h2>
          <i className={menuDesplegado ? "arrow up" : "arrow down"}></i>
        </div>
        {menuDesplegado && (
          <ul>
            <li>Nombre de usuario</li>
            <li>Contraseña</li>
            <li>Foto de perfil</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Ajustes;
