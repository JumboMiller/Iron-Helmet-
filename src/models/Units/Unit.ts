import { EAmount } from '../Enums/EAmount';
import { ESkillAction } from '../Enums/ESkillAction';
import { EUnits } from '../Enums/EUnits';

export class Unit {

    max_health:number;
    health:number;
    armor:number;
    magic_resist:number;
    evasion:number;
    speed:number;
    unit_type:EUnits;
   

    constructor() {
        this.max_health = 0;
        this.health = this.max_health;
        this.armor = 0;
        this.magic_resist = 0;
        this.evasion = 0;
        this.speed = 0;
        this.unit_type =  EUnits.UNIT;
    }


    takingHeal(amount:number){
        if (this.health + amount > this.max_health) {
            this.health = this.max_health
        }else{
            this.health += amount
        }
    }

    takingBuff(typeOfDebuff:ESkillAction , amount:number){
        if (typeOfDebuff === ESkillAction.MAGICRESISTANCEBUFF) {
            this.magic_resist += amount
        }
        else if (typeOfDebuff === ESkillAction.ARMORBUFF) {
            this.armor += amount
        }
        else if (typeOfDebuff === ESkillAction.EVASIONBUFF) {
            //evasion debuff
        }
        else if (typeOfDebuff === ESkillAction.HERODAMAGEBUFF) {
            //enemy damage debuff
        }
    }
    takingDebuff(typeOfDebuff:ESkillAction , amount:number){
        if (typeOfDebuff === ESkillAction.MAGICRESISTANCEDEBUFF) {
            this.magic_resist -= amount
        }
        else if (typeOfDebuff === ESkillAction.ARMORDEBUFF) {
            this.armor -= amount
        }
        else if (typeOfDebuff === ESkillAction.EVASIONDEBUFF) {
            //evasion debuff
        }
        else if (typeOfDebuff === ESkillAction.ENEMYDAMAGEDEBUFF) {
            //enemy damage debuff
        }
    }

    takingDamage(amount:number,type_of_amount:EAmount){
        const random = Math.floor(Math.random() * (10 - -10 + 1)) + -10
        amount += (amount/100 * random)
        if (type_of_amount === EAmount.PHYSICAL) {
            this.health -= Math.floor(amount - this.armor ) 
        }
        if (type_of_amount === EAmount.MAGICAL) {
            this.health -= Math.floor(amount - this.magic_resist)
        }
        if (type_of_amount === EAmount.HOLY) {
            this.health -= Math.floor(amount)
        }
    }

}