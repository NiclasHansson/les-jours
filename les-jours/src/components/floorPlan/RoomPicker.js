import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

const itemHeight = 60;
const styles = StyleSheet.create({
    picker: {
        maxHeight: 170,
        width: '90%',
        position: 'relative',
    },
    fade: {
        width: '100%',
        height: itemHeight / 2,
        position: 'absolute',
        zIndex: 1,
    },
    fadeUpper: {
        top: 0,
    },
    fadeLower: {
        bottom: 0,
    },
    room: {
        height: itemHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lastRoom: {
        borderBottomWidth: 0,
    },
    colorBall: {
        width: 13,
        height: 13,
        borderRadius: 100,
        marginRight: 15,
    },
    roomName: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
    image: {
        resizeMode: 'center',
        width: 16,
        marginRight: 15,
    },
});

const getColor = type => {
    switch (type) {
        case 'meeting':
            return Colors.meeting;
        case 'teamroom':
            return Colors.teamroom;
        case 'bathroom':
            return Colors.bathroom;
        case 'kitchen':
            return Colors.kitchen;
        case 'stairway':
            return Colors.stairway;
        case 'printer':
            return Colors.printer;
        default:
            return Colors.meeting;
    }
};

export const RoomPicker = ({ onSelect, onReselect, rooms, selected }) => {
    let havePrinterAlready = false;
    let haveBathroomAlready = false;
    const filteredroom = rooms.filter(room => {
        if (room.type === 'printer') {
            if (!havePrinterAlready) {
                havePrinterAlready = true;
                return true;
            }
        } else if (room.type === 'bathroom') {
            if (!haveBathroomAlready) {
                haveBathroomAlready = true;
                return true;
            }
        } else {
            return true;
        }
    }, []);

    return (
        <View style={styles.picker}>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeUpper }}
                colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                pointerEvents={'none'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredroom.map(({ label, type }, index) => (
                    <TouchableOpacity
                        key={`room-${label}-${index}`}
                        style={filteredroom.length === index + 1 ? { ...styles.room, ...styles.lastRoom } : styles.room}
                        onPress={() => (selected === label ? onReselect() : onSelect(label))}
                    >
                        <View style={styles.nameContainer}>
                            <View style={{ ...styles.colorBall, backgroundColor: getColor(type) }} />
                            <Text style={styles.roomName}>{label}</Text>
                        </View>
                        {selected === label && (
                            <Image style={styles.image} source={require('../../../assets/images/check.png')} />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeLower }}
                colors={['rgba(251, 250, 249, 0)', 'rgba(251, 250, 249, 1)']}
                pointerEvents={'none'}
            />
        </View>
    );
};

RoomPicker.propTypes = {
    onSelect: PropTypes.func,
    onReselect: PropTypes.func,
    rooms: PropTypes.array,
    selected: PropTypes.string,
};

export default RoomPicker;
