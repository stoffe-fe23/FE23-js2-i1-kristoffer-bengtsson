
/*
    Class: AttackSkill
    Defines a type of skill/attack a player can make (i.e. Fireball, Kick, Heal etc)
*/

export default class AttackSkill {
    #skillName;
    #skillDamageMin;
    #skillDamageMax;
    #skillUses;
    #skillTarget;
    #skillStatus = 'none';
    #skillHitChance = 10;
    #skillIcon;
    #statusEffects = ['none', 'heal', 'evade'];


    ///////////////////////////////////////////////////////////////////////////////
    // Set the name, damage range, number of uses and target of this skill
    constructor(name, damageMin, damageMax, charges = -1, target = 'enemy', statusEffect = 'none', hitChance = 10, icon = 'skill.png') {
        this.#skillName = name;
        this.#skillDamageMin = damageMin;
        this.#skillDamageMax = damageMax;
        this.#skillIcon = icon;

        if (this.#statusEffects.includes(statusEffect)) {
            this.#skillStatus = statusEffect;
        }

        if ((hitChance > 1) && (hitChance <= 20)) {
            this.#skillHitChance = hitChance;
        }

        // cap uses between 1 - 10 (-1 = unlimited uses)
        this.#skillUses = (charges == -1 ? 10000 : Math.max(1, Math.min(charges, 10)));

        // skill targets either the player or the opponent
        // Self-targeted skills are assumed to be beneficial
        this.#skillTarget = (target !== "self" ? "enemy" : "self");
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the lower range of the skill damage
    get minDamage() {
        return this.#skillDamageMin;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the upper range of the skill damage
    get maxDamage() {
        return this.#skillDamageMax;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the name of the skill
    get name() {
        return this.#skillName;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the target of the skill, either: "self" or "enemy"
    get target() {
        return this.#skillTarget;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the number of uses left of this skill
    get uses() {
        return this.#skillUses;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Return if this skill inflicts any kind of status effect.
    get status() {
        return this.#skillStatus;
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Return the hit chance modifier of this skill (1-20)
    get hitChance() {
        return this.#skillHitChance;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Use the skill, decreasing number of available uses and returning rolled damage
    useSkill() {
        if (this.#skillUses <= 0) {
            throw new Error(`You cannot use ${this.#skillName} any more times during this match.`);
        }

        this.#skillUses--;

        if ((this.#skillDamageMax == 0) && (this.#skillDamageMin == 0)) {
            return 0;
        }

        // Roll a damage number within the damageMin to damageMax range
        return Math.round((this.#skillDamageMax - this.#skillDamageMin) * Math.random()) + this.#skillDamageMin;

    }
}
