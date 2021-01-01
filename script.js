const gameBoard=(function(){
    let board=["","","","","","","","",""];

    //Find DOM's elements
    let $gridEls=$(".grid-el");
    
    



    //events
    $gridEls.click(addMark)

    //functions
    function addMark(){
        if (board[$(this).data("index")]!=""){
            return;
        }
        let marker=whoseTurn();
        $(this).text(marker)
        board[$(this).data("index")]=marker
        game.checkWin();
    }
    function whoseTurn(){
        if (game.turn==1){
            game.turn=2;
            return game.player1.placeMarker()
        }
        else{
            game.turn=1;
            return game.player2.placeMarker()
        }

    }
    function checkBoard(){
        return board;
    }
    return {checkBoard}

})();




const game=(function(){
    let turn=1;
    let P1score=0;
    let P2score=2;
    let $score=$(".scores");


    //making players
    const player=function(marker){
   
        let placeMarker=function(){
            return marker;
        }
        return{placeMarker}
    
    }
    let player1=player("X");
    let player2=player("O");



    function checkWin(){
        if (gameBoard.checkBoard()[0]=="X"&&gameBoard.checkBoard()[1]==="X"&&gameBoard.checkBoard()[2]=="X"||gameBoard.checkBoard()[3]=="X"&&gameBoard.checkBoard()[4]=="X"&&gameBoard.checkBoard()[5]=="X"||gameBoard.checkBoard()[6]=="X"&&gameBoard.checkBoard()[7]=="X"&&gameBoard.checkBoard()[8]=="X"||gameBoard.checkBoard()[0]=="X"&&gameBoard.checkBoard()[3]=="X"&&gameBoard.checkBoard()[6]=="X"||
        gameBoard.checkBoard()[1]=="X"&&gameBoard.checkBoard()[4]=="X"&&gameBoard.checkBoard()[7]=="X"||gameBoard.checkBoard()[2]=="X"&&gameBoard.checkBoard()[5]=="X"&&gameBoard.checkBoard()[8]=="X"||gameBoard.checkBoard()[0]=="X"&&gameBoard.checkBoard()[4]=="X"&&gameBoard.checkBoard()[8]=="X"||gameBoard.checkBoard()[2]=="X"&&gameBoard.checkBoard()[4]=="X"&&gameBoard.checkBoard()[6]=="X"){
            changeScore(1);
        }    
        if (gameBoard.checkBoard()[0]=="O"&&gameBoard.checkBoard()[1]==="O"&&gameBoard.checkBoard()[2]=="O"||gameBoard.checkBoard()[3]=="O"&&gameBoard.checkBoard()[4]=="O"&&gameBoard.checkBoard()[5]=="O"||gameBoard.checkBoard()[6]=="O"&&gameBoard.checkBoard()[7]=="O"&&gameBoard.checkBoard()[8]=="O"||gameBoard.checkBoard()[0]=="O"&&gameBoard.checkBoard()[3]=="O"&&gameBoard.checkBoard()[6]=="O"||
        gameBoard.checkBoard()[1]=="O"&&gameBoard.checkBoard()[4]=="O"&&gameBoard.checkBoard()[7]=="O"||gameBoard.checkBoard()[2]=="O"&&gameBoard.checkBoard()[5]=="O"&&gameBoard.checkBoard()[8]=="O"||gameBoard.checkBoard()[0]=="O"&&gameBoard.checkBoard()[4]=="O"&&gameBoard.checkBoard()[8]=="O"||gameBoard.checkBoard()[2]=="O"&&gameBoard.checkBoard()[4]=="O"&&gameBoard.checkBoard()[6]=="O"){
            changeScore(2);
        }     
    }
    function changeScore(PlayerWin){
        if(PlayerWin==1){
            P1score++;
            $score.find("#P1score").text(P1score);

        }
        if(PlayerWin==2){
            P2score++;
            $score.find("#P2score").text(P2score);

        }
    }


return {turn, player1, player2 ,checkWin}

})();







