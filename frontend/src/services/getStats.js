// Obtener las estadísticas de los usuario
async function GetStats(id_usuario) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `http://localhost:4000/users/estadisticas/${id_usuario}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  console.log(data);

  return data;
}

export default GetStats;
