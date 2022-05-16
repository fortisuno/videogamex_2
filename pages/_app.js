import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PageDialog from "../components/PageDialog";
import { SessionContext } from "../components/Session";
import { createEmotionCache, theme } from "../utils/config"
import { appData } from "../utils/data";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {

  const [usuario, setUsuario] = useState({})
  const [categorias, setCategorias] = useState([])

  const loadUsuario = useCallback((u) => setUsuario(u), [setUsuario])
  const loadCategorias = useCallback((c) => setCategorias(c), [setCategorias])

  useEffect(() => {

    loadUsuario(appData.usuarios[0])

  }, [loadUsuario, loadCategorias])

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionContext.Provider value={{usuario}}>
          <PageDialog>
            {
              Component.getLayout
                ? Component.getLayout(pageProps.data, <Component {...pageProps} />)
                : <Component {...pageProps} />
            }
          </PageDialog>
        </SessionContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
