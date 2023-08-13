const letters =document.querySelectorAll('.scoreboard-letter');
console.log(letters);
let count = 0;
let row = 0;
let currentGuess = '';
const ANSWER_LENGTH = 5;
const wordParts = [];


function addLetter(letter) {
    if (currentGuess.length < 5) { 
        currentGuess += letter;
    
    }
    else{
        currentGuess = currentGuess.substring(0, currentGuess.length - 1)+letter;
 
    }

    letters[row*5 + currentGuess.length-1].innerText = letter;
 }
async function init() {

 
    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resobj = await res.json();
    const word = resobj.word.toUpperCase();
    wordParts = word.split("");
    console. log(word)



    document.addEventListener('keydown', function handleKeypressed (event) {
        
        
        action = event.key;
        if (action === 'Enter') {
            
            commit(action)
        }
        else if (action === 'Backspace') {
            deleteLetter(action)
        }
        else if (isLetter(action)) {
            addLetter(action)
        }

        }

    );
}

async function commit(action) {
    
    if (currentGuess.length < 5) {
        return;
    }
  
    const guessParts = currentGuess. split("") ;
    for (let i = 0; i < ANSWER_LENGTH; i++) {
    // mark as correct
    if (guessParts[i] === wordParts[i]){
    letters [row * ANSWER_LENGTH + i]. classList. add ("correct");
    }

    }
    // mark as incorrect
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (guessParts[i] !== wordParts[i]) {
            letters[row * ANSWER_LENGTH + i].classList.add("incorrect");
        }
    }   
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}



function deleteLetter() {
   
        if (currentGuess.length == 0) {
            return;
        }
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[row*5 + currentGuess.length].textContent = '';
       
    
}
init();