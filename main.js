
import { gameInterface } from "./modules/GameInterface.js";
import Game from "./modules/Game.js";
import Player from "./modules/Player.js";
import Spellblade from "./modules/FighterTypes/Spellblade.js";
import Warrior from "./modules/FighterTypes/Warrior.js";
import Mage from "./modules/FighterTypes/Mage.js";


gameInterface.initialize(document.querySelector("#game"));

const outBox = document.querySelector("#test");
const player1 = new Player("Testare", new Mage());
const player2 = new Player("John Doe", new Spellblade());
const game = new Game(player1, player2, outBox);

game.doGameTurn();
