import { FunctionComponent, useEffect, useState } from "react";
import { ETypeOfSpell } from "../models/Enums/ETypeOfSpell";
import Skill from "../models/Skills/Skill";
import Enemy from "../models/Units/Enemy";
import Hero from "../models/Units/Hero";
import EnemyComponent from "./enemyComponents/EnemyComponent";
import HeroComponent from "./heroComponents/HeroComponent";
import { ESkillAction } from "../models/Enums/ESkillAction";
import Room from "../models/Room/Room";
import HeroBarComponent from "./heroComponents/HeroBarComponent";
import { ERoom } from "../models/Enums/ERoom";
import ChestComponent from "./chestComponents/ChestComponent";
import HeroInventoryComponent from "./heroComponents/HeroInventoryComponent";
import HeroPotionComponent from "./heroComponents/HeroPotionComponent";
import Potion from "../models/Items/Potion";
import { EPotion } from "../models/Enums/EPotion";
import Item from "../models/Items/Item";

interface DungeonRoomProps {
    hero:Hero;
    current_room:Room;
    dungeon_map:Array<Array<number>>;
    chooseRoom:(room_id:number) => void;
    getRoomType:(room_id:number)=>ERoom;
}
 
const DungeonRoom: FunctionComponent<DungeonRoomProps> = ({hero,dungeon_map,current_room,chooseRoom,getRoomType}) => {

    const heroattack = hero.skills[0];
    const [inventoryActive , setInventoryActive] = useState<boolean>(false);
    const [potionsActive , setPotionsActive] = useState<boolean>(false);
    const [selectedMove, setSelectedMove] = useState<Skill>(hero.skills[0]);
    const [counterMoves, setCounterMoves] = useState<number>(0);
    const [isFighting, setIsFight] = useState<boolean>(false);
    let enemies =current_room.enemies;

    useEffect(()=>{
        enemies.length === 0 ? setIsFight(false) : setIsFight(true)
        console.log(counterMoves)
    },[counterMoves,chooseRoom])


   
    function takeAllInChest(){
        const roomChest = current_room.chest
        hero.inventory.coins += roomChest.coins
        for (let i = 0; i < current_room.chest.items.length; i++) {
            const item = new Item ( 
                roomChest.items[i].name,
                roomChest.items[i].item_type,
                roomChest.items[i].rarity,
                roomChest.items[i].armor,
                roomChest.items[i].magic_resist,
                roomChest.items[i].stat_amount,
                roomChest.items[i].durability,
                roomChest.items[i].item_class)
            hero.inventory.backpack.push(item)    
        }
        roomChest.emptyChest()
        moveDone()
    }

    function selectSpellCast(skill:Skill)
    { 
        if (hero.mana < skill.mana_cost) {
            return
        }
        if (skill.type_spell === ETypeOfSpell.TARGET) {
            setSelectedMove(skill)
            return
        }
        hero.spellUsed(skill.mana_cost)
        
        if (skill.type_spell === ETypeOfSpell.AOE) {
            aoeSpellCast(skill)
        }
        else if(skill.type_spell === ETypeOfSpell.RANDOMTARGET){
            randomTargetSpellCast(skill)
        } 
        else if(skill.type_spell === ETypeOfSpell.SELF){
            selfSpellCast(skill)
        } 
        moveDone()
    }
    function selectEnemyTarget(enemy:Enemy){
        hero.spellUsed(selectedMove.mana_cost)
        if (selectedMove.spell_sign[0].skill_action === ESkillAction.HEROATTACK) {
            enemy.takingDamage(selectedMove.spell_sign[0].amount*hero.getClassAtributeAmount(),selectedMove.type_of_amount)          
        }
        for (let index = 0; index < selectedMove.spell_sign.length; index++) {
            let spellAction = selectedMove.spell_sign[index].skill_action;

            if(spellAction === ESkillAction.HEAL){
                hero.takingHeal(selectedMove.spell_sign[index].amount)
            } 
            else if(spellAction === ESkillAction.MANAHEAL){
                hero.takingManaHeal(selectedMove.spell_sign[index].amount)
            } 
            else if (spellAction === ESkillAction.MAGICRESISTANCEDEBUFF || spellAction === ESkillAction.ARMORDEBUFF 
                || spellAction === ESkillAction.ENEMYDAMAGEDEBUFF
                || spellAction === ESkillAction.EVASIONDEBUFF) 
            {
                enemy.takingDebuff(spellAction,selectedMove.spell_sign[index].amount)
            }
            else if (spellAction === ESkillAction.MAGICRESISTANCEBUFF || spellAction === ESkillAction.ARMORBUFF 
                || spellAction === ESkillAction.HERODAMAGEBUFF
                || spellAction === ESkillAction.EVASIONBUFF) 
            {
                hero.takingBuff(spellAction,selectedMove.spell_sign[index].amount)
            }
            else if (spellAction === ESkillAction.SLOWDOWN || spellAction === ESkillAction.STUN){
                 //control spell
            }
            else if(spellAction === ESkillAction.BURSTDAMAGE){
                  enemy.takingDamage(selectedMove.spell_sign[index].amount*hero.getClassAtributeAmount(),selectedMove.type_of_amount)
                  deathCheck(enemy)        
            } 
        }
        deathCheck(enemy)
        moveDone()
    }
    function aoeSpellCast(skill:Skill){
        for (let index = 0; index < skill.spell_sign.length; index++) {
            let spellAction = skill.spell_sign[index].skill_action;

            if(skill.spell_sign[index].skill_action === ESkillAction.HEAL){
                hero.takingHeal(skill.spell_sign[index].amount)
            } 
            else if(spellAction === ESkillAction.MANAHEAL){
                hero.takingManaHeal(selectedMove.spell_sign[index].amount)
            } 
            else if (spellAction === ESkillAction.MAGICRESISTANCEBUFF || spellAction === ESkillAction.ARMORBUFF 
                || spellAction === ESkillAction.HERODAMAGEBUFF
                || spellAction === ESkillAction.EVASIONBUFF) 
            {
                hero.takingBuff(spellAction,selectedMove.spell_sign[index].amount)
            }
            else{
                for (let i = 0; i < enemies.length; i++) {
                    if (spellAction === ESkillAction.MAGICRESISTANCEDEBUFF || spellAction === ESkillAction.ARMORDEBUFF 
                        || spellAction === ESkillAction.ENEMYDAMAGEDEBUFF
                        || spellAction === ESkillAction.EVASIONDEBUFF) 
                    {
                        enemies[i].takingDebuff(spellAction,skill.spell_sign[index].amount)
                    }
                    else if (spellAction === ESkillAction.SLOWDOWN || spellAction === ESkillAction.STUN){
                        //control spell
                    }
                    else if(spellAction === ESkillAction.BURSTDAMAGE){
                        enemies[i].takingDamage(skill.spell_sign[index].amount*hero.getClassAtributeAmount(),skill.type_of_amount)
                        if (deathCheck(enemies[i])) { 
                            i--;
                        }
                    } 
                }
            }
            
            
        }
    }
    function randomTargetSpellCast(skill:Skill){
        for (let i = 0; i < skill.number_of_targets; i++) {
            const target = Math.floor(Math.random() *  enemies.length);

            for (let index = 0; index < skill.spell_sign.length; index++) {
                let spellAction = skill.spell_sign[index].skill_action;

                if (spellAction === ESkillAction.MAGICRESISTANCEDEBUFF || spellAction === ESkillAction.ARMORDEBUFF 
                    || spellAction === ESkillAction.ENEMYDAMAGEDEBUFF
                    || spellAction === ESkillAction.EVASIONDEBUFF) 
                {
                    enemies[target].takingDebuff(spellAction,skill.spell_sign[index].amount)
                }
                else if (spellAction === ESkillAction.SLOWDOWN || spellAction === ESkillAction.STUN){
                    //control spell
                }
                else if(spellAction === ESkillAction.BURSTDAMAGE){
                    enemies[target].takingDamage(skill.spell_sign[index].amount*hero.getClassAtributeAmount(),skill.type_of_amount)
                    deathCheck(enemies[target])  
                } 
                else if(spellAction === ESkillAction.HEAL){
                    hero.takingHeal(skill.spell_sign[index].amount)
                } 
                else if(spellAction === ESkillAction.MANAHEAL){
                    hero.takingManaHeal(selectedMove.spell_sign[index].amount)
                } 
                else if (spellAction === ESkillAction.MAGICRESISTANCEBUFF || spellAction === ESkillAction.ARMORBUFF 
                    || spellAction === ESkillAction.HERODAMAGEBUFF
                    || spellAction === ESkillAction.EVASIONBUFF) 
                {
                    hero.takingBuff(spellAction,selectedMove.spell_sign[index].amount)
                }
            }
        }
        
    }
    function selfSpellCast(skill:Skill) {
        for (let index = 0; index < skill.spell_sign.length; index++) {
            let spellAction = skill.spell_sign[index].skill_action;

            if (spellAction === ESkillAction.MAGICRESISTANCEBUFF || spellAction === ESkillAction.ARMORBUFF 
                || spellAction === ESkillAction.HERODAMAGEBUFF
                || spellAction === ESkillAction.EVASIONBUFF) 
            {
                hero.takingBuff(spellAction,skill.spell_sign[index].amount)
            }
            else if (spellAction === ESkillAction.TICKINGHEAL){
                //control spell
            }
            else if(spellAction === ESkillAction.HEAL){
                hero.takingHeal(skill.spell_sign[index].amount)
            } 
            else if(spellAction === ESkillAction.MANAHEAL){
                hero.takingManaHeal(skill.spell_sign[index].amount)
            } 
        }
    }
    function deathCheck(enemy:Enemy){
        if (enemy.health <= 0) { 
            enemies.splice(enemies.indexOf(enemy),1)
            return true
        }
    }

    function moveDone(){
        setCounterMoves(prev => prev+1)
        setSelectedMove(heroattack)
    }

    function drinkPotion(potion:Potion):void{
        if (potion.potion_type === EPotion.HEALTH) {
            hero.takingHeal(potion.amount)
        }
        else if(potion.potion_type === EPotion.MANA){
            hero.takingManaHeal(potion.amount)
        }
        hero.inventory.potions.splice(hero.inventory.potions.indexOf(potion),1)
        if (isFighting === true) {
            setPotionsActive(false)
        }
        moveDone()
    }

    return ( 
        <>
        <div className={"dungeon-room "+current_room.room_name}>
        <HeroInventoryComponent hero={hero} inventoryActive={inventoryActive} setInventoryActive={setInventoryActive} />
        <HeroPotionComponent potions={hero.inventory.potions} potionsActive={potionsActive} setPotionsActive={setPotionsActive} drinkPotion={drinkPotion} />
            <HeroComponent
                hero={hero}
            />
            {
                current_room.room_type === ERoom.ENEMYROOM || current_room.room_type === ERoom.BOSSROOM ? enemies.map( (enemy,key) => 
                    <EnemyComponent
                        key={key}
                        enemy={enemy}
                        selectEnemyTarget={selectEnemyTarget}/>)
                : null   
            }
            {
                current_room.room_type === ERoom.CHESTROOM ? 
                <ChestComponent chest={current_room.chest} takeAllInChest={takeAllInChest} />
                : null
            }
        </div>
        <HeroBarComponent
            hero={hero}
            dungeon_map={isFighting===false ? dungeon_map : [[0]]}
            isFighting={isFighting}
            selectedMove={selectedMove}
            current_room_id={current_room.room_id}
            chooseMove={selectSpellCast}
            chooseRoom={chooseRoom}
            getRoomType={getRoomType}
            setInventoryActive={setInventoryActive}
            setPotionsActive={setPotionsActive}
        />
        
        </>
     );
}
 
export default DungeonRoom;