import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card as MuiCard, Box } from '@mui/material'
import ReactCardFlip from 'react-card-flip'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { flipImage, checkMatch, getStatus } from '../reducers/cardsSlice'
import { disableClick, setFirstClick } from '../reducers/gameSlice'

import styles from '../styles/Card.module.css'

let timeout = null

const Card = ({ id, imageUp, image, launchTimer }) => {
  const dispatch = useDispatch()
  const { game, cards } = useSelector((state) => state)

  const onCardClick = (id) => {
    clearInterval(timeout)
    launchTimer(game.countdownTime)
    dispatch(flipImage(id))
    timeout = setTimeout(() => {
      dispatch(checkMatch())
      dispatch(getStatus())
      dispatch(disableClick(false))
    }, 800)
  }

  useEffect(() => {
    if (cards.firstCard?.id && cards.secondCard?.id) {
      dispatch(disableClick(true))
    }
  }, [cards.firstCard?.id, cards.secondCard?.id])
  
  return (
    <ReactCardFlip isFlipped={imageUp} containerStyle={{ maxWidth: 200 }}>
      <MuiCard 
          elevation={5}
          className={game.disabled ? `${styles.cardBox} ${styles.disabled}` : styles.cardBox} 
        >
        <Box 
          onClick={() => {
            if (!imageUp) onCardClick(id) 
              dispatch(setFirstClick(true))
            }}
          sx={{
            position: 'relative',
            height: '200px',
            width: '100%'
          }}>
          <Image
            alt='card'
            src={`${process.env.NEXT_PUBLIC_URL}/images/memory_game/back.jpg`}
            layout="fill"
            objectFit="cover"
            quality={100}
            className={styles.image}
          />
        </Box>
        </MuiCard>
        <MuiCard
          elevation={5}
          className={styles.cardBox} 
          >
        <Box
          sx={{
            position: 'relative',
            height: '200px',
            width: '100%'
          }}>
          <Image
            alt='card'
            src={`${process.env.NEXT_PUBLIC_URL}/images/memory_game/${image}.png`}
            layout="fill"
            objectFit="contain"
            quality={100}
            className={styles.cardImage}
          />
        </Box>
        </MuiCard> 
      </ReactCardFlip>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  imageUp: PropTypes.bool.isRequired,
  image: PropTypes.number.isRequired,
  launchTimer: PropTypes.func.isRequired
}

export default Card
