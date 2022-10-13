import {
    ACCOUNT_ROUTE,
    AUTH_ROUTE,
    HOME_ROUTE,
    LIST_ROUTE,
    LISTS_ROUTE,
    NOTE_ROUTE,
    NOTES_ROUTE,
    SETTINGS_ROUTE
} from "./consts";
import ContexMenuHoc from "../HOCs/ContexMenu.hoc";
import ContexMenuTemplate from "../HOCs/utils/ContexMenuTemplate";
import {handleFocus} from "react-color/lib/helpers/interaction";

class Navigator {
    constructor(navigate) {
        this.navigate = navigate;
    }

    static generateHomeRoute(endPath){
        return HOME_ROUTE + '/' + endPath
    }

    routes = new Map([
        ['auth', AUTH_ROUTE],
        ['notes', Navigator.generateHomeRoute(NOTES_ROUTE)],
        ['lists', Navigator.generateHomeRoute(LISTS_ROUTE)],
        ['account', Navigator.generateHomeRoute(ACCOUNT_ROUTE)],
        ['settings', Navigator.generateHomeRoute(SETTINGS_ROUTE)],
        ['note', Navigator.generateHomeRoute(NOTE_ROUTE)],
        ['list', Navigator.generateHomeRoute(LIST_ROUTE)],
    ]);

    get settingsRoute(){
        return Navigator.generateHomeRoute(SETTINGS_ROUTE);
    }

    get listsRoute(){
        return Navigator.generateHomeRoute(LISTS_ROUTE);
    }

    navigateToNotePage(id = 'id'){
        const route = this.routes.get('note').replace('id', id);
        this.navigate(route);
    }
    navigateToListPage(id = 'id'){
        const route = this.routes.get('list').replace('id', id);
        this.navigate(route);
    }


    navigateToAuthPage(){
        this.navigate(this.routes.get('auth'))
    }

    navigateToNotesPage(){
        this.navigate(this.routes.get('notes'))
    }

    navigateToListsPage(){
        this.navigate(this.routes.get('lists'))
    }

    navigateToAccountPage(){
        this.navigate(this.routes.get('account'))
    }

    navigateToSettingsPage(){
        this.navigate(this.routes.get('settings'))
    }
}

export default Navigator;



export const generatePhrase = (time) => {
    let end;

    if(time < 12 && time > 6){
        end = 'morning☀️';
    } else if (time > 12 && time < 18){
        end = 'afternoon❤️';
    } else if (time > 18 && time < 0){
        end = 'evening🌙';
    } else {
        end = 'night🌚';
    }

    return 'Good ' + end;
}

export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getParentUntilAttr = (elem, attr) => {
    let parent = elem;
    if(elem){
        try{
            while(!parent.getAttribute(attr)){
                parent = parent.parentNode
            }

            return parent.getAttribute(attr);
        } catch {
            return 'main';
        }
    }

    return 'main';
}

export const createContexMenu = (target, params) => {
    return ContexMenuHoc(ContexMenuTemplate, target, params);
}

export const checkLocation = (loc, reg) => {
    return loc.match(reg)
}

export const checkListAndNoteLocation = (loc) => {
    return checkLocation(loc, /\/notes$|\/lists$/)
}


export const checkListANoteAccountLocation = (loc) => {
    return checkLocation(loc, /\/notes$|\/lists$|\/account$/);
}

//
class ContextMenuFunctions{
    handleDelete(id, deleteFunc){
        deleteFunc(id);
    }

    handleAdd(item, addFunc){
        return addFunc(item);
    }
}

export class NoteContextMenuFunctions extends ContextMenuFunctions{
    constructor(state, navigator) {
        super();
        this._state = state;
        this._noteTempl = {
            title: 'Title',
            body: 'Body',
            tags: []
        };
        this._navigator = navigator;
    }

    deleteItem(id){
        this.handleDelete(id, this._state.deleteNote.bind(this._state));
    }

    async handleNoteAdd(){
        const id = await this.handleAdd(this._noteTempl, this._state.addNote.bind(this._state))
        await this._navigator.navigateToNotePage(id);
    }

}

export class ListContextMenuFunctions extends ContextMenuFunctions{
    constructor(state, navigator) {
        super();
        this._state = state;
        this._listTempl = {
            completed: false,
            archived: false,
            title: 'List',
            body: '',
            items: [
                {
                    id: 1,
                    completed: false,
                    text: ''
                }
            ],
            tags: []
        };
        this._navigator = navigator;
    }

    deleteItem(id){
        this.handleDelete(id, this._state.deleteList.bind(this._state));
    }

    toggleComplete(id){
        debugger
        this._state.toggleAllCompleted(id);
    }

    async handleListAdd(){
        const id = await this.handleAdd(this._listTempl, this._state.addList.bind(this._state))
        await this._navigator.navigateToListPage(id);
    }

    toggleArchive(id){
        this._state.toggleArchiveList(id);
    }

}
//
