import {settings} from "../settings";
import {ILevel, Level} from "./Level/Level";
import {Application} from "pixi.js";
import {AssetLoader} from "./AssetLoader";

export interface IGameEngine {
    startNewGame: () => void
    pause: () => void
    loadResources: () => Promise<void>
}

type status = 'play' | 'pause' | 'loading' | 'ready' | 'constructed'

export class GameEngine implements IGameEngine {

    private readonly pixiApp: Application
    private status: status
    private intervalId: number = 0

    private getPixiApp = () => this.pixiApp

    private Level!: ILevel;

    constructor() {
        this.status = 'constructed'
        this.pixiApp = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: (window.devicePixelRatio || 1)* 4,
            resizeTo: window,
            backgroundColor: 0x6495ed
        });
    }

    loadResources = async () => {
        this.status = 'loading'

        return new Promise<void>((resolve) => {
            AssetLoader.setOnLoaderComplete(() => {
                this.status = 'ready'
                console.log('Assets loaded')
                resolve()
            })
            AssetLoader.setOnLoaderProgress((loader) => console.log(`Loading assets ${loader.progress}%`))
            AssetLoader.load()
        })
    }

    startNewGame = async () => {
        if (this.status !== 'ready') {
            throw new Error('Engine is not ready')
        }
        this.pixiApp.start()
        this.status = 'play'
        this.Level = new Level(this.getPixiApp)
        this.intervalId = setInterval(this.loop, settings.loopInterval)
    }

    pause = () => {
        this.status = 'pause'
        clearInterval(this.intervalId)
    }

    private loop = () => {
        const tiles = this.Level.getAllTiles()
        for (let x = 0; x < tiles.length; x++) {
            for (let y = 0; y < tiles[x].length; y++) {
                tiles[x][y].loopAction()
            }
        }
    }

}



