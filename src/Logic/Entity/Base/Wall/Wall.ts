import {Entity, IEntity} from "../../Entity";
import {EntityEnum} from "../../EntityEnum";
import {WallSpritesEnum} from "./Asset";
import {Application} from "pixi.js";
import {TilemapRenderMixin} from "../../../Mixins/TilemapRenderMixin";


export class Wall extends TilemapRenderMixin(Entity) {
    canMove = false

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Floor, x, y, getPixiApp, getAllTiles)
        this.initialRender(WallSpritesEnum.WALL_LEFT)
    }

}
