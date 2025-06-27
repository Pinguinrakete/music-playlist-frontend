const postUrl = "http://127.0.0.1:8000/api/endpoint/";

async function post() {
    const interpret = document.getElementById('interpret').value;
    const title = document.getElementById('title').value;

    const data = {
        interpret: interpret,
        title: title
    };

    let response = await fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log(result);

    cleanInputfield();
}

function cleanInputfield() {
    document.getElementById("interpret").value = "";
    document.getElementById("title").value = "";
}