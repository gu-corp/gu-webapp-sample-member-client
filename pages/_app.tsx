import React, { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import App, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Collapse from '@material-ui/core/Collapse';

import '@/styles/globals.css'
import theme from '@/styles/theme';
import initAuth from '@/common/firebase/init-auth'
import { useStore } from '@/store/with-redux';
import { InitialState } from '@/store/configure-store';
import { client } from "@/graphql/client";

initAuth();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(
    pageProps.initialReduxState ? JSON.parse(pageProps.initialReduxState) : InitialState,
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            TransitionComponent={Collapse}
            autoHideDuration={3000}
          >
            <Provider store={store}>            
              <Component {...pageProps} />
            </Provider>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default appWithTranslation(MyApp);
