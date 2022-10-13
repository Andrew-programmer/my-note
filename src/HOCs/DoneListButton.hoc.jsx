import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const DoneListButtonHoc = (WrappedComponent) => {

    return observer(function Component({handleClick, listID}) {
        const {lists} = useContext(Context);
        const state = useState(() => lists.checkListCompleted(listID));


        return (
            <WrappedComponent state={state} handleClick={handleClick} listID={listID}/>
        )
    });
};

export default DoneListButtonHoc;
