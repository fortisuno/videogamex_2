import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createEmotionCache, theme } from "../utils/config"

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {
          Component.getLayout
            ? Component.getLayout(pageProps.data, <Component {...pageProps} />)
            : <Component {...pageProps} />
        }
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
