/* eslint-disable no-console */
/* ****************************************************************
 * Name: index.js
 * Description: Admin User Landing page
 * Author: Stephen Moss
 * Date: 30/04/2020
 **************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import notify from '../../lib/notifier';

import withAuth from '../../lib/withAuth';

import { getBookList } from '../../lib/api/admin';

const Index = ({ books }) => (
  <div style={{ padding: '10px 45px' }}>
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link
              href={`/admin/book-detail?slug=${book.slug}`}
              as={`/admin/book-detail/${book.slug}`}
            >
              <a>{book.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Index.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

class IndexWithData extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    books: [],
  };

  // load the books data
  async componentDidMount() {
    try {
      let books = {};
      console.log('Requesting Books from API...');
      books = await getBookList();
      console.log('Received Books: ', { books });
      this.setState({ books });
      console.log('Page State = ', this.state);
    } catch (err) {
      console.log(err);
      notify(err);
    }
  }

  render() {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Index {...this.state} />;
  }
}

export default withAuth(IndexWithData, { adminRequired: true });
