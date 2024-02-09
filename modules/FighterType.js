/*
    Class: FighterType
    Defines a class or type of fighter (i.e. Warrior, Mage etc)
    Abstract, do not create objects of this class, use one of the subclasses instead. 
*/
import AttackSkill from "./AttackSkill.js";

export default class FighterType {
    #fighterName;
    #maxHealth = 800;
    #armorClass = 10;
    #attackTypes = [];


    ///////////////////////////////////////////////////////////////////////////////
    // Create fightertype with the specified name and health pool size
    // Fighter type skills are set in the sub-classes. 
    constructor(fighterName, maxHealth, armorClass) {
        this.name = fighterName;
        this.#maxHealth = maxHealth;
        this.#armorClass = armorClass;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Change the name of this fighter type
    set name(fighterName) {
        if ((typeof fighterName !== "string") || (fighterName.length < 2) || (fighterName.length > 20)) {
            throw new Error("The name of a fighter type must be a string between 2 and 20 characters in length.");
        }
        this.#fighterName = fighterName;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the name of this fighter type
    get name() {
        return this.#fighterName;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the armor class of this fighter type
    get armor() {
        return this.#armorClass;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the health pool size of this fighter type
    get maxHealth() {
        return this.#maxHealth;
    }


    ///////////////////////////////////////////////////////////////////////////////
    addSkill(attackType) {
        if ((typeof attackType !== "object") || !(attackType instanceof AttackSkill)) {
            throw new Error(`Error attempting to add invalid attack to ${this.#fighterName}!`);
        }

        if (!this.#attackTypes.includes(attackType)) {
            this.#attackTypes.push(attackType);
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the attack skill with the specified name
    getAttackSkill(skillName) {
        for (const skill of this.#attackTypes) {
            if (skill.name == skillName) {
                return skill;
            }
        }
        throw new Error(`The ${this.#fighterName} does not know the ${skillName} skill.`);
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return a list of attacks available to use.
    getAvailableSkills() {
        if (this.#attackTypes.length <= 0) {
            throw new Error(`The ${this.#fighterName} does not have any skills assigned!`);
        }

        // return this.#attackTypes.filter(({ charges }) => charges > 0).map((skill) => { return { name: skill.name, uses: skill.charges } });
        return this.#attackTypes.filter(({ uses }) => uses > 0);
    }
}