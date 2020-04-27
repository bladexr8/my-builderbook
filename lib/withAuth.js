/* eslint-disable react/static-property-placement */
/* eslint-disable react/jsx-props-no-spreading */

/* ****************************************************************
 * Name: withAuth.js
 * Description: HOC to pass a user object to pages and re-direct a
 *              user according to login status
 * Author: Stephen Moss
 * Date: 26/04/2020
 **************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

let globalUser = null;

/* *********************************************
 * Server Side Rendering Notes
 * *********************************************
 * Optimal strategy for fast loading
 * is to render a page on the server
 * for initial page load and then on
 * client for subsequent loads.
 *
 * In next.js, getInitialProps()
 * executes on server for initial
 * load of a page and then on client
 * for subsequent loads. Therefore,
 * in next.js, getInitialProps()
 * executes on the server for the
 * initial load of a page but
 * executes on the client when a user
 * navigates to that page via "Link"
 * or "Router.push"
 *
 * In Summary:
 * 1. If you want to render a page on the
 *    server for initial load, fetch data
 *    with getInitialProps()
 * 2. If you want to render a page on the client,
 *    without server side rendering for the
 *    initial load, fetch data inside
 *    the componentDidMount() lifecycle
 *    hook
 * ********************************************* */

function withAuth(BaseComponent, { loginRequired = true, logoutRequired = false } = {}) {
  class App extends React.Component {
    // PropTypes
    static propTypes = {
      user: PropTypes.shape({
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    // maintain a global state for application
    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) {
        globalUser = user;
      }

      // if login is required and not logged in,
      // re-direct to "/login" page
      if (loginRequired && !logoutRequired && !user) {
        Router.push('/login');
        return;
      }

      // if logout is required and user logged in,
      // redirect to "/" page
      if (logoutRequired && user) {
        Router.push('/');
      }
    }

    // getInitialProps
    // get server side details for user
    // these are passed in from Express Route
    // once loaded, these are available to any
    // app pages wrapped by this component
    static async getInitialProps(ctx) {
      /* Request "req" and "ctx.req" both exist on the server
       * - If ctx.req is not rendered on the server - it's undefined
       *   on the client and we get !!undefined is false
       * - If ctx.req is rendered on the server and exists on the client
       *   we get !!value is true
       * "!" converts an object to boolean and negates it. The second "!"
       * negates that boolean. In Javascript "undefined" is falsy, meaning
       * "!undefined" is true, and "!!undefined" is false
       * */
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;
      if (isFromServer && user) {
        // user._id is passed from server as an object
        user._id = user._id.toString();
      }
      const props = { user, isFromServer };

      // call child's getInitialProps if it is defined
      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }
      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        // prevent component rendering
        return null;
      }

      if (logoutRequired && user) {
        // prevent component rendering
        return null;
      }

      // render BaseComponent being wrapped
      return <BaseComponent {...this.props} />;
    }
  }
  return App;
}

export default withAuth;
