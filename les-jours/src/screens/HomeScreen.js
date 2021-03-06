import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Generator from '../components/generator/Generator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LJ_White,
    },
    scrollContainer: {
        flex: 1,
    },
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Generator />
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
