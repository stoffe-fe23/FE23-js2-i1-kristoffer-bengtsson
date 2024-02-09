import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Rogue extends FighterType {

    constructor() {
        super('Rogue', 400, 14, "#0000ff", "./images/rogue.png");

        // Create unique skills for this fighter type
        // name, damageMin, damageMax, charges = -1, target = 'enemy', statusEffect = 'none', hitChance = 10
        this.addSkill(new AttackSkill("Stab", 5, 15, -1, "enemy", "none", 10, 'Stab.png'));
        this.addSkill(new AttackSkill("Backstab", 30, 60, 2, "enemy", "none", 10, 'backstab.png'));
        this.addSkill(new AttackSkill("Evasion", 30, 30, 3, "self", "none", 10, 'evasion.png'));
        this.addSkill(new AttackSkill("Potion", 30, 35, 2, "self", "none", 10, 'potion.png'));
    }
}