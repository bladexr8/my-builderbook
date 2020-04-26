/*****************************************************************
 * Name: Header.js
 * Description: Default Application Header. Note that this
 *              is written as a stateless functional component
 *              (refer reference below)
 * Author: Stephen Moss
 * Date: 26/04/2020
 *****************************************************************/

// Reference Article re: stateless functional components
// https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

import Link from 'next/Link';

// Material-UI Toolbar - add a toolbar with action items
import Toolbar from '@material-ui/core/Toolbar';

// Material-UI Grid - create a column grid
import Grid from '@material-ui/core/Grid';

// Shared Component Styles
import { styleToolbar } from './SharedStyles';

const Header = () => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" align="center">
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Link href="/login">
            <a style={{ margin: '0px 20px 0px auto' }}>Log In</a>
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

export default Header;