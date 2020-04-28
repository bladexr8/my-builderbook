/* eslint-disable react/no-danger */
/* ****************************************************************
 * Name: Notifier.js
 * Description: Notifier utility component. Uses Material-UI
 *              "snack bar" widget
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let openSnackbarFn;

class Notifier extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  openSnackbar = ({ message }) => {
    this.setState({ open: true, message });
  };

  render() {
    const message = (
      // eslint-disable-next-line react/destructuring-assignment
      <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message }} />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={message}
        autoHideDuration={5000}
        onClose={this.handleSnackbarRequestClose}
        // eslint-disable-next-line react/destructuring-assignment
        open={this.state.open}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
    );
  }
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}

export default Notifier;
