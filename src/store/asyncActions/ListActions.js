import AsyncActions from "./fetch";
import {
    addListUrl,
    archiveByIdUrl,
    bodyListByIdUrl,
    finishDateListByIdUrl,
    getAllListsUrl,
    listByIdUrl
} from "../../urls/listsUrls";

class ListAsyncActions extends AsyncActions {
    async fetchAllLists(token) {
        return await this.GET(getAllListsUrl, this.authorization(token));
    } // done

    async addList(note, token) {
        return await this.POST(addListUrl, this.formatData(note), this.authorization(token));
    } // done

    async deleteList(id, token) {
        return await this.DELETE(listByIdUrl(id), this.authorization(token));
    } // done

    async updateList(list, token) {
        return await this.PUT(listByIdUrl(list._id), this.formatData(list), this.authorization(token));
    } // done

    async toggleListComplete(id, value, token) {
        return await this.PATCH(listByIdUrl(id), JSON.stringify({value}), this.authorization(token));
    } // done

    async toggleArchived(id, token) {
        return await this.PUT(archiveByIdUrl(id), null, this.authorization(token));
    }


}

const ListActions = new ListAsyncActions();

export default ListActions;
