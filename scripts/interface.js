const gameModeButtons = document.querySelectorAll(".menu__button");
const startGameButton = document.querySelector("#start-game-button");
const restartGameButton = document.querySelector("#restart-game-button");
const backMenubutton = document.querySelector("#back-menu-button");

const inputsPlayerName = document.querySelectorAll(".settings__player-name");
const buttonsPlayerIcon = document.querySelectorAll(".settings__player-icons");
const allIconButtons = document.querySelectorAll(".settings__icon-button");

const boardCells = document.querySelectorAll(".board__cell");

let currentContainer = 0, blockedClick = true, computerMoveTimeout;

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

    player1Name.innerText = game.players[0].name;
    player2Name.innerText = game.players[1].name;
    player1Score.innerText = game.players[0].score;
    player2Score.innerText = game.players[1].score;

    player1Name.style.color = `var(--icon-${game.players[0].icon}-color)`;
    player2Name.style.color = `var(--icon-${game.players[1].icon}-color)`;
};

function attPlayerTurnStyle(){
    const scoreboardsPlayers = document.querySelectorAll(".game__scoreboard-player");

    scoreboardsPlayers.forEach((scoreboard)=>{
        scoreboard.classList.remove("game__scoreboard-player--active");
    });

    scoreboardsPlayers[game.playerTurn].classList.add("game__scoreboard-player--active");
};

function verifyPlayerType(){
    if(game.players[game.playerTurn].type === "player"){
        blockedClick = false;
    }else{
        blockedClick = true;
        computerMoveTimeout = setTimeout(()=>{handleClick(computerMove())}, 1000);
    };
};

function handleClick(position){
    if(canHandleMove(position)){
        addIconOnCell(boardCells[position]);
        finishMove();
    }else{
        cellError(boardCells[position]);
    }; 
};

function finishMove(){
    if(!game.gameOver){
        changePlayerTurn();
        attPlayerTurnStyle();
        verifyPlayerType();
    }else{
        attScoreboard();
        endGameAnimation();
        attEndGameInfo();
        changeBoard();
    };
};

function addIconOnCell(cell){
    const icon = verifyIcon();
    cell.appendChild(icon);
};

function cellError(cell){
    cell.classList.remove("board__cell--error");

    setTimeout(()=>{
        cell.classList.add("board__cell--error");
    }, 5);
};

function endGameAnimation(){    
    if(!game.winnerInfo.tie && game.gameOver){
        game.winnerInfo.winnerPositions.forEach((position)=>{
            boardCells[position].classList.add("board__cell--end-game");
        });
    }else if(game.winnerInfo.tie && game.gameOver){
        boardCells.forEach((cell)=>{
            cell.classList.add("board__cell--end-game");
        });
    }else{
        boardCells.forEach((cell)=>{
            cell.classList.remove("board__cell--end-game");
        });
    };
};

function attEndGameInfo(){
    const endGameTitle = document.querySelector("#board-end-game > .board__title");
    const endGameInfo = document.querySelector("#board-end-game > .board__info");
    
    if(game.winnerInfo.tie){
        endGameTitle.innerText = "Deu Velha!";
        endGameTitle.style.borderColor = "var(--fourth-page-color)";
        endGameInfo.innerText = "Jogadores empataram";
    }else{
        endGameTitle.innerText = "Vencedor!";
        endGameTitle.style.borderColor = `var(--icon-${game.players[game.playerTurn].icon}-color)`;
        endGameInfo.innerText = `${game.winnerInfo.name} ganhou!`;
    };
};

function changeBoard(){
    const board = document.querySelector("#board");
    
    if(game.gameOver){
        board.classList.remove("board--no-active");
        board.classList.add("board--active");
        boardCells.forEach((cell)=>{
            cell.style.pointerEvents = "none";
        });
    }else{
        board.classList.add("board--no-active");
        board.classList.remove("board--active");
        boardCells.forEach((cell)=>{
            cell.style.pointerEvents = "auto";
        });
    };
};

function resetBoardInterface(){
    blockedClick = true;
    boardCells.forEach((cell)=>{cell.innerHTML = ""});
    endGameAnimation();
    changeBoard();
};

function resetInterface(){
    clearTimeout(computerMoveTimeout);
    inputsPlayerName.forEach((input)=>{input.value = "";});
    attButtonsIconStyle();
    attStartGameButtonStyle();
}

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
        verifyPlayerType();
    }else{
        allIconButtons.forEach((button)=>{
            button.classList.remove("settings__icon-button--error");

            setTimeout(()=>{
                button.classList.add("settings__icon-button--error");
            }, 5);
        });
    };  
});

boardCells.forEach((cell, index)=>{
    cell.addEventListener("click", ()=>{
        if(!blockedClick)
            handleClick(index);
    });
});

restartGameButton.addEventListener("click",()=>{
    changeFirstPlayerTurn();
    attPlayerTurnStyle();
    resetBoard();
    resetBoardInterface();
    verifyPlayerType();
});

backMenubutton.addEventListener("click",()=>{
    resetBoard();
    resetGame();
    resetBoardInterface();
    resetInterface();
    changeSection();
});