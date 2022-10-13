import {makeAutoObservable} from 'mobx'
import NoteActions from "./asyncActions/NotesActions";
import ListActions from "./asyncActions/ListActions";

export default class ListStore {
    constructor() {
        this._lists = [
            // {
            //     _id: '1',
            //     _userId: '2',
            //     completed: false,
            //     archived: false,
            //     title: 'List 1',
            //     body: '',
            //     creationDate: Date.now(),
            //     finishDate: 0,
            //     items: [
            //         {
            //             id: 1,
            //             completed: false,
            //             text: '1'
            //         },
            //         {
            //             id: 2,
            //             completed: false,
            //             text: '2'
            //         },
            //         {
            //             id: 3,
            //             completed: false,
            //             text: '3'
            //         },
            //     ],
            //     tags: [2]
            // },
            // {
            //     _id: '2',
            //     _userId: '2',
            //     completed: false,
            //     archived: false,
            //     title: 'List 2',
            //     body: '',
            //     creationDate: Date.now(),
            //     finishDate: '',
            //     items: [
            //         {
            //             id: 1,
            //             completed: false,
            //             text: '3'
            //         },
            //         {
            //             id: 2,
            //             completed: false,
            //             text: '5'
            //         },
            //         {
            //             id: 3,
            //             completed: false,
            //             text: '6'
            //         },
            //     ],
            //     tags: [3, 4]
            // },
        ];
        makeAutoObservable(this)
    }

    set lists(lists) {
        this._lists = lists;
    }

    setLists(lists){
        this._lists = lists;
    }

    get lists() {
        return this._lists;
    }

    async fetchAllLists(token){
        const response =  await ListActions.fetchAllLists(token);
        const fetchedNotes = await response.json();
        this.setLists(fetchedNotes.lists);
    }

    setBody() {
        this._lists = this._lists.map(list => {
            const completedItems = this.getCompletedItems(list._id);
            const allItems = this.getAllListItems(list._id);

            const body = `${completedItems.length}/${allItems.length} completed`;


            return {
                ...list,
                body
            }
        })
    }

    async addList(list){
        const token = JSON.parse(localStorage.getItem('token'));
        let response = await ListActions.addList(list, token);
        response = await response.json();
        const fetchedList = response.list;

        this._lists.push(fetchedList);
        this.setBody();

        return fetchedList._id;
    }

    getListById(id) {
        return this._lists.filter(list => list._id === id)[0];
    }

    redact(id, newTitle = null, newItems = null, newTagsID = null, completed = null) {
        const token = JSON.parse(localStorage.getItem('token'));
        debugger
        this._lists.forEach((list, index) => {
            if (list._id === id) {
                const newList = {
                    ...list,
                    title: newTitle || list.title,
                    items: newItems || list.items,
                    tags: newTagsID || list.tags,
                    completed: completed ? !list.completed : list.completed
                };
                this._lists[index] = newList;
                ListActions.updateList(newList, token);
            }
        })
        this.setBody();
        const completedItems = this.getCompletedItems(id);
        const allItems = this.getAllListItems(id);

        if(completedItems.length === allItems.length){
            this.setListCompleted(true, id);
        } else {
            this.setListCompleted(false, id);
        }
    }

    toggleCompleted(listID, itemID) {
        const items = this.getAllListItems(listID);
        const newItems = items.map(item => {
            return {
                ...item,
                completed: item.id === itemID ? !item.completed : item.completed,
            }
        })
        this.redact(listID, null, newItems, null);
    }

    async toggleAllCompleted(listID) {
        const items = this.getAllListItems(listID);
        const completedItems = this.getCompletedItems(listID);
        let value = true;


        if(completedItems.length === items.length){
            value = false;
        }

        const newItems = this.setAllCompleted(listID, value);

        this.redact(listID, null, newItems, null);
        this.setListCompleted(value, listID);
    }

    setAllCompleted(listID, value){
        const items = this.getAllListItems(listID);
        return items.map(item => {
            return {
                ...item,
                completed: value,
            }
        })
    }

    deleteItem(listID, itemIndex) {
        const list = this.getListById(listID);
        const newItems = list.items.filter((item, index) => index !== itemIndex);
        this.redact(listID, null, newItems, null);
        return list.items.filter((item, index) => index !== itemIndex);
    }

    getCompletedItems(listID) {
        const list = this.getListById(listID);
        const items = list.items.filter(item => item.completed);
        return items.map(item => item.id);
    }

    getAllListItems(listID) {
        const list = this.getListById(listID);
        return list.items;
    }

    checkListCompleted(listID) {
        const list = this.getListById(listID);
        return list.completed;
    }

    getListBody(listID){
        const list = this.getListById(listID);
        return list.body;
    }

    setListCompleted(value, listID){
        const token = JSON.parse(localStorage.getItem('token'));

        return this._lists = this._lists.map(list => {
            if(list._id === listID){
                ListActions.toggleListComplete(listID, value, token);
            }

            return {
                ...list,
                completed: list._id === listID ? value: list.completed
            }
        })
    }

    async deleteList(listID){
        const token = JSON.parse(localStorage.getItem('token'));

        this._lists = this._lists.filter(list => list._id !== listID);
        await ListActions.deleteList(listID, token);
    }

    getArchivedLists(){
        return this._lists.filter(list => list.archived)
    }

    getNotArchivedLists(){
        return this._lists.filter(list => !list.archived)
    }

    toggleArchiveList(id){
        const token = JSON.parse(localStorage.getItem('token'));

        this._lists = this._lists.map(list => {
            if (list._id === id) {
                ListActions.toggleArchived(list._id, token);
            }

            return {
                ...list,
                archived: list._id === id ? !list.archived: list.archived,
                finishDate: list._id === id ? Date.now(): list.finishDate,
            };
        })
    }
}
