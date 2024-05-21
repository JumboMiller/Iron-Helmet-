import { FunctionComponent } from "react";
import Enemy from "../../models/Units/Enemy";


interface EnemyComponentProps {
    enemy:Enemy
    selectEnemyTarget:(enemy:Enemy) => void
}
 
const EnemyComponent: FunctionComponent<EnemyComponentProps> = ({enemy,selectEnemyTarget}) => {
    return ( 
        <div className="unit" >
            <div className='unit-hp-bar'>
                <p>Health: {enemy.health.toString()} / {enemy.max_health.toString()} Armor:{enemy.armor}</p>  
            </div>
            
            <div className={['unit-logo',  ''].join(' ')}
                onClick={() => selectEnemyTarget(enemy)}
            >
                <img className="unit-character" src={"./arts/"+enemy.unit_type+".jpg"} alt={enemy.unit_type}/>
            </div>
        </div>

     );
}
 
export default EnemyComponent;