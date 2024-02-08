import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Spellblade extends FighterType {

    constructor() {
        super('Spellblade', 400);

        // Create unique skills for this fighter type
        // AttackSkill constructor params: Skill name, minDamage, maxDamage, numberOfUses, target
        this.addSkill(new AttackSkill("Slash", 5, 15));
        this.addSkill(new AttackSkill("Bonk", 15, 20, 4));
        this.addSkill(new AttackSkill("Firebolt", 30, 30, 3));
        this.addSkill(new AttackSkill("Heal", 30, 35, 2, "self"));
    }
}