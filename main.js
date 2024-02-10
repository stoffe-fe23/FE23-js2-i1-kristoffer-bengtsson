
import gameInterface from "./modules/GameInterface.js";


// TEST! Create a couple of players and start a game. 
newGame();

function newGame() {
    try {
        const gameBox = document.querySelector("#game");
        /*       
                const player1 = { name: "Testare", type: "mage" };
                const player2 = { name: "John Doe", type: "rogue" };
        
                gameInterface.startGame(gameBox, player1, player2);
        */
        gameInterface.newGame();
    }
    catch (error) {
        console.error(error);
        gameInterface.showError(error);
    }
}



