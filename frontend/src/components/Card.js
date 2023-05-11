import React from "react";
import "./Card.css";

function Card({ title, data }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{data}</p>
    </div>
  );
}

export default Card;
