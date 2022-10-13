import {API, NOTES, PORT} from "./apiConsts";

export const noteByIdUrl = (id) => {
    return `http://localhost:${PORT}/${API}/${NOTES}/:?id=${id}`;
}

export const getAllNotesUrl = `http://localhost:${PORT}/${API}/${NOTES}`;
export const addNoteUrl = getAllNotesUrl;
