import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const loadResourcesAsync = async () => {
    await Promise.all([
        Asset.loadAsync([require('./assets/images/icon.png'), require('./assets/images/icon.png')]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            'kelly-slab': require('./assets/fonts/KellySlab-Regular.ttf'),
        }),
    ]);
};

const handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
};

const handleFinishLoading = setLoadingComplete => {
    setLoadingComplete(true);
};

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    return !isLoadingComplete && !props.skipLoadingScreen ? (
        <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
    ) : (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <HomeScreen />
        </View>
    );
}

App.propTypes = {
    skipLoadingScreen: PropTypes.func,
};
