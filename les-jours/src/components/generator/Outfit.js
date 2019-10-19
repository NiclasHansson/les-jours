import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import jacket from '../../../assets/images/jacket.png';
import overShirt from '../../../assets/images/overShirt.png';
import pants from '../../../assets/images/pants.png';
import shirt from '../../../assets/images/shirt.png';
import shoes from '../../../assets/images/shoes.png';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    placeholderPrimaryText: {
        color: Colors.LJ_Black,
        fontSize: 26,
        fontFamily: 'kelly-slab',
        textAlign: 'center',
    },
    placeholderSecondaryText: {
        color: Colors.LJ_Black,
        fontSize: 18,
        fontFamily: 'kelly-slab',
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    itemText: {
        color: Colors.LJ_Black,
        fontSize: 24,
        fontFamily: 'kelly-slab',
    },
});

const getIcon = category => {
    switch (category) {
        case 'jackets':
            return jacket;
        case 'overShirts':
            return overShirt;
        case 'shirts':
            return shirt;
        case 'pants':
            return pants;
        case 'shoes':
            return shoes;
    }
};

export const Outfit = ({ outfit }) => {
    return (
        <View style={styles.container}>
            {outfit ? (
                outfit === {} ? (
                    <Text style={styles.placeholderPrimaryText}>Load an outfit to display it here...</Text>
                ) : (
                    outfit.clothes &&
                    Object.entries(outfit.clothes).map(([category, item]) => (
                        <View key={`${category}-${item.id}`} style={styles.item}>
                            <Image style={styles.icon} source={getIcon(category)} resizeMode="contain" />
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    ))
                )
            ) : (
                <View>
                    <Text style={styles.placeholderPrimaryText}>{'No rated outfits'}</Text>
                    <Text style={styles.placeholderSecondaryText}>{'Generate a new outfit to get started.'}</Text>
                </View>
            )}
        </View>
    );
};

Outfit.propTypes = {
    outfit: PropTypes.shape({
        id: PropTypes.string,
        clothes: PropTypes.shape({
            jackets: PropTypes.any,
            overShirts: PropTypes.any,
            pants: PropTypes.any,
            shirts: PropTypes.any,
            shoes: PropTypes.any,
        }),
        data: PropTypes.any,
    }),
};

export default Outfit;
