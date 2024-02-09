import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Rogue extends FighterType {

    constructor() {
        super('Rogue', 400);

        // Create unique skills for this fighter type
        // AttackSkill constructor params: Skill name, minDamage, maxDamage, numberOfUses, target
        this.addSkill(new AttackSkill("Stab", 5, 15));
        this.addSkill(new AttackSkill("Backstab", 30, 60, 2));
        this.addSkill(new AttackSkill("Evasion", 30, 30, 3, "self"));
        this.addSkill(new AttackSkill("Potion", 30, 35, 2, "self"));
    }
}