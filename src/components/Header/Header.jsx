import React from 'react';
import AccountBlock from "./components/AccountBlock";
import CustomizedTabs from "./components/CustomitizedTabs";
import MobileBar from "./components/MobileMenu/MobileBar";
import SearchBar from "../SearchInput/SearchInput";
import {checkListAndNoteLocation} from "../../utlis/globalFunctions";
import {observer} from "mobx-react-lite";

const style = {
    header: `sm:flex flex-row w-full justify-between bg-[#2e1534] p-1 hidden sm:sticky sm:top-0 z-50`,
}

const Header = observer(({searchState, location}) => {
    return (
        <>
            <header className={style.header}>
                <AccountBlock/>
                {/* eslint-disable-next-line no-restricted-globals */}
                {checkListAndNoteLocation(location) ? <SearchBar searchState={searchState}/>: null}
                <CustomizedTabs/>
            </header>
            <MobileBar searchState={searchState}/>
        </>

    );
});

export default Header;
