import Kavga from '../assets/gameover/kavga.jpg'
import Mutlu from '../assets/gameover/mutlu.jpg'
import { useState } from 'react';
export function GameOver({restartGame, isGameCompletedSuccessfully}){
    const [opacity, setOpacity] = useState(0);
    if(opacity < 1 ){
        setTimeout(()=>{
            setOpacity(opacity + 0.01)
        }, 5)
    }
    const backGroundImage = isGameCompletedSuccessfully?Mutlu:Kavga;
    return (
        <div className="game-over">
            <div className="game-over-info-container"  style={{opacity:(opacity > 1 ? 1 : opacity)}}>
                <div className="game-over-info" style={{backgroundImage:`url(${backGroundImage})`}}>
                    <div className="game-over-text">
                        <span>{isGameCompletedSuccessfully?'You won':'You lost'}</span>

                    </div>
                    {/* <img src={Kavga} alt="" /> */}
                    <button onClick={restartGame}>Restart</button>

                </div>
            </div>
            <div className="overlay"></div>

        </div>

    )
}