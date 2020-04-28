/* ****************************************************************
 * Name: notifier.js
 * Description: Support Notifier utility component. Uses Material-UI
 *              "snack bar" widget
 * Author: Stephen Moss
 * Date: 26/04/2020
 * *************************************************************** */

import { openSnackbar } from '../components/Notifier';

export default function notify(obj) {
  openSnackbar({ message: obj.message || obj.toString() });
}
