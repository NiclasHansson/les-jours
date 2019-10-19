import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { getClothes } from '../../utils/getClothes';
import DbContext from '../../../DbContext';

import Colors from '../../constants/Colors';
import Header from '../Header';
import Outfit from './Outfit';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    outfit: {
        flex: 1,
        width: '100%',
        padding: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.LJ_LJ_1,
        height: 50,
        borderRadius: 8,
    },
});

const generateOutfit = (minRating, outfits, clothes) => {
    if (minRating > 0) {
        return randomizeRatedOutfit(minRating, outfits);
    }
    return generateNewOutfit(0, outfits, clothes);
};

const randomizeRatedOutfit = (minRating, outfits) => {
    const ratedOutfits = outfits.sort(outfit => outfit.data.rating >= minRating);
    return ratedOutfits[Math.floor(ratedOutfits.length * Math.random())];
};

const generateNewOutfit = (retry, outfits, clothes) => {
    const { jackets, overShirts, pants, shirts, shoes } = getClothes(clothes);
    if (retry > jackets.length * overShirts.length * pants.length * shirts.length * shoes.length) {
        return {};
    }
    console.log('GENERATE NEW OUTFIT: Attempt', retry);
    const newClothes = {
        jackets: jackets[Math.floor(jackets.length * Math.random())],
        overShirts: overShirts[Math.floor(overShirts.length * Math.random())],
        shirts: shirts[Math.floor(shirts.length * Math.random())],
        pants: pants[Math.floor(pants.length * Math.random())],
        shoes: shoes[Math.floor(shoes.length * Math.random())],
    };
    const newOutfit = {
        id: `${newClothes.jackets.id}-${newClothes.overShirts.id}-${newClothes.pants.id}-${newClothes.shirts.id}-${newClothes.shoes.id}`,
        clothes: newClothes,
        data: {
            rating: null,
            lastWorn: null,
        },
    };
    if (outfits.some(outfit => outfit && outfit.id === newOutfit.id)) {
        return generateOutfit(retry++, outfits, clothes);
    }
    return newOutfit;
};

export const Generator = () => {
    const [outfit, setOutfit] = useState({});

    const database = React.useContext(DbContext);
    const outfits = database.outfits || [];
    const clothes = database.clothes || [];

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.outfit}>
                <Outfit outfit={outfit} />
            </View>

            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button
                        color={Colors.LJ_White}
                        title="What should I wear?"
                        onPress={() => setOutfit(generateOutfit(0, outfits, clothes))}
                    />
                </View>
            </View>
        </View>
    );
};

export default Generator;
