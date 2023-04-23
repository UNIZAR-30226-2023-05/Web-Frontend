async function Login(email,password){
    let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "email": email,
         "password": password
       });
       
       let response = await fetch("localhost:3000/users/login", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);
       
}

export default Login;