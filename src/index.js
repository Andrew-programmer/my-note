import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import NotesStore from "./store/NotesStore";
import ListStore from "./store/ListStore";
import TagsStore from "./store/TagsStore"

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        notes: new NotesStore(),
        lists: new ListStore(),
        tags: new TagsStore()
    }}>
        <App/>
    </Context.Provider>
);
