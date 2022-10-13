import React, {useState} from 'react';

const ExpandElementHoc = (WrappedBody, WrappedCollapse, style) => {

    return function Component({tags, stylesState}) {
        const [expanded, setExpanded] = useState(false);
        const [expandedStyles, setExpandedStyles] = stylesState;

        const toggleExpand = () => {
            setExpanded(prevState => !prevState);
            setExpandedStyles(prevState => !prevState);
        }



        return (
            <div className={expandedStyles ? style.expandedTagsContainer : style.nonExpandedTagsContainer}>
                <WrappedCollapse expanded={expanded} tags={tags}/>
                <WrappedBody expanded={expanded} toggleExpand={toggleExpand} tags={tags}/>
            </div>
        )
    };
};

export default ExpandElementHoc;
