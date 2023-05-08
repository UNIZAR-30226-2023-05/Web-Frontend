async function GetInfo(id_usuario) {
    let headersList = {
        "Content-Type": "application/json"
    }

    let response = await fetch("localhost:3000/users/${id_usuario}", { 
        method: "GET",
        headers: headersList
    });

    let data = await response.text();
        console.log(data);

    return data; //devuelve el .json con los datos del registro
}

export default GetInfo;