async function DeleteUser(id_usuario) {
  let headersList = {
    "Content-Type": "application/json",
  };

  let response = await fetch(
    `http://169.51.206.12:32021/users/register/${id_usuario}`,
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  let data = await response.json();
  console.log(data);

  return data; //devuelve el .json con los datos del registro
}

export default DeleteUser;
