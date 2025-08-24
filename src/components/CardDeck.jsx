import { Card } from "./Card"
import {useState, useEffect} from "react";
import { photoApi } from "../api/photoApi";
export function CardDeck({displayedCards, handleClick, isGameOver}){
    console.log('rendering card deck')
    const promiseMap = new Map(displayedCards.map(card => [card.id, new Deferred()]))
    Promise.all(promiseMap.values().map(obj => obj.promise)).then(()=> {
            console.log('all images loaded')
            photoApi.firstQueueFill()
        }
    )
    console.log('printing promise map')
    console.log(promiseMap)

    // You can pass a callback to each Card to resolve its promise
    function handleCardLoad(id){

        console.log(`handing ${id}`)
        promiseMap.get(id).resolve(true);

    }
    return (
        <div className="card-deck">

            {displayedCards.map(person => (
                <Card key={person.id} personInfo={person} onClick={handleClick} isGameOver={isGameOver} onLoad={handleCardLoad}></Card>
            ))}

        </div>
    )
}

class Deferred{
    constructor(){
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })

    }
}