import { ESkillAction } from "../Enums/ESkillAction"

export default class SpellSign {
    
    amount:number
    skill_action:ESkillAction
    
   

    constructor(amount:number,skill_action:ESkillAction) {
       this.amount = amount
       this.skill_action = skill_action
      
    }

}