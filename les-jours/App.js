import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SQLite } from 'expo-sqlite';

import AppNavigator from './navigation/AppNavigator';
import Header from './src/components/Header';
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
        clothes: [],
        isLoadingComplete: false,
        outfits: [],
    };

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists table_clothes (id integer primary key not null, name text, category text);'
            );
        });
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists table_outfits_2 (id integer primary key not null, outfitId string, rating integer, lastRated string);'
            );
        });
    }

    handleFinishLoading = () => {
        this.getAllClothes();
        this.getAllOutfits();
        this.setState({
            isLoadingComplete: true,
        });
    };

    addToClothesTable = ({ name, category }) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO table_clothes (name, category) VALUES (?,?)', [name, category], () => {
                this.getAllClothes();
            });
        });
    };

    deleteFromClothesTable = ({ id }) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM table_clothes WHERE id=(?)', [id], () => {
                this.getAllClothes();
            });
        });
    };

    deleteOutfit = ({ id }) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM table_outfits_2 WHERE outfitId=(?)', [id], () => {
                this.getAllOutfits();
            });
        });
    };

    getAllClothes = () => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM table_clothes;`, [], (_, { rows }) => {
                this.setState({ clothes: rows._array });
            });
        });
    };

    getAllOutfits = () => {
        console.log('GET ALLLLLLLL');
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM table_outfits_2;`, [], (_, { rows }) => {
                console.log('SUCCESS');
                this.setState({ outfits: rows._array });
            });
        });
    };

    setOutfitRating = async (id, rating) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM table_outfits_2 WHERE outfitId=(?)`, [id], (_, { rows }) => {
                const outfit = rows._array[0];
                if (outfit) {
                    console.log('OUTFIT IS NOT NULL', outfit);
                    const newRating = (rating + outfit.rating) / 2;
                    db.transaction(tx => {
                        tx.executeSql(
                            'UPDATE table_outfits_2 SET rating=(?), lastRated=(?) WHERE outfitId=(?)',
                            [newRating, new Date(), id],
                            () => {
                                this.getAllOutfits();
                            }
                        );
                    });
                } else {
                    console.log('OUTFIT NULLLLLL');
                    db.transaction(tx => {
                        tx.executeSql(
                            'INSERT INTO table_outfits_2 (outfitId, rating, lastRated) VALUES (?,?,?)',
                            [id, rating, new Date()],
                            () => {
                                this.getAllOutfits();
                            }
                        );
                    });
                }
            });
        });
    };

    render() {
        const { clothes, outfits, isLoadingComplete } = this.state;
        console.log('RENDER', clothes.length, outfits.length);
        const { skipLoadingScreen } = this.props;
        return !isLoadingComplete && !skipLoadingScreen ? (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => this.handleFinishLoading()}
            />
        ) : (
            <DbProvider
                value={{
                    addItem: this.addToClothesTable,
                    clothes,
                    deleteClothesItem: this.deleteFromClothesTable,
                    deleteOutfit: this.deleteOutfit,
                    outfits,
                    setOutfitRating: this.setOutfitRating,
                }}
            >
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <Header />
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
