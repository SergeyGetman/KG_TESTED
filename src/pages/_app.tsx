
import { Provider } from "react-redux";
import ThemeProvider from "../theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { theme } from "../theme/index";
import createEmotionCache from "../theme/createEmotionCache";
import { EmotionCache } from "@emotion/react";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function App({
  Component,
  emotionCache = clientSideEmotionCache,
  ...rest
}: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} emotionCache={emotionCache}>
        <CssBaseline />
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
