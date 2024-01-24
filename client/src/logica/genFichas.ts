import { Best, Datos, Flag, Score } from "./types";

function reset (datos: Array<Array<number>>) : Array<Array<number>> {
    let newDatos = [...datos]
    newDatos = newDatos.map((row) => (
        row.map(() => {
            return 0
        })
    ))
    
    return newDatos;
}

function gameOver (datos: Array<Array<number>>) : boolean {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            if ((row < 3 && datos[row][col] === datos[row + 1][col]) || (col < 3 && datos[row][col] === datos[row][col + 1])) {
                return false
            }
        }
    }
    return true
}

function verifTablero (datos: Array<Array<number>>) : boolean {
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
            if (datos[row][col] === 0) {
                return false
            }
        }
    }
    return true
}

function genDatos (datos: Array<Array<number>>, cantGen: number) : Array<Array<number>> {
    let i = 0
    let newDatos = [...datos];
    if (verifTablero(newDatos)) {
        return newDatos;
    }
    while (i < cantGen) {
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);
        if (newDatos[row][col] === 0) {
            newDatos[row][col] = 2;
            i++;
        }
    }

    return newDatos;
}

export function newGame (datos: Array<Array<number>>, setDatos: Datos, setScore: Score, cantGen: number) {
    let newDatos = reset(datos);
    newDatos = genDatos(newDatos, cantGen);
    setScore(0);

    setDatos(newDatos);
}

function calcScore (score: number, best: number, setScore: Score, setBest: Best) {
    if (score > best) {
        best = score;
        setBest(best);
    }
    setScore(score)
}

function sumar (datos: Array<Array<number>>, score: number, best: number, dir: string, setScore: Score, setBest: Best) : Array<Array<number>> {
    let newDatos = [...datos];
    let newScore = score;
    let newBest = best;
    if (dir === 'up') {
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                if (row < 3 && newDatos[row][col] === newDatos[row + 1][col]) {
                    newDatos[row][col] *= 2;
                    newDatos[row + 1][col] = 0;
                    newScore += newDatos[row][col] * 2
                    calcScore(newScore, newBest, setScore, setBest);
                }
            }
        }
    }
    else if (dir === 'down') {
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row >= 0; row--) {
                if (row > 0 && newDatos[row][col] === newDatos[row - 1][col]) {
                    newDatos[row][col] *= 2;
                    newDatos[row - 1][col] = 0;
                    newScore += newDatos[row][col] * 2
                    calcScore(newScore, newBest, setScore, setBest);
                }
            }
        }
    }
    else if (dir === 'left') {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (col < 3 && newDatos[row][col] === newDatos[row][col + 1]) {
                    newDatos[row][col] *= 2;
                    newDatos[row][col + 1] = 0;
                    newScore += newDatos[row][col] * 2
                    calcScore(newScore, newBest, setScore, setBest);
                }
            }
        }
    }
    else if (dir === 'right') {
        for (let row = 0; row < 4; row++) {
            for (let col = 3; col >= 0; col--) {
                if (col > 0 && newDatos[row][col] === newDatos[row][col - 1]) {
                    newDatos[row][col] *= 2;
                    newDatos[row][col - 1] = 0;
                    newScore += newDatos[row][col] * 2
                    calcScore(newScore, newBest, setScore, setBest);
                }
            }
        }
    }

    return newDatos;
}

export function up (datos: Array<Array<number>>, score: number, best: number, setDatos: Datos, setFlag: Flag, setScore: Score, setBest: Best, cantGen: number) {
    let newDatos = upControl(datos);
    newDatos = sumar(newDatos, score, best, 'up', setScore, setBest);
    newDatos = upControl(newDatos);
    newDatos = genDatos(newDatos, cantGen);
    if (gameOver(newDatos)) {
        setFlag(true);
        newGame(newDatos, setDatos, setScore, 2)
    }
    else {
        setDatos(newDatos); 
    }
}

export function down (datos: Array<Array<number>>, score: number, best: number, setDatos: Datos, setFlag: Flag, setScore: Score, setBest: Best, cantGen: number) {
    let newDatos = downControl(datos);
    newDatos = sumar(newDatos, score, best, 'down', setScore, setBest);
    newDatos = downControl(newDatos);
    newDatos = genDatos(newDatos, cantGen);
    if (gameOver(newDatos)) {
        setFlag(true)
        newGame(newDatos, setDatos, setScore, 2)
    }
    else {
        setDatos(newDatos); 
    }
}

export function left (datos: Array<Array<number>>, score: number, best: number, setDatos: Datos, setFlag: Flag, setScore: Score, setBest: Best, cantGen: number) {
    let newDatos = leftControl(datos);
    newDatos = sumar(newDatos, score, best, 'left', setScore, setBest);
    newDatos = leftControl(newDatos);
    newDatos = genDatos(newDatos, cantGen);
    if (gameOver(newDatos)) {
        setFlag(true)
        newGame(newDatos, setDatos, setScore, 2)
    }
    else {
        setDatos(newDatos); 
    }
}

export function right (datos: Array<Array<number>>, score: number, best: number, setDatos: Datos, setFlag: Flag, setScore: Score, setBest: Best, cantGen: number) {
    let newDatos = rightControl(datos);
    newDatos = sumar(newDatos, score, best, 'right', setScore, setBest);
    newDatos = rightControl(newDatos);
    newDatos = genDatos(newDatos, cantGen);
    if (gameOver(newDatos)) {
        setFlag(true)
        newGame(newDatos, setDatos, setScore, 2)
    }
    else {
        setDatos(newDatos); 
    }
}

function upControl (datos: Array<Array<number>>) : Array<Array<number>> {
    let newDatos = [...datos];
    for (let col = 0; col < 4; col++) {
        let dist = 0;
        for (let row = 0; row < 4; row++) {
            if (newDatos[row][col] === 0) {
                dist++;
            }
            else if (dist !== 0) {
                newDatos[row - dist][col] = newDatos[row][col];
                newDatos[row][col] = 0
            }
        }
    }
    return newDatos; 
}

function downControl (datos: Array<Array<number>>) : Array<Array<number>> {
    let newDatos = [...datos];
    for (let col = 0; col < 4; col++) {
        let dist = 0;
        for (let row = 3; row >= 0; row--) {
            if (newDatos[row][col] === 0) {
                dist++;
            }
            else if (dist !== 0) {
                newDatos[row + dist][col] = newDatos[row][col];
                newDatos[row][col] = 0
            }
        }
    }

    return newDatos;
}

function leftControl (datos: Array<Array<number>>) : Array<Array<number>> {
    let newDatos = [...datos]
    for (let row = 0; row < 4; row++) {
        let dist = 0;
        for (let col = 0; col < 4; col++) {
            if (newDatos[row][col] === 0) {
                dist++;
            }
            else if (dist !== 0) {
                newDatos[row][col - dist] = newDatos[row][col];
                newDatos[row][col] = 0
            }
        }
    }

    return newDatos;
}

function rightControl (datos: Array<Array<number>>) : Array<Array<number>> {
    let newDatos = [...datos];
    for (let row = 0; row < 4; row++) {
        let dist = 0;
        for (let col = 3; col >= 0; col--) {
            if (newDatos[row][col] === 0) {
                dist++;
            }
            else if (dist !== 0) {
                newDatos[row][col + dist] = newDatos[row][col];
                newDatos[row][col] = 0
            }
        }
    }

    return newDatos;
}