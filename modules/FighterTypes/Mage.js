import FighterType from "../FighterType.js";
import AttackSkill from "../AttackSkill.js";

export default class Mage extends FighterType {

    constructor() {
        super('Wizard', 200, 13, "#00ff00", "./images/mage.png");

        // Create unique skills for this fighter type
        // name, damageMin, damageMax, charges = -1, target = 'enemy', statusEffect = 'none', hitChance = 10
        this.addSkill(new AttackSkill("Ray of Frost", 10, 15, -1, "enemy", "none", 10, 'Rayoffrost.png'));
        this.addSkill(new AttackSkill("Ig-miss", 35, 40, 5, "enemy", "none", 10, 'Ig-miss.png'));
        this.addSkill(new AttackSkill("Lightning", 50, 60, 4, "enemy", "none", 10, 'lightning.png'));
        this.addSkill(new AttackSkill("Heal", 50, 50, 4, "self", "heal", 10, 'heal.png'));
    }
}