import { createSlice } from '@reduxjs/toolkit'
import { generateCardSet, getCard } from "../utils/cardUtils"
import { checkWinStatus, getScore } from '../utils/cardUtils'

const initialState = {
  images: [],
  firstCard: undefined,
  secondCard: undefined,
  matches: 0,
  imageUp: false,
  numOfCards: null,
  winStatus: false,
  numOfWins: 0,
  score: 0
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    initGame: (state, action) => {
      return {
        ...initialState,
        numOfWins: state.numOfWins,
        score: state.score,
        numOfCards: action.payload,
        images: generateCardSet(action.payload)
      }
    },
    flipImage: (state, action) => {
      let firstCard
      let secondCard
      const card = getCard(action.payload, state.images)
      if (card.imageUp || card.matched) {
        // Selected an already flipped card
        // or a card that has already been matched
        return state
      }
      if (!state.firstCard) {
        firstCard = card
      }
      if (state.firstCard?.id) {
        firstCard = state.firstCard
        secondCard = card
      }
      return {
        ...state,
        firstCard: firstCard,
        secondCard: secondCard,
        images: state.images.map((image) => {
          if (action.payload === image.id) {
            return { ...image, imageUp: true }
          }
          return image
        })
      }
    },
    checkMatch: (state) => {
      const updateCards = (state) => {
        if (state.firstCard?.image === state.secondCard?.image) {
          return state.images?.map(image => (
            image.id === state.firstCard.id || image.id === state.secondCard.id
              ? { ...image, imageUp: true, matched: true }
              : image)
          )
        } else {
          return state.images?.map(image => (
            image.id === state.firstCard?.id || image.id === state.secondCard?.id
              ? { ...image, imageUp: false, matched: false }
              : image)
          )
        }
      }
      if (state.firstCard && state.secondCard) {
        const updateMatches = () => {
          let matches
          if (state.firstCard.image === state.secondCard.image) {
            matches = state.matches + 1
          } else {
            matches = state.matches
          }
          return matches
        }
        return {
          ...state,
          firstCard: undefined,
          secondCard: undefined,
          images: updateCards(state),
          matches: updateMatches()

        }}
      return state
    },
    getStatus: (state) => {
      state.winStatus = checkWinStatus(state.images, state.matches)
      state.numOfWins = state.winStatus ? state.numOfWins + 1 : state.numOfWins
      state.score = getScore(state.winStatus, state.numOfCards, state.score)
    }
  }
})

export const { initGame, flipImage, checkMatch, getStatus } = cardsSlice.actions
export default cardsSlice.reducer
