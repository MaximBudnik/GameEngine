import {Asset, AssetLoader} from "../../../AssetLoader";

export enum FloorSpritesEnum {
    FLOOR_1 = 'FLOOR_1',
    FLOOR_2 = 'FLOOR_2',
    FLOOR_3 = 'FLOOR_3',
    FLOOR_4 = 'FLOOR_4',
    FLOOR_5 = 'FLOOR_5',
    FLOOR_6 = 'FLOOR_6',
    FLOOR_7 = 'FLOOR_7',
    FLOOR_8 = 'FLOOR_8',
}

const getFloorAsset = AssetLoader.getEntityAssetUrl('floor')

const asset: Asset = [
    {name: FloorSpritesEnum.FLOOR_1, url: getFloorAsset('floor_1.png')},
    {name: FloorSpritesEnum.FLOOR_2, url: getFloorAsset('floor_2.png')},
    {name: FloorSpritesEnum.FLOOR_3, url: getFloorAsset('floor_3.png')},
    {name: FloorSpritesEnum.FLOOR_4, url: getFloorAsset('floor_4.png')},
    {name: FloorSpritesEnum.FLOOR_5, url: getFloorAsset('floor_5.png')},
    {name: FloorSpritesEnum.FLOOR_6, url: getFloorAsset('floor_6.png')},
    {name: FloorSpritesEnum.FLOOR_7, url: getFloorAsset('floor_7.png')},
    {name: FloorSpritesEnum.FLOOR_8, url: getFloorAsset('floor_8.png')},
]

AssetLoader.add(asset)
