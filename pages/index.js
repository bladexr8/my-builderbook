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

// page imports
import Head from 'next/head';

const Index = () => (
  <div style={{ padding: '10px 45px' }}>
    <Head>
      <title>Index Page</title>
      <meta name="description" content="This is the default application page" />
    </Head>
    <p>Content on the Index Page</p>
  </div>
);

export default Index;