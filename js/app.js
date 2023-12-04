
import { allWords } from "./words.js"

const height = 6
const width = 5

let row = 0
let col = 0
let allTilesEl;


let gameOver = false


// const generateNewWordEl = document.getElementById('new-word')
const playAgainEl = document.getElementById('play-again')


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

function letterEntry (e) {
    if(gameOver) return;
    
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
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
        update()
        row += 1
        col = 0
        getGuessedLetters()
        
        
    } if (!gameOver && row === height){
        gameOver = true
        document.getElementById('answer').innerText = word
        showPlayAgain()
    }
    
}

function getGuessedLetters(){
    allTilesEl.forEach ((tile)=>{
        guessedLetters.push(tile.innerText)
    })
    console.log(guessedLetters)
}


// coloring the cell based on the guess
function update(){
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




function showPlayAgain(){
    if (gameOver === true){
        playAgainEl.style.display = 'inline-flex'
    }
}

document.addEventListener('click', resetGameBoard)

function resetGameBoard(e){
    console.log(e)
    if (e.target.id === 'play-again'){
        document.getElementById('board').replaceChildren()
        playAgainEl.style.display = 'none'
        buildGameboard()
        row = 0
        col = 0
        gameOver = false
        word = allWords[Math.floor(Math.random()*allWords.length)].toLocaleUpperCase()
        document.getElementById('answer').innerText = ''

    }
}

//





// win logic

// score count function

// play again button/function
