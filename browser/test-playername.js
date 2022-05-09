let redPName = "red"
let yellowPName = "yellow"

redPName = document.getElementById('redP').value

let playerObject = { 
    "redPlayer" : redPName,
    "yellowPlayer" : "Monique"

}

function winnerPlayerName() {
    return playerObject[lastPlayer]
}

const lastPlayer = "redPlayer"
console.log(winnerPlayerName())