async function GetIDNickname(nickname) {
    let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "nickname": nickname
       });
       
       let response = await fetch("http://localhost:4000/users/userid", { 
         method: "PUT",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
        console.log(data);
       

    return data; //devuelve el .json con los datos del registro
}

export default GetIDNickname;