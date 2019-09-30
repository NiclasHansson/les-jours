export const clothes = {
    jackets: [{ data: {}, id: 1, name: 'Military Ralph Lauren' }, { data: {}, id: 2, name: 'Navy jacket' }],
    overShirts: [{ data: {}, id: 3, name: 'Grey Gant' }, { data: {}, id: 4, name: 'Red Gant' }],
    pants: [
        { data: {}, id: 5, name: 'Navy Dr. Denim' },
        { data: {}, id: 6, name: 'Navy Flannell' },
        { data: {}, id: 7, name: 'Navy Dr. Denim 2' },
        { data: {}, id: 8, name: 'Navy Flannell 2' },
        { data: {}, id: 9, name: 'Navy Dr. Denim 3' },
        { data: {}, id: 10, name: 'Navy Flannell 3' },
    ],
    shirts: [{ data: {}, id: 11, name: 'Blue Ralph Lauren' }, { data: {}, id: 12, name: 'White Ralph Lauren' }],
    shoes: [
        { data: {}, id: 13, name: 'Brown leather boots' },
        { data: {}, id: 14, name: 'Brown chukka boots' },
        { data: {}, id: 15, name: 'Brown mocka oxfords' },
    ],
};

export const outfits = [
    {
        id: '1-3-5-11-13',
        clothes: {
            jackets: 1,
            overShirts: 3,
            shirts: 11,
            pants: 5,
            shoes: 13,
        },
        data: {
            rating: 4,
            lastWorn: '2019-23-09',
        },
    },
    {
        id: '2-3-5-11-13',
        clothes: {
            jackets: 2,
            overShirts: 3,
            shirts: 11,
            pants: 5,
            shoes: 13,
        },
        data: {
            rating: 5,
            lastWorn: '2019-25-09',
        },
    },
];
