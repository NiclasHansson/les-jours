import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import Header from '../Header';
import Outfit from './Outfit';
import { clothes, outfits } from '../../data/clothes';
import star from '../../../assets/images/star.png';
import starEmpty from '../../../assets/images/starEmpty.png';

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
    ratings: {
        alignItems: 'center',
    },
    ratingsText: {
        color: Colors.LJ_Black,
        fontSize: 16,
        fontFamily: 'kelly-slab',
        marginBottom: 8,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: 300,
    },
    star: {
        height: 30,
        width: 30,
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

const generateOutfit = minRating => {
    if (minRating > 0) {
        return randomizeRatedOutfit(minRating);
    }
    return generateNewOutfit(1);
};

const randomizeRatedOutfit = minRating => {
    const ratedOutfits = outfits.sort(outfit => outfit.data.rating >= minRating);
    return ratedOutfits[Math.floor(ratedOutfits.length * Math.random())];
};

const generateNewOutfit = retry => {
    const { jackets, overShirts, pants, shirts, shoes } = clothes;
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
        return generateOutfit(retry++);
    }
    return newOutfit;
};

export const Generator = () => {
    const [outfit, setOutfit] = useState({});
    const [minRating, setMinRating] = useState(5);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.outfit}>
                <Outfit outfit={outfit} />
            </View>
            <View style={styles.ratings}>
                <Text style={styles.ratingsText}>min. rating requirement</Text>
                <View style={styles.starContainer}>
                    <TouchableOpacity onPress={() => (minRating === 1 ? setMinRating(0) : setMinRating(1))}>
                        <Image style={styles.star} source={minRating > 0 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (minRating === 2 ? setMinRating(0) : setMinRating(2))}>
                        <Image style={styles.star} source={minRating > 1 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (minRating === 3 ? setMinRating(0) : setMinRating(3))}>
                        <Image style={styles.star} source={minRating > 2 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (minRating === 4 ? setMinRating(0) : setMinRating(4))}>
                        <Image style={styles.star} source={minRating > 3 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (minRating === 5 ? setMinRating(0) : setMinRating(5))}>
                        <Image style={styles.star} source={minRating > 4 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button
                        color={Colors.LJ_White}
                        title="What should I wear?"
                        onPress={() => setOutfit(generateOutfit(minRating))}
                    />
                </View>
            </View>
        </View>
    );
};

export default Generator;
