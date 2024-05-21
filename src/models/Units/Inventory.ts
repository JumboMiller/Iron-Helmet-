import { EClass } from "../Enums/EClass"
import { EItem } from "../Enums/EItem"
import Item from "../Items/Item"
import Potion from "../Items/Potion"

export class Invetory {

    helmet:Item | null
    cuirass:Item | null
    leggings:Item | null
    gloves:Item | null
    boots:Item | null
    weapon:Item | null
    
    coins:number
    potions:Array<Potion>
    backpack:Array<Item>

    constructor() {
        this.helmet = null
        this.cuirass = null
        this.leggings = null
        this.gloves = null
        this.boots = null
        this.weapon = null
        this.coins = 0
        this.backpack = new Array<Item>()
        this.potions = new Array<Potion>()
    }

    setNewItem(item:Item):void{
        switch (item.item_type) {
            case EItem.HELMET: this.helmet = item; break;
            case EItem.CUIRASS: this.cuirass = item; break;
            case EItem.LEGGINGS: this.leggings = item; break;
            case EItem.GLOVES: this.gloves = item; break;
            case EItem.BOOTS: this.boots = item; break;
            case EItem.WEAPON: this.weapon = item; break;
            default: console.log("Item Errore 418");break;
        }
    }
    setNewPotions(potions:Array<Potion>){
        if (potions.length <= 10) {
            this.potions = potions
        }
        else{
            console.log("Potion Errore 309")
        }
        
    }
    getAllStats(){
        let stats = { "strength":0,"agility":0,"intellect":0,"armor":0,"magic_resist":0 }
        let arr:Array<Item> = new Array<Item>()
        if (this.helmet !== null) {
            arr.push(this.helmet)
        }
        if (this.cuirass !== null) {
            arr.push(this.cuirass)
        }
        if (this.leggings !== null) {
            arr.push(this.leggings)
        }
        if (this.gloves !== null) {
            arr.push(this.gloves)
        }
        if (this.boots !== null) {
            arr.push(this.boots)
        }
        if (this.weapon !== null) {
            arr.push(this.weapon)
        }
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].item_class) {
                case EClass.STRENGTH: stats.strength += arr[i].stat_amount; break;
                case EClass.AGILITY: stats.agility += arr[i].stat_amount; break;
                case EClass.INTELLECT: stats.intellect += arr[i].stat_amount; break;
                default:console.log("Item Stats Error 432"); break;
            }
            stats.armor += arr[i].armor
            stats.magic_resist += arr[i].magic_resist
        }
        return stats
    }

}