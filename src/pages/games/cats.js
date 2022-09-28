import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import { initGame } from '../../reducers/cardsSlice'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import GameOptions from '../../components/GameOptions'
import Modal from '../../components/Modal'

export default function Game() {
  const cards = useSelector((state) => state.cards)
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const timerRef = useRef(null)
  
  const styles = {
    cardsContainer: (theme) => ({
      padding: '16px',
      display: 'grid',
      justifyContent: 'center',
      gap: 1.25,
      [theme.breakpoints.up('xs')]: {
        gridTemplateColumns: 'repeat(2, minmax(auto, 200px))',
      },
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(3, minmax(auto, 200px))'
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, minmax(auto, 200px))'
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(4, minmax(auto, 200px))',
        gap: 2.5
      },
      [theme.breakpoints.up('xl')]: {
        gridTemplateColumns: (cards.numOfCards > 16) ? 'repeat(5, minmax(auto, 200px))' : 'repeat(4, minmax(auto, 200px))',
        gap: 2.5
      },
      gridTemplateRows: 'repeat(auto-fill, 1fr)'
    })
  }

  const launchTimer = (time) => {
    if (!game.firstClick) timerRef.current = Date.now() + time
  }

  return (
    <Layout>
      <Modal
        winStatus={cards.winStatus}
        timeIsOver={game.timeIsOver}
        matches={cards.matches}
        onInitGame={(payload) => dispatch(initGame(payload))}
        numOfCards={cards.numOfCards}
        ref={timerRef}
      />
      <Grid container xl={11} justifyContent="center" className={styles.gameWrapper}>
        <GameOptions
          onInitGame={(payload) =>  dispatch(initGame(payload))}
          ref={timerRef}
        />
        {cards.images.length > 0 && (
          <Grid item xs={12} lg={8} xl={9} sx={styles.cardsContainer}>
            {cards.images.map(({ id, image, imageUp }, index) => (
              <Card
                key={index}
                id={id}
                image={image}
                imageUp={imageUp}
                launchTimer={launchTimer}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Layout>
  )
}
