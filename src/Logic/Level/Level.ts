import {settings} from "../../settings";
import {IEntity} from "../Entity/Entity";
import {Floor} from "../Entity/Base/Floor/Floor";
import {Application} from "pixi.js";

export interface ILevel {
    getTile: (x: number, y: number) => IEntity
    getAllTiles: () => Array<Array<IEntity>>
}

export class Level implements ILevel {
    private readonly tiles: Array<Array<IEntity>>
    private getPixiApp: () => Application

    constructor(getPixiApp: () => Application) {
        this.tiles = []
        this.getPixiApp = getPixiApp
        this.generateLevel()
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
    getTile = (x: number, y: number) => this.tiles[x][y]
    getAllTiles = () => this.tiles
}
