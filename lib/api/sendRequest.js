/* eslint-disable no-console */
/* ****************************************************************
 * Name: sendRequest.js
 * Description: send request to Express API routes
 * Author: Stephen Moss
 * Date: 29/04/2020
 * *************************************************************** */

import 'isomorphic-unfetch';

const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}/`;

export default async function sendRequest(path, options = {}) {
  console.log('Executing sendRequest...');
  console.log('Root URL = ', ROOT_URL);
  console.log('Path = ', path);
  console.log('options = ', JSON.stringify(options));
  // define headers
  const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charSet=UTF-8' };

  console.log('Headers = ', headers);

  const response = await fetch(
    `${ROOT_URL}${path}`,
    // eslint-disable-next-line prefer-object-spread
    Object.assign({ method: 'POST', credentials: 'include' }, options, { headers }),
  );

  console.log('Received API Response: ', response);

  const data = await response.json();

  console.log('Sending Client Response: ', data);

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
