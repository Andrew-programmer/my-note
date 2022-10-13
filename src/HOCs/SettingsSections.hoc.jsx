import React, {useContext, useState} from 'react';
import {config, useSpring, useSprings} from "react-spring";
import SettingsButton from "./utils/SettingsButton";
import {Context} from "../index";
import SettingsTagsButtonCollapse
    from "../components/Settings/components/SettingsTagsButton/SettingsTagsButtonCollapse";

const SettingsSection = (WrappedModal, params, childParams) => {

    return function Component() {
        const [openModal, setOpenModal] = useState(false);
        const [expanded, setExpanded] = useState(false);
        const [spring, set] = useSpring(() => ({rotate: 0}));


        const playAnimation = (cond) => {
            set({
                rotate: cond ? -180 : 180,
                config: config.gentle
            })
        }

        const toggleModal = () => {
            playAnimation(openModal);
            setOpenModal(prevState => !prevState);
        }

        const toggleExpand = () => {
            playAnimation(expanded);
            setExpanded(prevState => !prevState);
        }


        let Children = childParams ? childParams.El : null;

        return (
            Children ?
                <SettingsButton onClick={toggleExpand}
                                animation={spring}
                >
                    {params.body}
                    <Children state={expanded}/>
                </SettingsButton>
                : <>
                    <SettingsButton onClick={toggleModal}
                                    animation={spring}
                    >
                        {params.body}
                    </SettingsButton>
                    <WrappedModal open={openModal} handleClose={toggleModal}/>
                </>
        )
    };
};

export default SettingsSection;
