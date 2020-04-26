/* ****************************************************************
 * Name: Header.js
 * Description: Default Application Header. Note that this
 *              is written as a stateless functional component
 *              (refer reference below)
 * Author: Stephen Moss
 * Date: 26/04/2020
 **************************************************************** */

// Reference Article re: stateless functional components
// eslint-disable-next-line max-len
// https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

import Link from 'next/link';

// Material-UI Toolbar - add a toolbar with action items
import Toolbar from '@material-ui/core/Toolbar';

// Material-UI Grid - create a column grid
import Grid from '@material-ui/core/Grid';

// hide elements on small screens
import Hidden from '@material-ui/core/Hidden';

// render circular images
import Avatar from '@material-ui/core/Avatar';

import PropTypes from 'prop-types';

// Dropdown Menu Component
import MenuDrop from './MenuDrop';

// Shared Component Styles
import { styleToolbar } from './SharedStyles';

// Menu Options
const optionsMenu = [
  {
    text: 'Got question?',
    href: 'https://github.com/builderbook/builderbook/issues',
  },
  {
    text: 'Log Out',
    href: '/logout',
  },
];

const Header = ({ user }) => (
  <div>
    <Toolbar style={styleToolbar}>
      <Grid container direction="row" justify="space-around" align="center">
        <Grid item sm={10} xs={9} style={{ textAlign: 'left' }}>
          {user ? (
            <div>
              <Hidden smDown>
                <Link href="/">
                  <a style={{ marginRight: '20px' }}>Settings</a>
                </Link>
              </Hidden>
            </div>
          ) : (
            <Link href="/">
              <Avatar
                src="https://storage.googleapis.com/builderbook/logo.svg"
                alt="Builder Book Logo"
                style={{ margin: '0px auto 0px 20px' }}
              />
            </Link>
          )}
        </Grid>
        <Grid item sm={1} xs={3} style={{ textAlign: 'right' }}>
          {user ? (
            <div style={{ whiteSpace: 'nowrap' }}>
              {user.avatarUrl ? (
                <MenuDrop options={optionsMenu} src={user.avatarUrl} alt={user.displayName} />
              ) : null}
            </div>
          ) : (
            <Link href="/login">
              <a style={{ margin: '0px 20px 0px auto' }}>Log In</a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Toolbar>
  </div>
);

// PropTypes
Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

// default props declaration
Header.defaultProps = {
  user: null,
};

export default Header;
