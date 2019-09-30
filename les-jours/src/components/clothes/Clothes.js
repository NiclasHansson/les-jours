import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CategoryCard from './CategoryCard';
import Header from '../Header';
import { clothes } from '../../data/clothes';

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
});

const convertHeading = heading => {
    let formattedHeading = [...heading].map((char, index) => {
        if (index === 0) return char.toUpperCase();
        if (char.match(/[A-Z]/)) {
            return ` ${char.toLowerCase()}`;
        }
        return char;
    });
    return formattedHeading.join().replace(/,/g, '');
};

export const Clothes = () => {
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
                    {Object.entries(clothes).map(([category, categoryItems]) => (
                        <View key={category} style={styles.categoryCard}>
                            <CategoryCard name={convertHeading(category)} items={categoryItems} />
                        </View>
                    ))}
                </ScrollView>
                <LinearGradient
                    style={{ ...styles.fade, ...styles.fadeLower }}
                    colors={['rgba(251, 250, 249, 0)', 'rgba(251, 250, 249, 1)']}
                    pointerEvents={'none'}
                />
            </View>
        </View>
    );
};

export default Clothes;
