import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './TabBarIcon';
import HomeScreen from '../src/screens/HomeScreen';
import OutfitsScreen from '../src/screens/OutfitsScreen';
import ClothesScreen from '../src/screens/ClothesScreen';

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

/* OUTFITS STACK */
const OutfitsStack = createStackNavigator(
    {
        Home: OutfitsScreen,
    },
    config
);
OutfitsStack.navigationOptions = {
    tabBarLabel: 'Outfits',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
};
OutfitsStack.path = '';

/* CLOTHES STACK */
const ClothesStack = createStackNavigator(
    {
        Home: ClothesScreen,
    },
    config
);
ClothesStack.navigationOptions = {
    tabBarLabel: 'Clothes',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
};
ClothesStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    OutfitsStack,
    ClothesStack,
});

tabNavigator.path = '';

export default tabNavigator;
