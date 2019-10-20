import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import DbContext from '../../../DbContext';
import Colors from '../../constants/Colors';
import star from '../../../assets/images/star.png';
import starEmpty from '../../../assets/images/starEmpty.png';
import SecondaryButton from '../SecondaryButton';

const styles = StyleSheet.create({
    ratings: disabled => ({
        alignItems: 'center',
        opacity: disabled ? 0.3 : 1,
    }),
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

export const RatingPicker = ({ outfitId }) => {
    const [rating, setRating] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const database = React.useContext(DbContext);

    React.useEffect(() => {
        setRating(0);
        setDisabled(false);
    }, [outfitId]);

    const onRatingChange = pressedRating => {
        const newRating = pressedRating === rating ? 0 : pressedRating;
        setRating(newRating);
    };

    const onSave = () => {
        setDisabled(true);
        database.setOutfitRating(outfitId, rating);
    };

    return (
        <>
            <View style={styles.ratings(disabled)}>
                <Text style={styles.ratingsText}>Rate your outit</Text>
                <View style={styles.starContainer}>
                    <TouchableOpacity disabled={disabled} onPress={() => onRatingChange(1)}>
                        <Image style={styles.star} source={rating > 0 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disabled} onPress={() => onRatingChange(2)}>
                        <Image style={styles.star} source={rating > 1 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disabled} onPress={() => onRatingChange(3)}>
                        <Image style={styles.star} source={rating > 2 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disabled} onPress={() => onRatingChange(4)}>
                        <Image style={styles.star} source={rating > 3 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={disabled} onPress={() => onRatingChange(5)}>
                        <Image style={styles.star} source={rating > 4 ? star : starEmpty} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
            <SecondaryButton disabled={disabled} title="Save rating" onPress={onSave} />
        </>
    );
};

RatingPicker.propTypes = {
    outfitId: PropTypes.string,
};

export default RatingPicker;
