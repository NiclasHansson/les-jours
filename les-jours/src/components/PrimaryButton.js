import React from 'react';
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
import Colors from '../constants/Colors';

export const PrimaryButton = ({ accessibilityLabel, disabled, onPress, title, touchSoundDisabled }) => {
    return (
        <Touchable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={disabled ? { disabled: true } : {}}
            disabled={disabled}
            onPress={onPress}
            touchSoundDisabled={touchSoundDisabled}
        >
            <View style={styles.button(disabled)}>
                <Text style={styles.text} disabled={disabled}>
                    {title}
                </Text>
            </View>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    button: disabled => ({
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.4 : 1,
        backgroundColor: Colors.LJ_LJ_1,
        borderRadius: 8,
        ...Platform.select({
            ios: {},
            android: {
                elevation: disabled ? 0 : 4,
            },
        }),
    }),
    text: {
        textAlign: 'center',
        margin: 8,
        color: Colors.LJ_White,
        fontSize: 18,
    },
});

PrimaryButton.propTypes = {
    accessibilityLabel: PropTypes.string,
    disabled: PropTypes.boolean,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    touchSoundDisabled: PropTypes.boolean,
};

export default PrimaryButton;
