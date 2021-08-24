import {Entity, IEntity} from "../../Entity";
import {EntityEnum} from "../../EntityEnum";
import {getRandomFloorTexture} from "./Asset";
import {Application} from "pixi.js";
import {TilemapRenderMixin} from "../../../Mixins/TilemapRenderMixin";


export class Floor extends TilemapRenderMixin(Entity) {

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Floor, x, y, getPixiApp, getAllTiles)
        this.tilemapName = 'floorTilemap'
        this.initialRender(getRandomFloorTexture())
    }

}
