
import { createHTMLElement, getIsValidObject } from './utilities.js';

class GameInterface {
    #parentElement;
    #messagesElement;
    #errorsElement;
    #playerElements;

    constructor() {

    }

    initialize(parentElement) {
        this.#parentElement = parentElement;
        parentElement.innerHTML = '';
        this.#playerElements = createHTMLElement('div', '', this.#parentElement, 'game-players', { id: "players" });
        this.#messagesElement = createHTMLElement('div', '', this.#parentElement, 'game-messages', { id: "messages" });
        this.#errorsElement = createHTMLElement('div', '', this.#parentElement, 'game-errors', { id: "errors" });

        createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-1` });
        createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-2` });
    }

    getPlayerElement(playerIdx) {
        return this.#playerElements.querySelector(`#player-${playerIdx}`);
    }

    showMessage(messageText) {
        const messageBox = createHTMLElement('div', messageText, this.#messagesElement, 'game-message', null, true);
    }

    showError(errorText) {
        const errorBox = createHTMLElement('div', errorText, this.#errorsElement, 'game-error', null, true);
    }

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

const gameInterface = new GameInterface();

export { GameInterface, gameInterface };