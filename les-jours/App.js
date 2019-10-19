import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SQLite } from 'expo-sqlite';

import AppNavigator from './navigation/AppNavigator';
import { DbProvider } from './DbContext';

const db = SQLite.openDatabase('ljdb');

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

class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists table_clothes (id integer primary key not null, name text, category text);'
            );
        });
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists table_outfits (id integer primary key not null, jacket int, overshirt int, shirt int, pants int, shoes int, rating int, lastWorn date);'
            );
        });
    }

    handleFinishLoading = () => {
        this.getClothes();
        this.setState({
            isLoadingComplete: true,
        });
    };

    addToClothesTable = ({ name, category }) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO table_clothes (name, category) VALUES (?,?)', [name, category], () => {
                this.getClothes();
            });
        });
    };

    deleteFromClothesTable = ({ id }) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM table_clothes WHERE id=(?)', [id], () => {
                this.getClothes();
            });
        });
    };

    getClothes = () => {
        // let clothes = [{ name: 'Should be overwritten', category: 'jackets' }];
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM table_clothes;`, [], (_, { rows }) => {
                this.setState({ clothes: rows._array });
            });
        });
    };

    render() {
        const { clothes, isLoadingComplete } = this.state;
        const { skipLoadingScreen } = this.props;
        return !isLoadingComplete && !skipLoadingScreen ? (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => this.handleFinishLoading()}
            />
        ) : (
            <DbProvider value={{ addItem: this.addToClothesTable, clothes, deleteItem: this.deleteFromClothesTable }}>
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AppNavigator />
                </View>
            </DbProvider>
        );
    }
}

App.propTypes = {
    skipLoadingScreen: PropTypes.func,
};

export default App;
