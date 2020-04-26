/*****************************************************************
 * Name: _document.js
 * Description: master page elements for pages served by next.js
 * Author: Stephen Moss
 * Date: 26/04/2020
 *****************************************************************/

import Document, { Head, Html, Main, NextScript } from 'next/document';

// master page elements
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

          {/******  1. metadata ******/}

          {/* tell browser that content is UTF-8 encode */}
          <meta charset="utf-8" />

          {/* sets page width to screen width, sets initial zoom */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* tell google to not show translate modals */}
          <meta name="google" content="notranslate" />

          {/* specify color of browser on mobile device */}
          <meta name="theme-color" content="#1976D2" />


          {/******  2. static resources (from CDN) ******/}

          <link
            rel="shortcut icon"
            href="https://storage.googleapis.com/builderbook/favicon32.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Muli:300,400:latin"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://storage.googleapis.com/builderbook/nprogress.min.css"
          />
          <link rel="stylesheet" href="https://storage.googleapis.com/builderbook/vs.min.css" />


          {/******  3. global styles ******/}
          <style>
            {`
            a, a:focus {
              font-weight: 400;
              color: #1565C0;
              text-decoration: none;
              outline: none
            }
            a:hover, button:hover {
              opacity: 0.75;
              cursor: pointer
            }
            blockquote {
              padding: 0 1em;
              color: #555;
              border-left: 0.25em solid #dfe2e5;
            }
            pre {
              display:block;
              overflow-x:auto;
              padding:0.5em;
              background:#FFF;
              color: #000;
              border: 1px solid #ddd;
            }
            code {
              font-size: 14px;
              background: #FFF;
              padding: 3px 5px;
            }
          `}
          </style>
        </Head>
        <body style={{ 
          /* styles for body */
          font: '16px Muli',
          color: '#222',
          margin: '0px auto',
          fontWeight: '300',
          lineHeight: '1.5em',
          backgroundColor: '#F7F9FC',
        }}>

          <Main />

          <NextScript />

        </body>
      </Html>
    );
  }
}

// make available to application
export default MyDocument;
