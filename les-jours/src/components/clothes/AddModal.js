import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import DbContext from '../../../DbContext';

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
    input: {
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.LJ_LJ_2,
        borderRadius: 4,
        fontSize: 24,
        paddingHorizontal: 16,
        marginBottom: 16,
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
    addButton: disabled => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: Colors.LJ_LJ_1,
        opacity: disabled ? 0.3 : 1,
        borderWidth: 1,
        borderColor: Colors.LJ_GREY_2,
        borderRadius: 8,
    }),
    addText: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.LJ_White,
    },
});

export const AddModal = ({ category, name, onClose }) => {
    const database = useContext(DbContext);
    const [itemName, setItemName] = useState('');

    const onAddItem = () => {
        database.addItem({ name: itemName, category });
        onClose();
    };

    const disabled = !itemName;

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={itemName} onChangeText={setItemName} />
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton(disabled)} onPress={onAddItem} disabled={disabled}>
                    <Text style={styles.addText}>{`Add new ${name}`}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

AddModal.propTypes = {
    category: PropTypes.string,
    name: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default AddModal;
