import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { getOutfit } from '../../utils/getOutfit';
import DbContext from '../../../DbContext';

import Outfit from './Outfit';
import PrimaryButton from '../PrimaryButton';
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
        marginBottom: 16,
        width: '100%',
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
                <PrimaryButton
                    title={'What should I wear?'}
                    onPress={() => setOutfit(getOutfit(0, outfits, clothes))}
                />
            </View>
        </View>
    );
};

export default Generator;
