console.log('Server-side code running');

const path = require('path');
const express = require('express')

const app = express()
app.use(express.json())

const { resetGame, takeTurn, checkWinner } = require('./logic.js');

const PORT = 8080

// serve files from the public directory
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log('SERVER: / called')
    const bodyInfo = req.body
    let clickedRow = bodyInfo.row
    let clickedColumn = bodyInfo.column
    currentState = takeTurn(clickedRow, clickedColumn)
    currentState = checkWinner()
    console.log("server accessing takeTurn")
    res.send(currentState)
});

app.post('/reset', (req, res) => {
    console.log('SERVER: /reset called')
    currentState = resetGame()
    console.log("server resetting game")
    res.send(currentState)
});

app.get('/fail', (req, res) => {
    res.status(400)
    res.json({ errorMessage: "missing parameters" })
})

app.listen(PORT, () => {
    console.log(`Express server up on port: ${PORT}`)
})

