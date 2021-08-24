import {Asset, AssetLoader} from "../../../AssetLoader";
import {getRandomWeightedLookupFn} from "../../../../Helpers/random";

export enum WallSpritesEnum {
    WALL_LEFT = 'WALL_LEFT',
    WALL_MID = 'WALL_MID',
    WALL_RIGHT = 'WALL_RIGHT',

    WALL_TOP_LEFT = 'WALL_TOP_LEFT',
    WALL_TOP_MID = 'WALL_TOP_MID',
    WALL_TOP_RIGHT = 'WALL_TOP_RIGHT',

    WALL_HOLE_1 = 'WALL_HOLE_1',
    WALL_HOLE_2 = 'WALL_HOLE_2',
}

const getWallAsset = AssetLoader.getEntityAssetUrl('wall')

const asset: Asset = [
    {name: WallSpritesEnum.WALL_LEFT, url: getWallAsset('wall_left.png')},
    {name: WallSpritesEnum.WALL_MID, url: getWallAsset('wall_mid.png')},
    {name: WallSpritesEnum.WALL_RIGHT, url: getWallAsset('wall_right.png')},

    {name: WallSpritesEnum.WALL_TOP_LEFT, url: getWallAsset('wall_top_left.png')},
    {name: WallSpritesEnum.WALL_TOP_MID, url: getWallAsset('wall_top_mid.png')},
    {name: WallSpritesEnum.WALL_TOP_RIGHT, url: getWallAsset('wall_top_right.png')},

    {name: WallSpritesEnum.WALL_HOLE_1, url: getWallAsset('wall_hole_1.png')},
    {name: WallSpritesEnum.WALL_HOLE_2, url: getWallAsset('wall_hole_2.png')},
]

export const getWallTextureType = getRandomWeightedLookupFn<'normal'| 'hole_1' | 'hole_2' >([
    {value:'normal', chance: 0.9},
    {value:'hole_1', chance: 0.05},
    {value:'hole_2', chance: 0.05},
], 100)


AssetLoader.add(asset)
