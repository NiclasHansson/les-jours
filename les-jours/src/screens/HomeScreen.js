import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Dresser from '../components/dresser/Dresser';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContainer: {
        flex: 1,
    },
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Dresser />
            </ScrollView>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
