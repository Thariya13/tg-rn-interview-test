import React, { useEffect, useReducer } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import { random as _random } from 'lodash';

import Header from './components/header/header.component';
import Search from './components/search/search.component';
import Posts from './components/posts/posts.component';
import HelloWorldContext from './contexts/helloWorld.context';

export interface Post {
  id: number;
  userId: number;
  randomId: number;
  title: string;
  body: string;
};

export interface State {
  searchTerm: string;
  rerender: boolean;
  posts: Array<Post>;
  filteredPosts: Array<Post>;
};

const App = () => {
  const initialState: State = {
    searchTerm: '',
    rerender: false,
    posts: [],
    filteredPosts: [],
  }

  const reducer = (
    state: State,
    action: {
      type: string;
      payload: Partial<State>;
    }
  ): State => {
    const newState: State = {
      ...state,
      ...action.payload,
    };
    return newState;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchStateAction = (payload: Partial<State>): void => {
    dispatch({
      type: 'STATE',
      payload: {
        ...payload,
      },
    });
  };

  const { searchTerm, rerender, posts, filteredPosts } = state;

  const duplicatePosts = (_posts: Array<Post>): Array<Post> => {
    const duplicatedPosts: Array<Post> = [];
    for (let i = 0; i < 30; i++) {
      duplicatedPosts.push(..._posts)
    }
    return duplicatedPosts;
  };

  const randomizePosts = (_posts: Array<Post>): Array<Post> => {
    const randomizedPosts = _posts.map(post => {
      post.randomId = _random(1000000000, 9000000000)
      return post;
    });
    return randomizedPosts;
  };

  const getPosts = async (): Promise<void> => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const duplicatedPosts = duplicatePosts(response.data);
    const randomizedPosts = randomizePosts(duplicatedPosts);
    dispatchStateAction({
      posts: randomizedPosts,
      filteredPosts: randomizedPosts,
    })
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const randomizedPosts = randomizePosts(filteredPosts);
    dispatchStateAction({
      filteredPosts: randomizedPosts
    })
  }, [rerender]);

  const filterPosts = (): void => {
    if (searchTerm) {
      const filteredPosts = posts.filter(post => post.body.includes(searchTerm.toLowerCase()));
      dispatchStateAction({
        filteredPosts,
      })
    } else {
      dispatchStateAction({
        filteredPosts: posts,
      });
    }
  }

  useEffect(() => {
    filterPosts();
  }, [searchTerm]);

  return (
    <SafeAreaView>
      <HelloWorldContext.Provider value={{searchTerm, rerender, posts, filteredPosts, dispatchStateAction}}>
        <Header />
        <Search />
        <Posts />
      </HelloWorldContext.Provider>
    </SafeAreaView>
  );
};

export default App;
