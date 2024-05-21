import { FunctionComponent } from "react";
import Potion from "../../models/Items/Potion";
import HeroPotionElement from "./heroElements/HeroPotionElement";

interface HeroPotionComponentProps {
    potions:Array<Potion>
    potionsActive:boolean,
    setPotionsActive:(active:boolean)=>void;
    drinkPotion:(potion:Potion)=>void;
}
 
const HeroPotionComponent: FunctionComponent<HeroPotionComponentProps> = ({potions,potionsActive,setPotionsActive,drinkPotion}) => {
    return ( 
        <div className={ potionsActive ? "hero-pop-up hero-pop-up-active" : "hero-pop-up" }  >
            <div className="hero-potion-div">
                <div>
                    <div className="hero-pop-up-close-btn" onClick={ () => setPotionsActive(false) }>
                        <img src="./arts/Hero Inventory Close.jpg" alt="" />
                    </div>
                </div>
                <div className="hero-potion-table-div">
                    {
                        potions.map( (potion,key) => {
                            return <HeroPotionElement key={key} potion={potion} drinkPotion={drinkPotion} />
                        })
                    }
                </div>
            </div>
        </div>
     );
}
 
export default HeroPotionComponent;