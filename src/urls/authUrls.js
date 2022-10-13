import {API, AUTH, LOGIN, PORT, REGISTER} from "./apiConsts";

export const registerUserUrl = `http://localhost:${PORT}/${API}/${AUTH}/${REGISTER}`;
export const loginUserUrl = `http://localhost:${PORT}/${API}/${AUTH}/${LOGIN}`;
