import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const AuthForm = (WrappedComponent) => {

    return function Component() {
        const [isRegistered, setIsRegistered] = useState(false);
        const navigate = useNavigate();

        return (
            <WrappedComponent isRegistered={isRegistered} setIsRegistered={setIsRegistered}/>
        )
    };
};

export default AuthForm;
