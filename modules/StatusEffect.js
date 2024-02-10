/*
    Class: StatusEffect
    Class for a status effect applied to a player. Could be beneficial or detrimental. 
*/
import gameInterface from "./GameInterface.js";

export default class StatusEffect {
    #effectType;
    #effectDuration;
    #effectTarget;


    constructor(effectType, duration, target) {
        this.#effectDuration = duration;
        this.#effectType = effectType;
        this.#effectTarget = target;

        this.showFeedback();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Return the number of rounds until this status effect expires
    get duration() {
        return this.#effectDuration;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the type of this status effect, one of Attackskill.statusEffects
    get effectType() {
        return this.#effectType;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return a display name of the type of status effect
    get effectName() {
        switch (this.effectType) {
            case "heal": return "Health regen";
            case "evade": return "Evading";
            case "burn": return "Burning";
            case "stun": return "Stunned";
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Do round update for the status effect. Decrease remaining duration and
    // apply any effects that tick per round. 
    turnProc() {
        if (this.#effectDuration > 0) {
            this.#effectDuration--;

            switch (this.effectType) {
                case "burn":
                    this.#effectTarget.takeDamage(10);
                    gameInterface.showMessage(`${this.#effectTarget.name} takes 10 damage from burning.`);
                    break;
                case "heal":
                    this.#effectTarget.heal(10);
                    gameInterface.showMessage(`${this.#effectTarget.name} regenerates 10 health.`);
                    break;
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Show a feedback message when the status effect is applied. 
    showFeedback() {
        switch (this.effectType) {
            case "heal":
                gameInterface.showMessage(`${this.#effectTarget.name} is regenerating health for ${this.#effectDuration} rounds!`);
                break;
            case "evade":
                gameInterface.showMessage(`${this.#effectTarget.name} is evading attacks (+5 defense) for ${this.#effectDuration} rounds!`);
                break;
            case "burn":
                gameInterface.showMessage(`${this.#effectTarget.name} is burning for ${this.#effectDuration} rounds!`);
                break;
            case "stun":
                gameInterface.showMessage(`${this.#effectTarget.name} is stunned for ${this.#effectDuration} rounds!`);
                break;
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Show a feedback message when the status effect is applied. 
    expireMessage() {
        switch (this.effectType) {
            case "heal":
                gameInterface.showMessage(`${this.#effectTarget.name} stopped regenerating health.`);
                break;
            case "evade":
                gameInterface.showMessage(`${this.#effectTarget.name} stopped evading attacks.`);
                break;
            case "burn":
                gameInterface.showMessage(`${this.#effectTarget.name} is no longer burning.`);
                break;
            case "stun":
                gameInterface.showMessage(`${this.#effectTarget.name} recovered from stun.`);
                break;
        }
    }
}