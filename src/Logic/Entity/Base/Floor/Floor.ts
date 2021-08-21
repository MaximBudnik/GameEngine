import {Entity, IEntity} from "../../Entity";
import {EntityEnum} from "../../EntityEnum";
import {getRandomWeightedLookupFn} from "../../../../Helpers/random";
import {FloorSpritesEnum} from "./Asset";
import {Application} from "pixi.js";


export class Floor extends Entity {
    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        const texture = Floor.getRandomFieldTexture()
        super(EntityEnum.Floor, x, y, getPixiApp, getAllTiles)
    }

    static getRandomFieldTexture = getRandomWeightedLookupFn<FloorSpritesEnum>([
        {value: FloorSpritesEnum.FLOOR_1, chance: 0.4},
        {value: FloorSpritesEnum.FLOOR_2, chance: 0.1},
        {value: FloorSpritesEnum.FLOOR_3, chance: 0.2},
        {value: FloorSpritesEnum.FLOOR_4, chance: 0.05},
        {value: FloorSpritesEnum.FLOOR_5, chance: 0.1},
        {value: FloorSpritesEnum.FLOOR_6, chance: 0.05},
        {value: FloorSpritesEnum.FLOOR_7, chance: 0.05},
        {value: FloorSpritesEnum.FLOOR_8, chance: 0.05},
    ], 100)

}
