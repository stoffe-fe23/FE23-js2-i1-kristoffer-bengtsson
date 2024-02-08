/*
    Class: Player
    Defines a player in the game, with their choice of name and fighter-type 
*/

import FighterType from "./FighterType.js";
import { gameInterface } from "./GameInterface.js";

export default class Player {
    #playerId;
    #playerName;
    #currentHealth;
    #fighterType;

    ///////////////////////////////////////////////////////////////////////////////
    // Create a new player with the specified name and class/fighter-type
    constructor(playerName, fighterType) {
        if ((typeof fighterType !== "object") || !(fighterType instanceof FighterType)) {
            throw new Error("Invalid fighter type specified!");
        }

        this.name = playerName;
        this.#fighterType = fighterType;
        this.#currentHealth = this.#fighterType.maxHealth;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the name of the player
    get name() {
        return this.#playerName;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get ID of the player
    get id() {
        return this.#playerId;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Set the ID of the player
    set id(newID) {
        this.#playerId = newID;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Change the name of the player
    set name(newName) {
        if ((typeof newName !== "string") || (newName.length < 2) || (newName.length > 20)) {
            throw new Error("The player name must be a string between 2 and 20 characters in length.");
        }
        this.#playerName = newName;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the current health of the player
    get health() {
        return this.#currentHealth;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the size of the health pool of the player (depending on fighter type)
    get maxHealth() {
        return this.#fighterType.maxHealth;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Get the class/fighter type of the player
    get type() {
        return this.#fighterType;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Damage the player the specified amount (capped at 0)
    takeDamage(damageAmount) {
        if (typeof damageAmount === "string") {
            damageAmount = parseInt(damageAmount);
        }
        if (damageAmount > 0) {
            damageAmount = Math.min(damageAmount, this.#currentHealth);
            this.#currentHealth -= damageAmount;
        }
        return damageAmount;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Heal the player the specified amount (capped at health pool size)
    heal(healAmount) {
        if (typeof healAmount === "string") {
            healAmount = parseInt(healAmount);
        }
        if (healAmount > 0) {
            // Cap healing to not exceed max health... 
            healAmount = (this.#currentHealth + healAmount > this.type.maxHealth ? this.type.maxHealth - this.#currentHealth : healAmount);
            this.#currentHealth += healAmount;
        }
        return healAmount;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Make the player use the skill with the specified name
    useSkill(attackSkill, opponentPlayer) {
        const skillObj = this.type.getAttackSkill(attackSkill);
        const skillDmg = skillObj.useSkill();

        // Assume it is healing if the skill is self-targeted
        if (skillObj.target == "self") {
            this.heal(skillDmg);
            gameInterface.showMessage(`${this.name} healed themselves for ${skillDmg} points.`);
        }
        else {
            opponentPlayer.takeDamage(skillDmg);
            gameInterface.showMessage(`${this.name} attacked ${opponentPlayer.name} with ${skillObj.name} for ${skillDmg} damage.`);
        }
        return { damage: skillDmg, skill: skillObj };
    }
}