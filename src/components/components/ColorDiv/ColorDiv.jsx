import React from 'react';

const style = {
    colorDiv: `rounded bg-black w-[20px] h-[20px] place-self-center`,
}

const ColorDiv = ({divColor, extraStyles, onColorClick = null}) => {
    return (
        <div style={{
            backgroundColor: divColor
        }} className={style.colorDiv + ' ' + extraStyles} onClick={(event) => onColorClick(event)}></div>
    );
};

export default ColorDiv;
