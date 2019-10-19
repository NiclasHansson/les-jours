import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.LJ_LJ_3,
        paddingHorizontal: 16,
    },
    headingText: {
        fontSize: 24,
        fontFamily: 'kelly-slab',
    },
    addButton: {
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.LJ_LJ_2,
    },
    addButtonText: {
        fontSize: 26,
        fontFamily: 'kelly-slab',
        marginTop: 1,
    },
    itemsContainer: {
        paddingHorizontal: 16,
    },
    item: {
        height: 44,
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        fontFamily: 'kelly-slab',
    },
});

export const CategoryCard = ({ items = [], name, onAddPress, onItemPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{name}</Text>
                <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itemsContainer}>
                {items.map(item => (
                    <TouchableOpacity style={styles.item} key={item.name} onPress={() => onItemPress(item)}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

CategoryCard.propTypes = {
    name: PropTypes.string,
    items: PropTypes.array,
    onAddPress: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
};

export default CategoryCard;
