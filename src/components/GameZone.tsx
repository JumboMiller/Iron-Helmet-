import { FunctionComponent } from "react";
import { EAmount } from "../models/Enums/EAmount";
import { EClass } from "../models/Enums/EClass";
import { ESkillAction } from "../models/Enums/ESkillAction";
import { ETypeOfSpell } from "../models/Enums/ETypeOfSpell";
import Skill from "../models/Skills/Skill";
import SpellSign from "../models/Skills/SpellSign";
import Hero from "../models/Units/Hero";
import Dungeon from "../models/Dungeon/Dungeon";
import DungeonComponent from "./DungeonComponent";
import { ERarity } from "../models/Enums/ERarity";
import { EDungeon } from "../models/Enums/EDungeon";
import Item from "../models/Items/Item";
import { EItem } from "../models/Enums/EItem";
import Potion from "../models/Items/Potion";
import { EPotion } from "../models/Enums/EPotion";
import { EPotionRarity } from "../models/Enums/EPotionRarity";

interface GameZoneProps {
   
}
 
const GameZone: FunctionComponent<GameZoneProps> = () => {
    const SKILLS = [ 
        new Skill('Hero Attack',1,0,[new SpellSign(1,ESkillAction.HEROATTACK)],ETypeOfSpell.TARGET,EAmount.PHYSICAL),
        new Skill('Holy Fist',3,25,[
            new SpellSign(1.2,ESkillAction.BURSTDAMAGE),
            new SpellSign(15,ESkillAction.ARMORDEBUFF),
            new SpellSign(25,ESkillAction.MAGICRESISTANCEDEBUFF),
            new SpellSign(30,ESkillAction.HEAL)
        ],ETypeOfSpell.AOE,EAmount.HOLY),
        new Skill('Saint Shield',1,15,[
            new SpellSign(30,ESkillAction.HEAL),
            new SpellSign(1.5,ESkillAction.BURSTDAMAGE),
            new SpellSign(15,ESkillAction.ARMORDEBUFF)
        ],ETypeOfSpell.TARGET,EAmount.MAGICAL),
        new Skill('Rage',2,10,[   
            new SpellSign(25,ESkillAction.MAGICRESISTANCEDEBUFF),
            new SpellSign(15,ESkillAction.ARMORDEBUFF),
            new SpellSign(0.7,ESkillAction.BURSTDAMAGE)       
        ],ETypeOfSpell.RANDOMTARGET,EAmount.PHYSICAL),
        new Skill('Regeneration',1,10,[   
            new SpellSign(30,ESkillAction.HEAL),
            new SpellSign(30,ESkillAction.MANAHEAL),
            new SpellSign(10,ESkillAction.ARMORBUFF),      
        ],ETypeOfSpell.SELF,EAmount.NONE)
    ]
    const hero = new Hero('Nuad',ERarity.COMMON,45,25,25,[SKILLS[0],SKILLS[2],SKILLS[1],SKILLS[3]],EClass.STRENGTH)

    const itemArr = [ new Item("Iron Helmet",EItem.HELMET,ERarity.UNCOMMON,2,2,6,10,EClass.STRENGTH),
    new Item("Cuirass Clown",EItem.CUIRASS,ERarity.COMMON,3,1,8,10,EClass.STRENGTH),
    new Item("Gay Legs",EItem.LEGGINGS,ERarity.COMMON,1,1,3,10,EClass.STRENGTH), 
    new Item("Leather Glovs",EItem.GLOVES,ERarity.COMMON,1,1,3,10,EClass.STRENGTH),
    new Item("Poor Man Boots",EItem.BOOTS,ERarity.UNCOMMON,0,5,2,10,EClass.INTELLECT),
    new Item("Eva Blade",EItem.WEAPON,ERarity.RARE,0,0,10,10,EClass.STRENGTH)
   
    ]
    
    const potionArr = [
        new Potion(EPotion.HEALTH,EPotionRarity.SMALL),
        new Potion(EPotion.HEALTH,EPotionRarity.MEDIUM),
        new Potion(EPotion.HEALTH,EPotionRarity.LARGE),
        new Potion(EPotion.HEALTH,EPotionRarity.LARGE),
        new Potion(EPotion.MANA,EPotionRarity.SMALL),
        new Potion(EPotion.MANA,EPotionRarity.SMALL),
        new Potion(EPotion.MANA,EPotionRarity.SMALL),
        new Potion(EPotion.MANA,EPotionRarity.MEDIUM),
        new Potion(EPotion.MANA,EPotionRarity.MEDIUM),
        new Potion(EPotion.MANA,EPotionRarity.LARGE),
    ]
    
    hero.inventory.setNewPotions(potionArr)
    
    itemArr.forEach(item => {
        hero.inventory.setNewItem(item)
    });
    
    hero.calculateInventoryStats()
  
    
    let dungeon = new Dungeon(EDungeon.CAVE)

    return ( 

        <div className='game-zone '>
            <DungeonComponent hero={hero} dungeon={dungeon}/>
        </div> 
    );
}
 
export default GameZone;