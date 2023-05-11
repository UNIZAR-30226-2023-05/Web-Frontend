import React from "react";
import "./stats.css";
import "../../components/RestoPantallas.css";
import Card from "../../components/Card";
import GetStats from "../../services/getStats.js";

function Stats() {
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
      <div className="card-container">
        {data.map((item) => (
          <Card key={item.title} title={item.title} data={item.data} />
        ))}
      </div>
    </div>
  );
}

export default Stats;
