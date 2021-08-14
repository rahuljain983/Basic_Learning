
// VoiceRSS Javascript SDK
const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

// Text to speech api
function generateAudio(text) {
    
    VoiceRSS.speech({
        key: 'cbb97155196b4e7d95a6d42316f3960a',
        src: text,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    button.disabled = true;
    const apiURL = 'https://v2.jokeapi.dev/joke/Any';
    let joke = ''
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        joke = ((data.type === 'single' && data.joke) || (`${data.setup}${data.delivery}`));
        generateAudio(joke);
    } catch (err) {
        console.error('whoops', err);
        button.disabled = false;
    }
}


button.addEventListener('click', (e) => {
    getJokes();
})


audioElement.addEventListener('ended', () => {
    button.disabled = false;
})