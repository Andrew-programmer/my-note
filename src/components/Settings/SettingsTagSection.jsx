import React from 'react';
import ExpandElementHoc from "../../HOCs/ExpandElement.hoc";
import SettingsTagsButtonCollapse from "./components/SettingsTagsButton/SettingsTagsButtonCollapse";

const SettingsTagSectionButton = () => {
    return (
        <SettingsTagSectionButton>
            Change tags
        </SettingsTagSectionButton>
    )
}

const SettingsTagSection = ExpandElementHoc(SettingsTagSectionButton, SettingsTagsButtonCollapse)

export default SettingsTagSection;
