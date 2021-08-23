import {AnimatedSprite, Texture} from "pixi.js";
import {Entity} from "../Entity/Entity";

export interface IMoveMixin {

}

type Constructor<T> = new (...args: any[]) => T;
export const MoveMixin = <T extends Constructor<Entity>>(SuperClass: T) => class extends SuperClass implements IMoveMixin {
    protected speed = 1
    protected isMoving = false
    private currentLoopToStop = 0
    private readonly loopsToStopMoving = 10
    protected idleTextureArray!: Array<Texture>
    protected runTextureArray!: Array<Texture>


    protected move = (moveDirection: {
        x: number
        y: number
    }) => {


        if (!this.isMoving) {
            this.isMoving = true
            if (this.sprite instanceof AnimatedSprite) {
                this.sprite.textures = this.runTextureArray
                this.sprite.play()
            }
        }

        const xMovement = moveDirection.x * this.speed
        const yMovement = moveDirection.y * this.speed
        const canMove = this.checkMove(xMovement, yMovement)

        if (!canMove) return

        this.x += xMovement
        this.y += yMovement


        this.spriteContainer.x += xMovement
        this.spriteContainer.y += yMovement
    }

    protected checkMove = (xMovement: number, yMovement: number): boolean => {
        const currentX = this.x
        const currentY = this.y
        const futureX = currentX + xMovement
        const futureY = currentY + yMovement


        console.log(futureX, futureY)

        const xIdx = xMovement < 0 ? Math.floor(futureX / 16) : Math.ceil(futureX / 16)
        const yIdx =  yMovement < 0 ? Math.floor(futureY / 16) : Math.floor((futureY+10) / 16)
        console.log(xIdx, yIdx)
        const tile = this.getTile(xIdx, yIdx)

        const canMove = tile?.canMove ?? false

        return canMove
    }

    protected idle = () => {
        this.currentLoopToStop++
        if (this.isMoving && this.currentLoopToStop >= this.loopsToStopMoving) {
            this.isMoving = false
            this.currentLoopToStop = 0
            if (this.sprite instanceof AnimatedSprite) {
                this.sprite.textures = this.idleTextureArray
                this.sprite.play()
            }
        }
    }


};
