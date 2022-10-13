import {makeAutoObservable} from 'mobx'
import TagActions from "./asyncActions/TagActions";

export default class ListStore {
    constructor() {
        this._tags = [
            // {
            //     _id: 1,
            //     title: 'Helo',
            //     color: '#000000'
            // },
            // {
            //     _id: 2,
            //     title: 'World',
            //     color: '#000000'
            // },
            // {
            //     _id: 3,
            //     title: 'WORLD',
            //     color: '#000000'
            // },
            // {
            //     _id: 4,
            //     title: 'Some',
            //     color: '#000000'
            // },
        ]
        makeAutoObservable(this)
    }

    async addTag(tag){
        const token = JSON.parse(localStorage.getItem('token'));
        let response = await TagActions.addTag(tag, token);
        response = await response.json();
        const newTag = response.tag;
        this._tags.push(newTag);
    }

    async deleteTag(id){
        this._tags = this._tags.filter(tag => tag._id !== id);
        const token = JSON.parse(localStorage.getItem('token'));
        await TagActions.deleteTag(id, token);
    }

    async redactTag(id, newTagText = null, newTagColor = null){
        this._tags.forEach((tag, index) => {
            if(tag._id === id){
                const newTag = {
                    ...tag,
                    title: newTagText || tag.title,
                    color: newTagColor || tag.color
                }
                this._tags[index] = newTag;

                const token = localStorage.getItem('token');
                TagActions.redactTag(newTag, JSON.parse(token));
            }
        })
    }

    async fetchAllTags(token){
        const response =  await TagActions.fetchTags(token);
        const fetchedTags = await response.json();
        this.tags = fetchedTags.tags;
    }

    getTagsByIDs(IDs){
        return this._tags.filter(tag => ~(IDs.indexOf(tag._id)))
    }

    getTagsIDs(tags){
        const tagsID = [];
        tags.forEach(tag => {
            tagsID.push(tag._id)
        })

        return tagsID;
    }

    getTagsTextByIDs(IDs){
        const tags =  this._tags.filter(tag => ~(IDs.indexOf(tag._id)));
        let tagsTextArr = [];
        tags.forEach(tag => {
            tagsTextArr.push(tag.title);
        })

        return tagsTextArr;
    }

    checkExistTag(title){
        return this._tags.some(tag => tag.title === title);
    }

    get tags(){
        return this._tags;
    }

    set tags(newTags){
        this._tags = newTags;
    }
}
