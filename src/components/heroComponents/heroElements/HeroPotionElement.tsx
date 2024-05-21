import { FunctionComponent } from "react";
import Potion from "../../../models/Items/Potion";

interface HeroPotionElementProps {
    potion:Potion
    drinkPotion:(potion:Potion)=>void;
}
 
const HeroPotionElement: FunctionComponent<HeroPotionElementProps> = ({potion,drinkPotion}) => {
    return ( 
        <div  className="hero-potion-table-element" onClick={() => drinkPotion(potion)}> 
            <img src={`./arts/${potion.potion_rarity} ${potion.potion_type}.jpg`} alt="" />
        </div>
     );
}
 
export default HeroPotionElement;