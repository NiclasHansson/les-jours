import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { getClothesList } from '../../utils/getClothes';
import DbContext from '../../../DbContext';

import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import CategoryCard from './CategoryCard';
import Header from '../Header';
// import { clothes } from '../../data/clothes';

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
    categoryCardContainer: {},
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

const camelCaseToHumanReadable = text => {
    let formattedHeading = [...text].map((char, index) => {
        if (index === 0) return char.toUpperCase();
        if (char.match(/[A-Z]/)) {
            return ` ${char.toLowerCase()}`;
        }
        return char;
    });
    return formattedHeading.join().replace(/,/g, '');
};

const categorySingular = category => {
    switch (category) {
        case 'jackets':
            return 'Jacket';
        case 'overShirts':
            return 'Over shirt';
        case 'pants':
            return 'Pants';
        case 'shirts':
            return 'Shirt';
        case 'shoes':
            return 'Shoes';
        default:
            return 'Category singular failed';
    }
};

export const Clothes = () => {
    const [addModal, setAddModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const database = React.useContext(DbContext);
    const clothes = getClothesList(database.clothes);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.categoryContainer}>
                <LinearGradient
                    style={{ ...styles.fade, ...styles.fadeUpper }}
                    colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                    pointerEvents={'none'}
                />
                <ScrollView style={styles.categoryScroll} showsVerticalScrollIndicator={false}>
                    {clothes.map(({ category, items }) => (
                        <View key={category} style={styles.categoryCard}>
                            <CategoryCard
                                name={camelCaseToHumanReadable(category)}
                                items={items}
                                onAddPress={() => setAddModal(category)}
                                onItemPress={item => setDeleteModal(item)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <LinearGradient
                    style={{ ...styles.fade, ...styles.fadeLower }}
                    colors={['rgba(251, 250, 249, 0)', 'rgba(251, 250, 249, 1)']}
                    pointerEvents={'none'}
                />
                {(addModal || deleteModal) && <View style={styles.overlay} />}
                {addModal && (
                    <AddModal
                        category={addModal}
                        name={camelCaseToHumanReadable(addModal)}
                        onClose={() => setAddModal(null)}
                    />
                )}
                {deleteModal && (
                    <DeleteModal
                        category={categorySingular(deleteModal.category)}
                        id={deleteModal.id}
                        name={deleteModal.name}
                        onClose={() => setDeleteModal(null)}
                    />
                )}
            </View>
        </View>
    );
};

export default Clothes;
