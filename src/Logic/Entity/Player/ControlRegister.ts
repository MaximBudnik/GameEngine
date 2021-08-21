export interface IControlRegister {
    register: () => void
    unregister: () => void
    keySet: Set<string>
}

export class ControlRegister implements IControlRegister {
    get keySet(): Set<string> {
        return this._keySet;
    }
    private _keySet = new Set<string>()

    register = () => {
        document.addEventListener('keydown', this.addKeyToSet)
        document.addEventListener('keyup', this.removeKeyFromSet)
    }

    private addKeyToSet = (e: KeyboardEvent) => {
        this._keySet.add(e.key)
    }

    private removeKeyFromSet = (e: KeyboardEvent) => {
        this._keySet.delete(e.key)
    }

    unregister = () => {
        document.removeEventListener('keydown', this.addKeyToSet)
        document.removeEventListener('keyup', this.removeKeyFromSet)
    }

}
