import {Asset, AssetLoader} from "../../AssetLoader";

export enum PlayerKnightSpritesEnum {
    KNIGHT_HIT = 'KNIGHT_HIT',
    KNIGHT_IDLE_0 = 'KNIGHT_IDLE_0',
    KNIGHT_IDLE_1 = 'KNIGHT_IDLE_1',
    KNIGHT_IDLE_2 = 'KNIGHT_IDLE_2',
    KNIGHT_IDLE_3 = 'KNIGHT_IDLE_3',
    KNIGHT_RUN_0 = 'KNIGHT_RUN_0',
    KNIGHT_RUN_1 = 'KNIGHT_RUN_1',
    KNIGHT_RUN_2 = 'KNIGHT_RUN_2',
    KNIGHT_RUN_3 = 'KNIGHT_RUN_3',
}

const getKnightAsset = AssetLoader.getEntityAssetUrl('player/knight')

const asset: Asset = [
    {name: PlayerKnightSpritesEnum.KNIGHT_HIT, url: getKnightAsset('knight_f_hit_anim_f0.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_IDLE_0, url: getKnightAsset('knight_f_idle_anim_f0.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_IDLE_1, url: getKnightAsset('knight_f_idle_anim_f1.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_IDLE_2, url: getKnightAsset('knight_f_idle_anim_f2.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_IDLE_3, url: getKnightAsset('knight_f_idle_anim_f3.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_RUN_0, url: getKnightAsset('knight_f_run_anim_f0.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_RUN_1, url: getKnightAsset('knight_f_run_anim_f1.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_RUN_2, url: getKnightAsset('knight_f_run_anim_f2.png')},
    {name: PlayerKnightSpritesEnum.KNIGHT_RUN_3, url: getKnightAsset('knight_f_run_anim_f3.png')},
]

export const playerKnightIdleTextureArray = [
    PlayerKnightSpritesEnum.KNIGHT_IDLE_0,
    PlayerKnightSpritesEnum.KNIGHT_IDLE_1,
    PlayerKnightSpritesEnum.KNIGHT_IDLE_2,
    PlayerKnightSpritesEnum.KNIGHT_IDLE_3,
]

export const playerKnightHitTextureArray = [
    PlayerKnightSpritesEnum.KNIGHT_HIT,
    PlayerKnightSpritesEnum.KNIGHT_IDLE_0,
]

export const playerKnightRunTextureArray = [
    PlayerKnightSpritesEnum.KNIGHT_RUN_0,
    PlayerKnightSpritesEnum.KNIGHT_RUN_1,
    PlayerKnightSpritesEnum.KNIGHT_RUN_2,
    PlayerKnightSpritesEnum.KNIGHT_RUN_3,
]

AssetLoader.add(asset)
