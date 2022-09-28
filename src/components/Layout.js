import { Box } from '@mui/material'

export default function Layout ({ children }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: `url(${process.env.NEXT_PUBLIC_URL}/assets/board-wood.jpg) #F8F8F8`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
      overflowX: 'hidden',
      backgroundPosition: 'center'
    }}>
      {children}
    </Box>
  )
}
