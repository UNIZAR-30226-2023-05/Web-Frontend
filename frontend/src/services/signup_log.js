async function SignUp(nickname, email, password){
    let headersList = {
        "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
        "nickname": nickname,
        "email": email,
        "password": password
    });

    const options = {
        method: "POST",
        headers: headersList,
        body: bodyContent
    };

    let response = await fetch("http://169.51.206.12:32021/users/register", options);

    let data = await response.json();
        console.log(data);

    return data; //devuelve el .json con los datos del registro
}

export default SignUp;