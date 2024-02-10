
import { createHTMLElement } from './utilities.js';
import Game from "./Game.js";

class GameInterface {
    #game;
    #parentElement;
    #messagesElement;
    #errorsElement;
    #playerElements;
    #playerOne;
    #playerTwo;
    #playerIndicator;

    constructor() {

    }

    ///////////////////////////////////////////////////////////////////////////////
    // Build the game interface inside the specified element: 
    // one box for each player and boxes for messages and errors
    initializeGame(parentElement, player1, player2) {
        this.#parentElement = parentElement;
        parentElement.innerHTML = '';
        this.#playerElements = createHTMLElement('div', '', this.#parentElement, 'game-players', { id: "players" });
        this.#messagesElement = createHTMLElement('div', '', this.#parentElement, 'game-messages', { id: "messages" });
        this.#errorsElement = createHTMLElement('div', '', this.#parentElement, 'game-errors', { id: "errors" });

        this.#playerOne = createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-1` });
        this.#playerIndicator = createHTMLElement('div', ' ► ', this.#playerElements, 'game-player-indicator', { id: `player-indicator` });
        this.#playerTwo = createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-2` });

        this.#game = new Game(player1, player2);
        this.#game.nextPlayerTurn();
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Set which player should be marked as the current player on the UI
    setCurrentPlayer(playerNumber) {
        if (playerNumber == 1) {
            this.#playerIndicator.innerText = "►";
            this.#playerOne.classList.add("activeplayer");
            this.#playerTwo.classList.remove("activeplayer");
        }
        else {
            this.#playerIndicator.innerText = "◄";
            this.#playerOne.classList.remove("activeplayer");
            this.#playerTwo.classList.add("activeplayer");
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Set the color of the player's avatar box
    setPlayerColor(playerNumber, playerStyle) {
        if (playerNumber == 1) {
            this.#playerOne.classList.add(playerStyle);
        }
        else {
            this.#playerTwo.classList.add(playerStyle);
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the HTML element box for the player with the specified ID
    getPlayerElement(playerIdx) {
        return this.#playerElements.querySelector(`#player-${playerIdx}`);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Show a message to the player
    showMessage(messageText) {
        this.#messagesElement.prepend(createHTMLElement('div', messageText, null, 'game-message', null, true));
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Show an error to the player
    showError(errorText) {
        this.#errorsElement.prepend(createHTMLElement('div', errorText, null, 'game-error', null, true));
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Show some kind of screen when the game is over, declaring the winner. 
    showGameOverScreen(winnerName) {
        const gameoverBox = createHTMLElement('dialog', '', document.body, 'game-over', { id: "gameover" });
        createHTMLElement('h2', 'Game Over', gameoverBox, 'game-over-title', { id: "gameover-title" });
        createHTMLElement('div', `${winnerName} is victorious!`, gameoverBox, 'game-over-text', { id: "gameover-text" });

        const restartButton = createHTMLElement('button', 'OK', gameoverBox, 'game-over-button', { id: "gameover-button" });
        restartButton.addEventListener("click", (event) => {
            gameoverBox.close();
            gameoverBox.remove();
        });

        gameoverBox.showModal();
    }
}


// Create gameInterface global object for use elsewhere. 
const gameInterface = new GameInterface();

export { GameInterface, gameInterface };