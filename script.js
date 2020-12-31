const gameBoard=(function(){
    let board=["","","","","","","","",""];

    //Find DOM's elements
    let $gridEls=$(".grid-el");




    //events
    $gridEls.click(addMark)

    //functions
    function addMark(){
        $(this).text("X")
        board[$(this).data("index")]="X"
        console.log(board)

    }


})();