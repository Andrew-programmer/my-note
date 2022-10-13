import React from 'react';
import SettingsSection from "../../HOCs/SettingsSections.hoc";
import ChangeInfoModal from "../components/Modal/ChengeInfoModal/ChangoInfoModal";

const InfoSection = SettingsSection(ChangeInfoModal, {body: 'Change info'});

export default InfoSection;
