export const getClothes = (clothes = []) => {
    const jackets = clothes.filter(item => item.category === 'jackets');
    const overShirts = clothes.filter(item => item.category === 'overShirts');
    const pants = clothes.filter(item => item.category === 'pants');
    const shirts = clothes.filter(item => item.category === 'shirts');
    const shoes = clothes.filter(item => item.category === 'shoes');

    return {
        jackets,
        overShirts,
        pants,
        shirts,
        shoes,
    };
};

export const getClothesList = clothes => {
    const { jackets, overShirts, pants, shirts, shoes } = getClothes(clothes);
    return [
        { category: 'jackets', items: jackets },
        { category: 'overShirts', items: overShirts },
        { category: 'pants', items: pants },
        { category: 'shirts', items: shirts },
        { category: 'shoes', items: shoes },
    ];
};

export default { getClothes, getClothesList };
