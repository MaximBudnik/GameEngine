import {Entity, IEntity} from "../Entity";
import {Application, Texture} from "pixi.js";
import {EntityEnum} from "../EntityEnum";
import {playerKnightIdleTextureArray, playerKnightRunTextureArray} from "./Asset";
import {ControlRegister, IControlRegister} from "./ControlRegister";
import {keyBindings} from "../../../keyBindings";
import {IMovableEntity, MoveMixin} from "../../Mixins/MoveMixin";

const {MOVE_RIGHT, MOVE_UP, MOVE_DOWN, MOVE_LEFT} = keyBindings

export interface IPlayer extends IEntity, IMovableEntity {

}

export class Player extends MoveMixin(Entity) implements IPlayer {

    private ControlRegister: IControlRegister
    private taskQueue: Array<Function> = []

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Player, x, y, getPixiApp, getAllTiles)
        this.initialRender(playerKnightIdleTextureArray)
        this.ControlRegister = new ControlRegister()
        this.ControlRegister.register()

        this.runTextureArray = playerKnightRunTextureArray.map(e => Texture.from(e))
        this.idleTextureArray = playerKnightIdleTextureArray.map(e => Texture.from(e))
    }

    private processInput = () => {

        const keySet = this.ControlRegister.keySet
        this.processMovementInput(keySet)

    }

    private processMovementInput = (keySet: Set<string>) => {
        let playerMoveDirection = {x: 0, y: 0}
        if (keySet.has(MOVE_UP)) playerMoveDirection.y += -1
        if (keySet.has(MOVE_LEFT)) playerMoveDirection.x += -1
        if (keySet.has(MOVE_RIGHT)) playerMoveDirection.x += 1
        if (keySet.has(MOVE_DOWN)) playerMoveDirection.y += 1
        if (playerMoveDirection.x !== 0 || playerMoveDirection.y !== 0) {
            this.taskQueue.push(() => this.move(playerMoveDirection))
        }
    }

    loopAction = () => {
        this.processInput()
        const action = this.taskQueue.shift()
        if (action) {
            action()
        } else {
            this.idle()
        }
    }

}
