import { FunctionComponent, useState } from "react";
import Hero from "../models/Units/Hero";
import DungeonRoom from "./DungeonRoom";
import Dungeon from "../models/Dungeon/Dungeon";
import Room from "../models/Room/Room";


interface DungeonComponentProps {
    hero:Hero;
    dungeon:Dungeon;
}
 
const DungeonComponent: FunctionComponent<DungeonComponentProps> = ({hero,dungeon}) => {
  
    const [currentRoom, setCurrentRoom] = useState<Room>(dungeon.rooms[0]);       
    const [userMap, setUserMap] = useState<Array<Array<number>>>(printMap());


    function chooseRoom(room_id:number){
        if (room_id === 0) {
            return
        }
        if (room_id === dungeon.rooms.length && currentRoom.room_id !== dungeon.rooms.length-1) {
            return 
        }
        setUserMap(radarMap(room_id,userMap))
        setCurrentRoom(dungeon.rooms[room_id-1])
    }
    function printMap(){
        let tmpMap :Array<Array<number>> = [[]]
        for (let i = 0; i < dungeon.map.length; i++) {
            for (let j = 0; j < dungeon.map[i].length; j++) {
                dungeon.map[i][j] <= 2  ? tmpMap[i][j] = dungeon.map[i][j] : tmpMap[i][j] = 0 ; 
            } 
            tmpMap.push([])
        }
        tmpMap.pop()
        return tmpMap
    }
    function radarMap(room_id:number,arr:Array<Array<number>>){
        const room_cord = findRoom(room_id,dungeon.map)
        let i = room_cord[0]
        let j = room_cord[1]
        if (i - 1 >= 0) {
            arr[i-1][j] = dungeon.map[i-1][j]
        }
        if (i + 1 < arr.length) {
            arr[i+1][j] = dungeon.map[i+1][j]
        }
        if (j - 1 >= 0) {
            arr[i][j-1] = dungeon.map[i][j-1]
        }
        if (j + 1 < arr.length) {
            arr[i][j+1] = dungeon.map[i][j+1]
        }
        return arr
    }
    function findRoom(room_id:number,arr:Array<Array<number>>): Array<number>{
        let room_cord:Array<number> = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                 if(room_id === arr[i][j]) 
                 room_cord = [i,j]
            } 
        }
        return room_cord
    }
    function getRoomType(room_id:number) {
        return dungeon.rooms[room_id-1].room_type
    }

    return ( 
        
        <DungeonRoom 
            hero={hero} 
            dungeon_map={userMap} 
            current_room={currentRoom} 
            chooseRoom={chooseRoom} 
            getRoomType={getRoomType} 
        />
        
     );
}
 
export default DungeonComponent;