const height = 6
const width = 5

let row = 0
let col = 0

let gameOver = false
let word = "SQUID"

document.get

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


}


document.addEventListener('keyup', letterEntry)

function letterEntry (e) {
    if(gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }
    }

}


// document.addEventListener('keyup', typedLetters)

// function typedLetters (e) {
//     if(gameOver) return;

//     if ('KeyA' <= e.code && e.code <= 'KeyZ'){
//         if (col < row){
//             let currentTile = document.getElementById(row.toString()+'-'+col.toString());
//             if (currentTile.innerText === ''){
//                 currentTile.innerText === e.code[3]
//                 col += 1
//                 console.log(currentTile)
//             }
//         }

//     }

// }

