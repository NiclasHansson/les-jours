import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import Map from './Map';
import RoomPicker from './RoomPicker';
import Rooms from './data';
import Menu from './Menu';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export const FloorPlan = () => {
    return <View style={styles.container}>Hello world</View>;
};

export default FloorPlan;
