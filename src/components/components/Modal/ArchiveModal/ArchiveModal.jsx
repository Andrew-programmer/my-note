import * as React from 'react';
import ModalTemplate from "../ModalTemplate";
import EnhancedTable from "../../ArchiveTable/ArchiveTable";
import {useContext} from "react";
import {Context} from "../../../../index";
import ListsRedirect from "../../Redirect/ListsRedirect/ListsRedirect";
import SettingsButtonBlock from "../../../Settings/components/SettingsButtonBlock/SettingsButtonBlock";



export default function ArchiveModal({open, handleClose}) {
    const {lists} = useContext(Context);

    return (
        <ModalTemplate open={open}>
            {lists.getArchivedLists().length === 0 ?
                <div className={'my-5'}>
                    <ListsRedirect/>
                </div>
                : <EnhancedTable/>
            }
            <SettingsButtonBlock handleClose={handleClose}/>
        </ModalTemplate>
    );
}
