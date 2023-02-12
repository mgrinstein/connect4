console.log('Client-side code running');

const resetButton = document.getElementById('reset-button')
// resetButton.addEventListener('click', function (e) {
//     console.log('reset button was clicked');
// })
resetButton.addEventListener("click", resetClick);

// Board operations

for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

function clearBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = ""
        }
    }
}

function drawBoard(board) {
    clearBoard();
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            const cellTBFilled = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
            if (!board[rowIndex][columnIndex]) {
                continue;
            }
            const cellColor = board[rowIndex][columnIndex]
            cellTBFilled.style.backgroundColor = cellColor;
//            cellTBFilled.innerText = cellText;
        }
    }
}

function whoPlaysNext(player){
    if (player === "yellowPlayer"){
        nextPlayerUp.innerText = "Next turn: 🟡";
    } else {
        nextPlayerUp.innerText = "Next turn: 🔴";
    }
}

// Communication with Server

async function postData(url, data = {}) {
    const response = await fetch(url, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

function positionClick(rowIndex, columnIndex, event) {
    const clickedPosition = {
        row : rowIndex,
        column : columnIndex
    }
    console.log("positionClick event")
    postData('/connect4',clickedPosition).then(data => {
        console.log("postData")
        console.log(data)
        drawBoard(data.currentBoard)
        whoPlaysNext(data.whoseTurn)
        if (data.winnerName) {
            const displayWinnerName = document.getElementById("winner-name");
            displayWinnerName.innerText = data.winnerName;
            const winnerDisplay = document.getElementById("winner-display");
            winnerDisplay.style.display = "block";
            nextPlayerUp.innerText = "Press 'Reset' to restart.";
        }
    })
}


function resetClick(event) {
    console.log("resetClick event - board resetting")
    postData('/reset').then(data => {
        clearBoard()
        const winnerName = document.getElementById("winner-name");
        winnerName.innerText = "";
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.style.display = "None";
        nextPlayerUp.innerText = "Next turn: 🟡";
    })
}