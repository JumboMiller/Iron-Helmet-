import { EPotion } from "../Enums/EPotion"
import { EPotionRarity } from "../Enums/EPotionRarity"

export default class Potion {

    potion_type:EPotion
    potion_rarity:EPotionRarity
    
    amount:number


    constructor(potion_type:EPotion,potion_rarity:EPotionRarity) {
        this.potion_type = potion_type
        this.potion_rarity = potion_rarity
        if (this.potion_type === EPotion.HEALTH) {
            switch (this.potion_rarity) {
                case EPotionRarity.SMALL:this.amount = 50; break;
                case EPotionRarity.MEDIUM:this.amount = 150; break;
                case EPotionRarity.LARGE:this.amount = 250; break;
                default:  this.amount = 0; break;
            }
        }
        else if (this.potion_type === EPotion.MANA) {
            switch (this.potion_rarity) {
                case EPotionRarity.SMALL:this.amount = 40; break;
                case EPotionRarity.MEDIUM:this.amount = 120; break;
                case EPotionRarity.LARGE:this.amount = 200; break;
                default:  this.amount = 0; break;
            }
        }
        else{
            this.amount = 0;
        }
    }

}