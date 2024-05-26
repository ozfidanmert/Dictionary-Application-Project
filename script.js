const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById('sound');
const result = document.querySelector('.result');
const btn = document.querySelector('.btnSearch');
let inputWord;

btn.addEventListener('click', () => {
    inputWord = document.querySelector('.inputSearch').value;
    console.log(inputWord);

    fetch(`${url}${inputWord}`)
        .then(response => response.json())
        .then(data => {
            let word = data;
            console.log(word);
            innerHtml(word);
        })
        .catch(() => {
            result.innerHTML = `<h1>Couldn't Find The Word</h1>`;
        });
});

function innerHtml(data) {
    result.innerHTML =
        `
        <div class="word">
            <h1>${inputWord}</h1>
            <button onclick="soundPlay()" class="volumeBtn">
                <i class='bx bxs-volume-full volume'></i>
            </button>
        </div>

        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>

        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${data[0].meanings[0].definitions[0].example}
        </p>    
        `;

    // Ses dosyasının URL'sini doğru şekilde belirleyin
    sound.setAttribute('src', `https://ssl.gstatic.com/dictionary/static/sounds/20200429/${data[0].word}--_gb_1.mp3`);
    console.log(sound.src);
}

function soundPlay() {
    sound.play();
}
