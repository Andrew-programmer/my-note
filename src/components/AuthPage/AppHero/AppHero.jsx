import React from 'react';
import Scrolling from "./components/Scrolling";

const style = {
    mainSection: `py-4 md:justify-center md:w-[70%] flex flex-col items-center text-white bg-gradient-to-b md:bg-gradient-to-r from-transparent to-violet-600 shadow-top-2`,
    header: `text-3xl lg:text-7xl`,
    dividerWord: `text-2xs lg:text-2xl`,
}

const AppHero = () => {
    return (
        <section className={style.mainSection}>
            <h1 className={style.header}>My Note</h1>
            <span className={style.dividerWord}>is</span>
            <Scrolling/>
        </section>
    );
};

export default AppHero;
