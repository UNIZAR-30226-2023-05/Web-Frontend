async function PutInfoNickname(id_usuario, nickname) {
    let headersList = {
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "id_usuario": id_usuario,
        "nickname": nickname,
      });
    
    let response = await fetch("http://localhost:3000/users/register", { 
        method: "PUT",
        body: bodyContent,
        headers: headersList
      });
    
    let data = await response.json();
    console.log(data);
    
    return data; //devuelve el .json con los datos del registro
}

export default PutInfoNickname;