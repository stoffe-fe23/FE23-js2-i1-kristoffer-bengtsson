import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Warrior extends FighterType {

    constructor() {
        super('Warrior', 600, 15);

        // Create unique skills for this fighter type
        // name, damageMin, damageMax, charges = -1, target = 'enemy', statusEffect = 'none', hitChance = 10
        this.addSkill(new AttackSkill("Slash", 10, 15, -1, "enemy", "none", 10, 'icon.png'));
        this.addSkill(new AttackSkill("Bash", 5, 20, -1, "enemy", "none", 10, 'icon.png'));
        this.addSkill(new AttackSkill("Bonk", 15, 20, 6, "enemy", "none", 10, 'icon.png'));
        this.addSkill(new AttackSkill("Smash!", 50, 50, 3, "enemy", "none", 10, 'icon.png'));
    }
}