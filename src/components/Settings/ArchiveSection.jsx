import React from 'react';
import SettingsSection from "../../HOCs/SettingsSections.hoc";
import ArchiveModal from "../components/Modal/ArchiveModal/ArchiveModal";

const ArchiveSection = SettingsSection(ArchiveModal, {body: 'Change archive'});

export default ArchiveSection;
