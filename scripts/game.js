const game = {
    players: [
        {
            name: "",
            type: "",
            icon: "",
            score: 0
        },
        {
            name: "",
            type: "",
            icon: "",
            score: 0
        }
    ],

    board: ["","","","","","","","",""],

    winnerPositions: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    ready: false,

    playerTurn: 0,

    firstPlayerTurn: 0,

    gameOver: false,

    endRoundInfo: {
        name: "",
        winnerPositions: [],
        tie: false,
    }

};

function setPlayersType(gameMode){
    switch (gameMode){
        case 0:
            game.players[0].type = "player";
            game.players[1].type = "player";
            break;
        case 1:
            game.players[0].type = "player";
            game.players[1].type = "computer";
            break;
        case 2:
            game.players[0].type = "computer";
            game.players[1].type = "computer";    
            break; 
    };
};

function setPlayerIcon(icon, player){
    const anotherIcon = icon === 0 ? 1 : 0;
    const anotherPlayer = player === 0 ? 1 : 0;

    game.players[player].icon = icon;
    game.players[anotherPlayer].icon = anotherIcon;
};  

function setPlayerName(playerName, player){
    playerName = playerName.replace(/\s{2,}/g, ' ').trim();
    
    if(playerName.length > 0)
       game.players[player].name = playerName;
    else
        game.players[player].name = `Jogador ${player + 1}`;  
};

function setGameReady(){
    game.ready = true;
}

function canHandleMove(cell){    
    if(game.board[cell] === "" && !game.gameOver){
        handleMove(cell);
        return true;
    }else{
        return false;
    };
};

function handleMove(cell){
    game.board[cell] = game.players[game.playerTurn].icon;
    verifyWinner();
    
    if(!game.gameOver)
        verifyTie();
};

function verifyWinner(){
    game.winnerPositions.forEach((positions)=>{
       if(game.board[positions[0]] === game.players[game.playerTurn].icon &&
       game.board[positions[1]] === game.players[game.playerTurn].icon &&
       game.board[positions[2]] === game.players[game.playerTurn].icon){
            game.gameOver = true;
            game.players[game.playerTurn].score++;
            game.endRoundInfo.name = game.players[game.playerTurn].name;
            game.endRoundInfo.winnerPositions = [positions[0], positions[1], positions[2]];
            return;
       };
    });
};

function verifyTie(){
    game.gameOver = true;
    game.endRoundInfo.tie = true;

    game.board.forEach((position)=>{
        if(position === ""){
            game.gameOver = false;
            game.endRoundInfo.tie = false;
            return;
        };
    });
};

function changePlayerTurn(){
    game.playerTurn = game.playerTurn === 0 ? 1 : 0;
};

function computerMove(){
    let aux = false;
    let randomMove;

    while(!aux){
        randomMove = Math.floor(Math.random() * game.board.length);
        if(game.board[randomMove] === ""){
            aux = true;
            return randomMove;
        };
    };
};

function resetBoard(){
    game.board = game.board.map(position => "");
    game.gameOver = false;
    game.endRoundInfo.name = "";
    game.endRoundInfo.winnerPositions = [];
    game.endRoundInfo.tie = false;
};

function resetGame(){
    game.players.forEach((player)=>{player.score = 0});
    game.ready = false;
    game.playerTurn = 0;

    resetBoard();
};