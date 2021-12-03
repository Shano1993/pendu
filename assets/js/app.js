const arrayWord = [
    "aspirateur",
    "imprimer",
    "gitan",
    "vocal",
    "hutte",
    "moustache",
    "herbe",
    "encadrement",
    "nuageux",
    "violon",
    "raisin",
    "parcometre",
    "lumiere",
    "faucille",
    "malheureux",
    "bracelet",
    "interdire",
    "incertain",
    "homard",
    "noisette",
    "extension",
    "terrasse",
    "mouchoir",
    "construire",
    "skateboard",
    "venteux",
    "drapeau",
    "haine",
    "information",
    "developpeur",
    "ordinateur",
    "souris",
    "exercice",
    "disparu",
    "aviateur",
    "entasser",
    "legende",
    "dentiste",
    "champagne",
    "somnambule",
    "applaudir",
    "hormones",
    "citations",
    "passage",
    "miauler",
    "surmonter",
    "appareil",
    "prisonnier",
    "turbulence",
    "appartement",
    "sauvage",
];
let lettersUsed = [];
let wins = 0;
let trial = 6;
let currentWord = "";
let arr = [];
let parts = ["head", "torso", "arm-l", "arm-r", "leg-l", "leg-r"];

// draw a random word from the board
function pickWord() {
    let randomWord = Math.floor((Math.random() * arrayWord.length) + 1);
    currentWord = arrayWord[randomWord];
}

// the word drawn in the table

function currentWordOnScreen() {
    let space = arr.join(" ");
    document.getElementById("word").innerHTML = space;
}

// overview of the tests
function showTrial() {
    document.getElementById("numTrial").innerHTML = " " + trial.toString();
}

// function to show wins
function showWins() {
    document.getElementById("numWins").innerHTML = wins;
}

// function to show letters used
function showLettersUsed() {
    let space = lettersUsed.join(", ");
    document.getElementById("guess").innerHTML = space;
}

// letter already used
function addLetter(usersKeypress) {
    let repeatedLetter = lettersUsed.some(function(item){
        return item === usersKeypress;
    })
    if (repeatedLetter) {
        alert("La lettre" + " " + usersKeypress + " " + "est déjà utilisée!");
    }
    else {
        lettersUsed.push(usersKeypress);
        showLettersUsed();
        isCharacterInWord(usersKeypress);
    }
}

// condition to see if the word is correct
function isCharacterInWord (character) {
    let flag = false;
    let currentWordList = currentWord.split("");

    for (let i = 0; i < currentWordList.length; i++) {
        if (character.toLowerCase() === currentWordList[i]) {
            arr[i] = character.toLowerCase();
            currentWordOnScreen();
            flag = true;

            //check if user has won the game
            if (arr.join("") === currentWord) {
                alert("Tu as trouvé le bon mot !");
                wins = wins + 1;
                showWins();
            }
        }
    }

    // condition to see if the word is not correct
    if (flag === false) {
        trial = trial - 1;
        showTrial();
        if (parts.length > 0) {
            let part = document.getElementById(parts[0]);
            part.style.display = "block";
            parts.shift();
        }
        if (trial === 0) {
            document.getElementById('correct').innerHTML = "Perdu ! Le mot était :" + " " + currentWord;
        }
    }
}

// create the undescore instead of the letters
function blankArrayOnScreen(){
    arr.length = currentWord.length;
    arr.fill("_");
}

// reset the game
function resetVariables() {
    lettersUsed = [];
    arr = [];
    trial = " " + 6;
}

// see keyboard keys pressed
document.onkeydown = function(event) {
    let keyPress = String.fromCharCode(event.keyCode);
    document.getElementById('guess').innerHTML = keyPress;
    addLetter(keyPress);
}
function startGame() {
    resetVariables();
    pickWord();
    blankArrayOnScreen();
    currentWordOnScreen();
    showTrial();
    showLettersUsed();
    showWins();
}
document.getElementById('easy').addEventListener("click", function () {
    startGame();
})
