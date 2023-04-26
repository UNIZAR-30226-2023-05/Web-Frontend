async function GetID(nickname) {
    let headersList = {
        "Content-Type": "application/json"
    }
    
    let bodyContent = JSON.stringify({
        "nickname": nickname
    });

    let response = await fetch("lhttp://localhost:3000/users/register", { 
        method: "GET",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.text();
        console.log(data);

    return data; //devuelve el .json con los datos del registro
}

export default GetID;