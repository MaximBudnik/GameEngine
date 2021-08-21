import "normalize.css"
import "../scss/index.scss"
import {GameEngine} from "./Logic/GameEngine";


const start = async ()=>{
    const gameEngine = new GameEngine()
    await gameEngine.loadResources()
    gameEngine.startNewGame()
}

start()




