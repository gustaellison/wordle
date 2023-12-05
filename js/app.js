
import { allWords } from "./words.js"

// let allWords = ["SQUID"]

const height = 6
const width = 5

let row = 0
let col = 0
let allTilesEl;

let rowsOfLetters = []

let gameOver = false


// const generateNewWordEl = document.getElementById('new-word')
const playAgainEl = document.getElementById('play-again')
const keyboardEls = document.querySelectorAll('.keyboard > button')



// selecting randomized word


let word = allWords[Math.floor(Math.random()*allWords.length)].toLocaleUpperCase()


init()

//functions to call on page load
function init(){
    buildGameboard()
}

//render board
function buildGameboard(){
    
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++){
            let tile = document.createElement('span')
            tile.id = `${r}-${c}`
            tile.classList= 'tile'
            tile.innerText = ''
            document.getElementById('board').appendChild(tile)
            
        }
    }
    allTilesEl = document.querySelectorAll('span')
}



// submitting the guess
//adding and removing the letters from the board
document.addEventListener('keyup', letterEntry)
let currTile;

let guessedLetters = []
let guessedWord;

function letterEntry (e) {
    if(gameOver) return;
    if (e.code === "Enter" && col !== 5){
        return alert('Word is not long enough!')
        
    }
    
    else if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    } else if (e.code === "Backspace"){
        if(col > 0 && col <= width){
            col = col - 1
        }
        currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = ""
        
    } else if (e.code === "Enter" && col === 5){
        updateGameboard()
        row += 1
        col = 0
        getGuessedLetters()
        updateKeyboard()
        
    } if (!gameOver && row === height){
        gameOver = true
        document.getElementById('answer').innerText = word
        showPlayAgain()
    }
    
}


let newGuessedWord = []

function getGuessedLetters() {
    const newGuessedLetters = [];

    allTilesEl.forEach((tile) => {
        const letter = tile.innerText;
        
            newGuessedLetters.push(letter);
        
    });

    // Add the new letters to the front of the guessedLetters array
    guessedLetters = newGuessedLetters.concat(guessedLetters);
    newGuessedWord = newGuessedLetters

    console.log(guessedLetters);
    console.log(newGuessedWord);
}


function updateKeyboard() {
    for (let i = 0; i <= 26; i++) {
        // Assuming guessedLetters is a string or an array of letters
        const keyLetter = keyboardEls[i].innerText;        

        // Remove all classes before applying the correct ones
        // keyboardEls[i].classList.remove('absent');
        
        if (newGuessedWord.includes(keyLetter)) {
            const wordIndex = newGuessedWord.indexOf(keyLetter);
            console.log(wordIndex)

            if (wordIndex !== -1 && word[wordIndex] === keyLetter) {
                keyboardEls[i].classList.remove('present')
                keyboardEls[i].classList.add('correct');
            } 
            else if (word.includes(keyLetter)) {
                keyboardEls[i].classList.add('present');
            } 
            else {
                keyboardEls[i].classList.add('absent');
            }
        }
    }
}


keyboardEls.forEach(key => key.addEventListener('click', keyboardTyping));

function keyboardTyping (e){
    if(gameOver) return;
    console.log(e.target)
    if (e.target.innerText === "Enter" && col !== 5){
        return alert('Word is not long enough!')
        
    }
    else if ("A" <= e.target.innerText && e.target.innerText <= "Z" && e.target.innerText !== 'Delete' && e.target.innerText !== 'Enter') {
        if (col < width) {
            currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "" && e.target.innerText !== 'Delete') {
                currTile.innerText = e.target.innerText;
                col += 1;
            }
        }
    } 
    else if (e.target.innerText === "Delete"){
        if(col > 0 && col <= width){
            col = col - 1
        }
        currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = ""
        
    } 
    else if (e.target.innerText === "Enter" && col === 5){
        updateGameboard()
        row += 1
        col = 0
        getGuessedLetters()
        updateKeyboard()
        
    } if (!gameOver && row === height){
        gameOver = true
        document.getElementById('answer').innerText = word
        showPlayAgain()
    }
    
}

// coloring the cell based on the guess
function updateGameboard(){
    let correct = 0
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText

        if (word[c] == letter){
            currTile.classList.add('correct')
            correct += 1
        } 
        else if (word.includes(letter)){
            currTile.classList.add('present')
        } 
        else {
            currTile.classList.add('absent')
        }
    }
    if (correct == width){
        gameOver = true
        playAgainEl.style.display = 'inline-flex'
    }
    
}



// displaying Play again button after gameOver is true
function showPlayAgain(){
    if (gameOver === true){
        playAgainEl.style.display = 'inline-flex'
    }
}

// play again button/function
document.addEventListener('click', resetGameBoard)

function resetGameBoard(e){
    if (e.target.id === 'play-again'){
        document.getElementById('board').replaceChildren()
        playAgainEl.style.display = 'none'
        buildGameboard()
        row = 0
        col = 0
        gameOver = false
        word = allWords[Math.floor(Math.random()*allWords.length)].toLocaleUpperCase()
        document.getElementById('answer').innerText = ''
        guessedLetters =[]
        
            keyboardEls.forEach((key) => {
                key.setAttribute('class', '')
            })

    }
}

