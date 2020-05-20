import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import TaskList from './screen/TaskList';
import Auth from './screen/Auth';
import Menu from './screen/Menu';
import commonStyles from './commonStyles';

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'bold',
      fontSize: 20,
      color: '#080',
    },
  },
};

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title="Hoje" daysAheard={0} {...props} />,
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title="Amanhã" daysAheard={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã',
    },
  },
  Week: {
    name: 'Today',
    screen: props => <TaskList title="semana" daysAheard={7} {...props} />,
    navigationOptions: {
      title: 'semana',
    },
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList title="Mês" daysAheard={30} {...props} />,
    navigationOptions: {
      title: 'Mês',
    },
  },
};

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
  Auth: {
    name: 'Auth',
    screen: Auth,
  },
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
