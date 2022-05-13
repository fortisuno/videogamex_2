import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import DialogContainer from "../components/DialogContainer";
import { SessionContext } from "../components/Session";
import { createEmotionCache, theme } from "../utils/config"
import { appData } from "../utils/data";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {

  const [session, setSession] = useState({loading: true, data: {usuario: undefined, categorias: []}})

  const loadSession = useCallback((u) => setSession(u), [setSession])

  useEffect(() => {
    loadSession({
      loading: false,
      data: {
        usuario: appData.usuarios[0],
        categorias: appData.categorias,
      }
    })
  }, [loadSession])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionContext.Provider value={ session }>
          <DialogContainer>
            {
              Component.getLayout
                ? Component.getLayout(pageProps.data, <Component {...pageProps} />)
                : <Component {...pageProps} />
            }
          </DialogContainer>
        </SessionContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
