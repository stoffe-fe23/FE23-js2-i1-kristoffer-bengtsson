/*
    Class: FighterType -> Rogue
    Definition for a player of the rogue class.
*/
import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Rogue extends FighterType {

    constructor() {
        // name, health, defense, color, icon
        super('Rogue', 300, 4, "fighterclass-rogue", "./images/rogue.png");

        // Create unique skills for this fighter type
        this.addSkill(new AttackSkill(
            "Stab",
            5,  // min damage
            15, // max damage
            15, // attack bonus
            -1, // uses per match (-1 = unlimited)
            "enemy", // target
            "none", // status effect
            'Stab.png',  // icon
            'Stab opponent for 5-15 damage. (+15 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Backstab",
            40, // min damage
            70, // max damage
            10, // attack bonus
            5, // uses per match
            "enemy", // target
            "riposte|1", // status effect | duration
            'backstab.png', // icon
            'Backstab opponent for 30-60 damage and riposte incoming attacks for 1 turn, retaliating for 15 damage. (+10 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Evasion",
            0, // min damage
            0, // max damage
            0, // attack bonus
            3, // uses per match
            "self", // target
            "evade|2",  // status effect | duration
            'evasion.png',  // icon
            'Evade attacks for two rounds (+5 defense).'
        ));

        this.addSkill(new AttackSkill(
            "Potion",
            30, // min damage
            35, // max damage
            10, // attack bonus
            2, // uses per match
            "self", // target
            "heal|2", // status effect | duration
            'potion.png', // icon
            'Heal yourself for 30-35 health and regen 10 health for 2 rounds.'
        ));
    }
}