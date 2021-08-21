import {CurriedFunction2, curry } from "lodash"
import {Loader, LoaderResource} from "pixi.js"


export interface IAssetLoader {
    add: (asset: Asset) => void
    load: () => void
    setOnLoaderProgress: (fn: (loader: Loader, resource: LoaderResource) => void) => void
    setOnLoaderComplete: (fn: (loader: Loader, resource: LoaderResource) => void) => void
    getEntityAssetUrl: CurriedFunction2<string, string, string>
}

type resource = { name: string, url: string }
export type Asset = Array<resource>

class _AssetLoader implements IAssetLoader {

    private registeredAssets: Array<Asset> = []

    constructor() {
    }

    setOnLoaderProgress = (fn: (loader: Loader, resource: LoaderResource) => void) => {
        Loader.shared.onProgress.add(fn);

    }

    setOnLoaderComplete = (fn: Function) => {
        // @ts-ignore
        Loader.shared.onComplete.add(fn);
    }

    add = (asset: Asset) => {
        this.registeredAssets.push(asset)
        return this
    }

    load = () => {
        for (let i = 0; i < this.registeredAssets.length; i++) {
            Loader.shared.add(this.registeredAssets[i])
        }
        Loader.shared.load();
    }

    getEntityAssetUrl = curry<string,string,string>((assetName: string,entityName:string) => `resources/images/entities/${entityName}/${assetName}`)

}

export const AssetLoader = new _AssetLoader()
