import {Entity, IEntity} from "../../Entity";
import {EntityEnum} from "../../EntityEnum";
import {getWallTextureType, WallSpritesEnum} from "./Asset";
import {Application} from "pixi.js";
import {TilemapRenderMixin} from "../../../Mixins/TilemapRenderMixin";
import {SPRITE_SIZE} from "../../../../constants";

export interface IWall extends IEntity {
    wallTextureNumber: number
}


export class Wall extends TilemapRenderMixin(Entity) implements IWall {
    canMove = false
    public wallTextureNumber!: 1 | 2 | 3

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Wall, x, y, getPixiApp, getAllTiles)
        this.tilemapName = 'wallTilemap'
        this.detectWallTextureAndRender()
    }

    private detectWallTextureAndRender = () => {
        const {xIdx, yIdx} = this

        let texture: string = ''
        let leftTile = this.getTile(xIdx - 1, yIdx) as IWall

        const textureType = getWallTextureType()

        if (leftTile?.type !== this.type) {
            texture = WallSpritesEnum.WALL_LEFT
            this.wallTextureNumber = 1
        } else
            switch (leftTile.wallTextureNumber) {
                case 1:
                    texture = WallSpritesEnum.WALL_MID
                    this.wallTextureNumber = 2
                    break;
                case 2:
                    texture = WallSpritesEnum.WALL_RIGHT
                    this.wallTextureNumber = 3
                    break;
                case 3:
                    texture = WallSpritesEnum.WALL_LEFT
                    this.wallTextureNumber = 1
                    break;
            }

        if (textureType === "hole_1") {
            texture = WallSpritesEnum.WALL_HOLE_1
            this.wallTextureNumber = 3
        } else if (textureType === "hole_2") {
            texture = WallSpritesEnum.WALL_HOLE_2
            this.wallTextureNumber = 3
        }

        this.initialRender(texture)
        this.renderUpperBorder()
    }

    protected renderUpperBorder = () => {
        let upperBorderTexture: string = ''
        const {x, y, xIdx, yIdx} = this

        let upperTile = this.getTile(xIdx, yIdx - 1)

        if (upperTile?.type === this.type) return

        switch (this.wallTextureNumber) {
            case 1:
                upperBorderTexture = WallSpritesEnum.WALL_TOP_LEFT
                break;
            case 2:
                upperBorderTexture = WallSpritesEnum.WALL_TOP_MID
                break;
            case 3:
                upperBorderTexture = WallSpritesEnum.WALL_TOP_RIGHT
                break;
        }

        this.renderTile(upperBorderTexture, x, y - SPRITE_SIZE)
    }

}
