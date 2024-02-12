
import { createHTMLElement } from './utilities.js';
import Game from "./Game.js";
import Player from "./Player.js";
import Rogue from "./FighterTypes/Rogue.js";
import Warrior from "./FighterTypes/Warrior.js";
import Mage from "./FighterTypes/Mage.js";


class GameInterface {
    #game;
    #parentElement;
    #messagesElement;
    #errorsElement;
    #playerElements;
    #playerOne;
    #playerTwo;
    #playerIndicator;


    ///////////////////////////////////////////////////////////////////////////////
    // Create game interface object and connect it to a HTML element on the page
    // where the game will be shown. 
    constructor(parentElement) {
        this.#parentElement = parentElement;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Build the game interface inside the specified element: 
    // one box for each player and boxes for messages and errors
    startGame(player1, player2) {

        this.#parentElement.innerHTML = '';
        this.#playerElements = createHTMLElement('div', '', this.#parentElement, 'game-players', { id: "players" });
        this.#errorsElement = createHTMLElement('div', '', this.#parentElement, 'game-errors', { id: "errors" });
        this.#messagesElement = createHTMLElement('div', '', this.#parentElement, 'game-messages', { id: "messages" });

        this.#playerOne = createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-1` });
        this.#playerIndicator = createHTMLElement('div', ' ► ', this.#playerElements, 'game-player-indicator', { id: `player-indicator` });
        this.#playerTwo = createHTMLElement('div', '', this.#playerElements, 'game-player', { id: `player-2` });

        this.#game = new Game(
            new Player(player1.name, this.#createPlayerType(player1.type)),
            new Player(player2.name, this.#createPlayerType(player2.type))
        );

        this.#game.nextPlayerTurn();
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Create fighter type class depending on string representation value.
    #createPlayerType(typeName) {
        switch (typeName) {
            case "warrior": return new Warrior();
            case "rogue": return new Rogue();
            case "mage": return new Mage();
        }
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
    // Show a message to the player (blue box)
    showMessage(messageText) {
        this.#messagesElement.prepend(createHTMLElement('div', messageText, null, 'game-message', null, true));
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Show an error message to the player (red box)
    showError(errorText) {
        this.#errorsElement.prepend(createHTMLElement('div', errorText, null, 'game-error', null, true));
    }


    ///////////////////////////////////////////////////////////////////////////////
    // TODO: Visually present the current player's action
    showPlayerMove(player, opponent, skillName, skillResult) {
        // Disable buttons for both players while the move is displayed... 
        document.querySelectorAll(".skill-button-wrapper").forEach((buttonPanel) => {
            buttonPanel.disabled = true;
        });

        // TODO: Visualize player move here?
        // Useful info: 
        //  - player is the Player object of the player making the move
        //  - opponent is the Player object of the other player (i.e. the target if not a self-target skill)
        //  - skillName contains the name of the skill used
        //  - skillResult is an object with two properties, "roll" and "skill":
        // -  skillResult.skill is the AttackSkill object of the skill that was used.
        //  - if skillResult.roll is null then the attack missed, otherwise the damage dealt, or health healed
        //  - if skillResult.skill.status is not "none" then the skill applies that status effect if his
        //  - if skillResult.skill.statusDuration is not 0 then it is the duration of the status effect, in rounds
        console.log("DEBUG:", skillName, skillResult, opponent, player);

        // TODO: Do this (delayed?) when the presentation is done to pass control to the next player
        this.#game.nextPlayerTurn();
    }


    ///////////////////////////////////////////////////////////////////////////////
    // TODO: Show some kind of screen when the game is over, declaring the winner. 
    showGameOverScreen(winnerName) {
        const gameoverBox = createHTMLElement('dialog', '', document.body, 'game-over', { id: "gameover" });
        createHTMLElement('h2', 'Game Over', gameoverBox, 'game-over-title', { id: "gameover-title" });
        createHTMLElement('div', `${winnerName} is victorious!`, gameoverBox, 'game-over-text', { id: "gameover-text" });

        // New game button
        const restartButton = createHTMLElement('button', 'Play again!', gameoverBox, 'game-over-button', { id: "restart-button" });
        restartButton.addEventListener("click", (event) => {
            gameoverBox.close();
            gameoverBox.remove();
            this.newGame();
        });

        // Dismiss popup button
        const endButton = createHTMLElement('button', 'OK', gameoverBox, 'game-over-button', { id: "gameover-button" });
        endButton.addEventListener("click", (event) => {
            gameoverBox.close();
            gameoverBox.remove();
        });

        gameoverBox.showModal();
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Show the new game character creation screen
    newGame() {
        this.#parentElement.innerHTML = '';

        const newPlayersForm = createHTMLElement('form', '', this.#parentElement, 'new-players-form', { id: 'new-players-form' });
        const newPlayersWrapper = createHTMLElement('div', '', newPlayersForm, 'new-players-wrapper', { id: 'new-players-wrapper' });

        const playerOneBox = createHTMLElement('div', '', newPlayersWrapper, 'new-player-box', { id: 'new-player-one' });
        createHTMLElement('h2', 'Player 1', playerOneBox, 'new-player-title');
        createHTMLElement('input', 'Choose your name:', playerOneBox, 'new-player-name', { id: 'new-player-one-name', type: 'text', minlength: '2', maxlength: '20', required: 'true' });
        createHTMLElement('label', 'Choose your class:', playerOneBox, 'new-player-label', { for: 'new-player-one-class' });
        createHTMLElement('input', '<img src="./images/warrior.png" alt="Warrior"> <span>Warrior</span>', playerOneBox, 'new-player-class', { id: 'new-player-one-class-warrior', type: 'radio', name: 'new-player-one-class', value: 'warrior', checked: "true" }, true);
        createHTMLElement('input', '<img src="./images/rogue.png" alt="Rogue"> <span>Rogue</span>', playerOneBox, 'new-player-class', { id: 'new-player-one-class-rogue', type: 'radio', name: 'new-player-one-class', value: 'rogue' }, true);
        createHTMLElement('input', '<img src="./images/mage.png" alt="Wizard"> <span>Wizard</span>', playerOneBox, 'new-player-class', { id: 'new-player-one-class-mage', type: 'radio', name: 'new-player-one-class', value: 'mage' }, true);

        const playerTwoBox = createHTMLElement('div', '', newPlayersWrapper, 'new-player-box', { id: 'new-player-two' });
        createHTMLElement('h2', 'Player 2', playerTwoBox, 'new-player-title');
        createHTMLElement('input', 'Choose your name:', playerTwoBox, 'new-player-name', { id: 'new-player-two-name', type: 'text', minlength: '2', maxlength: '20', required: 'true' });
        createHTMLElement('label', 'Choose your class:', playerTwoBox, 'new-player-label', { for: 'new-player-two-class' });
        createHTMLElement('input', '<img src="./images/warrior.png" alt="Warrior"> <span>Warrior</span>', playerTwoBox, 'new-player-class', { id: 'new-player-two-class-warrior', type: 'radio', name: 'new-player-two-class', value: 'warrior', checked: "true" }, true);
        createHTMLElement('input', '<img src="./images/rogue.png" alt="Rogue"> <span>Rogue</span>', playerTwoBox, 'new-player-class', { id: 'new-player-two-class-rogue', type: 'radio', name: 'new-player-two-class', value: 'rogue' }, true);
        createHTMLElement('input', '<img src="./images/mage.png" alt="Wizard"> <span>Wizard</span>', playerTwoBox, 'new-player-class', { id: 'new-player-two-class-mage', type: 'radio', name: 'new-player-two-class', value: 'mage' }, true);

        const buttonsWrapper = createHTMLElement('div', '', newPlayersForm, 'start-game-button-wrapper');
        createHTMLElement('button', 'Start game!', buttonsWrapper, 'start-game-button', { id: 'start-game-button' });

        newPlayersForm.addEventListener("submit", this.#onNewPlayersSubmit.bind(this));
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Form event handler: Start a new game once the players have chosen their name 
    // and fighter-type.
    #onNewPlayersSubmit(event) {
        event.preventDefault();

        const player1 = {
            name: document.querySelector("#new-player-one-name").value.trim(),
            type: document.querySelector(`input[name="new-player-one-class"]:checked`).value
        };

        const player2 = {
            name: document.querySelector("#new-player-two-name").value.trim(),
            type: document.querySelector(`input[name="new-player-two-class"]:checked`).value
        };

        gameInterface.startGame(player1, player2);
    }
}


// Create gameInterface global object for use elsewhere. 
const gameInterface = new GameInterface(document.querySelector("#game"));

export default gameInterface;
