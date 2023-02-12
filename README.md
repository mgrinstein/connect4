# Connect4
RESTful API with Node.js and Express to play a Connect4 game.
Repo also contains a previous version of the game (not structured as client-server).
Built with HTML, CSS, and JavaScript.

## Features developed

| Feature                          | Client-Server |     Local |
| ---------------------------------| ----------- | ------------- |
| Place pieces on Connect 4 grid   |       ✓     |        ✓     |
| Respond to click events          |       ✓     |        ✓     |
! Detect victory conditions        |       ✓     |        ✓     |
| Display victory conditions       |       ✓     |        ✓     |
| Display winner                   |       ✓     |        ✓     |
| Add Player names and declare the winner |  ✓   |        ✓     |
| Unit testing                     |             |        ✓     |

## Client-Server 
RESTful API with NodeJS using Express.

### Launch server from command line \& start playing
1. Access project's subdirectory: <br>
`cd clientserver/`

2. Set up npm package: <br>
`npm init` _(input values or accept default)_

3. Start server: <br>
`npm start` _(npm will run `node server.js`)_ <br>
Expected output: "Express server up on port: 8080"

4. On browser, go to `http://localhost:8080/connect4`

### Logic behind takeTurn interaction
1. [client - grid] EventListener on board grid (listens to "click"); 
2. [client - positionClick] Client click action will POST row & column;
3. [server - taketurn] Server responds with json containing the game’s updated state.

## External links
[Wikipedia - Connect Four](https://en.wikipedia.org/wiki/Connect_Four)