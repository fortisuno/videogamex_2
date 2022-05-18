import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { createEmotionCache, theme } from "../utils/config";
import { ConfirmProvider } from 'material-ui-confirm';
import { PageDataProvider } from "@hooks/usePageData";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<SessionProvider>
					<ConfirmProvider>
						{
							Component.getLayout ? (
								Component.getLayout(pageProps.layoutProps, <Component {...pageProps} />)
							) : (
								<Component {...pageProps} />
							)
						}
					</ConfirmProvider>
				</SessionProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp