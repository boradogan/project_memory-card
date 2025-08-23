import { Card } from "./Card"
export function CardDeck({cardList, handleClick, isGameOver}){
    return (
        <div className="card-deck">

            {cardList.map(person => (
                <Card key={person.id} personInfo={person} onClick={handleClick} isGameOver={isGameOver}></Card>
            ))}

        </div>
    )
}