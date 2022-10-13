import React from 'react';
import Page from "./templates/Page";
import NotesPageBody from "../components/NotesPage/NotesPageBody";
import SearchPageHoc from "../HOCs/SearchPage.hoc";

const NotesPageTempl = ({...props}) => {
    return (
        <Page>
            <NotesPageBody {...props}/>
        </Page>
    );
};

const NotesPage = SearchPageHoc(NotesPageTempl);

export default NotesPage;
