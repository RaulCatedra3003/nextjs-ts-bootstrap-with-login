import { ConfigContextProvider } from '../context/appconfig'

import '../styles/globals.css'

import type { AppProps } from 'next/app'
import ThemeProvider from '../themes'
import { UserContextProvider } from '../context/user'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigContextProvider>
      <UserContextProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserContextProvider>
    </ConfigContextProvider>
  )
}

export default MyApp
