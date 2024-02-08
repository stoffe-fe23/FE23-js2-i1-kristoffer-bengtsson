/*
    Class: Game
    Logic for controlling a match in the game. 
*/
import { gameInterface } from "./GameInterface.js";
import { createHTMLElement, setHTMLElement } from './utilities.js';

export default class Game {
    #gameRound = 1;
    #currentPlayer;
    #playerOne;
    #playerTwo;


    ///////////////////////////////////////////////////////////////////////////////
    // Start a new game between the two specified players
    constructor(player1, player2) {
        this.#playerOne = player1;
        this.#playerTwo = player2;

        this.#playerOne.id = 1;
        this.#playerTwo.id = 2;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Update the game for a turn, passing control to the next player
    doGameTurn() {
        if (this.#currentPlayer === this.#playerTwo) {
            this.#gameRound++;
        }

        if (this.#playerOne.health <= 0) {
            this.doGameOver(this.#playerTwo);
            return;
        }
        if (this.#playerTwo.health <= 0) {
            this.doGameOver(this.#playerOne);
            return;
        }

        // Pass turn to next player
        this.#currentPlayer = (this.#currentPlayer === this.#playerOne ? this.#playerTwo : this.#playerOne);


        gameInterface.showMessage(`<strong>Round ${this.#gameRound}:</strong> ${this.#currentPlayer.name}'s turn!`);

        // Update player info
        this.#buildPlayerAvatar(this.#playerOne);
        this.#buildPlayerAvatar(this.#playerTwo);

        console.log(">>> NEXT PLAYER", this.#currentPlayer.name);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Do... something when the game is over.
    doGameOver(winner) {
        this.#gameRound = 1;
        this.#currentPlayer = null;

        gameInterface.showMessage(`<strong>GAME OVER:</strong> ${winner.name} wins!`);
        gameInterface.showGameOverScreen(winner.name);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the player currently taking their turn
    get player() {
        return this.#currentPlayer;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the player currently waiting for their turn
    get opponent() {
        return (this.#currentPlayer === this.#playerOne ? this.#playerTwo : this.#playerOne);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Build/update the player info elements on the page
    #buildPlayerAvatar(player) {
        const outputElement = gameInterface.getPlayerElement(player.id);

        setHTMLElement('div', player.name, outputElement, 'player-name', { id: `player-${player.id}-name` });
        setHTMLElement('div', player.type.name, outputElement, 'player-class', { id: `player-${player.id}-class` });
        setHTMLElement('div', `${player.health} / ${player.maxHealth}`, outputElement, 'player-health', { id: `player-${player.id}-health` });

        this.#buildSkillButtons(player);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Build the buttons with the player's available skills
    #buildSkillButtons(player) {
        const playerSkills = player.type.getAvailableSkills();
        const outputElement = gameInterface.getPlayerElement(player.id);
        let buttonContainer = outputElement.querySelector(".skill-buttons");
        let buttonWrapper;

        // If the button form does not exist, create it, otherwise use existing one.
        if ((buttonContainer === undefined) || (buttonContainer === null)) {
            buttonContainer = createHTMLElement('form', '', outputElement, 'skill-buttons', { id: `player-${player.id}-skills` });
            buttonWrapper = createHTMLElement('fieldset', '', buttonContainer, 'skill-button-wrapper');

            buttonContainer.addEventListener("submit", (event) => {
                event.preventDefault();
                this.player.useSkill(event.submitter.getAttribute("skillname"), this.opponent);
                this.doGameTurn();
            });
        }
        else {
            buttonWrapper = buttonContainer.querySelector(".skill-button-wrapper");
        }

        buttonWrapper.innerHTML = '';

        // Disable the buttons for the player not taking this turn
        buttonWrapper.disabled = (player == this.#currentPlayer ? false : true);

        // Create a button for each skill the player has
        for (const skill of playerSkills) {
            const buttonId = "player-" + player.id + "-" + skill.name.toLowerCase().replaceAll(' ', '-');
            // If the skill has limited uses, show remaining use as well
            const buttonLabel = (skill.uses > 1000 ? skill.name : `${skill.name} (${skill.uses})`);
            createHTMLElement('button', buttonLabel, buttonWrapper, 'player-skill', { id: buttonId, skillname: skill.name });
        }
    }
}