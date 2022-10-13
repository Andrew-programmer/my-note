import {API, ARCHIVE, BODY, LISTS, PORT} from "./apiConsts";

export const listByIdUrl = (id) => {
    return `http://localhost:${PORT}/${API}/${LISTS}/:?id=${id}`;
}

export const archiveByIdUrl = (id) => {
    return `http://localhost:${PORT}/${API}/${LISTS}/${ARCHIVE}/:?id=${id}`;
}

export const bodyListByIdUrl = (id) => {
    return `http://localhost:${PORT}/${API}/${LISTS}/${BODY}/:?id=${id}`;
}

export const getAllListsUrl = `http://localhost:${PORT}/${API}/${LISTS}`;
export const addListUrl = getAllListsUrl;
