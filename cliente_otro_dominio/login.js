window.onload = () => {
    document.getElementById('login-form').addEventListener('submit', loginUser);
}

async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let apiUrl = "http://localhost:5000/api/login";
    let newSesion = {
        username: username,
        password: password
    }

    let response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSesion)
    });
    let json = await response.json()

    if (json.token) {
        window.location.href = "index.html";
        localStorage.setItem("token", json.token);
    } else {
        const showError = document.getElementById("show-error");
        const p = document.createElement("p");

        showError.innerHTML = "";
        p.innerHTML = json.error;

        showError.append(p);
        localStorage.setItem("token", "");

    }

    console.log(json);
}