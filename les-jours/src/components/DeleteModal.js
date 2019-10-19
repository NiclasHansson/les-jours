import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        top: '30%',
        left: '2%',
        width: '96%',
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.LJ_GREY_2,
        borderRadius: 4,
        backgroundColor: Colors.LJ_White,
        zIndex: 1,
    },
    heading: {
        fontSize: 32,
        fontFamily: 'kelly-slab',
        marginBottom: 32,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        height: 40,
        backgroundColor: Colors.LJ_White,
        borderWidth: 1,
        borderColor: Colors.LJ_GREY_2,
        borderRadius: 8,
    },
    cancelText: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.LJ_LJ_1,
    },
    deleteButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: Colors.LJ_Red,
        borderWidth: 1,
        borderColor: Colors.LJ_GREY_2,
        borderRadius: 8,
    },
    deleteText: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.LJ_White,
    },
});

export const DeleteModal = ({ label, helpText, onClose, onDelete }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{`${label}: ${helpText}`}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

DeleteModal.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
