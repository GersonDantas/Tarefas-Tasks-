/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import TaskList from './src/screen/TaskList';

AppRegistry.registerComponent(appName, () => TaskList);
