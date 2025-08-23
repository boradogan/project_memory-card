import { useEffect, useState } from 'react'
import { CardDeck } from './components/CardDeck'
import { GameOver } from './components/GameOver'
import { MusicController } from './components/Sound'
import Apo from './assets/apo.jpg'
import Fatih from './assets/fatih.jpg'
import Nilay from './assets/nilay.jpg'
import Meryem from './assets/meryem.jpg'
import Nursema from './assets/nursema.jpg'
import Pinko from './assets/pinko.jpg'
import { getRandomPermutationSizeK } from './utils/combinatorics'
import './App.css'
const originalCardList = [
  {
    id: crypto.randomUUID(),
    name: 'Apo',
    src: Apo,
    isClicked: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Fatih',
    src: Fatih,
    isClicked: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Nilay',
    src: Nilay,
    isClicked: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Nursema',
    src: Nursema,
    isClicked: false
  },
  {
    id: crypto.randomUUID(),
    name: 'Pinko',
    src: Pinko,
    isClicked: false
  }
]

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
        <h1>{isGameOver? 'Game Over': 'Kızılcık Şerbo'}</h1>
        <h3>Score: {score}, Max Score: {maxScore}</h3>
      </header>
      <main>
        {isGameOver?<GameOver restartGame={restartGame} isGameCompletedSuccessfully={isGameCompletedSuccessfully}></GameOver>:null}
        <CardDeck cardList={displayedCards} handleClick={handleClick} isGameOver={isGameOver}></CardDeck>
        <MusicController></MusicController>
      </main>
    </>
  )
}

export default App
