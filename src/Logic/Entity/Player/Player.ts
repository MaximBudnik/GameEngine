import {Entity, IEntity} from "../Entity";
import {Application, Loader, Texture,} from "pixi.js";
import {EntityEnum} from "../EntityEnum";
import {PlayerKnightSpritesEnum} from "./Asset";

export interface IPlayer {

}

export class Player extends Entity implements IPlayer {

    private playerKnightIdleTextureArray = [
        PlayerKnightSpritesEnum.KNIGHT_IDLE_0,
        PlayerKnightSpritesEnum.KNIGHT_IDLE_1,
        PlayerKnightSpritesEnum.KNIGHT_IDLE_2,
        PlayerKnightSpritesEnum.KNIGHT_IDLE_3,
    ]

    private playerKnightHitTextureArray = [
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_HIT),
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_IDLE_0),
    ]

    private playerKnightRunTextureArray = [
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_RUN_0),
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_RUN_1),
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_RUN_2),
        Texture.from(PlayerKnightSpritesEnum.KNIGHT_RUN_3),
    ]

    constructor(x: number, y: number, getPixiApp: () => Application, getAllTiles: () => Array<Array<IEntity>>) {
        super(EntityEnum.Player, x, y, getPixiApp, getAllTiles)
        this.initialRender(this.playerKnightIdleTextureArray)
    }


}
