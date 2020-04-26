/*****************************************************************
 * Name: _app.js
 * Description: Default Application Layout for next.js
 *              (refer reference below)
 * Author: Stephen Moss
 * Date: 26/04/2020
 *****************************************************************/

/* Reference Information

A Higher Order Component (HOC) is a function that takes a component
(BaseComponent) and returns a new Component (App). It will be used
in this application to wrap pages with a common Header, and pass props
to pages to control layout or data.

*/

import React from 'react';
import App from 'next/App';
import Header from '../components/Header';

class MyApp extends App {

  // peform any data loading required by page
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  // render the Component
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Header {...pageProps} />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;