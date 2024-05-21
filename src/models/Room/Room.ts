import { EDungeon } from "../Enums/EDungeon";
import { ERoom } from "../Enums/ERoom";
import Chest from "../Units/Chest";
import Enemy from "../Units/Enemy";
import { easyBossGroup } from "../../prototypes/boss-group";
import { easyEnemiesGroup } from "../../prototypes/enemies-group";
import { EUnits } from "../Enums/EUnits";

export default class Room {

    room_id:number;
    room_name:string;
    enemies:Array<Enemy>;
    chest:Chest;
    room_type:ERoom;
    dungeon:EDungeon;
 
    constructor(room_id:number,room_name:string,room_type:ERoom,dungeon:EDungeon) {
        this.room_id = room_id
        this.room_name = room_name
        this.dungeon = dungeon
        this.room_type = room_type
        this.chest = new Chest(EDungeon.NONE)
        if (this.room_type === ERoom.ENEMYROOM) {
            //add new Enemies Group
            this.enemies = this.generateEnemiesGroup(easyEnemiesGroup)
        }
        else if (this.room_type === ERoom.BOSSROOM){
             //add new Boss Group
            this.enemies = this.generateEnemiesGroup(easyBossGroup)
        }
        else if (this.room_type === ERoom.CHESTROOM) {
            this.chest = new Chest(this.dungeon)
            this.enemies = []
        }
        else{
            this.enemies = []
        }
       
    } 
    generateEnemiesGroup(EnemiesGroup:Array<any>):Array<Enemy>{
        const rand = this.randomInteger(0,EnemiesGroup.length-1)
        const enemiesGroup = EnemiesGroup[rand as keyof object]
        let tmpArr:Array<Enemy> = []
        for (let i = 0; i < enemiesGroup.length; i++) {
                tmpArr[i] = new Enemy(
                        enemiesGroup[i].max_health,
                        enemiesGroup[i].min_health,
                        enemiesGroup[i].min_damage,
                        enemiesGroup[i].max_damage,
                        enemiesGroup[i].armor,
                        enemiesGroup[i].magic_resist,
                        enemiesGroup[i].evasion,
                        enemiesGroup[i].max_speed,
                        enemiesGroup[i].min_speed,
                        EUnits[enemiesGroup[i].unit_type as keyof typeof EUnits]
                )
               
        } 
        return tmpArr
    }
    private randomInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
      
}
    