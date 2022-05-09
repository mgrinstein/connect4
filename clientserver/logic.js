// Initial settings

const totalRows = 6
const totalCols = 7

function createBoard() {
    let myBoard = [];
    for(let boardRow=0; boardRow<totalRows; boardRow++) {
        myBoard[boardRow] = []
        for(let boardCol=0; boardCol<totalCols; boardCol++) {
            myBoard[boardRow][boardCol] = null
        }
    }
    return myBoard
}

function getBoard() {
    console.log("getBoard was called");
    return myBoard;
}

let redPlayer = "redPlayer"
let yellowPlayer = "yellowPlayer"

let nextPlayer = yellowPlayer
let lastPlayer = ""

let isGameOver = false
let winner = null

let myBoard = createBoard()

// Functions

function updateGameState() {
    let gameState = {
        whoseTurn: nextPlayer,
        gotWinner: isGameOver,
        winnerName: winner,
        currentBoard : myBoard}
    return gameState
}

function whichRow(column) {
    for (let searchRow=5; searchRow >= 0; searchRow--) {
        if (myBoard[searchRow][column] === null) {
            return searchRow
        }
    }
    isGameOver = true
    winnerName = "nobody"
}

function spaceLeftColumn(column){
    return column.some(el => el === null);
}

function takeTurn(row, column) {
    console.log("takeTurn was called with row: "+row+", column:"+column)
    if (isGameOver === false){
        const rowInfo = whichRow(column)
        if (nextPlayer === yellowPlayer) {
            myBoard[rowInfo][column] = "yellow"
            lastPlayer = yellowPlayer
            nextPlayer = redPlayer
        } else {
            myBoard[rowInfo][column] = "red"
            lastPlayer = redPlayer
            nextPlayer = yellowPlayer
        }
    }
    let currentState = updateGameState()
    return currentState
}

function resetGame() {
    console.log("resetGame was called");
    nextPlayer = yellowPlayer
    isGameOver = false
    winner = null
    myBoard = createBoard()
    let gameState = updateGameState()
    return gameState
}


// WINNER FUNCTIONS

function checkWinnerHorizontal(board) {
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

function checkWinner() {
    console.log("checkWinner was called")
    if (checkWinnerHorizontal(myBoard) ||
        checkWinnerVertical(myBoard) ||
        checkWinnerDiagonalsLR(myBoard) ||
        checkWinnerDiagonalsRL(myBoard)) {
            isGameOver = true
            console.log("got a winner")
            winner = lastPlayer
        }
    else if (!spacesLeft(myBoard)) {
        isGameOver = true
        console.log("no winner")
        winner = "nobody"
    }
    else {
        console.log("game still going on")
    }
    currentState = updateGameState()
    console.log("currentState")
    console.log(currentState)
    return currentState
}

// ---------------------


module.exports = {
    resetGame,
    takeTurn,
    checkWinner
}