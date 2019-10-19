import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import star from '../../../assets/images/star.png';
import starEmpty from '../../../assets/images/starEmpty.png';

const styles = StyleSheet.create({
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
});

export const RatingPicker = (initialRating = 5, onChange, text) => {
    const [rating, setRating] = useState(initialRating);

    const onRatingChange = pressedRating => {
        const newRating = pressedRating === rating ? 0 : pressedRating;
        setRating(newRating);
        onChange(newRating);
    };

    return (
        <View style={styles.ratings}>
            {text && <Text style={styles.ratingsText}>{text}</Text>}
            <View style={styles.starContainer}>
                <TouchableOpacity onPress={() => onRatingChange(1)}>
                    <Image style={styles.star} source={rating > 0 ? star : starEmpty} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRatingChange(2)}>
                    <Image style={styles.star} source={rating > 1 ? star : starEmpty} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRatingChange(3)}>
                    <Image style={styles.star} source={rating > 2 ? star : starEmpty} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRatingChange(4)}>
                    <Image style={styles.star} source={rating > 3 ? star : starEmpty} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRatingChange(5)}>
                    <Image style={styles.star} source={rating > 4 ? star : starEmpty} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RatingPicker;
