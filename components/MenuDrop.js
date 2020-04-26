/* eslint-disable react/static-property-placement */
/* ****************************************************************
 * Name: MenuDrop.js
 * Description: re-usable menu component
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

class MenuDrop extends React.Component {
  // eslint-disable-next-line react/sort-comp
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(String).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    open: false,
    anchorEl: undefined,
  };

  button = undefined;

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    // get info from passed in props
    const { options, src, alt } = this.props;

    return (
      <div>
        <Avatar
          role="presentation"
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          src={src}
          alt={alt}
          style={{ margin: '0px 20px 0px auto', cursor: 'pointer' }}
        />
        <Menu
          id="simple-menu"
          // eslint-disable-next-line react/destructuring-assignment
          anchorEl={this.state.anchorEl}
          // eslint-disable-next-line react/destructuring-assignment
          open={this.state.open}
          onClose={this.handleClose}
        >
          {options.map((option) => (
            <div id="wrappingLink" key={option.text}>
              <Link href={option.href} as={option.as || option.href}>
                <a style={{ padding: '0px 20px' }}>{option.text}</a>
              </Link>
              <p />
            </div>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MenuDrop;
