import React from 'react';
import { Image, View } from 'react-native';

import styles from './header.styles';
import doggoWalkImage from '../../assets/images/doggo_walk.gif';

const Header = () => {
    return (
       <View style={styles.container}>
        <Image
            style={styles.image}
            source={doggoWalkImage}
        />
       </View> 
    );
};

export default Header;