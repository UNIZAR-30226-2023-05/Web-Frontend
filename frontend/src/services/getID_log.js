async function GetID(nickname) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
    }
    
    let bodyContent = JSON.stringify({
        "nickname": nickname
    });

    let response = await fetch("localhost:3000/users/register", { 
        method: "GET",
        body: bodyContent,
        headers: headersList
    });

    let data = await response.text();
    console.log(data);
}

export default GetID;