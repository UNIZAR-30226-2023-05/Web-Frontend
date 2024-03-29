async function GetAmigos(id_usuario) {
    let headersList = {
        "Content-Type": "application/json"
    }
    console.log(id_usuario);

    let response = await fetch(`http://169.51.206.12:32021/social/friends/${id_usuario}`, { 
        method: "GET",
        headers: headersList
    });

    let data = await response.json();
        console.log(data);

    return data; //devuelve el .json con los datos del registro
    }

    export default GetAmigos;