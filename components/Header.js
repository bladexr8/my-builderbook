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

const Header = () => (
  <div>
    <Link href="/login">
      <a style={{ margin: '0px 20px 0px auto'}}>Log In</a>
    </Link>
  </div>
);

export default Header;