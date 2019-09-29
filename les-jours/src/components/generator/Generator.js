import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';
import Header from '../Header';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 100,
        paddingHorizontal: 16,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.LJ_LJ_1,
        height: 50,
        borderRadius: 8,
    },
});

export const Generator = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button color={Colors.LJ_White} title="Give me clothes" onPress={() => {}} />
                </View>
            </View>
        </View>
    );
};

export default Generator;
