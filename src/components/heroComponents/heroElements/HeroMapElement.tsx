import { FunctionComponent } from "react";
import { ERoom } from "../../../models/Enums/ERoom";

interface HeroMapElementProps {
    current_room_id:number;
    room_number:number;
    chooseRoom:(room_id:number)=>void;
    getRoomType:(room_id:number)=>ERoom;
}
 
const HeroMapElement: FunctionComponent<HeroMapElementProps> = ({current_room_id,room_number,chooseRoom,getRoomType}) => {
    
    function setIcon(){
        if (room_number === 0) {
            return "no-room";
        }
        else if(current_room_id === room_number){
            return "current-room";
        }
        const roomType:ERoom = getRoomType(room_number)

        switch (roomType) {
            case ERoom.STARTROOM : return "start-room";
            case ERoom.ENEMYROOM : return "enemy-room"; 
            case ERoom.CHESTROOM : return "chest-room"; 
            case ERoom.BOSSROOM  : return "boss-room";  
            default: return "fight-room";
        }
    }

    return ( 
        <div className={"hero-bar-map-block "+setIcon()} onClick={() => chooseRoom(room_number)} >
           
        </div>
     );
}
 
export default HeroMapElement;