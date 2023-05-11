import React, { useState, useEffect } from "react";
import "./stats.css";
import "../../components/RestoPantallas.css";
import Card from "../../components/Card";
import GetStats from "../../services/getStats.js";
import GetID from "../../services/getID_log.js";

function Stats() {
  const [data, setData] = useState([]);

  const obtenerEstadisticas = async () => {
    // Info del usuario
    const email = localStorage.getItem("email");

    // Coger id del usuario
    let dataId = await GetID(email);

    // Coger los datos
    let data = await GetStats(dataId.id_usuario);

    setData(data);
  };

  useEffect(() => {
    obtenerEstadisticas();
  }, []);

  const prueba = [
    { title: "Card 1", estadisticas: "Data for card 1" },
    { title: "Card 2", estadisticas: "Data for card 2" },
    { title: "Card 3", estadisticas: "Data for card 3" },
    { title: "Card 4", estadisticas: "Data for card 4" },
    { title: "Card 5", estadisticas: "Data for card 5" },
    { title: "Card 6", estadisticas: "Data for card 6" },
  ];

  return (
    <div className="align-items-center">
      <header className="header">Estadísticas</header>
      <div className="card-container">
        {prueba.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            data={item.estadisticas ? item.estadisticas : 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
