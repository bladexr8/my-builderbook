/* ****************************************************************
 * Name: login.js
 * Description: app login page
 *              Written as a stateless functional component
 *              (refer reference notes in index.js)
 * Author: Stephen Moss
 * Date: 27/04/2020
 **************************************************************** */

import Head from 'next/head';
import Button from '@material-ui/core/Button'

import withAuth from '../lib/withAuth';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>Log in to Builder Book</title>
      <meta name="description" content="Login page for builderbook" />
    </Head>
    <br />
    <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Log In</p>
    <p>You will be logged in for 14 days unless you log out manually.</p>
    <br />
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      <img
        src="https://storage.googleapis.com/builderbook/G.svg"
        alt="Log in with Google"
        style={{ marginRight: '10px '}}
      />
      Log In with Google
    </Button>
  </div>
);

// note we set "logoutRequired" to true to tell withAuth
// that this page shouldn't be available to logged in users
export default withAuth(Login, { logoutRequired: true });