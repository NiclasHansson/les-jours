import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import DbContext from '../../../DbContext';

import DeleteModal from '../DeleteModal';

const fadeHeight = 60;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        position: 'relative',
        flex: 1,
    },
    categoryScroll: {
        paddingTop: 24,
        marginBottom: 24,
    },
    fade: {
        width: '100%',
        height: fadeHeight / 2,
        position: 'absolute',
        zIndex: 1,
    },
    fadeUpper: {
        top: 0,
    },
    fadeLower: {
        height: fadeHeight,
        bottom: 0,
    },
    categoryCard: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
});

export const Outfits = () => {
    const [deleteModal, setDeleteModal] = useState(null);
    const database = React.useContext(DbContext);
    const outfits = database.outfits;
    console.log('OUTFITS', outfits);
    const onDeleteOutfit = () => {
        setDeleteModal(null);
        database.deleteOutfit({ id: deleteModal.outfitId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.categoryContainer}>
                <LinearGradient
                    style={{ ...styles.fade, ...styles.fadeUpper }}
                    colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                    pointerEvents={'none'}
                />
                <ScrollView style={styles.categoryScroll} showsVerticalScrollIndicator={false}>
                    {outfits.map((outfit, index) => (
                        <TouchableOpacity
                            key={`outfitId-${index}`}
                            onPress={() => setDeleteModal(outfit)}
                            style={styles.categoryCard}
                        >
                            <Text>{outfit.outfitId}</Text>
                            <Text>{`Rating ${outfit.rating}`}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <LinearGradient
                    style={{ ...styles.fade, ...styles.fadeLower }}
                    colors={['rgba(251, 250, 249, 0)', 'rgba(251, 250, 249, 1)']}
                    pointerEvents={'none'}
                />
                {deleteModal && (
                    <DeleteModal
                        label={deleteModal.outfitId}
                        helpText={`Rating ${deleteModal.rating}`}
                        onClose={() => setDeleteModal(null)}
                        onDelete={onDeleteOutfit}
                    />
                )}
            </View>
        </View>
    );
};

export default Outfits;
