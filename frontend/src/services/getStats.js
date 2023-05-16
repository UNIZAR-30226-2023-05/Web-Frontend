// Obtener las estadísticas de los usuario
async function GetStats(id_usuario) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `http://169.51.206.12:32021/users/estadisticas/${id_usuario}`,
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
