import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon({ focused = false, name }) {
    return (
        <Ionicons
            name={name}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}

TabBarIcon.propTypes = {
    name: PropTypes.string,
    focused: PropTypes.bool,
};
