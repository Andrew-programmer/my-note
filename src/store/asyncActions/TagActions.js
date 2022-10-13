import AsyncActions from "./fetch";
import {addTagUrl, getAllTagsUrl, tagByIdUrl} from "../../urls/tagUrls";

class TagAsyncActions extends AsyncActions {


    async redactTag(tag, token){
        await this.PUT(tagByIdUrl(tag._id), JSON.stringify(tag), this.authorization(token))
    }

    async fetchTags(token){
        return await this.GET(getAllTagsUrl, this.authorization(token))
    }

    async addTag(tag, token){
        return await this.POST(addTagUrl, this.formatData(tag), this.authorization(token));
    }

    async deleteTag(id, token){
        return await this.DELETE(tagByIdUrl(id), this.authorization(token));
    }

}

const TagActions = new TagAsyncActions();

export default TagActions;
