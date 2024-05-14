function gameBoard(){
    //Create Initial board
    const rows = columns = 3;
    const board = [];
    const boardContainer = document.querySelector(".game-container")
    for(let colVal = 0; colVal < columns; colVal++){
        board[colVal] = [];
        let createRow = document.createElement("div");
        createRow.classList.add(`col-`+colVal);
        boardContainer.appendChild(createRow);
        for(let rowVal = 0; rowVal < rows; rowVal++){
            board[colVal].push(1);
            let createTile = document.createElement("div");
            createTile.classList.add(`row-`+rowVal);
            createRow.appendChild(createTile);
            createTile.textContent = "";
        }
    }

    return board;
}

function playGame(){
    playerOne = "Player 3";
    playerTwo = "Player 4";
    const infoContainer = document.querySelector(".info-container");
    const turn = document.querySelector(".turn-container > p")

    const board = gameBoard();
    const tiles = document.querySelectorAll(".game-container > div > div");

    const players = [
        { name: playerOne, mark: `X` },
        { name: playerTwo, mark: `O` }
    ];

    for(let player = 1; player <= 2; player++){
        let playerContainer = document.createElement("div");
        infoContainer.appendChild(playerContainer);
        playerContainer.classList.add(`player-container`);
        let playerName = document.createElement("p");
        let setName = document.createElement("button");
        playerContainer.appendChild(playerName);
        playerName.classList.add("player-name")
        setName.classList.add("set-name");
        playerName.textContent = `player ${player}: ${players[player-1].name}`;
        playerContainer.appendChild(setName);
        setName.textContent = `set ${players[player-1].name}'s name`;
    }

    let currentPlayer = players[0];

    turn.textContent = `${currentPlayer.name}'s turn`;

    const switchPlayer = function(){
        return currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const valueCompare = (valComp) => valComp == currentPlayer.mark;

    const winCon = () => {
        //row check
        let rows = columns = 3;
        for(let rowVal = 0; rowVal < rows; rowVal++){
            if(board[rowVal].every(valueCompare) == true){
                console.log(currentPlayer.name + ` wins!`);
                return 1;
            }
            else{
                continue;
            }
        }

        //col check
        let checkArr = [];
        for(let rowVal = 0; rowVal < rows; rowVal++){
            for(let colVal = 0; colVal < columns; colVal++){
                if(board[colVal][rowVal] == currentPlayer.mark){
                    checkArr.push(board[colVal][rowVal]);
                    continue;
                }
                else{
                    break;
                }
            }
            if(checkArr.length == 3){
                if(checkArr.every(valueCompare) == true){
                    console.log(currentPlayer.name + ` wins!`);
                    checkArr = [];
                    return 1;
                }
                else{
                    continue;
                }
            }
            checkArr = [];
        }

        //diagonal check
        for(let rowVal = 0; rowVal < rows; rowVal++){
            if(board[rowVal][rowVal] == currentPlayer.mark){
                checkArr.push(board[rowVal][rowVal]);
                if(checkArr.length == 3){
                    if(checkArr.every(valueCompare) == true){
                        console.log(currentPlayer.name + ` wins!`);
                        checkArr = [];
                        return 1;
                    }
                    else{
                        continue;
                    }
                }
            }
            else{
                break;
            }
        }

        //reverse diagonal
        let colVal = 2;
        checkArr = [];
        for(let rowVal = 0; rowVal < rows; rowVal++){
            if(board[rowVal][colVal] == currentPlayer.mark){
                checkArr.push(board[rowVal][colVal]);
                if(checkArr.length == 3){
                    if(checkArr.every(valueCompare) == true){
                        console.log(currentPlayer.name + ` wins!`);
                        checkArr = [];
                        return 1;
                    }
                    else{
                        continue;
                    }
                }
            }
            else{
                break;
            }
            colVal--;
        }
    };

    const fullBoard = () => {
        let checkArr = [];
        for(let rowVal = 0; rowVal < 3; rowVal++){
            for(let colVal = 0; colVal < 3; colVal++){
                checkArr.push(board[rowVal][colVal]);
            }
        }
    
        const result = checkArr.filter((marks) => marks != players[0].mark).filter((marks) => marks != players[1].mark);

        if(result.length == 0){
            return 1;
        }
    };

    const reset = () => {
        tiles.forEach((tile) => {
            tile.textContent = "";
            
        });
        for(let colVal = 0; colVal < 3; colVal++){
            for(let rowVal = 0; rowVal < 3; rowVal++){
                board[rowVal][colVal] = 1;
            }
        }
        currentPlayer = players[0];
        turn.textContent = `${currentPlayer.name}'s turn`;
    };

    const playerTurn = function(playerName, playerMark, gameBoard, arr){
        gameBoard[arr[0]][arr[1]] = playerMark;
        if(winCon() == 1){
            if (confirm(`${playerName} wins! Play again?`) == true) {
                reset();
            } 
            else{
                return;
            }
            
        }
        else{
            if(fullBoard() == 1){
                if (confirm(`It's a draw! Play again?`) == true) {
                    reset();
                } 
                else{
                    return;
                }
            }
            else{
                switchPlayer();
                turn.textContent = `${currentPlayer.name}'s turn`;
            }
        }
    };

    tiles.forEach((tile) => {
        tile.addEventListener("click", function(){
            const getValue = function(string){
                const numbers = `0123`;
                const cleanedString = string.split('').filter((character) => numbers.includes(character)).join('');
                return cleanedString;
            }
            let rowValue = getValue(this.className);
            let colValue = getValue(this.parentElement.className);
            let checkArr = [rowValue,colValue];

            if(board[checkArr[0]][checkArr[1]] == players[0].mark || board[checkArr[0]][checkArr[1]] == players[1].mark){
                alert("Grid already has a  mark.");
            }
            else{
                this.textContent = currentPlayer.mark;
                playerTurn(currentPlayer.name, currentPlayer.mark, board, checkArr);
            }
        });
    });

    const nameButton = document.querySelectorAll(".set-name");
    let nameList = [...nameButton];
    const playerNames = document.querySelectorAll(".player-name");
    let playerList = [...playerNames];
    for(let val = 0; val < nameList.length;val++){
        nameList[val].addEventListener("click",function(){
            let playerName = prompt("Enter name: ");
            players[val].name = playerName;
            playerList[val].textContent = `player ${val+1}: ${playerName}`;
            nameList[val].textContent = `set ${players[val].name}'s name`;
        });
    }
}

playGame();