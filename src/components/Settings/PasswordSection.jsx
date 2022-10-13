import React from 'react';
import SettingsSection from "../../HOCs/SettingsSections.hoc";
import PasswordModal from "../components/Modal/PasswordModal/PasswordModal";

const PasswordSection = SettingsSection(PasswordModal, {body: 'Change password'});

export default PasswordSection;
