/*****************************************************************
 * Name: index.js
 * Description: application entry page for next.js. Note that this
 *              is written as a stateless functional component
 *              (refer reference below)
 * Author: Stephen Moss
 * Date: 26/04/2020
 *****************************************************************/

// Reference Article re: stateless functional components
// https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

// Material UI References
// Github - https://github.com/mui-org/material-ui
// Site - https://material-ui.com/


// Note that this page is wrapped by the next.js App Higher Order Component (_app.js) by default

/* Material UI Integration (Server vs. Client)

Next.js Integration Official Example - https://github.com/mui-org/material-ui/tree/master/examples/nextjs

The problem we are solving is rendering Material UI Style(s) Server side with next.js for the initial page load
and then removing them once the client code injects the styles on the browser.

If we don't remove the server side styles, then HTML elements will have both server side and client side styles
which may lead to errors. Next.js only renders the initial load server side. Subsequent render events are
managed by the client, so server side styles are no longer required.

Three Steps are required:
-------------------------
1. Create a Material-UI Theme
2. Inject styles and render page on the server
3. Remove server-side styles to avoid side effects

*/


// page imports
import Head from 'next/head';

// Material UI Button
import Button from '@material-ui/core/Button';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index Page</title>
      <meta name="description" content="This is the default application page" />
    </Head>
    <p>Content on the Index Page</p>
    <Button variant="contained">MUI Button</Button>
  </div>
);

export default Index;