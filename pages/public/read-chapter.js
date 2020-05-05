/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-danger */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prefer-stateless-function */
/* ****************************************************************
 * Name: read-chapter.js
 * Description: read a chapter page
 * Author: Stephen Moss
 * Date: 05/05/2020
 **************************************************************** */
import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Head from 'next/head';
import Grid from '@material-ui/core/Grid';

import { getChapterDetail } from '../../lib/api/public';
import withAuth from '../../lib/withAuth';

const styleGrid = {
  flexGrow: '1',
};

class ReadChapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      htmlContent: PropTypes.string,
    }),
  };

  static defaultProps = {
    chapter: null,
  };

  constructor(props) {
    // 1. define state
    super(props);
    const { chapter } = props;

    let htmlContent = '';
    if (chapter) {
      htmlContent = chapter.htmlContent;
    }

    this.state = {
      chapter,
      htmlContent,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    // 2. render new chapter
    const { chapter } = nextProps;

    // check if a different chapter than current one
    // eslint-disable-next-line react/destructuring-assignment
    if (chapter && chapter._id !== this.props.chapter._id) {
      const { htmlContent } = chapter;
      this.setState({ chapter, htmlContent });
    }
  }

  // render chapter on server
  static async getInitialProps({ req, query }) {
    // 3. call API method, pass necessary data to a server
    const { bookSlug, chapterSlug } = query;

    const headers = {};
    // in Next.js, query is a query string section of a URL
    if (req && req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    console.log('read-chapter.js getInitialProps -> Requesting chapter from API...');

    const chapter = await getChapterDetail({ bookSlug, chapterSlug }, { headers });

    console.log('read-chapter.js getInitialProps -> chapter = ', chapter);

    return { chapter };
  }

  renderMainContent() {
    const { chapter, htmlContent } = this.state;
    return (
      <div>
        <h3>Chapter: {chapter.title}</h3>
        <div className="main-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

  render() {
    const { chapter } = this.state;

    if (!chapter) {
      return <Error statusCode={404} />;
    }

    const { book } = chapter;

    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>
            {chapter.title === 'Introduction'
              ? 'Introduction'
              : `Chapter ${chapter.order - 1}. ${chapter.title}`}
          </title>
          {chapter.seoDescription ? (
            <meta name="description" content={chapter.seoDescription} />
          ) : null}
        </Head>

        <Grid style={styleGrid} container direction="row" justify="space-around" align="flex-start">
          <Grid
            item
            sm={10}
            xs={12}
            style={{
              textAlign: 'left',
              paddingLeft: '25px',
            }}
          >
            <h2>Book: {book.name}</h2>
            {this.renderMainContent()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withAuth(ReadChapter, { loginRequired: false });
