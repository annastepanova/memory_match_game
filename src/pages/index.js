import React from 'react'
import Link from 'next/link'
import { Typography, Box } from '@mui/material'
import Layout from '../components/Layout'

export default function Home() {

  return (
    <Layout>
      <Link href='/games/cats'>
        <Box sx={{ cursor: 'pointer' }}>
          <Typography variant='h6'>Wanna play? <span style={{ fontSize: '1.5rem' }}>🎲</span></Typography>
        </Box>
      </Link>
    </Layout>
  )
}
