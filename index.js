/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import Auth from './src/screen/Auth';

AppRegistry.registerComponent(appName, () => Auth);
