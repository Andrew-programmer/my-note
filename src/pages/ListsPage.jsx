import React from 'react';
import Page from "./templates/Page";
import ListsPageBody from "../components/ListsPage/ListsPageBody";
import SearchPageHoc from "../HOCs/SearchPage.hoc";

const ListsPageTempl = ({...props}) => {

    return (
        <Page>
            <ListsPageBody {...props}/>
        </Page>
    );
};

const ListsPage = SearchPageHoc(ListsPageTempl, 'lists');

export default ListsPage;
