# Connect4
A Connect4 game in two versions:
- Static
- RESTful API <br> <br>

Built with Node.js using the Express framework, JavaScript, HTML and CSS. <br>


## Main features developed

| Feature                          | Client-Server |     Static |
| ---------------------------------| ----------- | ------------- |
| Place pieces on Connect 4 grid   |       ✓     |        ✓     |
| Respond to click events          |       ✓     |        ✓     |
| Detect victory conditions        |       ✓     |        ✓     |
| Display victory conditions       |       ✓     |        ✓     |
| Display winner                   |       ✓     |        ✓     |
| Add Player names and declare the winner |     |        ✓     |

## Static version
Hosted in Vercel: [connect4-static.vercel.app](https://connect4-static.vercel.app/)

## Client-Server version
RESTful API with NodeJS using Express.

![gameplay gif](media/connect4game.gif)

### Install packages (generate _package-lock.json_): <br>
1. Access project's subdirectory: <br>
`cd clientserver/`

2. Install packages: <br>
`npm install`

### Launch server from command line \& start playing

3. Start server: <br>
`npm start` _(npm will run `node server.js`)_ <br>
Expected output: "Express server up on port: 8080"

4. On browser, go to `http://localhost:8080`

### Logic behind takeTurn interaction
1. [client - grid] EventListener on board grid (listens to "click"); 
2. [client - positionClick] Client click action will POST row & column;
3. [server - taketurn] Server responds with json containing the game’s updated state.

## External links
[Wikipedia - Connect Four](https://en.wikipedia.org/wiki/Connect_Four)
