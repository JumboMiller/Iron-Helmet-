import { FunctionComponent } from "react";
import Hero from "../../models/Units/Hero";
import { JsxElement } from "typescript";

interface HeroInventoryComponentProps {
    hero:Hero
    inventoryActive:boolean,
    setInventoryActive: (active:boolean) => void;
}
 
const HeroInventoryComponent: FunctionComponent<HeroInventoryComponentProps> = ({hero,inventoryActive,setInventoryActive}) => {
    
   

    function printBackPack(){
        const arrBackPack = new Array<JSX.Element>()
        for (let i = 0; i < 8; i++) {
            if (i <= hero.inventory.backpack.length-1 ) {
                arrBackPack.push(
                <img key={i} className="hero-inventory-stats-item-img"  src={ `./arts/${hero.inventory.backpack[i].name}.jpg` }
                alt={hero.inventory.backpack[i].name}/>)
            }
            else{
                arrBackPack.push(
                <img key={i} className="hero-inventory-stats-item-img"  src={ `./arts/Empty-Item-Icon.jpg` } alt="Nothing"/>)
            }
        }
        return arrBackPack
    }
    
    
    return ( 
        <div className={ inventoryActive ? "hero-pop-up hero-pop-up-active" : "hero-pop-up" }  >
            <div className="hero-inventory-div">
                <div>
                    <div className="hero-pop-up-close-btn" onClick={ () => setInventoryActive(false) }>
                        <img src="./arts/Hero Inventory Close.jpg" alt="" />
                    </div>
                </div>
                <div className="hero-inventory-stats-div">
                    <div className="hero-inventory-stats-items">
                        <div className="hero-inventory-stats-items-head">
                            <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.helmet !== null ? `./arts/${hero.inventory.helmet.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />
                        </div>
                        <div className="hero-inventory-stats-items-body">
                            <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.gloves !== null ? `./arts/${hero.inventory.gloves.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />
                            <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.cuirass !== null ? `./arts/${hero.inventory.cuirass.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />
                           <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.weapon !== null ? `./arts/${hero.inventory.weapon.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />
                        </div>
                        <div className="hero-inventory-stats-items-legs">
                            <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.leggings !== null ? `./arts/${hero.inventory.leggings.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />
                            <img className="hero-inventory-stats-item-img" 
                            src={ hero.inventory.boots !== null ? `./arts/${hero.inventory.boots.name}.jpg` : "./arts/Empty-Item-Icon.jpg"} 
                            alt={hero.name}
                            />    
                        </div>
                    </div>
                    <div className="hero-inventory-stats-text">
                        <h3>{hero.name} - {hero.hero_class}</h3>
                        <img className="hero-character-iventory" src={"./arts/"+hero.unit_type+".png"} alt={hero.unit_type}/>
                        <ul>
                            <li>Health:{hero.health}/{hero.max_health}</li>
                            <li>Mana:{hero.mana}/{hero.max_mana}</li>
                            <li>Armor:{hero.armor}</li>
                            <li>Mag-Resist:{hero.magic_resist}</li>
                            <li>-----------</li>
                            <li>Strength:{hero.strength}</li>
                            <li>Agility:{hero.agility}</li>
                            <li>Intellect:{hero.intellect}</li>
                            <li>Mana Regen:{hero.mana_regen}</li>
                            <li>Health Regen:{hero.health_regen}</li>
                            <li>Speed:{hero.speed}</li>
                            <li>Coins:{hero.inventory.coins}</li>
                        </ul>
                    </div>
                </div>
                <div className="hero-inventory-backpack">
                    {
                        printBackPack()
                    }
                </div>
            </div>
        </div>
     );
}
 
export default HeroInventoryComponent;