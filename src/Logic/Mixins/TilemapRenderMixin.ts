import {Entity} from "../Entity/Entity";
import {Sprite, Texture} from "pixi.js";
import {CompositeTilemap} from "@pixi/tilemap";

export interface ITilemapRenderMixin {

}

type Constructor<T> = new (...args: any[]) => T;
export const TilemapRenderMixin = <T extends Constructor<Entity>>(SuperClass: T) => class extends SuperClass implements ITilemapRenderMixin {

    protected initialRender = (texture: Array<string> | string) =>{
        const scene = this.getScene()
        const baseEntityTileMap:CompositeTilemap = scene.getChildByName('baseEntityTileMap') as CompositeTilemap
        const {x, y} = this
        if (Array.isArray(texture)) {

        } else {
            baseEntityTileMap.tile(Texture.from(texture),x*16,y*16)
            this.sprite = Sprite.from(texture);
        }
    }

};
