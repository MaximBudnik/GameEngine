import {settings} from "../../settings";
import {IEntity} from "../Entity/Entity";
import {Floor} from "../Entity/Base/Floor/Floor";
import {Application} from "pixi.js";
import {IPlayer, Player} from "../Entity/Player/Player";

export interface ILevel {
    getTile: (x: number, y: number) => IEntity
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
                this.tiles[x][y] = new Floor(x, y, this.getPixiApp, this.getAllTiles)
            }
        }
    }

    private createPlayer = () => {
        this.player = new Player(5, 5, this.getPixiApp, this.getAllTiles)
    }

    getTile = (x: number, y: number) => this.tiles[x][y]
    getAllTiles = () => this.tiles
}
