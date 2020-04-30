/* eslint-disable no-console */
/* ****************************************************************
 * Name: admin.js
 * Description: admin specific client routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

import sendRequest from './sendRequest';

const BASE_PATH = 'api/v1/admin';

// get list of books
export const getBookList = async () => {
  console.log('getBookList() calling sendRequest...');
  const books = await sendRequest(`${BASE_PATH}/books`, {
    method: 'GET',
  });
  console.log('Books from API: ', books);
  return books;
};
