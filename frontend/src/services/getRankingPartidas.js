async function GetRankingPartidas() {
    let headersList = {
        "Content-Type": "application/json"
       }
       
       
       let response = await fetch("http://localhost:4000/users/ranking/partidas", { 
            method: "GET",
            headers: headersList
       });
       
       let data = await response.json();
        console.log(data);
       

    return data; //devuelve el .json con los datos del registro
}

export default GetRankingPartidas;
   