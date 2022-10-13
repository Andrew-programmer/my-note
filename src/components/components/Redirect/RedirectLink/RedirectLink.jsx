import React from 'react';
import {Link} from "react-router-dom";

const style = {
    link: `!underline !text-violet-600 !inline`,
}

const RedirectLink = ({children, route}) => {
    return (
        <Link to={route} className={style.link}>{children}</Link>
    );
};

export default RedirectLink;
