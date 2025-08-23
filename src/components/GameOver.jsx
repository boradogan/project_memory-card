import Kavga from '../assets/gameover/kavga.jpg'

export function GameOver({restartGame}){
    return (
        <div className="game-over">
            <div className="game-over-info-container">
                <div className="game-over-info" style={{backgroundImage:`url(${Kavga})`}}>
                    <div className="game-over-text">
                        <span>Game Over</span>

                    </div>
                    {/* <img src={Kavga} alt="" /> */}
                    <button onClick={restartGame}>Restart</button>

                </div>
            </div>
            <div className="overlay"></div>

        </div>

    )
}