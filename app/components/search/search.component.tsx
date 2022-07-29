import React, { useContext } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import HelloWorldContext from '../../contexts/helloWorld.context';

import styles from './search.styles';

const Search = () => {
    const { searchTerm, rerender, dispatchStateAction} = useContext(HelloWorldContext);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text: string): void => dispatchStateAction({searchTerm: text})}
                value={searchTerm}
                placeholder={'Search a text'}
                autoCorrect
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => dispatchStateAction({rerender: !rerender})}
            >
                <Text>Re-render</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Search;