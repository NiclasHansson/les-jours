import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Outfits from '../components/outfits/Outfits';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LJ_White,
    },
    scrollContainer: {
        flex: 1,
    },
});

export default function OutfitsScreen() {
    return (
        <View style={styles.container}>
            <Outfits />
        </View>
    );
}

OutfitsScreen.navigationOptions = {
    header: null,
};
