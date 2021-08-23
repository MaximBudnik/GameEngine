import {AnimatedSprite, Texture} from "pixi.js";
import {Entity} from "../Entity/Entity";
import {SPRITE_SIZE} from "../../constants";

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

        if (moveDirection.x !== 0 && moveDirection.x !== this.spriteContainer.scale.x) {
            this.spriteContainer.scale.x = moveDirection.x
            this.sprite.position.x += moveDirection.x * SPRITE_SIZE
        }

        const xMovement = moveDirection.x * this.speed
        const yMovement = moveDirection.y * this.speed
        const canMove = this.checkMove(xMovement, yMovement)

        if (canMove.canMoveX) {
            this.x += xMovement
            this.xIdx = Math.round(this.x / SPRITE_SIZE)
            this.spriteContainer.x += xMovement
        }
        if (canMove.canMoveY) {
            this.y += yMovement
            this.yIdx = Math.round(this.y / SPRITE_SIZE)
            this.spriteContainer.y += yMovement
        }

    }

    protected checkMove = (xMovement: number, yMovement: number): {
        canMoveX: boolean
        canMoveY: boolean
    } => {
        const currentX = this.x
        const currentY = this.y
        const futureX = currentX + xMovement
        const futureY = currentY + yMovement

        const xIdx = xMovement < 0 ? Math.floor(futureX / SPRITE_SIZE) : Math.ceil(futureX / SPRITE_SIZE)
        const yIdx = yMovement < 0 ? Math.floor(futureY / SPRITE_SIZE) : Math.floor((futureY + 10) / SPRITE_SIZE)

        const xTile = this.getTile(xIdx, this.yIdx)
        const yTile = this.getTile(this.xIdx, yIdx)

        const canMoveX = xTile?.canMove ?? false
        const canMoveY = yTile?.canMove ?? false

        return {
            canMoveX,
            canMoveY
        }

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
