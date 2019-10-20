import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
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
});

export const GeneratorEmptyState = ({ outfit }) => {
    return outfit === undefined ? (
        <Text style={styles.placeholderPrimaryText}>Load an outfit to display it here...</Text>
    ) : (
        <View>
            <Text style={styles.placeholderPrimaryText}>No rated outfits</Text>
            <Text style={styles.placeholderSecondaryText}>Generate a new outfit to get started.</Text>
        </View>
    );
};

GeneratorEmptyState.propTypes = {
    outfit: PropTypes.any,
};

export default GeneratorEmptyState;
