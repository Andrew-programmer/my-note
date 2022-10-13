import AsyncActions from "./fetch";
import {loginUserUrl, registerUserUrl} from "../../urls/authUrls";
import {changePasswordUrl, changeUserUrl, getUserUrl} from "../../urls/userUrls";

class UserAsyncActions extends AsyncActions{
    async registerUser(user) {
        await this.POST(registerUserUrl, JSON.stringify(user));
    }

    async loginUser(user){
        const response = await this.POST(loginUserUrl, JSON.stringify(user));
        return response.json();
    }

    async changePassword(newPassword, token){
        await this.PATCH(changePasswordUrl, JSON.stringify({newPassword}), {'Authorization': `Bearer ${token}`})
    }

    async getUser(token){
        const response = await this.GET(getUserUrl, {'Authorization': `Bearer ${token}`});
        return response.json();
    }

    async updateUserInfo(newUser, token){
        const response = await this.putFormData(changeUserUrl, newUser, {'Authorization': `Bearer ${token}`});
        return response.json();
    }
}

const UserActions = new UserAsyncActions();

export default UserActions;
