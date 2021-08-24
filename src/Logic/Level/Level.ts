import {settings} from "../../settings";
import {IEntity} from "../Entity/Entity";
import {Floor} from "../Entity/Base/Floor/Floor";
import {Application} from "pixi.js";
import {IPlayer, Player} from "../Entity/Player/Player";
import {getRandomInRange} from "../../Helpers/random";
import {Wall} from "../Entity/Base/Wall/Wall";

export interface ILevel {
    getAllTiles: () => Array<Array<IEntity>>
    player: IPlayer
}

export class Level implements ILevel {
    private readonly tiles: Array<Array<IEntity>>
    private readonly getPixiApp: () => Application

    public player!: IPlayer

    constructor(getPixiApp: () => Application) {
        this.tiles = []
        this.getPixiApp = getPixiApp
        this.generateLevel()
        this.createPlayer()
    }

    private generateLevel = () => {
        const size = settings.level.size
        for (let x = 0; x < size; x++) {
            this.tiles[x] = []
            for (let y = 0; y < size; y++) {
                if(x === 0 || y ===0 ||x === size-1 || y ===size-1){
                    this.tiles[x][y] = new Wall(x, y, this.getPixiApp, this.getAllTiles)
                }
                else if ((x %4 ===0 || y%4 ===0) && (x %2 !==0 || y%2 !==0)){
                    this.tiles[x][y] = new Wall(x, y, this.getPixiApp, this.getAllTiles)
                }
                else{
                    this.tiles[x][y] = new Floor(x, y, this.getPixiApp, this.getAllTiles)
                }
            }
        }
    }

    private createPlayer = () => {
        const posX = getRandomInRange(0,settings.level.size)
        const posY = getRandomInRange(0,settings.level.size)
        this.player = new Player(posX, posY, this.getPixiApp, this.getAllTiles)
    }

    getAllTiles = () => this.tiles
}
