import '../assets/header.css';
import '../assets/game.css';
import { useState } from 'react';
import { up, down, left, right, newGame } from '../logica/genFichas';

export default function Inicio() {

    const [datos, setDatos] = useState<Array<Array<number>>>([
        [0,2,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,2,0,0]
    ]);
    const [flag, setFlag] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [best, setBest] = useState<number>(0);
    
    const keyEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') {
            up(datos, score, best, setDatos, setFlag, setScore, setBest, 1)
        }
        else if (e.key === 'ArrowDown') {
            down(datos, score, best, setDatos, setFlag, setScore, setBest, 1)
        }
        else if (e.key === 'ArrowLeft') {
            left(datos, score, best, setDatos, setFlag, setScore, setBest, 1)
        }
        else if (e.key === 'ArrowRight') {
            right(datos, score, best, setDatos, setFlag, setScore, setBest, 1)
        }
    }

    return(
        <div onKeyDown={keyEvent} tabIndex={0} style={{outline: 'none'}}>
            <div className="header-container">
                <div className="logo-container">
                    <img src="*" alt="logo" />
                </div>

                <div className="opcion-container">
                    <a href="*">Login</a>
                    <a href="*">Registro</a>
                </div>
            </div>

            <div className='game-container'>
                <div className='title-container'>
                    <div>
                        <h1>2048</h1>
                    </div>

                    <div className='data-container'>
                        <div className='score-container'>
                            <p style={{fontSize: '15px'}}>SCORE</p>
                            <p style={{fontSize: '25px', fontWeight: 700}}>{score}</p>
                        </div>

                        <div className='best-container'>
                            <p style={{fontSize: '15px'}}>BEST</p>
                            <p style={{fontSize: '25px', fontWeight: 700}}>{best}</p>
                        </div>
                    </div>
                    
                </div>

                <div className='newGame-container'>
                    <button onClick={() => newGame(datos, setDatos, setScore, 2)}>New Game</button>
                </div>

                <div className='table-container'>

                    {datos.map((row) => (
                        row.map((dato, index) => {
                            let style = {}
                            switch(dato) {
                                case 0:
                                    style = {backgroundColor: '#cdc1b4', color: '#7d746b'};
                                break;
                                case 2:
                                    style = {backgroundColor: '#eee4da', color: '#7d746b'};
                                break;
                                case 4:
                                    style = {backgroundColor: '#e9c8a7', color: '#7d746b'};
                                break;
                                case 8:
                                    style = {backgroundColor: '#ee9842', color: '#ffffff'};
                                break;
                                case 16:
                                    style = {backgroundColor: '#eb7e12', color: '#ffffff'};
                                break;
                                case 32:
                                    style = {backgroundColor: '#ee5338', color: '#ffffff'};
                                break;
                                default:
                                    style = {backgroundColor: '#eb2113', color: '#ffffff'};
                            }
                            return  <div key={index} style={style}>{dato ? dato : ''}</div>
                        })
                    ))}
                </div>

                <div className='controls-container'>
                        <div onClick={() => up(datos, score, best, setDatos, setFlag, setScore, setBest, 1)}></div>
                        <div onClick={() => left(datos, score, best, setDatos, setFlag, setScore, setBest, 1)}></div>
                        <div onClick={() => right(datos, score, best, setDatos, setFlag, setScore, setBest, 1)}></div>
                        <div onClick={() => down(datos, score, best, setDatos, setFlag, setScore, setBest, 1)}></div> 
                </div>
            </div>
        </div>
    )
}