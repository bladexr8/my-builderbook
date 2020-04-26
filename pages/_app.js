/* ****************************************************************
 * Name: _app.js
 * Description: Default Application Layout for next.js
 *              (refer reference below)
 * Author: Stephen Moss
 * Date: 26/04/2020
 **************************************************************** */

/* Reference Information

A Higher Order Component (HOC) is a function that takes a component
(BaseComponent) and returns a new Component (App). It will be used
in this application to wrap pages with a common Header, and pass props
to pages to control layout or data.

This Component is also wrapped by the Material-UI ThemeProvider to
support server side style rendering (refer to index.js)

*/

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import App from 'next/app';
import { theme } from '../lib/theme';
import Header from '../components/Header';

class MyApp extends App {
  // peform any data loading required by page
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {};
    if (Component.getInitialProps) {
      Object.assign(pageProps, await Component.getInitialProps(ctx));
    }
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected styles
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  // render the Component
  render() {
    // eslint-disable-next-line no-console
    console.log('[INFO][_app.js] this.props = ', this.props);
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {/* ThemeProvider makes the theme available
            down the React Tree thanks to React
        Context */}
        {/* CssBaseline kickstarts an elegant, 
            consistent, and simple baseline 
        to build upon */}
        <CssBaseline />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Header {...pageProps} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
