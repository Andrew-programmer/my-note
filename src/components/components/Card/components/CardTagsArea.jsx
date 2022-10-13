import React from 'react';
import Tag from "../../Tag/Tag";

const style = {
    cardTagsArea: `!flex !flex-row !w-full !flex-wrap !overflow-hidden !h-min !px-4 !bg-transparent`,
}

const CardTagsArea = ({tags}) => {

    return (
        <div className={style.cardTagsArea}>
            {tags.map(tag => {
                    return <Tag text={tag.title} key={tag._id} color={tag.color}/>
                }
            )}
        </div>
    );
};

export default CardTagsArea;
