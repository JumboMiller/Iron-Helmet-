import { Unit } from "./Unit"
import { EUnits } from "../Enums/EUnits"
import Skill from "../Skills/Skill";
import { EClass } from "../Enums/EClass";
import { ERarity } from "../Enums/ERarity";
import { Invetory } from "./Inventory";

export default class Hero  extends Unit {
    
    name:string;
    rarity:ERarity;

    strength:number;
    agility:number;
    intellect:number;

    health_regen: number;
    max_mana:number;
    mana:number; 
    mana_regen:number;

    energy:number;
    skills:Skill[];
    hero_class:EClass;

    inventory:Invetory;
    

    constructor(name:string,rarity:ERarity,strength:number,agility:number,intellect:number,skills:Skill[],hero_class:EClass) {
        super()
        this.name = name;
        this.rarity = rarity;

        this.strength = strength;
        this.agility = agility;
        this.intellect = intellect;
        
        this.max_health = this.strength * 4;
        this.health = this.max_health;
        this.max_mana = this.intellect * 3;
        this.mana = this.max_mana;

        this.health_regen = this.strength * 0.8;
        this.mana_regen = this.intellect * 0.6;

        this.speed = this.agility;
        switch (rarity) {
            case ERarity.COMMON:this.energy=20; break;
            case ERarity.UNCOMMON:this.energy=40; break;
            case ERarity.RARE:this.energy=60; break;
            case ERarity.LEGENDARY:this.energy=100; break;
            default: this.energy=20; break;
        }
        this.skills = skills;
        this.hero_class = hero_class;
        this.unit_type = EUnits.HERO;

        this.inventory = new Invetory()
        
    }


    takingManaHeal(amount:number){
        if (this.mana + amount > this.max_mana) {
            this.mana = this.max_mana
        }else{
            this.mana += amount
        }
    }

    calculateInventoryStats(){
        let stat = this.inventory.getAllStats()
        this.strength += stat.strength
        this.agility += stat.agility
        this.intellect += stat.intellect
        this.armor += stat.armor
        this.magic_resist += stat.magic_resist
        this.setLocalStat()
    }

    private setLocalStat(){
        this.max_health = this.strength * 4;
        this.health = this.max_health;
        this.max_mana = this.intellect * 3;
        this.mana = this.max_mana;

        this.health_regen = this.strength * 0.8;
        this.mana_regen = this.intellect * 0.6;

        this.speed = this.agility;
    }

    

    spellUsed(mana_cost:number){
        this.mana -= mana_cost
    }
    
    getClassAtributeAmount(){
        if (this.hero_class === EClass.STRENGTH) {
            return this.strength
        }
        else if(this.hero_class === EClass.AGILITY){
            return this.agility
        }
        else{
            return this.intellect
        }
    }

}