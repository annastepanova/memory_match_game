/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Countdown from 'react-countdown'
import { Box, Grid, Button, Typography } from '@mui/material'
import { numberOfCards } from '../utils/cardUtils'
import { setTimeEnded, disableClick, setCountdownTime, setFirstClick } from '../reducers/gameSlice'

import styles from '../styles/Game.module.css'


const GameOptions = forwardRef(({ onInitGame }, ref) => {
  const cards = useSelector((state) => state.cards)
  const numOfMatches = cards.numOfCards / 2
  const dispatch = useDispatch()

  const counter = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Typography>Time is over!</Typography>
    } else {
      // Render a countdown
      return (
        <>
          <Typography>Time left <span style={{ fontSize: '1.5rem' }}>⏰</span></Typography>
          <span>
            {minutes}:{seconds}
          </span>
        </>
      )
    }
  }

  const startGame = (option, time) => {
    ref.current = null
    dispatch(setFirstClick(false))
    onInitGame(numberOfCards[option])
    dispatch(setCountdownTime(time))
  }

  const analyzeStatus = () => {
    dispatch(disableClick(true))
    dispatch(setTimeEnded(true))
  }

  return (
      <Grid item container xs={12} lg={3} className={styles.optionsContainer}>
        <Grid item>
          <Typography style={{ fontSize: '2rem' }} id="header">
          {cards.numOfCards ? 'How many cats?' : 'How many cats do you want to play with?'}
          </Typography>
          <Box >
            <Button onClick={() => startGame(0, 14000)}>
              {numberOfCards[0]}
            </Button>
            <Button onClick={() => startGame(1, 30000)}>
              {numberOfCards[1]}
            </Button>
            <Button onClick={() => startGame(2, 40000)}>
              {numberOfCards[2]}
            </Button>
            <Button onClick={() => startGame(3, 60000)}>
              {numberOfCards[3]}
            </Button>
          </Box>
          <Box>
            <Typography style={{ fontSize: '1rem', paddingTop: 16 }}>
              High Score <span style={{ fontSize: '1.5rem' }}>🏆</span>
            </Typography>
            <Typography>{cards.score}</Typography>
          </Box>
          {cards.numOfCards && (
            <Box className={styles.statsWrapper}>
            <Typography>Matches <span style={{ fontSize: '1.5rem' }}>🐱🐱</span></Typography>
            <Typography className={styles.numOfMatches}>{cards.matches}/{numOfMatches}</Typography>
              <Typography>Wins  <span style={{ fontSize: '1.5rem' }}>🏅</span></Typography>
              <Typography>{cards.numOfWins}</Typography>
              {ref.current && (
                <Countdown
                  key={ref.current?.toString()}
                  date={ref.current}
                  renderer={counter}
                  onComplete={() => analyzeStatus()}
                />
              )}
            </Box>
          )}
        </Grid>
      </Grid>
  )
})

GameOptions.propTypes = {
  onInitGame: PropTypes.func.isRequired
}

export default GameOptions
