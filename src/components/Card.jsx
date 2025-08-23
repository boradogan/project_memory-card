import BackGroundPattern from '../assets/moroccan-flower-dark.png'
export function Card({personInfo, onClick, isGameOver}){
    const name = personInfo.name;
    const src = personInfo.src;
    function clickHandler(){
        if(!isGameOver){
            onClick(personInfo.id)
        }
    }
    return (
        <div className={`card ${!isGameOver?'active':'inactive'}`} onClick={clickHandler} style={{backgroundImage:`url(${BackGroundPattern})`}}>
            <img src={src} alt={name} />
            <h4>{name}</h4>
        </div>
    )
}