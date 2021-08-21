import {Application} from "pixi.js";
import {EntityEnum} from "./EntityEnum";


export interface IEntity {
    type: EntityEnum
    loopAction: () => void
}

export abstract class Entity implements IEntity {
    public readonly type: EntityEnum
    protected x: number
    protected y: number
    protected getPixiApp: () => Application
    protected getAllTiles: () => Array<Array<IEntity>>

    protected constructor(type: EntityEnum, x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        this.type = type
        this.x = x
        this.y = y
        this.getPixiApp = getPixiApp
        this.getAllTiles = getAllTiles
    }

    protected render = () => {

    }

    loopAction = () => {
        //    To be implemented by child classes
    }

}
