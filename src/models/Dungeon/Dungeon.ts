import Room from "../Room/Room";
import { ERoom } from "../Enums/ERoom";
import { EDungeon } from "../Enums/EDungeon";
import { dungeonProtocol, dungeonTProtocol } from "../../prototypes/protocol/dungeon-protocol";

export default class Dungeon {

    dungeon:EDungeon;
    rooms:Array<Room>;
    map: Array<Array<number>>;
    is_burn:boolean;
 
    constructor(dungeon:EDungeon) {
        this.dungeon = dungeon
        this.rooms = new Array<Room>()
        this.map = []
        this.is_burn = false
        this.generateRooms()
    } 

    generateRooms(){
        let dungeonProt:dungeonTProtocol
        switch (this.dungeon) {
            case EDungeon.CAVE:dungeonProt = dungeonProtocol["Cave"];break;
            case EDungeon.CASTLE:dungeonProt = dungeonProtocol["Castle"];break;
            case EDungeon.CASTLEKEY:dungeonProt = dungeonProtocol["CastleKey"];break;
            case EDungeon.ROYALCHAMBERS:dungeonProt = dungeonProtocol["RoyalChambers"];break;
            case EDungeon.ROYALCHAMBERSKEY:dungeonProt = dungeonProtocol["RoyalChambersKey"];break;
            default: dungeonProt = dungeonProtocol["Cave"];break;
        }
        this.rooms.push(new Room(1,"test-dungeon-start-room",ERoom.STARTROOM,this.dungeon))
        for (let i = 2; i < dungeonProt.numbersOfRooms-1; i++) {
            const rand =  Math.floor(Math.random() * 100)
            if (rand <= dungeonProt.chestChance) {
                this.rooms.push(new Room(i,`test-dungeon-${i-1}-room`,ERoom.CHESTROOM,this.dungeon))
            }
            else{
                this.rooms.push(new Room(i,`test-dungeon-${i-1}-room`,ERoom.ENEMYROOM,this.dungeon))
            }
        }
        this.rooms.push(new Room(7,"test-dungeon-6-room",ERoom.BOSSROOM,this.dungeon))
        this.rooms.push(new Room(8,"test-dungeon-7-room",ERoom.CHESTROOM,this.dungeon))  
        this.generateMap(dungeonProt)
    }
    generateMap(dungeonProt:dungeonTProtocol){
        let map = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
        let Base_x = this.randomInteger(0,4)
        let Base_y = this.randomInteger(0,4)
        map[Base_x][Base_y] = 1;
        let x = Base_x;
        let y = Base_y;
        let randErroreScore = 0;
        for (let i = 2; i < dungeonProt.numbersOfRooms+1; i++) {
            
            const vector = this.randomInteger(1,4)
            let _x = x;
            let _y = y;
            switch (vector) {
                case 1:_y -= 1;break;
                case 2:_x += 1;break;
                case 3:_y += 1;break;
                case 4:_x -= 1;break;
                default:console.log("Rand Errore 209");break;
            }
            if (_x < 0 || _x > 4 || _y < 0 || _y > 4) {
                i--;
                continue
            }
            if (map[_x][_y] !== 0) {
                randErroreScore++;
                if (randErroreScore >= 8) {
                    map = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
                    map[Base_x][Base_y] = 1;
                    i = 1;
                    x = Base_x;
                    y = Base_y;
                    continue
                }
                else{
                    i--;
                    continue
                }
            }
            map[_x][_y] = i;
            const randFork = this.randomInteger(1,5)
            if (randFork !== 1) {
                x = _x;
                y = _y;
            } 
        }
        console.log(map);
        this.map = map;
    }
    private randomInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

