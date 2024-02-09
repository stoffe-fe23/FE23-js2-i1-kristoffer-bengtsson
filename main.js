
import { gameInterface } from "./modules/GameInterface.js";
import Game from "./modules/Game.js";
import Player from "./modules/Player.js";
import Rogue from "./modules/FighterTypes/Rogue.js";
import Warrior from "./modules/FighterTypes/Warrior.js";
import Mage from "./modules/FighterTypes/Mage.js";


// TEST! Create a couple of players and start a game. 
try {
    gameInterface.initialize(document.querySelector("#game"));

    const player1 = new Player("Testare", new Mage());
    const player2 = new Player("John Doe", new Rogue());
    const game = new Game(player1, player2);


    game.nextPlayerTurn();
}
catch (error) {
    console.error(error);
    gameInterface.showError(error);
}



