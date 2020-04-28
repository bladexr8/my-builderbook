/* ****************************************************************
 * Name: index.js
 * Description: application entry page for next.js. Note that this
 *              was written as a stateless functional component
 *              (refer reference below) until Chapter 03
 * Author: Stephen Moss
 * Date: 26/04/2020
 **************************************************************** */

// Reference Article re: stateless functional components
// eslint-disable-next-line
// https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

// Material UI References
// Github - https://github.com/mui-org/material-ui
// Site - https://material-ui.com/

// Note that this page is wrapped by the next.js App Higher Order Component (_app.js) by default

/* Material UI Integration (Server vs. Client)

Next.js Integration Official Example 
- https://github.com/mui-org/material-ui/tree/master/examples/nextjs
Server vs. Client Rendering 
- https://medium.com/@adamzerner/client-side-rendering-vs-server-side-rendering-a32d2cf3bfcc

The problem we are solving is rendering Material UI Style(s) Server side with  
next.js for the initial page load and then removing them once the client code 
injects the styles on the browser.

If we don't remove the server side styles, then HTML elements will have both 
server side and client side styles which may lead to errors. Next.js only renders the 
initial load server side. Subsequent render events are
managed by the client, so server side styles are no longer required.

Three Steps are required:
-------------------------
1. Create a Material-UI Theme
2. Inject styles and render page on the server
3. Remove server-side styles to avoid side effects

*/

// page imports
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import withAuth from '../lib/withAuth';
import notify from '../lib/notifier';

class Index extends React.Component {
  // Props Validation
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  };

  // Default Props
  static defaultProps = {
    user: null,
  };

  render() {
    // passed in from withAuth component
    // console.log('[INFO] index.js props - ', this.props);
    const { user } = this.props;
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="List of purchased books" />
        </Head>
        <p>Dashboard </p>
        <p>
          Email:
          {user.email}
        </p>
        <Button variant="contained" onClick={() => notify('success message')}>
          Click me to test notify()
        </Button>
      </div>
    );
  }
}

// this in effect, wraps the
// Index Page with the
// "withAuth" component
// Note: is also wrapped by
// _app.js "App" component
// by next.js automatically
// as well
export default withAuth(Index);
