/*****************************************************************
 * Name: theme.js
 * Description: Material UI Theme for server side style generation
 *              (refer index.js)
 * Author: Stephen Moss
 * Date: 26/04/2020
 *****************************************************************/
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: grey[700] },
    type: 'light'
  }
});

export { theme };