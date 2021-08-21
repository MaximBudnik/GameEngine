import {AnimatedSprite, Application, Container, Sprite} from "pixi.js";
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
    protected spriteContainer!: Container
    protected sprite!: Sprite | AnimatedSprite
    protected animationSpeed: number = 0.25

    protected constructor(type: EntityEnum, x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        this.type = type
        this.x = x
        this.y = y
        this.getPixiApp = getPixiApp
        this.getAllTiles = getAllTiles
    }

    protected initialRender = (texture: Array<string> | string) => {
        const app: Application = this.getPixiApp()
        let {x, y, spriteContainer, sprite} = this
        spriteContainer = new Container();
        spriteContainer.x = x * 16;
        spriteContainer.y = y * 16;
        app.stage.addChild(spriteContainer);
        if (Array.isArray(texture)) {
            sprite = AnimatedSprite.fromFrames(texture)
            if(sprite instanceof AnimatedSprite){
                sprite.animationSpeed =this.animationSpeed
                sprite.play()
            }
        } else {
            sprite = Sprite.from(texture);
        }
        spriteContainer.addChild(sprite);
    }

    loopAction = () => {
        //    To be implemented by child classes
    }

}
