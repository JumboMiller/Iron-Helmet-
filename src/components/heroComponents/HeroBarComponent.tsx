import { FunctionComponent, useEffect } from "react";
import Skill from "../../models/Skills/Skill";
import Hero from "../../models/Units/Hero";
import { ERoom } from "../../models/Enums/ERoom";
import HeroMapElement from "./heroElements/HeroMapElement";


interface HeroBarComponentProps {
    hero:Hero;
    dungeon_map: Array<Array<number>>;
    isFighting:boolean;
    selectedMove:Skill;
    current_room_id:number;
    chooseMove:(skill:Skill) => void;
    chooseRoom:(room_id:number) => void;
    getRoomType:(room_id:number)=>ERoom;
    setInventoryActive:(active:boolean)=>void;
    setPotionsActive:(active:boolean)=>void;
}
 
const HeroBarComponent: FunctionComponent<HeroBarComponentProps> = ({hero,dungeon_map,current_room_id,isFighting,selectedMove,
    chooseMove,chooseRoom,getRoomType,setInventoryActive,setPotionsActive}) => {
   
    const chosen_spell_class_name = "hero-bar-chosen-spell"
 
    //remake
    useEffect(()=>{
        document.querySelector(".hero-bar-chosen-spell")?.classList.remove(chosen_spell_class_name)
        document.getElementById("hero-bar-spell-"+(hero.skills.indexOf(selectedMove)+1))?.classList.add(chosen_spell_class_name)

    },[selectedMove])

   
    return ( 
        <div className="hero-bar">
            <div className="hero-bar-info">
                <img className="unit-character" src={"./arts/"+hero.unit_type+".png"} alt={hero.unit_type}/>
                <ul>
                    <li>{hero.name} - {hero.hero_class}</li>
                    <li>------------------</li>
                    <li>HP:{hero.health}/{hero.max_health}</li>
                    <li>Mana:{hero.mana}/{hero.max_mana}</li>
                    <li>Armor:{hero.armor}</li>
                    <li>Mag-Resist:{hero.magic_resist}</li>
                    <li>Coins:{hero.inventory.coins}</li>
                </ul>
            </div>
            <div className={["hero-bar-spell-bar ", isFighting ? "spell-bar-active":"spell-bar-blocked"].join(' ')}>
                <div className="hero-bar-spell ">
                    <img id="hero-bar-spell-1" className="hero-bar-chosen-spell" onClick={()=>chooseMove(hero.skills[0])} src={"./arts/"+hero.skills[0].name+".jpg"} alt="" />
                </div>
                <div className="hero-bar-spell">
                    <img id="hero-bar-spell-2"  onClick={()=>chooseMove(hero.skills[1])} src={"./arts/"+hero.skills[1].name+".jpg"} alt="" />
                    <p>{hero.skills[1].mana_cost}</p>
                </div>    
                <div className="hero-bar-spell">
                    <img id="hero-bar-spell-3"  onClick={()=>chooseMove(hero.skills[2])} src={"./arts/"+hero.skills[2].name+".jpg"} alt="" />
                    <p>{hero.skills[2].mana_cost}</p>
                </div>
                <div className="hero-bar-spell">
                    <img id="hero-bar-spell-4" onClick={()=>chooseMove(hero.skills[3])} src={"./arts/"+hero.skills[3].name+".jpg"} alt="" />
                    <p>{hero.skills[3].mana_cost}</p>
                </div> 
           </div>
           <div className="hero-bar-console">
                <div className="hero-bar-console-btn" onClick={()=>setPotionsActive(true)}>
                    <img src="./arts/Hero Potions.jpg" alt="" />
                </div>
                <div className="hero-bar-console-btn" onClick={()=>setInventoryActive(true)}>
                    <img src="./arts/Hero Inventory.jpg" alt="" />
                </div>
           </div>
           {    
               // !isFighting ?
                    <div className="hero-bar-map">
                    {
                        dungeon_map.map( (arr_elem,key) => { 
                            return <div className="hero-bar-map-line" key={key}>
                                    {arr_elem.map((elem,key) => 
                                        <HeroMapElement current_room_id={current_room_id} room_number={elem} chooseRoom={chooseRoom} getRoomType={getRoomType} key={key}/>) 
                                    }
                                </div> 
                        })
                        
                    }
                    </div>
              //  : null
           }
          
        </div>
     );
}
export default HeroBarComponent;