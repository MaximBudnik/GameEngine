import {Entity} from "../Entity/Entity";
import {Texture} from "pixi.js";
import {CompositeTilemap} from "@pixi/tilemap";

export interface ITilemapRenderMixin {

}

type Constructor<T> = new (...args: any[]) => T;
export const TilemapRenderMixin = <T extends Constructor<Entity>>(SuperClass: T) => class extends SuperClass implements ITilemapRenderMixin {

    protected tilemapName: string = ''

    protected initialRender = (texture: Array<string> | string) => {
        const {x, y} = this
        this.renderTile(texture,x,y)
    }

    protected renderTile = (texture: Array<string> | string, x: number, y: number) => {
        const scene = this.getScene()
        const baseEntityTileMap: CompositeTilemap = scene.getChildByName(this.tilemapName) as CompositeTilemap
        if (Array.isArray(texture)) {
            //  TODO
        } else {
            baseEntityTileMap.tile(Texture.from(texture), x, y)
        }
    }

};
