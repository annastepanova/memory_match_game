import { shuffle } from "lodash"
import { v4 as uuidv4 } from 'uuid'

export const generateCardSet = (numOfCards) => {
  const numOfPairs = numOfCards / 2
  let arrOne = new Array(numOfPairs).fill().map((e, i) => {
    return {
      id: uuidv4(),
      image: i + 1,
      imageUp: false,
      matched: false 
    }
  })
  let arrTwo = new Array(numOfPairs).fill().map((e, i) => {
    return {
      id: uuidv4(),
      image: i + 1,
      imageUp: false,
      matched: false
    }
  })
  let mergeArray = [...arrOne, ...arrTwo]
  const shuffleMerged = shuffle(mergeArray)
  return shuffleMerged
}

export const getCard = (id, cards) => {
  const card = cards.find(c => c.id === id)
  return card
}

export const numberOfCards = [8, 12, 16, 20]

export const checkWinStatus = (cards, matches) => {
  const numberOfCards = cards?.length || 0
  let winStatus = false
  if (numberOfCards) {
    const numOfPairs = numberOfCards / 2
    if (numOfPairs === matches) {
      winStatus = true
    }
  }
  return winStatus
}

export const getScore = (winStatus, numOfCards, state) => {
  if (winStatus) {
    if (numOfCards === 8) return state + 50
    else if (numOfCards === 12) return state + 100
    else if (numOfCards === 16) return state + 200
    else if (numOfCards === 20) return state + 300
  }
  return state
}
