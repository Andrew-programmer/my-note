import {makeAutoObservable} from 'mobx'
import UserActions from "./asyncActions/UserActions";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this)
    }

    //
    set isAuth(bool) {
        this._isAuth = bool;
    }

    get isAuth() {
        return this._isAuth;
    }
    //

    set token(newToken){
        this._user._token = newToken
    }

    //
    set user(newUser) {
        this._user = newUser;
    }

    get user() {
        return this._user;
    }

    //
    get username() {
        return this._user.username;
    }

    set username(newName) {
        return this._user.username = newName;
    }

    //
    get photo() {
        return this._user.photo;
    }

    set photo(newPhotoSrc) {
        return this._user.photo = newPhotoSrc;
    }

    //
    get description() {
        return this._user.description;
    }

    set description(text) {
        return this._user.description = text;
    }

    //
    async password(newPass) {
        this._user.password = newPass;
        await UserActions.changePassword(newPass, this._user._token)
    }

    //
    async login(user) {
        const res = await UserActions.loginUser(user);
        const loggedUser = res.user;

        this._isAuth = true;
        this._user = loggedUser;
        this._user._token = res.jwt_token;

        localStorage.setItem('token', JSON.stringify(this._user._token));
        localStorage.setItem('user', JSON.stringify(this._user));

        return {token: this._user._token, res};
    }

    logout() {
        this._isAuth = false;
        this._user = {};
        localStorage.clear();
    }

    async register(user) {
        await UserActions.registerUser(user);
    }

    async fetchUser(token){
        const response = await UserActions.getUser(token);
        this._user = response.user;
        localStorage.setItem('user', JSON.stringify(response.user));
        this._user._token = token;
        return response?.user;
    }

    async fetchNewUser(newUser){
        return await UserActions.updateUserInfo(newUser, this._user._token);
    }
}
