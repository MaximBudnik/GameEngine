import {Entity, IEntity} from "../Entity";
import {Application, Rectangle, Texture} from "pixi.js";
import {EntityEnum} from "../EntityEnum";
import {playerKnightIdleTextureArray, playerKnightRunTextureArray} from "./Asset";
import {ControlRegister, IControlRegister} from "./ControlRegister";
import {keyBindings} from "../../../keyBindings";
import {IMoveMixin, MoveMixin} from "../../Mixins/MoveMixin";

const {MOVE_RIGHT, MOVE_UP, MOVE_DOWN, MOVE_LEFT} = keyBindings

export interface IPlayer extends IEntity, IMoveMixin {

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

        this.setupCamera()
    }

    speed = 10

    private setupCamera = () => {
        const app = this.getPixiApp()
        const scene = this.getScene()
        const viewport = this.getViewport()
        const renderer = app.renderer

        viewport.position.set(renderer.screen.width / 2, renderer.screen.height / 2);
        viewport.pivot.copyFrom(this.spriteContainer.position);

        scene.x = viewport.pivot.x - renderer.screen.width / 2;
        scene.y = viewport.pivot.y - renderer.screen.height / 2;
        scene.width = renderer.screen.width;
        scene.height = renderer.screen.height;
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
            // console.log(this.x, this.y)
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
        this.camera()
    }

    private camera = () => {
        const viewport = this.getViewport()
        const scene = this.getScene()
        const app = this.getPixiApp()
        const renderer = app.renderer
        const targetPivot = this.spriteContainer.position;
        const delta = 0.075

        viewport.pivot.x = (targetPivot.x - viewport.pivot.x) * delta + viewport.pivot.x;
        viewport.pivot.y = (targetPivot.y - viewport.pivot.y) * delta + viewport.pivot.y;

    }

}
