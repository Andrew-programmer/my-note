import {API, PORT, TAGS} from "./apiConsts";

export const tagByIdUrl = (id) => {
    return `http://localhost:${PORT}/${API}/${TAGS}/:?id=${id}`;
}

export const getAllTagsUrl = `http://localhost:${PORT}/${API}/${TAGS}`;
export const addTagUrl = `http://localhost:${PORT}/${API}/${TAGS}`;
