import '/src/style/style.css'

async function getData() {
    const response = await fetch("https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/:username");
    console.log(response);
}

getData();
