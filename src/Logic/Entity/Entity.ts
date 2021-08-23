import {AnimatedSprite, Application, Container, Sprite} from "pixi.js";
import {EntityEnum} from "./EntityEnum";
import {Viewport} from "pixi-viewport";


export interface IEntity {
    type: EntityEnum
    loopAction: () => void
    canMove: boolean
}

export class Entity implements IEntity {
    public readonly type: EntityEnum
    protected x: number
    protected y: number
    protected xIdx: number
    protected yIdx: number
    protected getPixiApp: () => Application
    protected getViewport = ()=> this.getPixiApp().stage.getChildAt(0) as Viewport
    protected getScene = ()=> this.getViewport().getChildAt(0) as Container
    protected getAllTiles: () => Array<Array<IEntity>>
    protected spriteContainer!: Container
    protected sprite!: Sprite | AnimatedSprite
    protected animationSpeed: number = 0.2
    public readonly canMove: boolean = true

    constructor(type: EntityEnum, x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        this.type = type
        this.xIdx = x
        this.yIdx = y
        this.x = x*16
        this.y = y*16
        this.getPixiApp = getPixiApp
        this.getAllTiles = getAllTiles
    }

    protected initialRender = (texture: Array<string> | string) => {
        const scene = this.getScene()
        const {x, y} = this
        this.spriteContainer = new Container();
        this.spriteContainer.x = x;
        this.spriteContainer.y = y;
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
        // this.sprite.anchor.x = 0.5
    }

    loopAction = () => {
        //    To be implemented by child classes
    }

    protected idle = () =>{
        //    To be implemented by child classes in specific cases
    }

    protected getTile = (x: number, y: number): IEntity | null => {
        const arr = this.getAllTiles()[x]
        return arr && arr[y] || null
    }


}
