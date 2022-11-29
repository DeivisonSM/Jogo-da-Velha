const gameModeButtons = document.querySelectorAll(".menu__button");
const startGameButton = document.querySelector("#start-game-button");

const inputsPlayerName = document.querySelectorAll(".settings__player-name");
const buttonsPlayerIcon = document.querySelectorAll(".settings__player-icons");
const allIconButtons = document.querySelectorAll(".settings__icon-button");

const boardCells = document.querySelectorAll(".board__cell");

let currentContainer = 0;

function changeSection(){
    const pageContainers = document.querySelectorAll(".container__single");
    
    let previousContainer = currentContainer - 1 < 0 ? pageContainers.length - 1 : currentContainer - 1;
    let nextContainer = currentContainer + 1 >= pageContainers.length ? 0 : currentContainer + 1;
    
    pageContainers[previousContainer].classList.remove("container__single--waiting");

    pageContainers[currentContainer].classList.remove("container__single--active");
    pageContainers[currentContainer].classList.add("container__single--waiting");

    pageContainers[nextContainer].classList.add("container__single--active");

    currentContainer = nextContainer;
};

function attButtonsIconStyle(){
    allIconButtons.forEach((button)=>{
        button.classList.remove("settings__icon-button--active");
    });

    if(game.ready){
        const iconButtonPlayer1 = buttonsPlayerIcon[0].children[game.players[0].icon];
        const iconButtonPlayer2 = buttonsPlayerIcon[1].children[game.players[1].icon];

        iconButtonPlayer1.classList.add("settings__icon-button--active");
        iconButtonPlayer2.classList.add("settings__icon-button--active");
    };
};

function attStartGameButtonStyle(){
    if(game.ready)
        startGameButton.classList.add("settings__button--active");
    else
        startGameButton.classList.remove("settings__button--active");
};

function getPlayersNames(){
    inputsPlayerName.forEach((input, index)=>{
        setPlayerName(input.value, index);
    });
};

function attScoreboard(){
    const player1Name = document.querySelector("#scoreboard-player1 > .game__player-name");
    const player2Name = document.querySelector("#scoreboard-player2 > .game__player-name");
    const player1Score = document.querySelector("#scoreboard-player1 > .game__player-score");
    const player2Score = document.querySelector("#scoreboard-player2 > .game__player-score");

    function attScoreboardStyle(){
        player1Name.style.color = `var(--icon-${game.players[0].icon}-color)`;
        player2Name.style.color = `var(--icon-${game.players[1].icon}-color)`;
    };

    player1Name.innerText = game.players[0].name;
    player2Name.innerText = game.players[1].name;
    player1Score.innerText = game.players[0].score;
    player2Score.innerText = game.players[1].score;

    attScoreboardStyle();
};

function attPlayerTurnStyle(){
    const scoreboardsPlayers = document.querySelectorAll(".game__scoreboard-player");

    scoreboardsPlayers.forEach((scoreboard)=>{
        scoreboard.classList.remove("game__scoreboard-player--active");
    });

    scoreboardsPlayers[game.playerTurn].classList.add("game__scoreboard-player--active");
};

gameModeButtons.forEach((button, index)=>{
    button.addEventListener("click",()=>{
        setPlayersType(index);
        changeSection();
    });
});

buttonsPlayerIcon.forEach((buttons, index)=>{
    buttons = [...buttons.children];

    buttons.forEach((button, icon)=>{
        button.addEventListener("click",()=>{
            setPlayerIcon(icon, index);
            setGameReady();
            attButtonsIconStyle();
            attStartGameButtonStyle();
        });
    });
});

startGameButton.addEventListener("click", ()=>{
    if(game.ready){
        getPlayersNames();
        changeSection();
        attScoreboard();
        attPlayerTurnStyle();
    }else{
        allIconButtons.forEach((button)=>{
            button.classList.remove("settings__icon-button--error");

            setTimeout(()=>{
                button.classList.add("settings__icon-button--error");
            }, 5);
        });
    };
});


/*******/ 

function resetGame(){
    game.players.forEach((player)=>{player.score = 0});
    game.ready = false;
    game.playerTurn = 0;
};

function resetInterface(){
    attButtonsIconStyle();
    attStartGameButtonStyle();
    inputsPlayerName.forEach((input)=>{
        input.value = "";
    });
};

function resetBoard(){
    game.board = game.board.map(position => "");
    game.gameOver = false;
    game.endRoundInfo.name = "";
    game.endRoundInfo.winnerPositions = [];
    game.endRoundInfo.tie = false;
};