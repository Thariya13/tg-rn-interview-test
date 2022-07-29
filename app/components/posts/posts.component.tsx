import React, { ReactElement, useContext } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { random as _random } from 'lodash';

import HelloWorldContext from '../../contexts/helloWorld.context';
import styles from './posts.styles';
import { Post } from '../../App';

const Posts = () => {
    const { filteredPosts } = useContext(HelloWorldContext);

    const renderPost = ({ item: post }: ListRenderItemInfo<Post> ): ReactElement => {
        return (
            <Text>
                {`${post.id} : ${post.body} - `}
                <Text style={styles.random}>{post.randomId}</Text>
            </Text>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredPosts}
                renderItem={renderPost}
                keyExtractor={(item: Post): string => `${item.id} ${Math.random()}`}
                removeClippedSubviews={true}
                initialNumToRender={2}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={100}
                windowSize={7}
            />
        </View>
    );
};

export default Posts;