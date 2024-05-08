function gameBoard(){
    const rows = columns = 3;
    const board = [];
    for(let rowVal = 0; rowVal < rows; rowVal++){
        board[rowVal] = [];
        for(let colVal = 0; colVal < columns; colVal++){
            board[rowVal].push(colVal);
        }
    }

    return {board};
}