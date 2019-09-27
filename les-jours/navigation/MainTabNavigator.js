import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './TabBarIcon';
import HomeScreen from '../src/screens/HomeScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

/* HOME STACK */
const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);
HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
};
HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
});

tabNavigator.path = '';

export default tabNavigator;
