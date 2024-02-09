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

        gameInterface.setPlayerColor(1, this.#playerOne.type.style);
        gameInterface.setPlayerColor(2, this.#playerTwo.type.style);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Update the game for a turn, passing control to the next player
    nextPlayerTurn() {
        if (this.#currentPlayer === this.#playerTwo) {
            this.#gameRound++;
        }

        // Pass turn to next player
        this.#currentPlayer = (this.#currentPlayer === this.#playerOne ? this.#playerTwo : this.#playerOne);

        // Skip turn if player is stunned
        if (this.#currentPlayer.hasStatusEffect("stun")) {
            gameInterface.showMessage(`${this.#currentPlayer.name} is stunned, skipping turn!`);
            this.#currentPlayer.updateStatusEffects();
            this.#currentPlayer = (this.#currentPlayer === this.#playerOne ? this.#playerTwo : this.#playerOne);
        }

        gameInterface.showMessage(`<strong>Round ${this.#gameRound}:</strong> ${this.#currentPlayer.name}'s turn!`);
        gameInterface.setCurrentPlayer(this.#currentPlayer.id);

        // Proc status effects
        this.#currentPlayer.updateStatusEffects();

        // Update player info
        this.#buildPlayerAvatar(this.#playerOne);
        this.#buildPlayerAvatar(this.#playerTwo);

        // Game over? If anyone is KO'd
        if (this.#playerOne.health <= 0) {
            this.doGameOver(this.#playerTwo, this.#playerOne);
            return;
        }
        if (this.#playerTwo.health <= 0) {
            this.doGameOver(this.#playerOne, this.#playerTwo);
            return;
        }

        console.log(">>> PLAYER TURN", this.#currentPlayer.name);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // TODO: Do... something fancy when the game is over?
    doGameOver(winner, loser) {
        this.#gameRound = 1;
        this.#currentPlayer = null;

        gameInterface.showMessage(`<strong>GAME OVER:</strong> ${loser.name} is knocked out, ${winner.name} wins!`);
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
        setHTMLElement('div', `<span>Class:</span> ${player.type.name}`, outputElement, 'player-class', { id: `player-${player.id}-class` }, true);
        setHTMLElement('div', `<span>Health:</span> ${player.health} / ${player.maxHealth}`, outputElement, 'player-health', { id: `player-${player.id}-health` }, true);
        setHTMLElement('div', `<span>Defense:</span> ${player.armor}`, outputElement, 'player-defense', { id: `player-${player.id}-defense` }, true);
        setHTMLElement('ul', player.getStatusEffects(), outputElement, 'player-effects', { id: `player-${player.id}-effects` });
        setHTMLElement('img', 'Player avatar', outputElement, 'avatar-icon', { src: `${player.type.icon}` })

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
                this.nextPlayerTurn();
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
            let buttonLabel = (skill.uses === -1 ? skill.name : `${skill.name} (${skill.uses})`);
            buttonLabel = `<img src="./images/${skill.icon}">` + buttonLabel;
            createHTMLElement('button', buttonLabel, buttonWrapper, 'player-skill', { id: buttonId, skillname: skill.name, title: skill.description }, true);
        }
    }
}