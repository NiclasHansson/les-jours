import { getClothes } from './getClothes';

export const getOutfit = (minRating, outfits, clothes) => {
    if (minRating > 0) {
        return randomizeRatedOutfit(minRating, outfits);
    }
    return generateNewOutfit(0, outfits, clothes);
};

const randomizeRatedOutfit = (minRating, outfits) => {
    const ratedOutfits = outfits.sort(outfit => outfit.data.rating >= minRating);
    return ratedOutfits[Math.floor(ratedOutfits.length * Math.random())];
};

const generateNewOutfit = (retry, outfits, clothes) => {
    const { jackets, overShirts, pants, shirts, shoes } = getClothes(clothes);
    if (retry > jackets.length * overShirts.length * pants.length * shirts.length * shoes.length) {
        return {};
    }
    console.log('GENERATE NEW OUTFIT: Attempt', retry);
    const newClothes = {
        jackets: jackets[Math.floor(jackets.length * Math.random())],
        overShirts: overShirts[Math.floor(overShirts.length * Math.random())],
        shirts: shirts[Math.floor(shirts.length * Math.random())],
        pants: pants[Math.floor(pants.length * Math.random())],
        shoes: shoes[Math.floor(shoes.length * Math.random())],
    };
    const newOutfit = {
        id: `${newClothes.jackets.id}-${newClothes.overShirts.id}-${newClothes.pants.id}-${newClothes.shirts.id}-${newClothes.shoes.id}`,
        clothes: newClothes,
        data: {
            rating: null,
            lastWorn: null,
        },
    };
    if (outfits.some(outfit => outfit && outfit.id === newOutfit.id)) {
        return getOutfit(retry++, outfits, clothes);
    }
    return newOutfit;
};
