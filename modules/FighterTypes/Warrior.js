/*
    Class: FighterType -> Warrior
    Definition for a player of the warrior class.
*/

import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Warrior extends FighterType {

    constructor() {
        // name, health, defense, color, icon
        super('Warrior', 400, 5, "fighterclass-warrior", "./images/warrior.png");

        // Create unique skills for this fighter type
        this.addSkill(new AttackSkill(
            "Slash",
            10, // min damage
            15, // max damage
            15, // attack bonus
            -1, // uses per match (-1 = unlimited)
            "enemy", // target
            "none", // status effect
            'Slash.png', // icon
            'Slash opponent for 10-15 damage. (+15 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Bash",
            5, // min damage
            40, // max damage
            10, // attack bonus
            -1, // uses per match (-1 = unlimited)
            "enemy", // target
            "none", // status effect
            'Bash.png',
            'Bash opponent for 5-30 damage. (+10 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Bonk!",
            15, // min damage
            20, // max damage
            10, // attack bonus
            3, // uses per match
            "enemy", // target
            "stun|1", // status effect | duration
            'Bonk.png',
            'Bonk opponent on the head for 15-20 damage, stunning them for 1 round. (+10 attack)'
        ));

        this.addSkill(new AttackSkill(
            "Flame blade",
            50, // min damage
            50, // max damage
            5, // attack bonus
            3, // uses per match
            "enemy", // target
            "burn|2", // status effect | duration
            'smash.png', // icon
            'Hit opponent with a flaming blade for 50 damage and inflict burn for 2 rounds. (+5 attack)'
        ));
    }
}