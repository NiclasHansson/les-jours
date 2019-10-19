import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { getOutfit } from '../../utils/getOutfit';
import DbContext from '../../../DbContext';

import Colors from '../../constants/Colors';
import Outfit from './Outfit';
import GeneratorEmptyState from './GeneratorEmptyState';
import RatingPicker from './RatingPicker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    content: {
        flex: 1,
        width: '100%',
    },
    ratingContainer: {
        marginTop: 16,
        marginBottom: 16,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    generateButtonContainer: {
        width: '100%',
        marginBottom: 16,
    },
    generateButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.LJ_LJ_1,
        height: 50,
        borderRadius: 8,
    },
});

export const Generator = () => {
    const [outfit, setOutfit] = useState(undefined);
    const database = React.useContext(DbContext);
    const outfits = database.outfits || [];
    const clothes = database.clothes || [];

    return (
        <View style={styles.container}>
            {outfit ? (
                <View style={styles.content}>
                    <Outfit outfit={outfit} />
                    <View style={styles.ratingContainer}>
                        <RatingPicker outfitId={outfit.id} />
                    </View>
                </View>
            ) : (
                <View style={styles.emptyStateContainer}>
                    <GeneratorEmptyState outfit={outfit} />
                </View>
            )}
            <View style={styles.generateButtonContainer}>
                <View style={styles.generateButton}>
                    <Button
                        color={Colors.LJ_White}
                        title={outfit ? 'Try again' : 'What should I wear?'}
                        onPress={() => setOutfit(getOutfit(0, outfits, clothes))}
                    />
                </View>
            </View>
        </View>
    );
};

export default Generator;
