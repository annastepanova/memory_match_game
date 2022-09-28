import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Rubik Dirt',
  },
  overrides: {
    MuiButton: {
      root: {
        "&:focus": {
          outline: 'none'
        }
      }
    }
  }
})

export default theme
