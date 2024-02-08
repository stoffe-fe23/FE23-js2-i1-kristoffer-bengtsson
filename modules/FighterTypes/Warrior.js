import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Warrior extends FighterType {

    constructor() {
        super('Warrior', 600);

        // Create unique skills for this fighter type
        // AttackSkill constructor params: Skill name, minDamage, maxDamage, numberOfUses, target
        this.addSkill(new AttackSkill("Slash", 10, 15));
        this.addSkill(new AttackSkill("Bash", 5, 20));
        this.addSkill(new AttackSkill("Bonk", 15, 20, 6));
        this.addSkill(new AttackSkill("Smash!", 50, 50, 3));
    }
}