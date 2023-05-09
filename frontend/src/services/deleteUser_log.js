async function DeleteUser(id_usuario) {
    let headersList = {
        "Content-Type": "application/json"
    }
    
    let response = await fetch(`http://localhost:4000/users/register/${id_usuario}`, { 
        method: "DELETE",
        headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
    
    return data; //devuelve el .json con los datos del registro
}

export default DeleteUser;