import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Mage extends FighterType {

    constructor() {
        super('Wizard', 200);

        // Create unique skills for this fighter type
        // AttackSkill constructor params: Skill name, minDamage, maxDamage, numberOfUses, target
        this.addSkill(new AttackSkill("Ray of Frost", 10, 15));
        this.addSkill(new AttackSkill("Ig-miss", 35, 40, 5));
        this.addSkill(new AttackSkill("Lightning", 50, 60, 4));
        this.addSkill(new AttackSkill("Heal", 50, 50, 4, "self"));
    }
}