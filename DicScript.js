let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <p class="word">
                    <h4>${inpWord}</h4>
                </p>    
                <p class="details">
                    ${data[0].meanings[0].partOfSpeech}/${data[0].phonetic}/
                </p>
                <p class="word-meaning">
                    <strong>Definition</strong><br> 
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    <strong>Example</strong><br>${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});