import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '../store/store'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../config/theme'
import '../styles/globals.css'

let persistor = persistStore(store)

export default function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Meow Match Game</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="keywords" content="cats memory match card game"/>
          <meta name="description" content="Meow match memory game"/>
        </Head>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </>
  )
}
