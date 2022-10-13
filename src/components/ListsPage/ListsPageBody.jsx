import React from 'react';
import List from "./List/List";

const ListPageBody = ({items}) => {

    return (
        <>
            {items.length === 0 ?
                <div className={'text-xl w-full col-span-3 p-2 md:block hidden'}>
                    No lists? Right click to create some list!
                </div>
                : items.map(list => (
                <List tagsIDs={list.tags} body={list.body} title={list.title} key={list._id} id={list._id}/>
            ))}
        </>

    );
};

export default ListPageBody;
