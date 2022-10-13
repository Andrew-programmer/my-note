import {API, ME, PORT, USER} from "./apiConsts";

export const changePasswordUrl = `http://localhost:${PORT}/${API}/${USER}/${ME}`;
export const getUserUrl = `http://localhost:${PORT}/${API}/${USER}/${ME}`;
export const changeUserUrl = `http://localhost:${PORT}/${API}/${USER}/${ME}`;

export const getPhotoUrl = (photo) => {
    console.log(`http://localhost:${PORT}/${photo}`);
    return `http://localhost:${PORT}/${photo}`
}
