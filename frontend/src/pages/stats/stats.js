import React from "react";
import "./stats.css";
import "../../components/RestoPantallas.css";
import Card from "../../components/Card";
import GetStats from "../../services/getStats.js";
import GetID from "../../services/getID_log.js";

function Stats() {
  const obtenerEstadisticas = async () => {
    // Info del usuario
    const email = localStorage.getItem("email");

    // Coger id del usuario
    let dataId = await GetID(email);

    // Coger los datos
    let data = GetStats(dataId.id_usuario);
  };

  const data = [
    { title: "Card 1", data: "Data for card 1" },
    { title: "Card 2", data: "Data for card 2" },
    { title: "Card 3", data: "Data for card 3" },
    { title: "Card 4", data: "Data for card 4" },
    { title: "Card 5", data: "Data for card 5" },
    { title: "Card 6", data: "Data for card 6" },
  ];

  return (
    <div className="align-items-center">
      <header className="header">Estadísticas</header>
      <div className="card-container" onClick={obtenerEstadisticas}>
        {data.map((item) => (
          <Card key={item.title} title={item.title} data={item.data} />
        ))}
      </div>
    </div>
  );
}

export default Stats;
