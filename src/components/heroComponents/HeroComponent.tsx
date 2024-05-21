import { FunctionComponent } from "react";
import Hero from "../../models/Units/Hero";

interface HeroComponentProps {
    hero:Hero
}
 
const HeroComponent: FunctionComponent<HeroComponentProps> = ({hero}) => {
    return ( 
        <div className="unit" >         
            <div className={['unit-logo',  ''].join(' ')}
               // onClick={() => click(unit)}
            >
                <img className="unit-character" src={"./arts/"+hero.unit_type+".png"} alt={hero.unit_type}/>
            </div>
        </div>

     );
}
 
export default HeroComponent;