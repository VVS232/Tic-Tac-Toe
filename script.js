const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  function resetBoard(){
    board=["", "", "", "", "", "", "", "", ""]
  }
  //Find DOM's elements
  let $gridEls = $(".grid-el");

  //events
  $gridEls.click(addMark);

  //functions
  function addMark() {
    if (board[$(this).data("index")] != "") {
      return;
    }

    let marker = whoseTurn();

    $(this).text(marker);
    board[$(this).data("index")] = marker;

    game.checkWin();
    if(game.opponent=="weakAI"){
      weakAI.makeMove()
    }
    if(game.opponent=="strongAI")
    strongAI.makeMove();
  }
  function whoseTurn() {
    if (game.turn == 1) {
      game.turn = 2;
      return game.player1.placeMarker();
    } else {
      game.turn = 1;
      return game.player2.placeMarker();
    }
  }
  function checkBoard() {
    return board;
  }
  return { checkBoard, $gridEls, resetBoard };
})();



const game = (function () {
  
  let turn = 1;
  let P1score = 0;
  let P2score = 0;
  let opponent=null;




  //DOM
  let $score = $(".scores");
  let $opponents=$("#opponents");
  let $game=$("#game");
  $game.hide();
  $opponents.find(".opponent").click(chooseOpp);
  $opponents.find("#start").click(startGame);
  let $restart=$("#restart");
  $restart.find("#again").click(startGame);
  $restart.hide();
  $restart.find("#changeOpp").click(changeOpp);


  //making players
  const player = function (marker) {
    let placeMarker = function () {
      return marker;
    };
    return { placeMarker };
  };
  let player1 = player("X");
  let player2 = player("O");

  function checkWin() {
    if (
      (gameBoard.checkBoard()[0] == "X" &&
        gameBoard.checkBoard()[1] === "X" &&
        gameBoard.checkBoard()[2] == "X") ||
      (gameBoard.checkBoard()[3] == "X" &&
        gameBoard.checkBoard()[4] == "X" &&
        gameBoard.checkBoard()[5] == "X") ||
      (gameBoard.checkBoard()[6] == "X" &&
        gameBoard.checkBoard()[7] == "X" &&
        gameBoard.checkBoard()[8] == "X") ||
      (gameBoard.checkBoard()[0] == "X" &&
        gameBoard.checkBoard()[3] == "X" &&
        gameBoard.checkBoard()[6] == "X") ||
      (gameBoard.checkBoard()[1] == "X" &&
        gameBoard.checkBoard()[4] == "X" &&
        gameBoard.checkBoard()[7] == "X") ||
      (gameBoard.checkBoard()[2] == "X" &&
        gameBoard.checkBoard()[5] == "X" &&
        gameBoard.checkBoard()[8] == "X") ||
      (gameBoard.checkBoard()[0] == "X" &&
        gameBoard.checkBoard()[4] == "X" &&
        gameBoard.checkBoard()[8] == "X") ||
      (gameBoard.checkBoard()[2] == "X" &&
        gameBoard.checkBoard()[4] == "X" &&
        gameBoard.checkBoard()[6] == "X")
    ) {
      changeScore(1);
    }
    if (
      (gameBoard.checkBoard()[0] == "O" &&
        gameBoard.checkBoard()[1] === "O" &&
        gameBoard.checkBoard()[2] == "O") ||
      (gameBoard.checkBoard()[3] == "O" &&
        gameBoard.checkBoard()[4] == "O" &&
        gameBoard.checkBoard()[5] == "O") ||
      (gameBoard.checkBoard()[6] == "O" &&
        gameBoard.checkBoard()[7] == "O" &&
        gameBoard.checkBoard()[8] == "O") ||
      (gameBoard.checkBoard()[0] == "O" &&
        gameBoard.checkBoard()[3] == "O" &&
        gameBoard.checkBoard()[6] == "O") ||
      (gameBoard.checkBoard()[1] == "O" &&
        gameBoard.checkBoard()[4] == "O" &&
        gameBoard.checkBoard()[7] == "O") ||
      (gameBoard.checkBoard()[2] == "O" &&
        gameBoard.checkBoard()[5] == "O" &&
        gameBoard.checkBoard()[8] == "O") ||
      (gameBoard.checkBoard()[0] == "O" &&
        gameBoard.checkBoard()[4] == "O" &&
        gameBoard.checkBoard()[8] == "O") ||
      (gameBoard.checkBoard()[2] == "O" &&
        gameBoard.checkBoard()[4] == "O" &&
        gameBoard.checkBoard()[6] == "O")
    ) {
      changeScore(2);
    }
    if(!gameBoard.checkBoard().includes("")){
      changeScore(3);
    }
  }
  function changeScore(PlayerWin) {
    if (PlayerWin == 1) {
      P1score++;
      $score.find("#P1score").text(P1score);
      $restart.show();
      $restart.find("#winner").text("You won. Play again?")

    }
    if (PlayerWin == 2) {
      P2score++;
      $score.find("#P2score").text(P2score);
      $restart.show();
      $restart.find("#winner").text("You lose. Play again?")
    }
    if (PlayerWin==3){
      $restart.show();
      $restart.find("#winner").text("That's tie. Play again?")
    }
    endGame();
  }

function startGame(){
  gameBoard.resetBoard();
  gameBoard.$gridEls.text("");
  $restart.hide();
  if(game.opponent!=null){
  $("#prepare").hide();
  $game.fadeIn();
  gameBoard.$gridEls.click(gameBoard.addMark)
  gameBoard.$gridEls.css('pointer-events', 'initial')
  }
}

  function endGame() {
    gameBoard.$gridEls.css('pointer-events', 'none')
    //gameBoard.$gridEls.off(gameBoard.addMark);

  }

  function chooseOpp(){
    game.opponent=this.value;
  }
  function changeOpp(){
    $game.hide();
    $("#prepare").fadeIn();
    
  }

  return { turn, player1, player2, checkWin,opponent };
})();



const weakAI = (function () {
  function makeMove() {
    if (game.turn == 2) {
      let index;
      index = Math.floor(Math.random() * 9);
      if ($("#el" + index).text() == "") {
        $("#el" + index).click();
      } else {
        makeMove();
      }
    }
  }
  return { makeMove };
})();


const strongAI = (function () {
  let counter = 1; // number of round
  let board = gameBoard.checkBoard;

  function makeMove() {
    if (game.turn == 2) {
      switch (counter) {
        case 1: //round 1
          //checking center
          if (board()[4] == "") {
            $("#el4").click();
            counter++;
            return;
          } else {
            $("#el0").click();
            counter++;
            return;
          }
        case 2: //round 2
        for (let i = 0; i < 8; i++) {
          //checking for doubles in rows
          if ([2, 5].includes(i)) {

            continue;
          }
          if (board()[i] == "X" && board()[i + 1] == "X") {
            if ([0, 3, 6].includes(i)) {
              if (board()[i+2]=="O"){
                continue;
              }
              $(`#el${i + 2}`).click();

              counter++;
              return;
            } else {
              if (board()[i-1]=="O"){
                continue;
              }
              $(`#el${i - 1}`).click();
              counter++;
              return;
            }
          } else if (board()[i] == "X" && board()[i + 2] == "X") {
            if (i==4||board()[i+1]=="O"){
              continue;
            }
            $(`#el${i + 1}`).click();
            counter++;
          return;
          }
        } // end checking rows

        //checking columns
        for (let i = 0; i < 3; i++) {
          for (let j = i; j < i + 7; j += 3) {
            if ([6, 7, 8].includes(j)) {
              continue;
            }
            if (board()[j] == "X" && board()[j + 3] == "X") {
              if ([0, 1, 2].includes(j)) {
                if (board()[j+6]=="O"){
                  continue;
                }
                $(`#el${j + 6}`).click();
                counter++;
                return;
              } else {
                if (board()[j-3]=="O"){
                  continue;
                }
                $(`#el${j - 3}`).click();
                counter++;
                return;
              }
            }
            else if (board()[j] == "X" && board()[j + 6] == "X"){
              if (board()[j+3]=="O"){
                continue;
              }
              $(`#el${j + 3}`).click();
              counter++;
          return;

            }
          }
        } //stop checking columns

        //checking diagonals
        if (board()[0] == "X" && board()[4] == "X") {
          if (board()[8]!="O"){
            $(`#el8`).click();
            counter++;
            return;            }
          
        } else if (board()[2] == "X" && board()[4] == "X") { 
          if (board()[6]!="O"){
            $(`#el6`).click();
          counter++;
          return;;
          }
          
        } else if (board()[6] == "X" && board()[4] == "X") { 
          if (board()[2]!="O"){
            $(`#el2`).click();
          counter++;
          return;;
          }
          
        } else if (board()[8] == "X" && board()[4] == "X") {
          if (board()[0]!="O"){
            $(`#el0`).click();
          counter++;
          return;;
          }
          
        }
        else{               
if (board()[3]==""){
          $("#el3").click();
          counter++;
          return;
}
else{
  if (board()[5]==""){
    $("#el5").click();
    counter++;
    return;
}
if (board()[1]==""){
  $("#el1").click();
  counter++;
  return;
}
if (board()[7]==""){
  $("#el7").click();
  counter++;
  return;
}
}
        } //end checking diagonals

        case 3:
          for (let i = 0; i < 8; i++) {
            //checking for doubles in rows
            if ([2, 5].includes(i)) {
              continue;
            }
            if (board()[i] == "X" && board()[i + 1] == "X"||board()[i] == "O" && board()[i + 1] == "O") {
              if ([0, 3, 6].includes(i)) {
                if (board()[i+2]!=""){
                  continue;
                }
                $(`#el${i + 2}`).click();
                counter++;
                return;
              } else {
                if (board()[i-1]!=""){
                  continue;
                }
                $(`#el${i - 1}`).click();
                counter++;
                return;
              }
            } else if (board()[i] == "X" && board()[i + 2] == "X"||board()[i] == "O" && board()[i + 2] == "O") {
              if (i==4||board()[i+1]!=""||[1,5].includes(i)){
                continue;
              }
              if (board()[0]=="X" && board()[2]=="X"||board()[0]=="O" && board()[2]=="O"){
                if (board()[5]!=""){
                  continue;
                }
                $("#el5").click();
                counter++;
            return;
              }
              if (board()[i+1]!=""){
                continue;
              }
              $(`#el${i + 1}`).click();
              counter++;
            return;
            }
          } // end checking rows

          //checking columns
          for (let i = 0; i < 3; i++) {
            for (let j = i; j < i + 7; j += 3) {
              if ([6, 7, 8].includes(j)) {
                continue;
              }
              if (board()[j] == "X" && board()[j + 3] == "X"||board()[j] == "O" && board()[j + 3] == "O") {
                if ([0, 1, 2].includes(j)) {
                  if (board()[j+6]!=""){
                    continue;
                  }
                  $(`#el${j + 6}`).click();
                  counter++;
                  return;
                } else {
                  if (board()[j-3]!=""){
                    continue;
                  }
                  $(`#el${j - 3}`).click();
                  counter++;
                  return;
                }
              }
              else if (board()[j] == "X" && board()[j + 6] == "X"||board()[j] == "O" && board()[j + 6] == "O"){
                if (board()[j+3]!=""){
                  continue;
                }
                $(`#el${j + 3}`).click();
                counter++;
            return;

              }
            }
          } //stop checking columns

          //checking diagonals
          if (board()[0] == "X" && board()[4] == "X"||board()[0] == "O" && board()[4] == "O") {
            if (board()[8]==""){
              $(`#el8`).click();
              counter++;
              return;            }
            
          } else if (board()[2] == "X" && board()[4] == "X"||board()[2] == "O" && board()[4] == "O") {
            if (board()[6]==""){
              $(`#el6`).click();
            counter++;
            return;;
            }
            
          } else if (board()[6] == "X" && board()[4] == "X"||board()[6] == "O" && board()[4] == "O") {
            if (board()[2]==""){
              $(`#el2`).click();
            counter++;
            return;;
            }
            
          } else if (board()[8] == "X" && board()[4] == "X"||board()[8] == "O" && board()[4] == "O") {
            if (board()[0]==""){
              $(`#el0`).click();
            counter++;
            return;;
            }
            
          } //end checking diagonals
         // $(`#el${Math.floor(Math.random() * 9)}`).click();

          case 4:
            for (let i = 0; i < 8; i++) {
              //checking for doubles in rows
              if ([2, 5].includes(i)) {
                continue;
              }
              if (board()[i] == "X" && board()[i + 1] == "X"||board()[i] == "O" && board()[i + 1] == "O") {
                if ([0, 3, 6].includes(i)) {
                  if (board()[i+2]!=""){
                    continue;
                  }
                  $(`#el${i + 2}`).click();
                  counter++;
                  return;
                } else {
                  if (board()[i-1]!=""){
                    continue;
                  }
                  $(`#el${i - 1}`).click();
                  counter++;
                  return;
                }
              } else if (board()[i] == "X" && board()[i + 2] == "X"||board()[i] == "O" && board()[i + 2] == "O") {
                if (i==4||board()[i+1]!=""||[1,5].includes(i)){
                  continue;
                }

                if (board()[i+1]!=""){
                  continue;
                }
                $(`#el${i + 1}`).click();
                counter++;
              return;
              }
            } // end checking rows
  
            //checking columns
            for (let i = 0; i < 3; i++) {
              for (let j = i; j < i + 7; j += 3) {
                if ([6, 7, 8].includes(j)) {
                  continue;
                }
                if (board()[j] == "X" && board()[j + 3] == "X"||board()[j] == "O" && board()[j + 3] == "O") {
                  if ([0, 1, 2].includes(j)) {
                    if (board()[j+6]!=""){
                      continue;
                    }
                    $(`#el${j + 6}`).click();
                    counter++;
                    return;
                  } else {
                    if (board()[j-3]!=""){
                      continue;
                    }
                    $(`#el${j - 3}`).click();
                    counter++;
                    return;
                  }
                }
                else if (board()[j] == "X" && board()[j + 6] == "X"||board()[j] == "O" && board()[j + 6] == "O"){
                  if (board()[j+3]!=""){
                    continue;
                  }
                  $(`#el${j + 3}`).click();
                  counter++;
              return;
  
                }
              }
            } //stop checking columns
  
            //checking diagonals
            if (board()[0] == "X" && board()[4] == "X"||board()[0] == "O" && board()[4] == "O") {
              if (board()[8]==""){
                $(`#el8`).click();
                counter++;
                return;            }
              
            } else if (board()[2] == "X" && board()[4] == "X"||board()[2] == "O" && board()[4] == "O") {
              if (board()[6]==""){
                $(`#el6`).click();
              counter++;
              return;;
              }
              
            } else if (board()[6] == "X" && board()[4] == "X"||board()[6] == "O" && board()[4] == "O") {
              if (board()[2]==""){
                $(`#el2`).click();
              counter++;
              return;;
              }
              
            } else if (board()[8] == "X" && board()[4] == "X"||board()[8] == "O" && board()[4] == "O") {
              if (board()[0]==""){
                $(`#el0`).click();
              counter++;
              return;;
              }
              
            } //end checking diagonals
            default: let index = Math.floor(Math.random() * 9);
            if ($("#el" + index).text() == "") {
              $("#el" + index).click();
              counter++;
              return;
            } else {
              makeMove();
            }

      }
    }
  }
  return { makeMove };
})();
