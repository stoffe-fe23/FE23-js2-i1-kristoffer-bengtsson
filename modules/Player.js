/*
    Class: Player
    Defines a player in the game, with their choice of name and fighter-type 
*/
import FighterType from "./FighterType.js";
import StatusEffect from "./StatusEffect.js";
import AttackSkill from "./AttackSkill.js";

export default class Player {
    #playerId;
    #playerName;
    #currentHealth;
    #fighterType;
    #statusEffects;

    ///////////////////////////////////////////////////////////////////////////////
    // Create a new player with the specified name and class/fighter-type
    constructor(playerName, fighterType) {
        if ((typeof fighterType !== "object") || !(fighterType instanceof FighterType)) {
            throw new Error("Invalid fighter type specified!");
        }

        this.name = playerName;
        this.#fighterType = fighterType;
        this.#currentHealth = this.#fighterType.maxHealth;
        this.#statusEffects = [];
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
    // Get the name of the player
    get name() {
        return this.#playerName;
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
    // Get the effective armor value of the player
    get armor() {
        return this.type.armor + (this.hasStatusEffect("evade") ? 5 : 0);
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
    // Apply a status effect to the player
    addStatusEffect(effectType, duration) {
        if (AttackSkill.statusEffects.includes(effectType) && (duration > 0)) {
            this.#statusEffects.push(new StatusEffect(effectType, duration, this));
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Remove a status effect from the player
    removeStatusEffect(effectType) {
        let removeCount = 0;

        if (AttackSkill.statusEffects.includes(effectType)) {
            const updatedStatusList = [];

            for (const status of this.#statusEffects) {
                if (status.effectType != effectType) {
                    updatedStatusList.push(status);
                }
                else {
                    removeCount++;
                    status.expireMessage();
                }
            }
            this.#statusEffects = updatedStatusList;
        }

        return removeCount;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Check if this player has a status effect of the specified type applied. 
    hasStatusEffect(effectType) {
        for (const status of this.#statusEffects) {
            if (status.effectType == effectType) {
                return true;
            }
        }
        return false;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Check if this player has a status effect of the specified type applied. 
    getStatusEffects() {
        const statusList = [];
        for (const status of this.#statusEffects) {
            statusList.push(`${status.effectName} [${parseInt(status.duration)}]`);
        }
        return statusList;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Update any status effects applied to the player
    updateStatusEffects() {
        const updatedStatusList = [];
        for (let i = 0; i < this.#statusEffects.length; i++) {
            const status = this.#statusEffects[i];

            if (status.duration > 0) {
                status.turnProc();
                updatedStatusList.push(status);
            }
            else {
                status.expireMessage();
            }
        }
        this.#statusEffects = updatedStatusList;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Make the player use the skill with the specified name
    useSkill(attackSkill, opponentPlayer) {
        const skillObj = this.type.getAttackSkill(attackSkill);

        if ((skillObj === undefined) || (skillObj === null)) {
            throw new Error(`The skill ${attackSkill} is not known to a ${this.type}!`);
        }

        const skillDmg = skillObj.use(opponentPlayer, this);
        return { damage: skillDmg, skill: skillObj };
    }
}