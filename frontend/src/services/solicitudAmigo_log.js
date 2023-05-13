async function SolicitudAmigo(id_usuario_envia, id_usuario_recibe){

    let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "id_usuario_envia": id_usuario_envia,
         "id_usuario_recibe": id_usuario_recibe
       });
       console.log(bodyContent);
       
       let response = await fetch("http://localhost:4000/social/friends", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data);
    
       return data; //devuelve el .json con los datos del registro
}

export default SolicitudAmigo;
   