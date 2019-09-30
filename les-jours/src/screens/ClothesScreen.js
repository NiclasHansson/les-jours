import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Clothes from '../components/clothes/Clothes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LJ_White,
    },
    scrollContainer: {
        flex: 1,
    },
});

export default function ClothesScreen() {
    return (
        <View style={styles.container}>
            <Clothes />
        </View>
    );
}

ClothesScreen.navigationOptions = {
    header: null,
};
