import { EAmount } from "../Enums/EAmount"
import { ETypeOfSpell } from "../Enums/ETypeOfSpell"
import SpellSign from "./SpellSign"

export default class Skill {
    name:string
    number_of_targets:number
    mana_cost:number
    spell_sign:SpellSign[]
    type_spell:ETypeOfSpell
    type_of_amount:EAmount

    constructor(name:string,number_of_targets:number,mana_cost:number,spell_sign:SpellSign[],type_spell:ETypeOfSpell,type_of_amount:EAmount) {
       this.name = name
       this.number_of_targets = number_of_targets
       this.mana_cost = mana_cost
       this.spell_sign = spell_sign
       this.type_spell = type_spell
       this.type_of_amount = type_of_amount
    }

}