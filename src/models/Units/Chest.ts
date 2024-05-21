import { EClass } from "../Enums/EClass"
import { EDungeon } from "../Enums/EDungeon"
import { EItem } from "../Enums/EItem"
import { ERarity } from "../Enums/ERarity"
import Item from "../Items/Item"

export default class Chest {

    //remake***
    chest_type:EDungeon
    coins:number
    items:Array<Item>
    is_opened:boolean
    
    constructor(chest_type:EDungeon)
    {
        this.chest_type = chest_type
        this.coins = 20
        this.items = [
            new Item("Gay Legs",EItem.LEGGINGS,ERarity.COMMON,1,1,3,10,EClass.STRENGTH),
            new Item("Leather Glovs",EItem.GLOVES,ERarity.COMMON,1,1,3,10,EClass.STRENGTH),
            new Item("Eva Blade",EItem.WEAPON,ERarity.RARE,0,0,10,10,EClass.STRENGTH)
        ]
        this.is_opened = false
    }

    emptyChest() {
        this.coins = 0;
        this.items = new Array<Item>()
        this.is_opened = true
    }
    
}