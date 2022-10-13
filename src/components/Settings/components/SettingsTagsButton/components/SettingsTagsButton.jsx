import React from 'react';
import SettingsSection from "../../../../../HOCs/SettingsSections.hoc";
import SettingsTagsButtonCollapse from "../SettingsTagsButtonCollapse";
import ExpandElementHoc from "../../../../../HOCs/ExpandElement.hoc";

const SettingsTagsButton = SettingsSection(null, {body: 'Change tags'},{El: SettingsTagsButtonCollapse});

export default SettingsTagsButton;
