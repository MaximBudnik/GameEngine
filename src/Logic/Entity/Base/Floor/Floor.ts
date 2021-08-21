import {Entity, IEntity} from "../../Entity";
import {EntityEnum} from "../../EntityEnum";
import {getRandomFloorTexture} from "./Asset";
import {Application} from "pixi.js";


export class Floor extends Entity {

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Floor, x, y, getPixiApp, getAllTiles)
        this.initialRender(getRandomFloorTexture())
    }

}
