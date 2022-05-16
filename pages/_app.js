import { CacheProvider } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import PageDialog from "../components/PageDialog";
import { SessionContext } from "../components/Session";
import { createEmotionCache, theme } from "../utils/config"
import { appData } from "../utils/data";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider>
          <PageDialog>
            {
              Component.getLayout
                ? Component.getLayout(pageProps.data, <Component {...pageProps} />)
                : <Component {...pageProps} />
            }
          </PageDialog>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
