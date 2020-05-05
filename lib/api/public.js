/* eslint-disable max-len */
/* eslint-disable no-console */
/* ****************************************************************
 * Name: public.js
 * Description: public specific client routes
 * Author: Stephen Moss
 * Date: 05/05/2020
 * *************************************************************** */

// import utility method
import sendRequest from './sendRequest';

const BASE_PATH = 'api/v1/public';

export const getChapterDetail = async ({ bookSlug, chapterSlug }, options = {}) => {
  console.log('Executing getChapterDetail()');
  console.log('BASE_PATH = ', BASE_PATH);
  console.log(
    `sendRequest path = ${BASE_PATH}/get-chapter-detail?bookSlug=${bookSlug}&chapterSlug=${chapterSlug}`,
  );
  const chapter = await sendRequest(
    `${BASE_PATH}/get-chapter-detail?bookSlug=${bookSlug}&chapterSlug=${chapterSlug}`,
    {
      method: 'GET',
      ...options,
    },
  );
  return chapter;
};
