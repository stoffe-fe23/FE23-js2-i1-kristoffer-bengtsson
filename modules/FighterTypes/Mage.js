/*
    Class: FighterType -> Mage
    Definition for a player of the mage class.
*/
import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Mage extends FighterType {

    constructor() {
        // name, health, defense, color, icon
        super('Wizard', 200, 11, "fighterclass-mage", "./images/mage.png");

        // Create unique skills for this fighter type
        this.addSkill(new AttackSkill(
            "Ray of Frost",
            10, // min damage
            15, // max damage
            15, // attack bonus
            -1, // uses per match (-1 = unlimited)
            "enemy", // target
            "none", // status effect
            'Rayoffrost.png', // icon
            'Freeze opponent with a ray of frost doing 10-15 damage. (+15 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Ig-miss",
            35,  // min damage
            40, // max damage
            10, // attack bonus
            6,  // uses per match
            "enemy",  // target
            "burn|2", // status effect | duration
            'Ig-miss.png', // icon
            'Attempt to scorch opponent for 35-40 damage with a firebolt, burning for 10 damage over 2 rounds. (+5 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Lightning",
            50, // min damage
            60, // max damage
            10, // attack bonus
            3,  // uses per match
            "enemy", // target
            "stun|1", // status effect
            'lightning.png', // icon
            'Electrocute opponent with a lightning bolt for 50-60 damage, stunning for 1 round. (+10 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Heal",
            50, // min damage
            50, // max damage
            10, // attack bonus
            3, // uses per match
            "self", // target
            "cure", // status effect
            'heal.png', // icon
            'Heal yourself for 50 health and cure burning.'
        ));
    }
}