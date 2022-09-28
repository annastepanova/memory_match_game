import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import cardsReducer from '../reducers/cardsSlice'
import gameReducer from '../reducers/gameSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'

const cardsPersistConfig = {
  key: 'cards',
  storage: storage,
  whitelist: ['score']
}

const reducers = combineReducers({
  game: gameReducer,
  cards: persistReducer(cardsPersistConfig, cardsReducer)
})

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk]
})
