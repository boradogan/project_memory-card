import BackGroundPattern from '../assets/moroccan-flower-dark.png'

import { getPhoto } from '../api/photoApi';
export function Card({personInfo, onClick, isGameOver}){
    const name = personInfo.name;
    console.log('rendering ', name)

    function clickHandler(){
        if(!isGameOver){
            onClick(personInfo.id)
        }
    }
    return (
        <div className={`card ${!isGameOver?'active':'inactive'}`} onClick={clickHandler} style={{backgroundImage:`url(${BackGroundPattern})`}}>
            <img src={getPhoto(name)} alt={name} />
            <h4>{name}</h4>
        </div>
    )
}