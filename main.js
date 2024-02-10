
import { gameInterface } from "./modules/GameInterface.js";
import Player from "./modules/Player.js";
import Rogue from "./modules/FighterTypes/Rogue.js";
import Warrior from "./modules/FighterTypes/Warrior.js";
import Mage from "./modules/FighterTypes/Mage.js";


// TEST! Create a couple of players and start a game. 
startGame();

function startGame() {
    try {
        const gameBox = document.querySelector("#game");
        const player1 = new Player("Testare", new Mage());
        const player2 = new Player("John Doe", new Rogue());

        gameInterface.initializeGame(gameBox, player1, player2);
    }
    catch (error) {
        console.error(error);
        gameInterface.showError(error);
    }
}



