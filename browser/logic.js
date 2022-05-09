// >> Global variables - can be accessed from anywhere in a JavaScript program.
// Global variable representing the board.

const totalRows = 6
const totalCols = 7

let myBoard = [];
for(let boardRow=0; boardRow<totalRows; boardRow++) {
    myBoard[boardRow] = []
    for(let boardCol=0; boardCol<totalCols; boardCol++) {
        myBoard[boardRow][boardCol] = null
	}
}

// Player types:
let redPlayer = "redPlayer" //"red"
let yellowPlayer = "yellowPlayer"


// let redPlayerName = "" //document.getElementById("redP").value
// let yellowPlayerName = "" //document.getElementById("yellowP").value


// Other states we must track and which will be used by functions (=> must be global)
let isGameOver = false
let nextPlayer = yellowPlayer
let lastPlayer = ""

const nextPlayerUp = document.getElementById("nextPlayerUp");


// Matrix to check token rows left in each column (row 5 (bottom) -> row 0 (top))
let tokensLeftMatrix = new Array(totalCols)

function populateTokenMatrix(matrix) {
    for(let tColumn=0; tColumn<totalCols; tColumn++) {
        tokensLeftMatrix[tColumn] = 5 // as we have 6 rows (0 to 5)
    }
}
populateTokenMatrix(tokensLeftMatrix)

// >> Functions

function handlePlayerNames() {
    console.log("handlePlayerNames was called")
    redPlayer = document.getElementById("redP").value
    yellowPlayer = document.getElementById("yellowP").value
    if (redPlayer === "") {
        redPlayer = "redPlayer"
    }
    if (yellowPlayer === "") {
        yellowPlayer = "yellowPlayer"
    }
    alert("Ready to play: " + redPlayer + " and " + yellowPlayer +"!")
    return redPlayer,yellowPlayer
}

// Take the row and column number between 0 and 2 
// (inclusive) and update the game state.
function takeTurn(row, column) {
    const rowInfo = tokensLeftMatrix[column]
    console.log("takeTurn was called with row: "+row+", column:"+column)
//    console.log("current player: " +nextPlayer)
//    console.log("current tokens: " +tokensLeftMatrix)


    if ((isGameOver === false) && (tokensLeftMatrix[column] >= 0)) {
        //console.log("rowInfo "+rowInfo)
        //console.log("columnInfo "+column)
        if (nextPlayer === yellowPlayer) { // Update board with new move & whose turn it is now
            myBoard[rowInfo][column] = "yellow"
            lastPlayer = yellowPlayer
            nextPlayer = redPlayer //next Player on (if game doesn't end)
            nextPlayerUp.innerText = "Next turn: 🔴";
        } else {
            myBoard[rowInfo][column] = "red"
            lastPlayer = redPlayer
            nextPlayer = yellowPlayer
            nextPlayerUp.innerText = "Next turn: 🟡";
        }
        tokensLeftMatrix[column] -=1
//        console.log("current tokens: " +tokensLeftMatrix)
    }
    // console.log("Array: " +myBoard)
    // console.log("myBoard[rowInfo] "+myBoard[rowInfo])
// PS: No need to call checkWinner because it will already be called by the positionClick function (on interaction.js) 
}

function checkWinnerHorizontal(board) {
    console.log("checkWinnerHorizontal was called")
    for (let inRow = 0; inRow < totalRows; inRow++) {
        let startCount = 0
        let colorStreak = ""
        for (let inCol = 0; inCol < totalCols; inCol++) {
            const myCell = board[inRow][inCol]
            if ((myCell !== null) && ((colorStreak === "") || (colorStreak === myCell))) {
                startCount += 1
                colorStreak = board[inRow][inCol]
            }
            else {
                // startCount = 0
                // colorStreak = ""
                startCount = 1
                colorStreak = myCell
            }
            //console.log('Cell: '+myCell)
            //console.log("startCount: "+ startCount +' | '+ 'colorStreak: '+colorStreak)
            if (startCount === 4) {
                return true
            }
        }    
    }
}

function checkWinnerVertical(board) {
    console.log("checkWinnerVertical was called")
    for (let inCol = 0; inCol < totalCols; inCol++) {
        let startCount = 0
        let colorStreak = ""
        for (let inRow = 0; inRow < totalRows; inRow++) {
            const myCell = board[inRow][inCol]
            if ((myCell !== null) && ((colorStreak === "") || (colorStreak === myCell))) {
                startCount += 1
                colorStreak = board[inRow][inCol]
            }
            else {
                // startCount = 0
                // colorStreak = ""
                startCount = 1
                colorStreak = myCell
            }
            if (startCount === 4) {
                return true
            }
        }    
    }
}

function checkWinnerDiagonalsLR(board) {
    console.log("checkWinnerDiagonalsLR was called - checking top left -> bottom right")
    for (let inRow = 0; inRow <= 2; inRow++) {
        for (let inCol = 0; inCol <= 3; inCol++) {
            const myCell = board[inRow][inCol]
            const diagonalArray = [
                myCell,
                board[inRow+1][inCol+1],
                board[inRow+2][inCol+2],
                board[inRow+3][inCol+3]
            ]
            const diagonalLRCondition = diagonalArray.every( (val, i, arr) => val === arr[0] )
            if (((myCell !== null)) && (diagonalLRCondition)) {
                return true
            }
            else {
                continue
            }
        }    
    }
}

function checkWinnerDiagonalsRL(board) {
    console.log("checkWinnerDiagonalsRL was called - checking top right -> bottom left")
    for (let inRow = 0; inRow <= 2; inRow++) {
        for (let inCol = 6; inCol >= 3; inCol--) {
            const myCell = board[inRow][inCol]
            const diagonalArray = [
                myCell,
                board[inRow+1][inCol-1],
                board[inRow+2][inCol-2],
                board[inRow+3][inCol-3]
            ]
            const diagonalRLCondition = diagonalArray.every( (val, i, arr) => val === arr[0] )
            if ((myCell !== null) && (diagonalRLCondition)) {
                return true
            }
            else {
                continue
            }
        }    
    }
}

function spacesLeft(board) {
    //console.log("board[0] : " + board[0])
    if (board[0].some(el => el === null) === true) {
        return true
    } else {
        return false
    }
}

// Main checkWinner function
// Returns either "redPlayer", "yellowPlayer" or "nobody" if the game is over.
// Otherwise return null to continue playing.

function checkWinner() {
    console.log("checkWinner was called")
    if (checkWinnerHorizontal(myBoard) ||
        checkWinnerVertical(myBoard) ||
        checkWinnerDiagonalsLR(myBoard) ||
        checkWinnerDiagonalsRL(myBoard)) {
            isGameOver = true
            console.log("got a winner")
            nextPlayerUp.innerText = "Press 'Reset' to restart.";
            return lastPlayer
        }
    else if (!spacesLeft(myBoard)) {
        isGameOver = true
        console.log("no winner")
        nextPlayerUp.innerText = "Press 'Reset' to restart."
        return "nobody"
    }
    else {
        console.log("game still going on")
        return null
    }
}


// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");
    for (let rowClear = 0; rowClear < totalRows; rowClear++) {
        for (let columnClear =0; columnClear < totalCols; columnClear++) {
            myBoard[rowClear][columnClear] = null
            document.getElementById(`row-${rowClear}-column-${columnClear}`).style.backgroundColor = ""
        }
    }
    // set first player to "yellowPlayer" player
    nextPlayer = yellowPlayer
    // set new game
    isGameOver = false
    populateTokenMatrix(tokensLeftMatrix)
}

// Return the current board state with either a "red" or a "yellow" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return myBoard;
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}
