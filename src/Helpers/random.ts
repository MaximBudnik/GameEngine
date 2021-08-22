export const getRandomWeightedLookupFn = <T extends any>(chanceArray: Array<{ value: T, chance: number }>, precision = 10): () => T => {
    let table: Array<T> = [];
    let chancesSum = 0
    for (let i = 0; i < chanceArray.length; i++) {
        chancesSum += chanceArray[i].chance
        for (let j = 0; j < chanceArray[i].chance * precision; j++) {
            table.push(chanceArray[i].value);
        }
    }
    if (chancesSum !== 1) {
        throw new Error('Chances sum is not equal to 1')
    }
    return () => table[Math.floor(Math.random() * table.length)]
};

export const getRandomInRange = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
