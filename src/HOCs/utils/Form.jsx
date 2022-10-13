import React, {useContext, useState} from 'react';
import Input from "../../components/components/Input/Input";
import {Context} from "../../index";
import {useNavigate} from "react-router";
import Navigator from "../../utlis/globalFunctions";
import photoshopPreviews from "react-color/lib/components/photoshop/PhotoshopPreviews";
import {Alert, Snackbar} from "@mui/material";

const style = {
    mainForm: `m-5 flex flex-col h-full justify-center md:w-[40%]`,
    formHeader: `text-3xl my-2 text-violet-700 md:mx-0`,

    registerLinkContainer: `text-2xs`,
    registerLink: `underline text-violet-600`
}


const Form = ({isRegistered, setIsRegistered}) => {
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const {user} = useContext(Context);

    const [open, setOpen] = useState(false);
    const [alertText, setAlertText] = useState('Something wrong');

    const handleClose = () => {
        setOpen(prevState => !prevState);
    }

    const navigate = useNavigate();
    const navigator = new Navigator(navigate);

    const handleLogin = async (newUser) => {

        const {token, res} = await user.login(newUser);

        if(token){
            navigator.navigateToNotesPage();
        } else {
            setAlertText(res.message);
            setOpen(prevState => !prevState);
        }
    }

    const handleRegister = async (newUser) => {
        await user.register(newUser);
    }

    const authFunc = isRegistered ? handleRegister : handleLogin;


    return (
        <>
            <form className={style.mainForm}>
                <button type='button' className={style.formHeader}
                        onClick={() => authFunc({
                            username: nameValue,
                            password: passwordValue
                        })}>{isRegistered ? 'Register' : 'Login'}</button>
                <Input label={'Name'} placeholder={'Name...'} onChange={(event) => setNameValue(event.target.value)}
                       autoFocus/>
                <Input label={'Password'} type="password" placeholder={'Password...'}
                       onChange={(event) => setPasswordValue(event.target.value)}/>
                <span className={style.registerLinkContainer}>
                Have {isRegistered ? 'an' : 'no'} account? <button type='button'
                                                                   onClick={() => setIsRegistered(prevState => !prevState)}
                                                                   className={style.registerLink}>{isRegistered ? 'Login' : 'Register'}!</button>
            </span>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {alertText}
                </Alert>
            </Snackbar>
        </>

    );
};

export default Form;
