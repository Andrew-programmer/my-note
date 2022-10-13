import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import Layout from "../pages/Layout";
import {HOME_ROUTE} from "../utlis/consts";
import {Context} from "../index";
import {clearLocalStorage} from "../utlis/globalFunctions";
import SimpleBackdrop from "../components/components/Backdrop/Backdrop";

const AppRouter = () => {
    const {user, tags, notes, lists} = useContext(Context);
    const backdropState = useState(true);
    const [open, setBackdropOpen] = backdropState;
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    async function fetchUserData(token) {
        const parsedToken = JSON.parse(token);
        let response = await user.fetchUser(parsedToken);
        if(!response){
            clearLocalStorage();
            navigate('/auth');
            return;
        }
        await tags.fetchAllTags(parsedToken);
        await notes.fetchAllNotes(parsedToken);
        await lists.fetchAllLists(parsedToken);
    }

    useEffect(() => {
        if (!!token) {
            fetchUserData(token).then(() => {
                navigate('/home/notes')
                setBackdropOpen(prevState => !prevState)
            });
        } else {
            navigate('/auth')
            setBackdropOpen(prevState => !prevState)
        }
    }, [])

    return (
        open ? <SimpleBackdrop state={backdropState}/> :
        <Routes>
            <Route path={HOME_ROUTE} element={<Layout/>}>
                {token && authRoutes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={<Component/>} exact/>
                })}
            </Route>
            {publicRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact/>
            })}
        </Routes>
    );
};

export default AppRouter;
