import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        backgroundColor: Colors.LJ_LJ_1,
        paddingTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingText: {
        color: Colors.LJ_White,
        fontSize: 48,
        fontFamily: 'kelly-slab',
    },
});

export const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>LES STYLES</Text>
        </View>
    );
};

export default Header;
