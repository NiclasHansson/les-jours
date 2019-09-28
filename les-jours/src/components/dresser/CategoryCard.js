import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.LJ_GREY_2,
        borderRadius: 4,
        backgroundColor: Colors.LJ_GREY_1,
    },
    headingContainer: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: Colors.LJ_LJ_3,
        paddingHorizontal: 16,
    },
    headingText: {
        fontSize: 24,
        fontFamily: 'kelly-slab',
    },
    itemsContainer: {
        padding: 16,
    },
    itemText: {
        fontSize: 18,
        fontFamily: 'kelly-slab',
    },
});

export const CategoryCard = ({ items, name }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{name}</Text>
            </View>
            <View style={styles.itemsContainer}>
                {items.map(item => (
                    <Text key={item.name} style={styles.itemText}>
                        {item.name}
                    </Text>
                ))}
            </View>
        </View>
    );
};

CategoryCard.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
};

export default CategoryCard;
