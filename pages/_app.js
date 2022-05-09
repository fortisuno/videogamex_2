import { createContext } from 'react'
import { SSRProvider } from 'react-bootstrap';

import '../styles/globals.scss'

export const AppContext = createContext();

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SSRProvider>
      {
        Component.getLayout
          ? Component.getLayout(pageProps.data, <Component {...pageProps} />)
          : <Component {...pageProps} />
      }
    </SSRProvider>
  )
}

export default MyApp
