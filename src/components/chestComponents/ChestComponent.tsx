import { FunctionComponent, useState } from "react";
import Chest from "../../models/Units/Chest";

interface ChestComponentProps {
    chest:Chest
    takeAllInChest:()=>void;
}
 
const ChestComponent: FunctionComponent<ChestComponentProps> = ({chest,takeAllInChest}) => {

    const [chestOpened, setChestOpened] = useState<boolean>(false);
    
    function openChest(){
        if (chest.is_opened === false) {
            setChestOpened(true)
        }   
    }
    function takeAllBtn(){
        takeAllInChest()
        setChestOpened(false)
    }


    return ( 
        <div className="chest" >
            <div className={['unit-logo',  ''].join(' ')}
                onClick={() =>  openChest()}
            >
                <img className="unit-chest" src={"./arts/"+chest.chest_type+".jpg"} alt={chest.chest_type}/>
            </div>
            <div className={ `chest-inventory ${chestOpened ? "chest-active" : "chest-deactivate"} `}>
                <p>Coins - {chest.coins}</p>
                <div className="chest-inventory-backpack">
                    {
                        chest.items.map(
                            (item,key) => <img key={key} className="hero-inventory-stats-item-img" 
                            src={ `./arts/${item.name}.jpg` } alt={item.name}/>
                        )
                    }
                </div>
                <div className="chest-inventory-takeall-btn" onClick={() => takeAllBtn()}>

                </div>
            </div>
        </div>

     );
}
 
export default ChestComponent;