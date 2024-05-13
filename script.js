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
    //Set player names
    playerOne = "Player 1";
    playerTwo = "Player 2";
    const infoContainer = document.querySelector(".info-container");

    //Initialize tic tac toe board
    const board = gameBoard();
    const tiles = document.querySelectorAll(".game-container > div > div");

    //Create players
    const players = [
        { name: playerOne, mark: `X` },
        { name: playerTwo, mark: `O` }
    ];

    for(player in players){
        let playerContainer = document.createElement("div");
        infoContainer.appendChild(playerContainer);
        playerContainer.classList.add(`player-container`);
        let playerName = document.createElement("p");
        let playerScore = document.createElement("p");
        playerContainer.appendChild(playerName);
        playerContainer.appendChild(playerScore);
        playerName.textContent = players[player].name;
        playerScore.textContent = `Score: 0`;
    }

    //get currentPlayer
    let currentPlayer = players[0];

    const switchPlayer = function(){
        if(currentPlayer === players[0]){
            currentPlayer = players[1];
        }
        else{
            currentPlayer = players[0];
        }
        return currentPlayer;
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
                continue;
            }
            else{
                break;
            }
        }

        //reverse diagonal
        for(let rowVal = 2; rowVal > -1; rowVal--){
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
                continue;
            }
            else{
                break;
            }
        }
    };

    const playerTurn = function(playerName, playerMark, gameBoard, arr){
        gameBoard[arr[0]][arr[1]] = playerMark;
        if(winCon() == 1){
            if (confirm(`${playerName} wins! Play again?`) == true) {
                playGame();
            } 
            else{
                return;
            }
            
        }
        else{
            switchPlayer();
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
}

playGame();