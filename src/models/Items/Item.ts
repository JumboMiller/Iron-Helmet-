import { EClass } from "../Enums/EClass"
import { EItem } from "../Enums/EItem"
import { ERarity } from "../Enums/ERarity"

export default class Item {
    name:string
    item_type:EItem
    rarity:ERarity
    armor:number
    magic_resist:number
    stat_amount:number
    durability:number
    item_class:EClass


    constructor(name:string,item_type:EItem,rarity:ERarity,armor:number,magic_resist:number,stat_amount:number,durability:number,item_class:EClass) {
        this.name = name
        this.item_type = item_type
        this.rarity = rarity
        this.armor = armor
        this.magic_resist = magic_resist
        this.stat_amount = stat_amount
        this.durability = durability
        this.item_class = item_class
        
    }
}