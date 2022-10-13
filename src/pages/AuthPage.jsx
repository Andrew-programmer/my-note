import React from 'react';
import AuthForm from "../HOCs/AuthForm.hoc";
import Form from "../HOCs/utils/Form";
import AppHero from "../components/AuthPage/AppHero/AppHero";

const style = {
    section: `h-full md:h-full md:overflow-hidden w-full md:flex-row flex-col flex`
}

const Auth = AuthForm(Form);


const AuthPage = () => {

    return (
        <section className={style.section}>
            <Auth/>
            <AppHero/>
        </section>
    );
};

export default AuthPage;
