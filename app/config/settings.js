// If you're running on a device or in the Android simulator be sure to change
import { METEOR_URL } from 'react-native-dotenv'
let url = `ws://${METEOR_URL}:3000/websocket`
// if (process.env.NODE_ENV === 'production') {
//   METEOR_URL = ''; // your production server url
// }

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL: url,
};

export default settings;