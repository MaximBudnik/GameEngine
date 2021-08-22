import {AnimatedSprite, Application, Container, Sprite} from "pixi.js";
import {EntityEnum} from "./EntityEnum";
import {Viewport} from "pixi-viewport";


export interface IEntity {
    type: EntityEnum
    loopAction: () => void
}

export class Entity implements IEntity {
    public readonly type: EntityEnum
    protected x: number
    protected y: number
    protected getPixiApp: () => Application
    protected getViewport = ()=> this.getPixiApp().stage.getChildAt(0) as Viewport
    protected getScene = ()=> this.getViewport().getChildAt(0) as Container
    protected getAllTiles: () => Array<Array<IEntity>>
    protected spriteContainer!: Container
    protected sprite!: Sprite | AnimatedSprite
    protected animationSpeed: number = 0.2

    constructor(type: EntityEnum, x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        this.type = type
        this.x = x
        this.y = y
        this.getPixiApp = getPixiApp
        this.getAllTiles = getAllTiles
    }

    protected initialRender = (texture: Array<string> | string) => {
        const scene = this.getScene()
        const {x, y} = this
        this.spriteContainer = new Container();
        this.spriteContainer.x = x * 16;
        this.spriteContainer.y = y * 16;
        scene.addChild(this.spriteContainer);
        if (Array.isArray(texture)) {
            this.sprite = AnimatedSprite.fromFrames(texture)
            if(this.sprite instanceof AnimatedSprite){
                this.sprite.animationSpeed =this.animationSpeed
                this.sprite.play()
            }
        } else {
            this.sprite = Sprite.from(texture);
        }
        this.spriteContainer.addChild(this.sprite);
    }

    loopAction = () => {
        //    To be implemented by child classes
    }

    protected idle = () =>{
        //    To be implemented by child classes in specific cases
    }

}
