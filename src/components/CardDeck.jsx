import { Card } from "./Card"
export function CardDeck({displayedCards, handleClick, isGameOver}){
    return (
        <div className="card-deck">

            {displayedCards.map(person => (
                <Card key={person.id} personInfo={person} onClick={handleClick} isGameOver={isGameOver}></Card>
            ))}

        </div>
    )
}