/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { setTimeEnded, setFirstClick, disableClick } from "../reducers/gameSlice"

const Modal = forwardRef(({ winStatus, timeIsOver, matches, onInitGame, numOfCards }, ref ) => {
  const dispatch = useDispatch()
  const [showLoader, setShowLoader] = useState(false)
  const open = winStatus || timeIsOver || false

  useEffect(() => {
    if (open) {
      setShowLoader(true)
      setTimeout(() => setShowLoader(false), 800)
    }
  }, [open])

  const restartGame = () => {
    setShowLoader(true)
    onInitGame(numOfCards)
    dispatch(setTimeEnded(false))
    dispatch(setFirstClick(false))
    dispatch(disableClick(false))
    ref.current = null
  }


  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minWidth: '250px',
          height: '200px'
        }
      }}
    >
      {showLoader ? (
        <>
          <DialogTitle>
            {open ? 'Analyzing results.....' : 'Restarting....'}
          </DialogTitle>
          <DialogContent>  
          </DialogContent>
        </>
      ) : (
        <>
        <DialogTitle>
         {winStatus ? <span role="img">Congrats! You won! 😻</span> : <span role="img">You lost! 😿</span>}
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
          You caught <span style={{ color: '#149414' }}>{matches}</span> pairs of cats.
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => restartGame()}>Restart</Button>
        </DialogActions>
        </>
      )}
    </Dialog>
  )
})

Modal.propTypes = {
  winStatus: PropTypes.bool.isRequired, 
  timeIsOver: PropTypes.bool.isRequired,
  onInitGame: PropTypes.func.isRequired,
  matches: PropTypes.number.isRequired,
  numOfCards: PropTypes.number
}

export default Modal
