const GET_URL = "http://127.0.0.1:8000/api/endpoint/";
const POST_URL = "http://127.0.0.1:8000/api/endpoint/";
const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/";

let apiKey = '';


async function post() {
    const data = {
        interpret: document.getElementById('interpret').value,
        title: document.getElementById('title').value
    };

    let response = await fetch(POST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${apiKey}`
        },
        body: JSON.stringify(data)
        });

    const result = await response.json();
    console.log("Antwort vom Server:", result);
    cleanInputfield();
}


async function get() {
    try {
        const response = await fetch(GET_URL);
        const data = await response.json();
        renderPlaylist(data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}


function cleanInputfield() {
    document.getElementById("interpret").value = "";
    document.getElementById("title").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


function renderPlaylist(data) {
    document.getElementById("output-database").innerHTML = '';

    for(let i = 0; i < data.length; i++) {
        document.getElementById("output-database").innerHTML += `interpret: ${data[i]['interpret']} title: ${data[i]['title']} <br>`;
    }
}


async function logInSubmit() {
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    console.log('post', data)
    let request = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

    const response = await request.json();
    console.log("Antwort vom Server:", response);
    apiKey = response.token;
    console.log('Api-Key', apiKey);
    cleanInputfield();
}