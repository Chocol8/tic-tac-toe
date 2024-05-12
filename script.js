function gameBoard(){
    //Create Initial board
    const rows = columns = 3;
    const board = [];
    for(let rowVal = 0; rowVal < rows; rowVal++){
        board[rowVal] = [];
        for(let colVal = 0; colVal < columns; colVal++){
            board[rowVal].push(1);
        }
    }

    return board;
}

function playGame(){
    //Set player names
    playerOne = "Player One";
    playerTwo = "Player Two";

    //Initialize tic tac toe board
    const board = gameBoard();

    //Create players
    const players = [
        { name: playerOne, mark: `X` },
        { name: playerTwo, mark: `O` }
    ];

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

    const playerTurn = function(playerName, playerMark, gameBoard){
        console.log(playerName + `'s turn`);
        let row = prompt("Input row number from 1 - 3: ");
        if(row >= 1 && row <= 3){
            let col = prompt("Input col number from 1 - 3: ");
            if(col >= 1 && col <= 3){
                if(gameBoard[row-1][col-1] == players[0].mark || gameBoard[row-1][col-1] == players[1].mark){
                    alert("Grid already has a  mark.");
                    playerTurn(playerName, playerMark, gameBoard);
                }
                else{
                    gameBoard[row-1][col-1] = playerMark;
                    if(winCon() == 1){
                        confirm("Play again?");
                        if (confirm(text) == true) {
                            playGame();
                          } else {
                            return;
                          }
                        
                    }
                    else{
                        const newPlayer = switchPlayer();
                        console.log(gameBoard);
                        playerTurn(newPlayer.name, newPlayer.mark, gameBoard);
                    }
                }
            }
            else{
                alert("Wrong col value");
            }   
        }
        else{
            alert("Wrong row value");
        }
    };

    playerTurn(currentPlayer.name, currentPlayer.mark, board);
}

playGame();