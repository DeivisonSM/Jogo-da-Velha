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

    ready: false,

    playerTurn: 0

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