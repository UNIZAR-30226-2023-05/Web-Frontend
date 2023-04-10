async function Login(email,password) {

    let headersList = {
        "Content-Type": "application/json"
    }
   
    let bodyContent = JSON.stringify({
        "email": email,
        "password": password
    });

    const options = {
        method: "POST",
        body: bodyContent,
        headers: headersList
    }
    
    let response = await fetch("https://backendps.vercel.app/users/login", options);
    
    let data = await response.json();
        console.log(data);

   return data;
}

export default Login;