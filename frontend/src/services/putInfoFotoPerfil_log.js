async function PutInfoFotoPerfil(id_usuario, fotoPerfil) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    id_usuario: id_usuario,
    profilephoto: fotoPerfil,
  });

  let response = await fetch("http://169.51.206.12:32021/users/register", {
    method: "PUT",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);

  return data; //devuelve el .json con los datos del registro
}

export default PutInfoFotoPerfil;
