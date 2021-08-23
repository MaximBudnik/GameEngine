import {Asset, AssetLoader} from "../../../AssetLoader";
import {getRandomWeightedLookupFn} from "../../../../Helpers/random";

export enum WallSpritesEnum {
    WALL_LEFT = 'WALL_LEFT',
    WALL_MID = 'WALL_MID',
    WALL_RIGHT = 'WALL_RIGHT',
    WALL_TOP_LEFT = 'WALL_TOP_LEFT',
    WALL_TOP_MID = 'WALL_TOP_MID',
    WALL_TOP_RIGHT = 'WALL_TOP_RIGHT',
}

const getWallAsset = AssetLoader.getEntityAssetUrl('wall')

const asset: Asset = [
    {name: WallSpritesEnum.WALL_LEFT, url: getWallAsset('wall_left.png')},
    {name: WallSpritesEnum.WALL_MID, url: getWallAsset('wall_mid.png')},
    {name: WallSpritesEnum.WALL_RIGHT, url: getWallAsset('wall_right.png')},
    {name: WallSpritesEnum.WALL_TOP_LEFT, url: getWallAsset('wall_top_left.png')},
    {name: WallSpritesEnum.WALL_TOP_MID, url: getWallAsset('wall_top_mid.png')},
    {name: WallSpritesEnum.WALL_TOP_RIGHT, url: getWallAsset('wall_top_right.png')},

]

// export const getRandomFloorTexture = getRandomWeightedLookupFn<FloorSpritesEnum>([
//     {value: FloorSpritesEnum.FLOOR_1, chance: 0.4},
//     {value: FloorSpritesEnum.FLOOR_2, chance: 0.1},
//     {value: FloorSpritesEnum.FLOOR_3, chance: 0.2},
//     {value: FloorSpritesEnum.FLOOR_4, chance: 0.05},
//     {value: FloorSpritesEnum.FLOOR_5, chance: 0.1},
//     {value: FloorSpritesEnum.FLOOR_6, chance: 0.05},
//     {value: FloorSpritesEnum.FLOOR_7, chance: 0.05},
//     {value: FloorSpritesEnum.FLOOR_8, chance: 0.05},
// ], 100)

AssetLoader.add(asset)
