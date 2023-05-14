async function GetSolicitudes(id_usuario) {
  let headersList = {
      "Content-Type": "application/json"
  }

  let response = await fetch(`http://localhost:4000/social/friends/${id_usuario}`, { 
    method: "PUT",
    headers: headersList
  });

  let data = await response.json();
      console.log(data);

  return data; //devuelve el .json con los datos del registro
}

export default GetSolicitudes;
