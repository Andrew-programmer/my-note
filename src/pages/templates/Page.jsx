import React from 'react';
import OpenIconSpeedDial from "../../components/components/SpeedTail/OpenIconSpeedDial";

const style = {
    main: `grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-7 md:grid-cols-4 sm:grid-cols-3`
}

const Page = ({children}) => {
    return (
        <section className={style.main}>
            {children}
            <OpenIconSpeedDial/>
        </section>
    );
};

export default Page;
