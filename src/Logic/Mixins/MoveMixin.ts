import {AnimatedSprite, Texture} from "pixi.js";
import {Entity} from "../Entity/Entity";

export interface IMoveMixin {

}

type Constructor<T> = new (...args: any[]) => T;
export const MoveMixin = <T extends Constructor<Entity>>(SuperClass: T) => class extends SuperClass implements IMoveMixin {
    protected speed = 2
    protected bothDirectionsMovementMultiplier = 0.75
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

        if(moveDirection.x !== 0 && moveDirection.x !== this.spriteContainer.scale.x){
            this.spriteContainer.scale.x = moveDirection.x
        }

        const currentSpeed = moveDirection.x !== 0 && moveDirection.y !== 0 ? this.speed * this.bothDirectionsMovementMultiplier : this.speed

        const xMovement = moveDirection.x * currentSpeed
        const yMovement = moveDirection.y * currentSpeed
        this.x += xMovement
        this.y += yMovement
        this.spriteContainer.x += xMovement
        this.spriteContainer.y += yMovement
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
