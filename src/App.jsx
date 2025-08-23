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
    
    const clickedPerson = cardList.find((item) => item.id === clickedId)
    console.log(`Clicked at item ${clickedPerson.name}`);

    if(clickedPerson.isClicked) {

      handleGameFinish({isSuccessful:false});
      console.log('Game Over, that person is clicked before');
      return
    }

    handleScoreIncrease(score);

    setCardList(
      updatedClickedPerson(cardList, clickedPerson)
    )
    
  }
 
  function handleGameFinish({isSuccessful}){
    setIsGameOver(true);
    if(isSuccessful){
      setIsGameCompletedSuccessfully(true);
    }
  }

  useEffect(() => {
    setDisplayedCards(getRandomPermutationSizeK(cardList, listSize))
  }, [cardList])

  function restartGame(){
    console.log('restarting');
    resetStates();
  }

  function handleScoreIncrease(score){
    const newScore = score + 1;
    setScore(newScore);
    if(newScore == originalCardList.length){
      handleGameFinish({isSuccessful: true});
    }
    if(newScore > maxScore) {
      setMaxScore(newScore);
    }
  }

  function resetStates(){
    setCardList(originalCardList);
    setIsGameOver(false);
    setIsGameCompletedSuccessfully(false);
    setScore(0);
  }

  function updatedClickedPerson(cardList, clickedPerson){
    //Non mutating method to return the array with the clickedPerson's isClicked property true
    return cardList.map(card => card===clickedPerson? {...card, isClicked: true}:card);

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
        <CardDeck displayedCards={displayedCards} handleClick={handleClick} isGameOver={isGameOver}></CardDeck>
        
      </main>
    </>
  )
}

export default App
