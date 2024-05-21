import { Unit } from "./Unit"
import { EUnits } from "../Enums/EUnits"

export default class Enemy extends Unit {

    damage:number

    constructor(
        max_health:number,min_health:number,min_damage:number,max_damage:number,
        armor:number,magic_resist:number,evasion:number,
        min_speed:number,max_speed:number,unit_type:EUnits) {
        
        super()  
       
        this.max_health = min_health+Math.floor(Math.random() * (max_health-min_health) + 1);
        this.health = this.max_health;
        this.damage = min_damage+Math.floor(Math.random() * (max_damage-min_damage) + 1);
        this.armor = armor;
        this.magic_resist = magic_resist;
        this.evasion = evasion;
        this.speed = min_speed + Math.floor(Math.random() * (max_speed-min_speed) + 1);
        this.unit_type = unit_type;
        
    }

    
}