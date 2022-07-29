import { createContext } from 'react';
import { Post, State } from '../App';

interface Context {
    searchTerm: string;
    rerender: boolean;
    posts: Array<Post>;
    filteredPosts: Array<Post>;
    dispatchStateAction: (payload: Partial<State>) => void;
};

const HelloWorldContext = createContext<Context>({
    searchTerm: '',
    rerender: false,
    posts: [],
    filteredPosts: [],
    dispatchStateAction: () => {},
});

export default HelloWorldContext;