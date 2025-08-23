import { useEffect, useState } from 'react'
import { CardDeck } from './components/CardDeck'
import { GameOver } from './components/GameOver'
import { MusicController } from './components/Sound'


import { getRandomPermutationSizeK } from './utils/combinatorics'
import './App.css'

import { originalCardList } from './api/originalCardList'

function App() {
  const listSize = 3;
  const [cardList, setCardList] = useState(originalCardList)
  const [displayedCards, setDisplayedCards] = useState(getRandomPermutationSizeK(cardList, listSize));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameCompletedSuccessfully, setIsGameCompletedSuccessfully] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  
  function handleClick(clickedId){
    console.log(`Clicked at item ${displayedCards.find((item) => item.id === clickedId).name}`);

    const clickedPerson = cardList.find((item) => item.id === clickedId)

    if(clickedPerson.isClicked) {
      setIsGameOver(true);
      console.log('Game Over, that person is clicked before');
    } else {
      const newScore = score + 1;
      setScore(newScore);
      if(newScore > maxScore) {
        setMaxScore(newScore);
      }
      setCardList(
        cardList.map(card => card===clickedPerson? {...card, isClicked: true}:card)
      )
    }

  }
  useEffect(() => {
    if(score == originalCardList.length){
      setIsGameOver(true);
      setIsGameCompletedSuccessfully(true);
    }

  }, [score])

  useEffect(() => {
    setDisplayedCards(getRandomPermutationSizeK(cardList, listSize))
  }, [cardList])

  function restartGame(){
    console.log('restarting');
    resetStates();
  }

  function resetStates(){
    setCardList(originalCardList);
    setIsGameOver(false);
    setIsGameCompletedSuccessfully(false);
    setScore(0);

  }

  return (
    <>
      <header>
        <MusicController></MusicController>
        <div className="title">
          <h1>{isGameOver? 'Game Over': 'Kızılcık Şerbo'}</h1>

          <h3>Score: {score}, Max Score: {maxScore}</h3>

        </div>
      </header>
      <main>
        {isGameOver?<GameOver restartGame={restartGame} isGameCompletedSuccessfully={isGameCompletedSuccessfully}></GameOver>:null}
        <CardDeck cardList={displayedCards} handleClick={handleClick} isGameOver={isGameOver}></CardDeck>
        
      </main>
    </>
  )
}

export default App
